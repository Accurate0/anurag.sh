const themes = new Map([
  [
    "default",
    {
      css: "/static/css/sakura.css",
    },
  ],
  [
    "dark",
    {
      css: "/static/css/sakura-dark.css",
    },
  ],
]);

const sakura = document.getElementById("sakura-css");
const eventName = "switch-theme";

window.addEventListener(
  eventName,
  (e) => {
    const theme = e.detail.theme;
    localStorage.setItem("current-theme", theme);
    const themeSrc = themes.get(theme);
    sakura.href = themeSrc.css;
  },
  { once: false },
);

const loadDefaultTheme = () => {
  const current = localStorage.getItem("current-theme");
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    current === null
  ) {
    window.dispatchEvent(
      new CustomEvent(eventName, { detail: { theme: "dark" } }),
    );
  } else {
    window.dispatchEvent(
      new CustomEvent(eventName, { detail: { theme: "default" } }),
    );
  }
};

const switchSakuraTheme = () => {
  if (localStorage.getItem("current-theme") === "default") {
    window.dispatchEvent(
      new CustomEvent(eventName, { detail: { theme: "dark" } }),
    );
  } else {
    window.dispatchEvent(
      new CustomEvent(eventName, { detail: { theme: "default" } }),
    );
  }
};

window.onload = () => {
  loadDefaultTheme();

  document.getElementById("switch-theme").onclick = (e) => {
    switchSakuraTheme();
    e.preventDefault();
  };
};
