from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
from deep_translator import GoogleTranslator

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

user_language = None
RASA_URL = "http://localhost:5005/webhooks/rest/webhook"  # Rasa API Endpoint

@app.route('/', methods=['GET'])
def index_get():
    return render_template('base.html')

@app.route('/set_language', methods=['POST'])
def set_language():
    global user_language
    language = request.get_json().get("language", "").strip()

    if not language:
        return jsonify({"error": "The 'language' field is required!"}), 400

    user_language = language
    return jsonify({"message": f"Language set to {user_language}."})

@app.route('/predict', methods=['POST'])
def predict():
    if not user_language:
        return jsonify({"error": "Language is not set! Please set the language first."}), 400

    text = request.get_json().get("message", "").strip()

    if not text:
        return jsonify({"error": "The 'message' field is required!"}), 400

    try:
        # Translate input to English
        translated_input = GoogleTranslator(source=user_language, target='en').translate(text)
        print(f"Translated input to English: {translated_input}")

        # Send translated text to Rasa
        response = requests.post(RASA_URL, json={"sender": "user", "message": translated_input})

        if response.status_code != 200:
            return jsonify({"error": "Failed to get a response from Rasa!"}), 500

        rasa_response = response.json()
        if not rasa_response:
            return jsonify({"error": "Empty response from Rasa!"}), 500

        # Extract response message from Rasa
        response_text = rasa_response[0].get("text", "")

        if not response_text:
            return jsonify({"error": "Rasa did not return any response!"}), 500

        print(f"Chatbot response in English: {response_text}")

        # Translate response back to the original language
        translated_response = GoogleTranslator(source='en', target=user_language).translate(response_text)
        print(f"Translated response: {translated_response}")

        if not translated_response:
            return jsonify({"error": "Translation of chatbot response failed!"}), 500

        # Return final response
        return jsonify({"answer": translated_response})

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
