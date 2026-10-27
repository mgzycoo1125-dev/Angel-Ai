// Global Function for Sidebar Toggle
function toggleSidebar(show) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (show) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-sidebar-btn');
    const openBtn = document.getElementById('open-sidebar-btn');
    const overlay = document.getElementById('sidebar-overlay');

    // Attach Event Listeners explicitly for both click and touchstart
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSidebar(false);
        });
        closeBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleSidebar(false);
        }, { passive: false });
    }

    if (openBtn) {
        openBtn.addEventListener('click', () => toggleSidebar(true));
    }

    if (overlay) {
        overlay.addEventListener('click', () => toggleSidebar(false));
    }
});