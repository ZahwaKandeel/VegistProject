import {header} from "./header.js"
import {footer} from "./footer.js"
$(function() {
    const htmlHeader = $("header");
    const htmlFooter = $("footer");

    if (htmlHeader.length) htmlHeader.replaceWith(header());
    if (htmlFooter.length) htmlFooter.replaceWith(footer());
});
