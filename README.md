# Svaran: AI Conversational Assistant for IIT Jammu

[![Python](https://img.shields.io/badge/Python-3.10-blue.svg)](https://www.python.org/)
[![Rasa](https://img.shields.io/badge/Rasa-3.x-orange.svg)](https://rasa.com/)
[![Flask](https://img.shields.io/badge/Flask-2.x-black.svg)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-purple.svg?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Svaran** (from Sanskrit, meaning *"to have a voice"*) is a full-stack, multilingual AI-powered chatbot designed to serve as a comprehensive information helpdesk for the **IIT Jammu** community. It provides students, faculty, and visitors with instant, accurate answers to a wide range of frequently asked questions about campus life, academics, and facilities.


---

## 📌 Table of Contents

- [The Need for Svaran](#the-need-for-svaran)
- [Key Features](#key-features)
- [Tech Stack & Architecture](#tech-stack--architecture)
- [Local Setup & Installation](#local-setup--installation)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## 💡 The Need for Svaran

University websites often have vast amounts of information spread across multiple pages. Users—especially new students or visitors—frequently struggle to find quick and specific answers.

Common questions include:

- Course structure and academic policies.
- Faculty office locations and consultation hours.
- Facilities like library, hostels, and medical center.
- Administrative procedures and grading rules.

**Svaran** solves this by acting as a **centralized, conversational interface**, available 24/7. It streamlines access to information, reduces administrative burden, and improves the overall campus experience.

---

## 🚀 Key Features

- 🔍 **Natural Language Understanding (NLU):** Understands queries in natural language using Rasa, identifying intent and extracting entities.
- 🌐 **Multilingual Support:** Communicates in multiple languages via real-time translation.
- 🧠 **Context-Aware Conversations:** Remembers context for seamless multi-turn interactions.
- 📚 **Comprehensive Knowledge Base:** Trained to respond to academic, facility, and administrative questions.
- 💬 **Modern & Responsive UI:** Built with React + Vite for a sleek, mobile-friendly interface.
- ⚙️ **Scalable Architecture:** Decoupled frontend and backend allow independent scaling and development.

---

## 🏗️ Tech Stack & Architecture

Svaran is built with a modular full-stack architecture:

- **Frontend:** React + Vite (for UI)
- **Backend:** Flask (for API) + Rasa (for NLP and core chatbot logic)
- **Rasa Action Server:** Handles custom Python logic
- **Optional Add-ons:** PostgreSQL (future DB), GitHub Actions (CI/CD)

---

## ⚙️ Local Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/svaran.git
cd svaran
```

---

## 2. Backend & Rasa Setup

### ➤ Prepare the Environment

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

- On **Windows**:

  ```bash
  venv\Scripts\activate
  ```

- On **macOS/Linux**:

  ```bash
  source venv/bin/activate
  ```

---

### ➤ Install Dependencies

```bash
pip install -r requirements.txt
```

---

### ➤ Train the Rasa Model

```bash
rasa train
```

---

### ➤ Terminal 1: Run the Rasa Action Server

Open a **new terminal**, navigate to the backend, and activate the environment again:

```bash
cd backend
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

rasa run actions
```

✅ Keep this terminal running. It will listen on port `5055`.

---

### ➤ Terminal 2: Run Flask + Rasa Server

Open **another new terminal**, and run the main server:

```bash
cd backend
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

python app.py
```

This will start:

- 🧠 **Rasa Server** at: [http://localhost:5005](http://localhost:5005)  
- 🔗 **Flask API** at: [http://localhost:8080](http://localhost:8080)

---

## 💻 3. Frontend Setup

### ➤ Terminal 3: Run Vite Dev Server

Open a **third terminal** and set up the frontend:

```bash
cd frontend
npm install
npm run dev
```

This starts the **React** app at: [http://localhost:5173](http://localhost:5173)

---

## ✅ You're All Set!

- 🔌 Backend API: [http://localhost:8080](http://localhost:8080)  
- 💬 Frontend App: [http://localhost:5173](http://localhost:5173)

Open your browser and navigate to `http://localhost:5173` to start chatting with **Svaran**.

---

## 🌱 Future Improvements

Here are some enhancements planned for upcoming releases:

- 🗃️ **Database Integration**  
  Add PostgreSQL to store user queries, feedback, and dynamic content.

- 🔐 **User Authentication**  
  Allow personalized experiences for students, faculty, and admin users.

- 🔁 **CI/CD Pipeline**  
  Automate testing and deployment using GitHub Actions.

- 📊 **Analytics Dashboard**  
  Monitor chatbot usage, failed queries, and improve NLU performance based on data.

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for full details.

---

> 🚀 Made with ❤️ for the IIT Jammu community.
