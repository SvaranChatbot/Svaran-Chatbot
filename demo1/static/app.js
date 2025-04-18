class Chatbox {
    constructor() {
        this.args = {
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            languageSelect: document.querySelector('#language'),
            resetButton: document.querySelector('#resetChat')
        };

        this.messages = [];
        this.language = null;
    }

    display() {
        const { chatBox, sendButton, languageSelect, resetButton } = this.args;

        chatBox.classList.add('chatbox--active');

        sendButton.addEventListener('click', () => this.onSendButton(chatBox));
        languageSelect.addEventListener('change', () => this.setLanguage());
        resetButton.addEventListener('click', () => this.resetChat(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });

        this.setLanguage(); // Default
    }

    setLanguage() {
        this.language = this.args.languageSelect.value;

        fetch('./set_language', {
            method: 'POST',
            body: JSON.stringify({ language: this.language }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch((error) => console.error('Error setting language:', error));
    }

    resetChat(chatBox) {
        this.messages = [];
        const chatMessage = chatBox.querySelector('.chatbox__messages');
        chatMessage.innerHTML = '';
    }

    onSendButton(chatBox) {
        const textField = chatBox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") return;

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        fetch('./predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(r => r.json())
        .then(r => {
            let botReply = r.answer || `Sorry, I am trained on limited data. You may ask general FAQs like:
                1) About semester-wise B.Tech course structure (Electrical, CSE, Materials etc)
                2) About office location and availability timings of faculties
                3) About medical center at IIT JAMMU
                4) About library timings and borrowing policy for B.Tech/M.Tech students
                5) Programmes offered under UG curriculum
                6) Programmes offered under PG curriculum
                7) Programmes offered under PhD curriculum
                8) Grading system at IIT JAMMU`;

        
            let msg2 = { name: "Sam", message: botReply };
            this.messages.push(msg2);
            this.updateChatText(chatBox);
            textField.value = '';
        })
        
        
        .catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatBox);
            textField.value = '';
        });
    }

    // updateChatText(chatBox) {
    //     let html = '';
    //     this.messages.slice().reverse().forEach(function (item) {
    //         if (item.name === "Sam") {
    //             html += `<div class="messages__item messages__item--visitor">${item.message}</div>`;
    //         } else {
    //             html += `<div class="messages__item messages__item--operator">${item.message}</div>`;
    //         }
    //     });

    //     const chatMessage = chatBox.querySelector('.chatbox__messages');
    //     chatMessage.innerHTML = html;
    // }
    updateChatText(chatBox) {
        let html = '';
        this.messages.slice().reverse().forEach(function (item) {
            let messageWithBreaks = item.message.replace(/\n/g, "<br>");
            if (item.name === "Sam") {
                html += `<div class="messages__item messages__item--visitor">${messageWithBreaks}</div>`;
            } else {
                html += `<div class="messages__item messages__item--operator">${messageWithBreaks}</div>`;
            }
        });
    
        const chatMessage = chatBox.querySelector('.chatbox__messages');
        // chatMessage.innerHTML = html;
        chatMessage.innerHTML = '';
        chatMessage.insertAdjacentHTML('afterbegin', html);

    }
    
}

const chatbox = new Chatbox();
chatbox.display();
