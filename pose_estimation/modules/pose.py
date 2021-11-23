import cv2
import numpy as np

from modules.keypoints import BODY_PARTS_KPT_IDS, BODY_PARTS_PAF_IDS
from modules.one_euro_filter import OneEuroFilter


class Pose:
    num_kpts = 18
    kpt_names = [
        "nose",
        "neck",
        "r_sho",
        "r_elb",
        "r_wri",
        "l_sho",
        "l_elb",
        "l_wri",
        "r_hip",
        "r_knee",
        "r_ank",
        "l_hip",
        "l_knee",
        "l_ank",
        "r_eye",
        "l_eye",
        "r_ear",
        "l_ear",
    ]
    sigmas = (
        np.array(
            [
                0.26,
                0.79,
                0.79,
                0.72,
                0.62,
                0.79,
                0.72,
                0.62,
                1.07,
                0.87,
                0.89,
                1.07,
                0.87,
                0.89,
                0.25,
                0.25,
                0.35,
                0.35,
            ],
            dtype=np.float32,
        )
        / 10.0
    )
    vars = (sigmas * 2) ** 2
    last_id = -1
    color = [54, 178, 254]

    def __init__(self, keypoints, confidence):
        super().__init__()
        self.keypoints = keypoints
        self.confidence = confidence
        self.bbox = Pose.get_bbox(self.keypoints)
        self.id = None
        self.filters = [[OneEuroFilter(), OneEuroFilter()] for _ in range(Pose.num_kpts)]

    @staticmethod
    def get_bbox(keypoints):
        found_keypoints = np.zeros((np.count_nonzero(keypoints[:, 0] != -1), 2), dtype=np.int32)
        found_kpt_id = 0
        for kpt_id in range(Pose.num_kpts):
            if keypoints[kpt_id, 0] == -1:
                continue
            found_keypoints[found_kpt_id] = keypoints[kpt_id]
            found_kpt_id += 1
        bbox = cv2.boundingRect(found_keypoints)
        return bbox

    def update_id(self, id=None):
        self.id = id
        if self.id is None:
            self.id = Pose.last_id + 1
            Pose.last_id += 1

    def draw(self, img, save_dict):
        assert self.keypoints.shape == (Pose.num_kpts, 2)
        res_label = []

        for part_id in range(len(BODY_PARTS_PAF_IDS) - 2):
            object_dict = {"attributes": {}}
            kpt_a_id = BODY_PARTS_KPT_IDS[part_id][0]

            global_kpt_a_id = self.keypoints[kpt_a_id, 0]
            if global_kpt_a_id != -1:
                x_a, y_a = self.keypoints[kpt_a_id]
                cv2.circle(img, (int(x_a), int(y_a)), 3, Pose.color, -1)
                cv2.putText(
                    img,
                    str(kpt_a_id),
                    (int(x_a) - 1, int(y_a) - 1),
                    cv2.FONT_HERSHEY_DUPLEX,
                    0.5,
                    (0, 0, 0),
                )
                attr_label = str(kpt_a_id)
                attr_name = Pose.kpt_names[kpt_a_id]
                attr_x = int(x_a)
                attr_y = int(y_a)

            kpt_b_id = BODY_PARTS_KPT_IDS[part_id][1]
            global_kpt_b_id = self.keypoints[kpt_b_id, 0]
            if global_kpt_b_id != -1:
                x_b, y_b = self.keypoints[kpt_b_id]
                cv2.circle(img, (int(x_b), int(y_b)), 3, Pose.color, -1)
                cv2.putText(
                    img,
                    str(kpt_b_id),
                    (int(x_b) - 1, int(y_b) - 1),
                    cv2.FONT_HERSHEY_DUPLEX,
                    0.5,
                    (0, 0, 0),
                )
                attr_label = str(kpt_b_id)
                attr_name = Pose.kpt_names[kpt_b_id]
                attr_x = int(x_b)
                attr_y = int(y_b)
            if global_kpt_a_id != -1 and global_kpt_b_id != -1:
                cv2.line(img, (int(x_a), int(y_a)), (int(x_b), int(y_b)), Pose.color, 2)
            object_dict["attributes"][attr_label] = attr_name
            object_dict["x"] = attr_x
            object_dict["y"] = attr_y
            save_dict["result"]["objects"].append(object_dict)
            res_label.append(f"{attr_label} {attr_name}")

        return save_dict, res_label


def get_similarity(a, b, threshold=0.5):
    num_similar_kpt = 0
    for kpt_id in range(Pose.num_kpts):
        if a.keypoints[kpt_id, 0] != -1 and b.keypoints[kpt_id, 0] != -1:
            distance = np.sum((a.keypoints[kpt_id] - b.keypoints[kpt_id]) ** 2)
            area = max(a.bbox[2] * a.bbox[3], b.bbox[2] * b.bbox[3])
            similarity = np.exp(-distance / (2 * (area + np.spacing(1)) * Pose.vars[kpt_id]))
            if similarity > threshold:
                num_similar_kpt += 1
    return num_similar_kpt


def track_poses(previous_poses, current_poses, threshold=3, smooth=False):
    """Propagate poses ids from previous frame results. Id is propagated,
    if there are at least `threshold` similar keypoints between pose from previous frame and current.
    If correspondence between pose on previous and current frame was established, pose keypoints are smoothed.

    :param previous_poses: poses from previous frame with ids
    :param current_poses: poses from current frame to assign ids
    :param threshold: minimal number of similar keypoints between poses
    :param smooth: smooth pose keypoints between frames
    :return: None
    """
    current_poses = sorted(
        current_poses, key=lambda pose: pose.confidence, reverse=True
    )  # match confident poses first
    mask = np.ones(len(previous_poses), dtype=np.int32)
    for current_pose in current_poses:
        best_matched_id = None
        best_matched_pose_id = None
        best_matched_iou = 0
        for id, previous_pose in enumerate(previous_poses):
            if not mask[id]:
                continue
            iou = get_similarity(current_pose, previous_pose)
            if iou > best_matched_iou:
                best_matched_iou = iou
                best_matched_pose_id = previous_pose.id
                best_matched_id = id
        if best_matched_iou >= threshold:
            mask[best_matched_id] = 0
        else:  # pose not similar to any previous
            best_matched_pose_id = None
        current_pose.update_id(best_matched_pose_id)

        if smooth:
            for kpt_id in range(Pose.num_kpts):
                if current_pose.keypoints[kpt_id, 0] == -1:
                    continue
                # reuse filter if previous pose has valid filter
                if (
                    best_matched_pose_id is not None
                    and previous_poses[best_matched_id].keypoints[kpt_id, 0] != -1
                ):
                    current_pose.filters[kpt_id] = previous_poses[best_matched_id].filters[kpt_id]
                current_pose.keypoints[kpt_id, 0] = current_pose.filters[kpt_id][0](
                    current_pose.keypoints[kpt_id, 0]
                )
                current_pose.keypoints[kpt_id, 1] = current_pose.filters[kpt_id][1](
                    current_pose.keypoints[kpt_id, 1]
                )
            current_pose.bbox = Pose.get_bbox(current_pose.keypoints)
