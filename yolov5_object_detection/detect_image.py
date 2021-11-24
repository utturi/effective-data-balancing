import torch
import os
import s3_access
import json
from PIL import Image
from flask import Flask, request


def detect(source=None):
    model = torch.load("weights/yolov5_detection_weights.pt")
    model.conf = 0.6  # NMS confidence threshold
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

    for i in range(len(results_pandas)):
        out = results_pandas.loc[i]
        object_dict = {"attributes": {}}
        object_dict["attributes"][out["name"]] = float(out["confidence"])
        object_dict["left"] = out["xmin"]
        object_dict["top"] = out["ymin"]
        object_dict["right"] = out["xmax"]
        object_dict["bottom"] = out["ymax"]
        save_dict["result"]["objects"].append(object_dict)
        save_labels.append(f"{out['name']}: {out['confidence']}")

    # 6.파일경로와 확장자 분리 origin_name = /test/image0
    origin_name, _ = os.path.splitext(source)

    # 7.모델 결과 저장할 경로 지정 및 저장
    results.save("output")
    output_file_path = os.path.join("output", source)

    # 8.json형식 아웃풋 저장 변수
    # json_input_data = results.pandas().xyxy[0]

    # 9.json 저장 파일 경로지정.
    json_file_name = origin_name + "_output.json"
    # 10.json 파일로 저장
    with open(json_file_name, "w", encoding="utf-8") as f:
        json.dump(save_dict, f, ensure_ascii=False)

    client = s3_access.get_s3_client()
    s3_access.upload_file(client, output_file_path, source)
    s3_access.upload_file(client, json_file_name, json_file_name)

    res_json = {
        "img_url": s3_access.get_public_url(client, source),
        "json_url": s3_access.get_public_url(client, json_file_name),
        "text_arr": save_labels,
    }

    return res_json
