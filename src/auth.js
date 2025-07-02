import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const status = document.getElementById("status");

// SIGN UP
signupBtn.addEventListener("click", async () => {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
    status.textContent = "Account created! Redirecting...";
    setTimeout(() => {
      window.location.href = "/onboarding.html";
    }, 1500);
  } catch (err) {
    status.textContent = err.message;
  }
});

// LOG IN
loginBtn.addEventListener("click", async () => {
  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
    status.textContent = "Logged in! Redirecting...";
    setTimeout(() => {
      window.location.href = "/onboarding.html";
    }, 1500);
  } catch (err) {
    status.textContent = err.message;
  }
});
