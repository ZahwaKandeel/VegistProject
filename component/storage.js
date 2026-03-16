// real time update for localStorage

const _setItem    = localStorage.setItem.bind(localStorage);
const _removeItem = localStorage.removeItem.bind(localStorage);
const _clear      = localStorage.clear.bind(localStorage);

localStorage.setItem = function(key, value) {
    _setItem(key, value);
    dispatch(key, value, "set");
};

localStorage.removeItem = function(key) {
    _removeItem(key);
    dispatch(key, null, "remove");
};

localStorage.clear = function() {
    _clear();
    dispatch(null, null, "clear");
};

function dispatch(key, value, action) {
    window.dispatchEvent(new CustomEvent("localStorageChange", {
        detail: { key, value, action }
    }));
}