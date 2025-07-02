import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const interestTags = [
  "Hiking",
  "Basketball",
  "Gaming",
  "Weightlifting",
  "Yoga",
  "Movies",
  "Anime",
  "Running",
  "Swimming",
  "Traveling",
  "Music",
  "Reading",
  "Tech",
  "Art",
  "Dancing",
];

const tagList = document.getElementById("tagList");
const submitBtn = document.getElementById("submitTags");
const status = document.getElementById("status");
const logoutBtn = document.getElementById("logoutBtn");

let selectedTags = [];

// Render interest tag buttons
interestTags.forEach((tag) => {
  const btn = document.createElement("div");
  btn.className = "tag";
  btn.textContent = tag;
  btn.addEventListener("click", () => {
    btn.classList.toggle("selected");
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      selectedTags.push(tag);
    }
  });
  tagList.appendChild(btn);
});

// Save selected tags to Firestore
submitBtn.addEventListener("click", async () => {
  if (selectedTags.length < 3) {
    status.textContent = "Please select at least 3 interests.";
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        interests: selectedTags,
        email: user.email,
        createdAt: Date.now(),
      });
      status.textContent = "Saved! Redirecting...";
      setTimeout(() => {
        window.location.href = "/match.html";
      }, 1500);
    } else {
      status.textContent = "You must be logged in.";
    }
  });
});

// Log out
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/auth.html";
});
