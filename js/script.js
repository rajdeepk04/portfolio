/*=====================================
        MOBILE MENU
=====================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".menu-btn i");

if (window.emailjs) {
    window.emailjs.init({
        publicKey: "FhiPFP1HXGO_oicmc"
    });
}

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if(navLinks.classList.contains("active")){

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

    }else{

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    }

});


/*=====================================
    CLOSE MENU AFTER CLICK
=====================================*/

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    });

});


/*=====================================
        STICKY NAVBAR
=====================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});


/*=====================================
        ACTIVE NAVIGATION
=====================================*/

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;
        const height=section.offsetHeight;

        if(scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/*=====================================
        DARK MODE
=====================================*/

const themeBtn = document.querySelector(".theme-btn");
const themeIcon = document.querySelector(".theme-btn i");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }else{

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

});


/*=====================================
        SCROLL TO TOP
=====================================*/

const topBtn=document.createElement("button");

topBtn.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

topBtn.className="top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topBtn.classList.add("show");

    }else{

        topBtn.classList.remove("show");

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*=====================================
        AOS
=====================================*/

if (window.AOS) {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}
const contactForm = document.getElementById("contact-form") || document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");
const submitButton = contactForm?.querySelector("button[type='submit']");

function showFormStatus(message, type) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = `form-status show ${type}`;

    clearTimeout(showFormStatus.timeout);
    showFormStatus.timeout = setTimeout(() => {
        formStatus.classList.remove("show");
    }, 4000);
}

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!window.emailjs) {
            showFormStatus("⚠️ Email service is unavailable. Please try again later.", "error");
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        const templateParams = {
            from_name: this.elements.from_name?.value || "",
            from_email: this.elements.from_email?.value || "",
            subject: this.elements.subject?.value || "",
            message: this.elements.message?.value || "",
            user_name: this.elements.from_name?.value || "",
            user_email: this.elements.from_email?.value || "",
            user_subject: this.elements.subject?.value || "",
            user_message: this.elements.message?.value || "",
            reply_to: this.elements.from_email?.value || ""
        };

        emailjs.send(
            "service_3sb7gon",
            "template_0bud2wj",
            templateParams
        ).then(() => {
            showFormStatus("✅ Message sent successfully!", "success");
            this.reset();
        }).catch((error) => {
            console.error(error);
            showFormStatus("❌ Failed to send message. Please try again.", "error");
        }).finally(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }
        });
    });
}