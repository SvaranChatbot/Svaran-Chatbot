# update By Ronak Bagri (2023uma0233)
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from deep_translator import GoogleTranslator
import subprocess
import threading
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) to allow your React app to communicate with Flask

user_language = "en"  # default language
RASA_URL = "http://localhost:5005/webhooks/rest/webhook"  # Rasa API Endpoint

@app.route('/set_language', methods=['POST'])
def set_language():
    global user_language
    data = request.get_json()
    user_language = data.get("language", "en").strip()
    print(f"Language set to: {user_language}")
    return jsonify({"message": f"Language set to {user_language}."})

@app.route('/predict', methods=['POST'])
def predict():
    global user_language
    data = request.get_json()
    user_text = data.get("message", "").strip()

    if not user_text:
        return jsonify({"error": "Message is required!"}), 400

    try:
        # Translate user input to English
        input_en = GoogleTranslator(source=user_language, target='en').translate(user_text)
        print(f"User: {user_text} -> English: {input_en}")

        # Send to Rasa
        rasa_response = requests.post(RASA_URL, json={"sender": "user", "message": input_en})
        if rasa_response.status_code != 200:
            return jsonify({"error": "Error communicating with Rasa"}), 500

        rasa_data = rasa_response.json()
        if not rasa_data:
            return jsonify({"answer": "Sorry, I didn't get that."})

        bot_reply_en = rasa_data[0].get("text", "")
        bot_reply_translated = GoogleTranslator(source='en', target=user_language).translate(bot_reply_en)
        print(f"Bot: {bot_reply_en} -> Translated: {bot_reply_translated}")

        return jsonify({"answer": bot_reply_translated})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    

# add scipt to run rasa and flask app with one command
def run_rasa_shell():
    # Get the absolute directory where this script is located
    current_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Running Rasa shell in directory: {current_dir}")
    subprocess.call(["rasa", "shell"], cwd=current_dir, shell=True)

if __name__ == "__main__":
    # Start Rasa shell in a background thread
    threading.Thread(target=run_rasa_shell).start()

    # Start Flask server
    app.run(debug=True, port=8080)
