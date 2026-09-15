const root = document.documentElement;
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-menu-panel");
const closeTriggers = [...document.querySelectorAll("[data-menu-close]")];
const zoomImages = [...document.querySelectorAll("[data-zoom-image]")];

if (menuToggle && menu) {
    const closeMenu = () => {
        root.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = root.classList.toggle("menu-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    closeTriggers.forEach((trigger) => {
        trigger.addEventListener("click", closeMenu);
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}

if (zoomImages.length > 0) {
    const updateZoom = () => {
        zoomImages.forEach((image) => {
            const frame = image.closest("[data-zoom-frame]");

            if (!frame) {
                return;
            }

            const rect = frame.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const progress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
            const scale = 1.18 - progress * 0.18;

            image.style.transform = `scale(${scale.toFixed(3)})`;
        });
    };

    updateZoom();
    window.addEventListener("scroll", updateZoom, { passive: true });
    window.addEventListener("resize", updateZoom);
}
