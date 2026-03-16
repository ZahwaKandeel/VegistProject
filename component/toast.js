// toast messages

function ensureContainer() {
    if (!document.getElementById("toast-container")) {
        const container = document.createElement("div");
        container.id = "toast-container";
        container.className = "position-fixed bottom-0 end-0 p-3";
        container.style.zIndex = "1100";
        document.body.appendChild(container);
    }
    return document.getElementById("toast-container");
}

/**
 * Show a toast notification
 * @param {"success"|"error"|"warning"|"info"} type
 * @param {string} message
 * @param {number} duration - ms before auto-dismiss (default 3500)
 */
export function showToast(type = "success", message = "", duration = 3500) {
    const container = ensureContainer();

    const config = {
        success: { bg: "bg-success", icon: "fa-solid fa-circle-check" },
        error:   { bg: "bg-danger",  icon: "fa-solid fa-circle-xmark" },
        warning: { bg: "bg-warning", icon: "fa-solid fa-triangle-exclamation" },
        info:    { bg: "bg-primary", icon: "fa-solid fa-circle-info" },
    };

    const { bg, icon } = config[type] || config.info;
    const id = "toast-" + Date.now(); // unique ID per toast

    const toastEl = document.createElement("div");
    toastEl.id = id;
    toastEl.className = `toast align-items-center text-white ${bg} border-0 mb-2`;
    toastEl.setAttribute("role", "alert");
    toastEl.setAttribute("aria-live", "assertive");
    toastEl.setAttribute("aria-atomic", "true");

    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body d-flex align-items-center gap-2">
                <i class="${icon}"></i>
                <span>${message}</span>
            </div>
            <button
                type="button"
                class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close">
            </button>
        </div>
    `;

    container.appendChild(toastEl);

    const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: duration
    });

    toast.show();

    // Clean up DOM after toast hides
    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

/**
 * Show a modern confirmation dialog (replaces window.confirm())
 *
 * @param {string} message
 * @param {string} confirmText - confirm button label (default "Confirm")
 * @returns {Promise<boolean>} - resolves true if confirmed, false if cancelled
 */
export function showConfirm(message = "Are you sure?", confirmText = "Confirm") {
    return new Promise((resolve) => {
        const id = "confirm-modal-" + Date.now();

        const modalEl = document.createElement("div");
        modalEl.id = id;
        modalEl.className = "modal fade";
        modalEl.setAttribute("tabindex", "-1");
        modalEl.setAttribute("aria-hidden", "true");

        modalEl.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center py-4 px-4">
                        <i class="fa-solid fa-triangle-exclamation text-warning fa-2x mb-3 d-block"></i>
                        <p class="fs-6 mb-0">${message}</p>
                    </div>
                    <div class="modal-footer justify-content-center border-0 pt-0">
                        <button type="button" class="btn btn-secondary btn-cancel" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger btn-confirm">Yes, ${confirmText}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalEl);

        const modal = new bootstrap.Modal(modalEl, { backdrop: "static" });
        modal.show();

        // Confirm button → resolve true
        modalEl.querySelector(".btn-confirm").addEventListener("click", () => {
            modal.hide();
            resolve(true);
        });

        // Cancel / dismiss → resolve false
        modalEl.addEventListener("hidden.bs.modal", () => {
            resolve(false);
            modalEl.remove();
        });
    });
}