import os
import json
import random
from flask import Flask, send_from_directory, jsonify, request

app = Flask(__name__)
app.static_url_path=""
app.static_folder="./static/dist"

@app.route("/index")
def index():
    return "Hello world"


@app.route("/")
@app.route("/<path:path>")
def serve_react_app(path=""):
    # serve other static files, if a path is provided
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)

    # serve react app
    else:
        return send_from_directory(app.static_folder, "index.html")


# other functions and routes
@app.route("/api/random", methods=["GET"])
def random_number():
    try:
        start = request.args.get("start", 0)
        end = request.args.get("end", 10)
        return jsonify({"random_number": random.randint(int(start), int(end))})
    except:
        return jsonify({"random_number": random.randint(0, 10)})


@app.route("/api/echo-post", methods=["POST"])
def echo_post():
    # if application/json is used
    if request.is_json:
        data = request.json
        return jsonify(data)

    # if formData is used (either www-url encoded or multipart/formdata)
    else:
        name = request.form.get("name")
        age = request.form.get("age")
        return jsonify({"name": name, 'age': age})


if __name__ == "__main__":
    app.run(debug=True, port=5001)
