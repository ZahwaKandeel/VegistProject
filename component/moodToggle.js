$(function(){
    document.addEventListener("click", function (e) {
    if (e.target.id === "themeToggle") {
        let html = document.documentElement;
        let current = html.getAttribute("data-bs-theme");

        if (current === "dark") {
        html.setAttribute("data-bs-theme", "light");
        e.target.textContent = "🌙";
        } else {
        html.setAttribute("data-bs-theme", "dark");
        e.target.textContent = "☀️";
        }
    }
    });
})