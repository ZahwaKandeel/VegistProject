import {header, loadCategorires} from "./header.js"
import {footer, loadFooterCategorires} from "./footer.js"
$(function() {
    const htmlHeader = $("header");
    const htmlFooter = $("footer");

    if (htmlHeader.length) htmlHeader.replaceWith(header());
    if (htmlFooter.length) htmlFooter.replaceWith(footer());

    loadCategorires();
    loadFooterCategorires();
});
