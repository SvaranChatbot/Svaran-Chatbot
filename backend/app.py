# update By Ronak Bagri (2023uma0233)
# update by kunal Sharma (2023uma0221)
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from deep_translator import GoogleTranslator
import subprocess
import threading
import os

app = Flask(__name__)
CORS(app) 

user_language = "en"
RASA_URL = "http://localhost:5005/webhooks/rest/webhook" 
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
        input_en = GoogleTranslator(source=user_language, target='en').translate(user_text)
        print(f"User: {user_text} -> English: {input_en}")

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

def run_rasa_shell():
    # updated by kunal sharma
    current_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Running Rasa shell in directory: {current_dir}")
    subprocess.call(["rasa", "shell"], cwd=current_dir, shell=True)

if __name__ == "__main__":
    # updated by kunal sharma
    threading.Thread(target=run_rasa_shell).start()

    # Start Flask server
    app.run(debug=True, port=8080)
