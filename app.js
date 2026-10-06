const translations = JSON.parse(document.querySelector("#translations").textContent);
const languageSelect = document.querySelector("#language-select");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

function setLanguage(language) {
    const copy = translations[language];
    if (!copy) return;

    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const value = copy[element.dataset.i18n];
        if (value !== undefined) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
        const value = copy[element.dataset.i18nHtml];
        if (value !== undefined) element.innerHTML = value;
    });
    document.title = copy["page.title"];
    languageSelect.value = language;
    languageSelect.setAttribute("aria-label", copy["language.label"]);
    menuToggle.setAttribute("aria-label", language === "uk" ? "Відкрити навігацію" : "Open navigation");
}

languageSelect.addEventListener("change", (event) => setLanguage(event.target.value));
menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
});
navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
    });
});

document.querySelector("#year").textContent = new Date().getFullYear();
setLanguage(languageSelect.value);
