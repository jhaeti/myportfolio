Notification.requestPermission((status) => {
  console.log("Notification permission status:", status);
});

const btn = document.querySelector(".menu-burger");
const menuNav = document.querySelector(".menu-nav");
const navContainer = document.querySelector(".menu-func");
const btnLines = document.querySelectorAll(".btn-line");
const navItems = document.querySelectorAll(".nav-items");
const notifyBtn = document.querySelector("#open");

let showMenu = true;

btn.addEventListener("click", () => {
  if (showMenu) {
    btn.classList.add("rotate");
    menuNav.classList.add("show");
    navContainer.classList.add("show");
    btnLines.forEach((line) => line.classList.add("show"));
    navItems.forEach((navItem) => navItem.classList.add("show"));
    showMenu = false;
  } else {
    btn.classList.remove("rotate");
    menuNav.classList.remove("show");
    navContainer.classList.remove("show");
    btnLines.forEach((line) => line.classList.remove("show"));
    navItems.forEach((navItem) => navItem.classList.remove("show"));
    showMenu = true;
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw_cache.js")
      .then(() => console.log("Serice Worker registered"));
  });
}

notifyBtn.addEventListener(
  "click",

  () => {
    displayNotification();
  }
);

function displayNotification() {
  if (Notification.permission == "granted") {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      var options = {
        body:
          "You can call or whatsapp me on the first contact in the contact page or email me to learn more about me. I will reach back to you in few minutes. Thanks for visiting.",
        icon: "img/smallpotrait.jpg",
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
      };
      reg.showNotification("Hi, From Alhassan Tijani", options);
    });
  }
}
