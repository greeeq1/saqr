
import { auth, database } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const birthdate = document.getElementById("birthdate").value;
  const gender = document.getElementById("gender").value;

  if (!username || !email || !password || !confirmPassword || !birthdate || !gender) {
    alert("يرجى ملء جميع الحقول.");
    return;
  }

  if (password !== confirmPassword) {
    alert("كلمتا المرور غير متطابقتين.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await set(ref(database, "users/" + user.uid), {
      username,
      email,
      birthdate,
      gender,
      type: "member"
    });

    alert("✅ تم تسجيل حسابك، الرجاء التوجه إلى صفحة تسجيل الدخول.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("خطأ:", error);
    alert("❌ النظام مشغول، حاول مرة أخرى لاحقاً.
" + error.message);
  }
});
