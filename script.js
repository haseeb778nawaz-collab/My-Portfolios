// =============================
// MOBILE NAVIGATION
// =============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// =============================
// NAVBAR SCROLL EFFECT
// =============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});
/* =========================================
   INTERACTIVE 3D ID CARD
========================================= */

const card = document.getElementById("idCard");
const scene = document.getElementById("idScene");

let isDragging = false;

let startX = 0;
let startY = 0;

let currentX = 0;
let currentY = 0;

let rotateX = 0;
let rotateY = 0;


/* =========================================
   MOUSE MOVE 3D TILT
========================================= */

scene.addEventListener("mousemove", (event) => {

    if (isDragging) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;

    const y = event.clientY - rect.top;


    const centerX = rect.width / 2;

    const centerY = rect.height / 2;


    rotateY =
        ((x - centerX) / centerX) * 12;


    rotateX =
        ((centerY - y) / centerY) * 12;


    card.style.transform = `
        translate(${currentX}px, ${currentY}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
    `;


    card.style.boxShadow =
        `${-rotateY}px ${rotateX + 25}px 45px rgba(0,0,0,.22)`;

});


/* RESET CARD */

scene.addEventListener("mouseleave", () => {

    if (isDragging) return;

    card.style.transform = `
        translate(${currentX}px, ${currentY}px)
        rotateX(0deg)
        rotateY(0deg)
    `;

});


/* =========================================
   START DRAG
========================================= */

card.addEventListener("mousedown", (event) => {

    isDragging = true;

    startX = event.clientX - currentX;

    startY = event.clientY - currentY;

    card.style.transition = "none";

});


/* =========================================
   DRAGGING
========================================= */

window.addEventListener("mousemove", (event) => {

    if (!isDragging) return;

    currentX =
        event.clientX - startX;

    currentY =
        event.clientY - startY;


    card.style.transform = `
        translate(${currentX}px, ${currentY}px)
        rotateX(0deg)
        rotateY(0deg)
        rotateZ(${currentX * 0.03}deg)
    `;

});


/* =========================================
   RELEASE
========================================= */

window.addEventListener("mouseup", () => {

    if (!isDragging) return;

    isDragging = false;

    card.style.transition =
        "transform .25s ease, box-shadow .3s ease";

});


/* =========================================
   TOUCH SUPPORT
========================================= */

card.addEventListener("touchstart", (event) => {

    const touch = event.touches[0];

    isDragging = true;

    startX =
        touch.clientX - currentX;

    startY =
        touch.clientY - currentY;

    card.style.transition = "none";

});


window.addEventListener("touchmove", (event) => {

    if (!isDragging) return;

    const touch = event.touches[0];


    currentX =
        touch.clientX - startX;

    currentY =
        touch.clientY - startY;


    card.style.transform = `
        translate(${currentX}px, ${currentY}px)
        rotateZ(${currentX * 0.03}deg)
    `;

});


window.addEventListener("touchend", () => {

    isDragging = false;

    card.style.transition =
        "transform .25s ease";

});

// =============================
// ACTIVE NAVIGATION LINK
// =============================

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// =============================
// CONTACT FORM
// =============================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Create mailto link

    const subject = encodeURIComponent(
        "Portfolio Contact from " + name
    );

    const body = encodeURIComponent(
        "Name: " + name + "\n\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message
    );

    window.location.href =
        "mailto:haseeb778nawaz@gmail.com" +
        "?subject=" + subject +
        "&body=" + body;

    formMessage.textContent =
        "Opening your email application...";

    contactForm.reset();

});


// =============================
// SCROLL REVEAL ANIMATION
// =============================

const observerOptions = {

    threshold: 0.1

};


const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, observerOptions);


const animatedElements = document.querySelectorAll(

    ".skill-card, .timeline-item, .education-card, .certification-item"

);


animatedElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";

    observer.observe(element);

});
