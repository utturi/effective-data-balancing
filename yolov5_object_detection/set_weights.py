import os
import s3_access


def get_files():
    source_bucket = s3_access.get_s3_bucket()
    weights_file = "yolov5_detection_weights.pt"
    os.makedirs("weights/", exist_ok=True)
    weights_save_path = os.path.join(os.getcwd(), "weights", weights_file)
    # s3_access.upload_weights_file(source_bucket, weights_save_path, weights_file)
    s3_access.download_file(source_bucket, weights_file, weights_save_path)

    ttf_file = "Arial2.ttf"
    # s3_access.upload_weights_file(source_bucket, ttf_file, ttf_file)
    s3_access.download_file(source_bucket, ttf_file, ttf_file)
