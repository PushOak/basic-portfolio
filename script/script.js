// Smooth scroll
const links = document.querySelectorAll('.nav-list li a');

for (link of links) {
    link.addEventListener('click', smoothScroll);
}

function smoothScroll(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    document.querySelector(href).scrollIntoView({
        behavior: "smooth",
    });
}

// Scroll back to top
const scrollBtn = document.querySelector(".top");
const rootEl = document.documentElement;

document.addEventListener("scroll", showBtn);
scrollBtn.addEventListener("click", scrollToTop);

function showBtn() {
    const scrollTotal = rootEl.scrollHeight - rootEl.clientHeight;
    if (rootEl.scrollTop / scrollTotal > 0.3) {
        scrollBtn.classList.add("show-btn");
    } else {
        scrollBtn.classList.remove("show-btn");
    }
}

function scrollToTop() {
    rootEl.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

// Change between skills tab
let tabLinks = document.getElementsByClassName('tab-links');
let tabContents = document.getElementsByClassName('tab-contents');

function openTab(tabName) {
    for (tabLink of tabLinks) {
        tabLink.classList.remove('active-link');
    }

    for (tabContent of tabContents) {
        tabContent.classList.remove('active-tab');
    }

    event.currentTarget.classList.add('active-link');
    document.getElementById(tabName).classList.add('active-tab');
}

// Form validation
const userName = document.getElementById('name');
const email = document.getElementById('email');
const msg = document.getElementById('message');
const form = document.getElementById('form');
const errorEl = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let messages = [];
    const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (userName.value === '' || userName.value == null) {
        messages.push('Name is Required');
    }

    if (!email.value.match(mailRegex)) {
        messages.push('Email required');
    } else {
        messages.push('Thank you, Your message was received');
    }

    if (msg.value === '' || msg.value == null) {
        messages.push('Message is required');
    }




    if (messages.length > 0) {
        e.preventDefault();
        errorEl.innerText = messages.join(', ')
    }
})