import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";

document.getElementById("startBtn").addEventListener("click", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "/onboarding.html";
    } else {
      window.location.href = "/auth.html";
    }
  });
});
