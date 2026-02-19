$(document).ready(function() {
    const $header = $("header");
    const $footer = $("footer");

    if ($header.length) $header.replaceWith(header());
    if ($footer.length) $footer.replaceWith(footer());
});
