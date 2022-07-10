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

button.addEventListener("click", shortenURL);

async function shortenURL(e) {
  e.preventDefault();
  if (input.value === "") {
    notificationPopUp();
  } else {
    result.innerHTML = `<span class="loader loader-active"></span>`;
    try {
      let data = await fetch(
        `https://short-link-api.vercel.app/?query=${input.value}`,
        {
          cors: true,
          origin: "*",
          "Access-Control-Allow-Origin": "*",
        }
      );
      data = await data.json();
      let url = data["da.gd"];
      writeData(url);
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
