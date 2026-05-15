function setLanguageCookie(langPath) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    document.cookie = `preferredLang=${langPath}; expires=${expiryDate.toUTCString()}; path=/`;
}

function getLanguageCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; preferredLang=`);
    if (parts.length == 2) return parts.pop().split(";").shift();
    return null;
}

function changeLanguage(url) {
    setLanguageCookie(url);
    window.location.href = url;
}