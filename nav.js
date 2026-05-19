const triggers = document.querySelectorAll('.drawer-trigger');
const drawers = document.querySelectorAll('.drawer');

triggers.forEach((trigger, index) => {
    const drawer = drawers[index];

    trigger.addEventListener('mouseenter', () => {
        drawer.classList.add('show');
    });

    trigger.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!drawer.matches(':hover')) {
                drawer.classList.remove('show');
            }
        }, 100);
    });

    drawer.addEventListener('mouseleave', () => {
        drawer.classList.remove('show');
    });

    drawer.addEventListener('mouseenter', () => {
        drawer.classList.add('show');
    });
});

const nav = document.getElementById('navbar');
const navHoverElements = document.querySelectorAll('.nav-left a, .drawer, .drawer-wrapper');

navHoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        nav.classList.add('scrolled');
    });

    el.addEventListener('mouseleave', () => {
        if (window.scrollY < 80) {
            nav.classList.remove('scrolled');
        }
    });
});