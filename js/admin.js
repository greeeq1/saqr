
import { database } from './firebase-config.js';
import { ref, get, child, onChildAdded, remove } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

const adminMessages = document.getElementById("adminMessages");
const userList = document.getElementById("userList");

function loadMessages() {
  const messagesRef = ref(database, "messages");
  adminMessages.innerHTML = "";

  onChildAdded(messagesRef, (data) => {
    const { sender, text, time } = data.val();
    const msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}
      <span style="font-size:0.8em;color:#888">(${time})</span>
      <button onclick="deleteMsg('${data.key}')">🗑 حذف</button>`;
    adminMessages.appendChild(msgDiv);
  });
}

function loadUsers() {
  const usersRef = ref(database, "users");
  userList.innerHTML = "";

  get(usersRef).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      const li = document.createElement("li");
      li.textContent = `${userData.username} (${userData.type || "member"})`;
      userList.appendChild(li);
    });
  });
}

window.deleteMsg = function (msgKey) {
  remove(ref(database, "messages/" + msgKey))
    .then(() => alert("تم حذف الرسالة."))
    .catch((err) => alert("فشل الحذف: " + err.message));
};

// تنفيذ تلقائي بعد التحقق من الصلاحية في admin.html
loadMessages();
loadUsers();
