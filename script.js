const navLinks = document.querySelectorAll(".nav-links .nav-link");
const navIndicator = document.querySelector(".nav-indicator");
const activeLink = document.querySelector(".nav-links .active-nav");
const sections = document.querySelectorAll("#home, #about, #services, #contact");
const mobileNav = document.getElementById("mobile-nav");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");


function openMenu() {
    mobileNav.classList.remove("hidden");
    menuBtn.style.display = "none";
    closeBtn.classList.remove("hidden");
}

function closeMenu() {
    mobileNav.classList.add("hidden");
    closeBtn.classList.add("hidden");
    menuBtn.style.display = "flex";
}

function moveIndicator(link) {
    //Make indicator width 50% of the link width
    const indicatorWidth = link.offsetWidth * 0.5;
    navIndicator.style.width = `${indicatorWidth}px`;

    //Calculate the position that centers the indicator
    const linkCenter = link.offsetLeft + (link.offsetWidth - indicatorWidth) / 2;
    navIndicator.style.transform = `translateX(${linkCenter}px)`;
}

function setActiveLink() {
    navLinks.forEach(link => {
        link.addEventListener("click", () => {

            // Remove the "active-nav" class from all links
            navLinks.forEach(item => {
                item.classList.remove("active-nav");
            });

            // Add the "active-nav" class to the clicked link
            link.classList.add("active-nav");

            // Move the indicator to the clicked link
            moveIndicator(link);
        })
    })
    if (activeLink) {
        moveIndicator(activeLink);
    }
}

window,addEventListener("resize", () => {
    if (activeLink) {
        moveIndicator(activeLink);
    }
})

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentSectionId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove("active-nav");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active-nav");
                    moveIndicator(link);
                }
            })
        }
    })
},{
    rootMargin: "-20% 0px -70% 0px"
});

sections.forEach(section => {
    observer.observe(section);
})

