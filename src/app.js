import { notificationPopUp } from "./notificationPopup.js"; // import notificationPopUp function which starts a popup toast when called
import { installServiceWorker } from "./installServiceWorker.js"; // service worker install function
import { options, encodedParams } from "./options.js"; // import options and encodedParams for API call
import {
  requestNotification,
  randomNotification,
} from "./requestNotification.js"; // notification permission request + random generated notification

// register service worker
installServiceWorker();

const button = document.querySelector("#button");
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const notificationButton = document.getElementById("push-button");

// event listeners
notificationButton.addEventListener("click", requestNotification); // request notification permission
button.addEventListener("click", shortenURL); // shorten URL when called

// shorten URL when called
async function shortenURL(e) {
  e.preventDefault();
  if (input.value === "") {
    notificationPopUp();
  } else {
    encodedParams.append("url", `https://${input.value}`);
    result.innerHTML = `<span class="loader loader-active"></span>`;
    try {
      let data = await fetch(
        "https://url-shortener-service.p.rapidapi.com/shorten",
        options
      );
      data = await data.json();
      let url = data.result_url;
      console.log(url);
      writeData(url);
      if (url === undefined) {
        result.innerHTML = `<p style="text-align:center">We can only handle 1 request per minute,<br> please try again later.</p>`;
      }
    } catch (error) {
      result.innerHTML = "ERROR. please try again.";
    }
  }
}

// write data to html
function writeData(url) {
  result.innerHTML = `<a target="_blank"href="${url}">${url}</a>`;
  randomNotification();
}
