(function () {
    var dialog = null;
    var titleEl = null;
    var messageEl = null;
    var yesBtn = null;
    var onYes = null;

    // Builds the dialog once, so pages don't need any dialog HTML
    function build() {
        if (dialog) return;

        dialog = document.createElement("dialog");
        dialog.className = "confirm-vango";
        dialog.setAttribute("aria-labelledby", "confirm-title");
        dialog.setAttribute("aria-describedby", "confirm-message");

        var body = document.createElement("div");
        body.className = "confirm-body";

        titleEl = document.createElement("h2");
        titleEl.className = "confirm-title";
        titleEl.id = "confirm-title";

        messageEl = document.createElement("p");
        messageEl.className = "confirm-message";
        messageEl.id = "confirm-message";

        var actions = document.createElement("div");
        actions.className = "confirm-actions";

        yesBtn = document.createElement("button");
        yesBtn.type = "button";
        yesBtn.className = "confirm-btn confirm-yes";

        var cancelBtn = document.createElement("button");
        cancelBtn.type = "button";
        cancelBtn.className = "confirm-btn confirm-cancel";
        cancelBtn.textContent = "Cancel";
        cancelBtn.autofocus = true; // Enter key cancels by default, so it is never an accidental confirm

        actions.appendChild(yesBtn);
        actions.appendChild(cancelBtn);
        body.appendChild(titleEl);
        body.appendChild(messageEl);
        body.appendChild(actions);
        dialog.appendChild(body);
        document.body.appendChild(dialog);

        cancelBtn.addEventListener("click", function () {
            dialog.close();
        });

        yesBtn.addEventListener("click", function () {
            var action = onYes;
            dialog.close();
            if (action) action();
        });

        // Clicking the dark area outside the box closes it. Escape works by default.
        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) dialog.close();
        });
    }

    // options: { title, message, yesLabel, onConfirm }
    window.showConfirm = function (options) {
        build();
        titleEl.textContent = options.title || "Are you sure?";
        messageEl.textContent = options.message || "";
        yesBtn.textContent = options.yesLabel || "Yes";
        onYes = options.onConfirm || null;
        dialog.showModal();
    };

    // Any element with data-confirm-title opens the dialog instead of doing its normal action
    document.addEventListener("click", function (event) {
        var trigger = event.target.closest("[data-confirm-title]");
        if (!trigger) return;

        event.preventDefault(); // stops a link from navigating, or a button from submitting a form

        var href = trigger.getAttribute("data-confirm-href") || trigger.getAttribute("href");

        window.showConfirm({
            title: trigger.getAttribute("data-confirm-title"),
            message: trigger.getAttribute("data-confirm-message"),
            yesLabel: trigger.getAttribute("data-confirm-yes"),
            onConfirm: function () {
                if (href) {
                    window.location.href = href;
                } else if (trigger.form) {
                    trigger.form.submit();
                }
            }
        });
    });
})();
