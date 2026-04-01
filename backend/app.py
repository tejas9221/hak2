from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_disease
from utils import process_image

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "🌿 Crop AI Backend Running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        image = request.files.get('image')
        symptoms = request.form.get("symptoms")
        voice_text = request.form.get("voice")

        if not image:
            return jsonify({"error": "No image uploaded"})

        img = process_image(image)

        result = predict_disease(img, symptoms, voice_text)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
