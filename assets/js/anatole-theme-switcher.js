// initialize default value
function getTheme() {
    return localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
}

function setTheme(style) {
    document.documentElement.setAttribute('data-theme', style);
    setThemeColor();
    localStorage.setItem('theme', style);
}

function setThemeColor() {
    body = document.body;
    if (body === null) {
        return
    }
    bgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    document.querySelector('meta[name="theme-color"]').setAttribute("content", bgColor);
}

function init() {
    // initialize default value
    const theme = getTheme();
    // check if a preferred color theme is set for users that have never been to our site
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === null) {
        if (userPrefersDark) {
            setTheme('dark');
        } else if (!document.documentElement.getAttribute('data-theme')) {
            setTheme('light');
        } else {
            setTheme(document.documentElement.getAttribute('data-theme'));
        }
    } else {
        // load a stored theme
        if (theme === 'light') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }
}


// switch themes
function switchTheme() {
    const theme = getTheme();

    if (theme === 'light') {

        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Manual Switch
document.addEventListener('DOMContentLoaded', function () {
    const themeSwitcher = document.querySelector('.theme-switch');
    themeSwitcher.addEventListener('click', switchTheme, false);
}, false);

// Automatic Switching
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', switchTheme, false);

window.addEventListener("load", function (event) {
    setThemeColor();
}, false);

init();