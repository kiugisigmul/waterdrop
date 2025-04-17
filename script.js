import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCuDyKgkDVwptjsQ_sepxq2WylrQWd8ok",
  authDomain: "smkug-dd359.firebaseapp.com",
  databaseURL: "https://smkug-dd359-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smkug-dd359",
  storageBucket: "smkug-dd359.appspot.com",
  messagingSenderId: "16714972126",
  appId: "1:16714972126:web:fc40119945f5e0844d7b4f",
  measurementId: "G-CP8X2ZQ8XC"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const countRef = ref(db, "totalCount");

window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("물뿌버튼");
  const noticeAlready = document.getElementById("물다줬");
  const noticeSuccess = document.getElementById("성공알림");
  const waterSound = document.getElementById("waterSound");
  const timeImage = document.getElementById("timeImage");
  const dropArea = document.getElementById("물방울영역");

  const counter = document.createElement("div");
  counter.id = "totalCountDisplay";
  counter.style.position = "absolute";
  counter.style.top = "10px";
  counter.style.left = "12px";
  counter.style.fontSize = "30px";
  counter.style.zIndex = "99";
  counter.style.fontWeight = "bold";
  counter.style.color = "#a3dcff";
  document.querySelector(".card").appendChild(counter);

  onValue(countRef, (snapshot) => {
    const count = snapshot.val() ?? 0;
    counter.textContent = count;
  });

  function getTodayString() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }

  function updateTimeImage() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 9) {
      timeImage.src = "https://i.ibb.co/j9tjPRLR/image.png";
    } else if (hour >= 9 && hour < 17) {
      timeImage.src = "https://i.ibb.co/W40tb97w/image.png";
    } else if (hour >= 17 && hour < 20) {
      timeImage.src = "https://i.ibb.co/j9tjPRLR/image.png";
    } else {
      timeImage.src = "https://i.ibb.co/VpPc6gW0/image.png";
    }
  }

  function createDrop() {
    const drop = document.createElement("img");
    drop.src = "https://i.postimg.cc/dQWRcKBW/01.png";
    drop.className = "drop";
    dropArea.appendChild(drop);
    drop.addEventListener("animationend", () => drop.remove());
  }

  button.addEventListener("click", async () => {
    const lastClick = localStorage.getItem("LastClickDate");
    const today = getTodayString();

    createDrop();
    waterSound.play();

    if (lastClick !== today) {
      localStorage.setItem("LastClickDate", today);
      noticeSuccess.style.display = "block";
      setTimeout(() => {
        noticeSuccess.style.display = "none";
      }, 2000);

      const snapshot = await get(countRef);
      const current = snapshot.exists() ? snapshot.val() : 0;
      set(countRef, current + 1);
    } else {
      noticeAlready.style.display = "block";
      setTimeout(() => {
        noticeAlready.style.display = "none";
      }, 2000);
    }
  });

  updateTimeImage();
});
