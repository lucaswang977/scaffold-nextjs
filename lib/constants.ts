const constants = {
  COOKIE_THEME_NAME: "x-local-theme",
  SCRIPT_FOR_THEME_AUTOSWITCH:
    "const mediaQueryListener = (e) => { if (e.matches) { document.documentElement.classList.add('dark') } else { document.documentElement.classList.remove('dark') } }; window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mediaQueryListener);",
}

export default constants
