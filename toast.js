/* VanGo shared toast notification.
   Usage on any page: <script src="toast.js"></script> (before </body>)
   Then either:
     1) add data-toast="Message" to the primary action button, or
     2) call showToast("Message") from your own JavaScript.
   Needs the .toast-vango styles in style-additions.css and Bootstrap Icons. */

(function () {
    var toast = null;
    var messageEl = null;
    var timer = null;

    // Builds the toast element once, so pages don't need any toast HTML
    function build() {
        if (toast) return;

        toast = document.createElement("div");
        toast.className = "toast-vango";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        var icon = document.createElement("i");
        icon.className = "bi bi-check-circle-fill";

        messageEl = document.createElement("span");

        toast.appendChild(icon);
        toast.appendChild(messageEl);
        document.body.appendChild(toast);
    }

    window.showToast = function (message, duration) {
        build();
        messageEl.textContent = message;
        toast.classList.add("show");

        clearTimeout(timer);
        timer = setTimeout(function () {
            toast.classList.remove("show");
        }, duration || 3000);
    };

    // Any element with data-toast="..." shows that message when clicked
    document.addEventListener("click", function (event) {
        var trigger = event.target.closest("[data-toast]");
        if (trigger) {
            window.showToast(trigger.getAttribute("data-toast"));
        }
    });
})();
