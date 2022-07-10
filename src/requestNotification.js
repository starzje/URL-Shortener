export function requestNotification() {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      randomNotification();
    }
  });
}

export function randomNotification() {
  const notifTitle = ["Hey!", "Hello!", "Hi!"];
  const notifBody = [
    "Be sure you are connected to the internet for this app to work properly.",
    "Sadly we are only able to handle 1 request per minute.",
    "If you like this app please consider supporting us.",
  ];
  const notifIcon = ["🍔", "🍕", "🍗"];
  const notifColor = ["#423EAF", "#FCBA06", "#ff0000"];
  const notifImage = ["./img/logo512.png"];
  const notifOptions = {
    body:
      notifIcon[Math.floor(Math.random() * notifIcon.length)] +
      notifBody[Math.floor(Math.random() * notifBody.length)],
    icon: notifImage[Math.floor(Math.random() * notifImage.length)],
    image: notifImage,
    vibrate: [100, 50, 100, 50, 100, 50, 100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      { action: "explore", title: "Explore this site", icon: "🚀" },
      { action: "close", title: "Close", icon: "✖" },
    ],
  };
  new Notification(
    notifTitle[Math.floor(Math.random() * notifTitle.length)],
    notifOptions,
    notifColor[Math.floor(Math.random() * notifColor.length)]
  );
  setTimeout(randomNotification, 10000);
}
