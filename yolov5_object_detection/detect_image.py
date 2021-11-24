import os
import json
import torch
import s3_access
from PIL import Image


def detect(source=None):
    model = torch.load("weights/yolov5_detection_weights.pt")
    model.conf = 0.5  # NMS confidence threshold
    model.iou = 0.45
    if not source:
        source = "sample.jpg"

    img = Image.open(source)
    w, h = img.size

    Model_input_image = [img]
    results = model(Model_input_image, size=640)
    results_pandas = results.pandas().xyxy[0]

    save_dict = {"result": {"width": w, "height": h, "objects": []}}
    save_labels = []

    # pandas 형식에서 행 단위로 필요한 값 추출하여 json return 형식으로 구성
    for i in range(len(results_pandas)):
        out = results_pandas.loc[i]
        object_dict = {"attributes": {}}
        conf = round(float(out["confidence"]), 2)
        object_dict["attributes"][out["name"]] = conf
        object_dict["left"] = out["xmin"]
        object_dict["top"] = out["ymin"]
        object_dict["right"] = out["xmax"]
        object_dict["bottom"] = out["ymax"]
        save_dict["result"]["objects"].append(object_dict)
        save_labels.append(f"{out['name']}: {conf}")  # 화면의 text 필드에 띄울 label과 conf 값

    # 파일경로와 확장자 분리 origin_name = "sample"
    origin_name, _ = os.path.splitext(source)

    # 모델 결과 저장 -- results 객체에서 입력 파일명을 그대로 사용하므로 폴더를 따로 지정
    results.save("output")
    output_file_path = os.path.join("output", source)  # 저장된 경로

    # json 저장 파일 경로지정
    json_file_name = origin_name + "_output.json"
    # json 파일 저장
    with open(json_file_name, "w", encoding="utf-8") as f:
        json.dump(save_dict, f, ensure_ascii=False)

    # 결과 이미지와 json 파일 업로드 후 삭제
    client = s3_access.get_s3_client()
    s3_access.upload_file(client, output_file_path, source)
    s3_access.upload_file(client, json_file_name, json_file_name)

    res_json = {
        "img_url": s3_access.get_public_url(client, source),
        "json_url": s3_access.get_public_url(client, json_file_name),
        "text_arr": save_labels,
    }

    return res_json
