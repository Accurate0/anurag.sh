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
    document.cookie = `current-theme=${theme}`;

    const themeSrc = themes.get(theme);
    sakura.href = themeSrc.css;
  },
  { once: false },
);

const switchTheme = () => {
  window.dispatchEvent(
    new CustomEvent(eventName, {
      detail: {
        theme:
          localStorage.getItem("current-theme") === "default"
            ? "dark"
            : "default",
      },
    }),
  );
};

window.onload = () => {
  document.getElementById("switch-theme").onclick = (e) => {
    switchTheme();
    e.preventDefault();
  };
};
