const themeToggleButton = document.getElementById('theme-toggle-button');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Apply the saved theme or the preferred scheme on initial load
function applyInitialTheme() {
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// Toggle theme function
function toggleTheme() {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Event listener for the button
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
}

// Listen for changes in OS color scheme preference
prefersDarkScheme.addEventListener('change', (e) => {
    // Only change if no theme is explicitly set by the user
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    }
});

// Apply theme on load
applyInitialTheme();

// Smooth scrolling and active link highlighting
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');
    const sections = [];

    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);
        if (section) {
            sections.push(section);
            link.addEventListener('click', function(e) {
                e.preventDefault();
                section.scrollIntoView({ behavior: 'smooth' });

                // Optionally, update active class immediately on click
                // navLinks.forEach(nav => nav.classList.remove('active'));
                // this.classList.add('active');
            });
        }
    });

    function highlightNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjust the offset if you have a fixed header or other elements
            const offset = 100; // Adjust this value as needed
            if (pageYOffset >= sectionTop - offset) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    // Initial highlight on load
    highlightNavLink();
});
