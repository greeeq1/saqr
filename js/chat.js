
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getDatabase, ref, push, onChildAdded } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let currentUser = {
  name: "زائر",
  role: "زائر"
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const email = user.email;
    if (email === "admin@saqr.com") {
      currentUser = { name: "المدير", role: "أدمن" };
    } else {
      currentUser = { name: email.split('@')[0], role: "عضو" };
    }
  }
});

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;
  const msg = {
    text: text,
    sender: currentUser.name,
    role: currentUser.role,
    timestamp: Date.now()
  };
  push(ref(db, "chat"), msg);
  messageInput.value = "";
}

onChildAdded(ref(db, "chat"), (snapshot) => {
  const msg = snapshot.val();
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message-block");

  const label = document.createElement("div");
  label.classList.add("user-label");
  label.textContent = `${msg.sender} (${msg.role})`;

  const bubble = document.createElement("div");
  bubble.classList.add("message");
  if (msg.role === "أدمن") bubble.classList.add("admin-message");
  if (msg.role === "عضو") bubble.classList.add("user-message");

  bubble.textContent = msg.text;

  messageDiv.appendChild(label);
  messageDiv.appendChild(bubble);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});
