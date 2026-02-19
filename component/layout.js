// component/layout.js => runs the layout in every page (lacal - live - github.io)

$(function () {
    const base = window.location.origin.includes("github.io")
        ? "/" + window.location.pathname.split("/")[1]
        : "";

    $("body").prepend(header(base));
    $("body").append(footer(base));
});
