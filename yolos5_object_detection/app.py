import detect_image
from flask import Flask, request

app = Flask(__name__)


@app.route("/", methods=["GET"])
def main():
    source = request.args["file_name"]
    response = detect_image.detect(source=source)
    return response


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8081)
