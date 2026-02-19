// Detect base path dynamically

function getBasePath() {
    const path = window.location.pathname;

    // Remove file name => get folder path
    const depth = path.split("/").length - 2;

    let base = "";
    for (let i = 0; i < depth; i++) {
        base += "../";
    }

    return base;
}
