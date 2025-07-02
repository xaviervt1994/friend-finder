import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const recipientInput = document.getElementById("recipient");
const logoutBtn = document.getElementById("logoutBtn");

let currentUser = null;
let currentChatId = null;

// Render chat message to UI
const renderMessage = (msg, sender) => {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${sender}:</strong> ${msg}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Listen for auth state
onAuthStateChanged(auth, (user) => {
  if (!user) return;
  currentUser = user;

  recipientInput.addEventListener("change", () => {
    chatBox.innerHTML = "";
    const recEmail = recipientInput.value.trim();
    if (!recEmail || recEmail === currentUser.email) return;

    const chatId = [currentUser.email, recEmail].sort().join("_");
    currentChatId = chatId;

    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    onSnapshot(q, (snapshot) => {
      chatBox.innerHTML = "";
      snapshot.forEach((doc) => {
        const data = doc.data();
        renderMessage(data.text, data.sender);
      });
    });
  });

  sendBtn.addEventListener("click", async () => {
    const text = messageInput.value.trim();
    if (!text || !currentChatId) return;

    const messagesRef = collection(db, "chats", currentChatId, "messages");
    await addDoc(messagesRef, {
      text,
      sender: currentUser.email,
      timestamp: Date.now(),
    });

    messageInput.value = "";
  });
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/auth.html";
});
