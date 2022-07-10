export function installServiceWorker() {
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
}
