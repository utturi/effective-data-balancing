import os
import json
import torch
import s3_access
from PIL import Image
from torchvision import transforms


def classfy(source=None):

    model = torch.load("classfications")
    if not source:
        source = "img.jpg"

    # Preprocess image
    tfms = transforms.Compose(
        [
            transforms.Resize(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
        ]
    )

    img = Image.open(source)
    w, h = img.size
    transformed_img = tfms(img).unsqueeze(0)

    # Load ImageNet class names
    labels_json = json.load(open("sample/labels_map.txt"))
    labels_map = [labels_json[str(i)] for i in range(1000)]

    # Classify
    model.eval()
    with torch.no_grad():
        outputs = model(transformed_img)

    # json
    save_dict = {"result": {"width": w, "height": h, "objects": []}}
    save_labels = []
    for idx in torch.topk(outputs, k=1).indices.squeeze(0).tolist():
        object_dict = {"attributes": {}}
        prob = torch.softmax(outputs, dim=1)[0, idx].item()
        label = "{label:<1}".format(label=labels_map[idx])
        object_dict["attributes"][label] = float(prob)
        save_dict["result"]["objects"].append(object_dict)
        save_labels.append(label)

    origin_name, _ = os.path.splitext(source)
    json_file_name = origin_name + "_output.json"
    with open(json_file_name, "w", encoding="utf-8") as f:
        json.dump(save_dict, f, ensure_ascii=False)

    client = s3_access.get_s3_client()
    s3_access.upload_file(client, source, source)
    s3_access.upload_file(client, json_file_name, json_file_name)

    res_json = {
        "img_url": s3_access.get_public_url(client, source),
        "json_url": s3_access.get_public_url(client, json_file_name),
        "text_arr": save_labels,
    }

    return res_json
