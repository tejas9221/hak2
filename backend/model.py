import numpy as np
import random

diseases = [
    "Healthy",
    "Leaf Spot",
    "Powdery Mildew",
    "Rust",
    "Blight"
]

tips = {
    "Healthy": "Your crop is healthy. Maintain proper watering.",
    "Leaf Spot": "Remove infected leaves and use fungicide.",
    "Powdery Mildew": "Apply sulfur spray and avoid humidity.",
    "Rust": "Use resistant seeds and fungicide.",
    "Blight": "Ensure proper drainage and remove infected plants."
}

def predict_disease(img, symptoms, voice_text):
    
    combined_text = (symptoms or "") + " " + (voice_text or "")

    # Simulated AI logic
    scores = np.random.rand(len(diseases))
    scores = scores / np.sum(scores)

    prediction_index = np.argmax(scores)
    prediction = diseases[prediction_index]

    return {
        "prediction": prediction,
        "confidence": scores.tolist(),
        "labels": diseases,
        "tip": tips[prediction]
    }
