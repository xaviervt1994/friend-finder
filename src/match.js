import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const matchList = document.getElementById("matchList");
const matchStatus = document.getElementById("matchStatus");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (currentUser) => {
  if (!currentUser) {
    matchStatus.textContent = "You must be logged in.";
    return;
  }

  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    let currentUserData = [];

    usersSnapshot.forEach((docSnap) => {
      if (docSnap.id === currentUser.uid) {
        currentUserData = docSnap.data().interests || [];
      }
    });

    if (!currentUserData.length) {
      matchStatus.textContent = "No interests found. Go back to onboarding.";
      return;
    }

    // Show matches
    let matchCount = 0;
    usersSnapshot.forEach((docSnap) => {
      if (docSnap.id === currentUser.uid) return;

      const user = docSnap.data();
      const sharedTags = user.interests?.filter((tag) =>
        currentUserData.includes(tag)
      );

      if (sharedTags?.length) {
        matchCount++;
        const card = document.createElement("div");
        card.className = "match-card";
        card.innerHTML = `
          <p><strong>${user.email}</strong></p>
          <p>Shared interests:</p>
          <p>${sharedTags.join(", ")}</p>
        `;
        matchList.appendChild(card);
      }
    });

    if (matchCount === 0) {
      matchStatus.textContent = "No matches found yet. Check back soon!";
    }
  } catch (err) {
    console.error(err);
    matchStatus.textContent = "Error loading matches.";
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/auth.html";
});
