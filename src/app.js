import { notificationPopUp } from "./src/notification.js";
import { registerServer } from "./src/serviceWorkerRegister.js";

registerServer();

const button = document.querySelector("#button");
const input = document.querySelector("#input");
const result = document.querySelector("#result");

button.addEventListener("click", shortenURL);

async function shortenURL(e) {
  e.preventDefault();
  if (input.value === "") {
    notificationPopUp();
  } else {
    result.innerHTML = `<span class="loader loader-active"></span>`;
    let data = await fetch(
      `https://short-link-api.vercel.app/?query=${input.value}`,
      { cors: true, origin: "*" }
    );
    data = await data.json();
    let url = data["da.gd"];
    writeData(url);
  }
}

function writeData(url) {
  result.innerHTML = `<a target="_blank"href="${url}">${url}</a>`;
}
