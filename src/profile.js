import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const tagList = document.getElementById("tagList");
const bioInput = document.getElementById("bio");
const saveBtn = document.getElementById("saveBtn");
const status = document.getElementById("status");
const logoutBtn = document.getElementById("logoutBtn");

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

let selectedTags = [];

const renderTags = (userTags = []) => {
  tagList.innerHTML = "";
  selectedTags = [...userTags];

  interestTags.forEach((tag) => {
    const el = document.createElement("div");
    el.className = "tag";
    el.textContent = tag;
    if (userTags.includes(tag)) {
      el.classList.add("selected");
    }
    el.addEventListener("click", () => {
      el.classList.toggle("selected");
      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter((t) => t !== tag);
      } else {
        selectedTags.push(tag);
      }
    });
    tagList.appendChild(el);
  });
};

// Load profile
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    bioInput.value = data.bio || "";
    renderTags(data.interests || []);
  } else {
    renderTags([]);
  }
});

// Save profile
saveBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    bio: bioInput.value,
    interests: selectedTags,
    email: user.email,
    updatedAt: Date.now(),
  });
  status.textContent = "Profile updated!";
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/auth.html";
});
