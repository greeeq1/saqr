
import { auth, database } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const emailOrUsername = document.getElementById("emailOrUsername").value.trim();
  const password = document.getElementById("password").value;

  if (!emailOrUsername || !password) {
    alert("يرجى إدخال البريد الإلكتروني أو اسم المستخدم وكلمة المرور.");
    return;
  }

  const email = emailOrUsername.includes("@") ? emailOrUsername : `${emailOrUsername}@saqr.com`;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;

    const userRef = ref(database, 'users/' + uid);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      if (userData.type === "admin") {
        alert("مرحباً أيها الأدمن!");
        window.location.href = "admin.html";
      } else {
        alert("تم تسجيل الدخول بنجاح.");
        window.location.href = "chat.html";
      }
    } else {
      alert("⚠️ هذا الحساب غير مسجل كعضو أو أدمن. يمكنك إنشاء حساب جديد.");
      if (confirm("هل ترغب في التوجه إلى صفحة إنشاء الحساب؟")) {
        window.location.href = "signup.html";
      }
    }
  } catch (error) {
    alert("فشل تسجيل الدخول: " + error.message);
  }
});
