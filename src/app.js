if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((registration) => {
      console.log("Service worker registered: ", registration);
    })
    .catch((err) => {
      console.log("Service worker registration failed: ", err);
    });
}

const button = document.querySelector("#button");
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const encodedParams = new URLSearchParams();

const options = {
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "cec857fbcamsha3388521cc606f7p1d86c4jsn0f427a07db6d",
    "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
  },
  body: encodedParams,
};

button.addEventListener("click", shortenURL);

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

function writeData(url) {
  result.innerHTML = `<a target="_blank"href="${url}">${url}</a>`;
}

function notificationPopUp() {
  const x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
