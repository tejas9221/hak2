from PIL import Image
import numpy as np

def process_image(image):
    img = Image.open(image).convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    return img
