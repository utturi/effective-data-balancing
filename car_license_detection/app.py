import set_weights

set_weights.get_files()

import torch
import detect_image
from flask import Flask, request
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/", methods=["GET"])
def main():
    file_name = request.args["file_name"]
    with torch.no_grad():
        response = detect_image.detect(source=file_name)
    return response


@app.route("/fileUpload", methods=["POST"])
def file_upload():
    file = request.files["file"]
    file.save(secure_filename(file.filename))
    return "200 OK"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
