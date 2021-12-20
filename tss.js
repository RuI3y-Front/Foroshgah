var courses = document.querySelector(".row");
var shopingCart = document.querySelector("#cart-content tbody");
eventListeners();
function eventListeners() {
    courses.addEventListener("click", buyCourse),
        shopingCart.addEventListener('click', removeCourse);
    document.addEventListener('DOMContentLoaded', showCoursOnload);
}
function buyCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains("add-to-cart")) {
        var cours = e.target.parentElement;
        getCourseInfo(cours);
    }
    else
        alert("این ایتم در دسترس نیست");
}
function getCourseInfo(cours) {
    var coursInfo = {
        imge: cours.querySelector(".thumb").src,
        title: cours.querySelector(".proje-name").textContent,
        price: cours.querySelector(".price").textContent,
        id: cours.querySelector("button").getAttribute("data-id")
    };
    addToCart(coursInfo);
}
function addToCart(coursInfo) {
    var row = document.createElement("tr");
    row.innerHTML = "\n    <tr>\n    <td>\n        <img  src = \"".concat(coursInfo.imge, "\" width=\"100px\">\n    </td>\n    <td>\n        ").concat(coursInfo.title, "\n    </td>\n    <td>\n        ").concat(coursInfo.price, "\n    </td>\n    <td class = \"remove\" style=\"width: 100px; height: 70px;\">\n    <a  class = \"remove\" href = \"#\" data-id =\"").concat(coursInfo.id, "\">X</a>\n</td> \n    \n</tr> \n    ");
    shopingCart.appendChild(row);
    svToLocalStorage(coursInfo);
}
function svToLocalStorage(coursInfo) {
    var courses = getFromsStorage();
    courses.push(coursInfo);
    localStorage.setItem('coursess', JSON.stringify(courses));
}
function getFromsStorage() {
    var courses;
    if (localStorage.getItem("coursess")) {
        courses = JSON.parse(localStorage.getItem("coursess"));
    }
    else {
        courses = [];
    }
    return courses;
}
// remove course from the DOM
function removeCourse(e) {
    var course, courseId;
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    // remove course from LS
    removeCourseLS(courseId);
}
function removeCourseLS(id) {
    var coursesLs = getFromsStorage();
    coursesLs.forEach(function (course, index) {
        if (course.id === id) {
            coursesLs.splice(index, 1);
        }
    });
    localStorage.setItem('coursess', JSON.stringify(coursesLs));
}
function showCoursOnload() {
    var coursesLS = getFromsStorage();
    coursesLS.forEach(function (coursInfo) {
        var row = document.createElement("tr");
        row.innerHTML = "\n    <tr>\n    <td>\n        <img  src = \"".concat(coursInfo.imge, "\" max-width=\"100px\">\n    </td>\n    <td>\n        ").concat(coursInfo.title, "\n    </td>\n    <td>\n        ").concat(coursInfo.price, "\n    </td>\n    <td>\n    <a class = \"remove\" href = \"#\" data-id =\"").concat(coursInfo.id, "\">X</a>\n</td> \n    \n</tr> \n    ");
        shopingCart.appendChild(row);
    });
}
// Meno Navbar
var menuBars = document.getElementById('menu-bars');
var overlay = document.getElementById('overlay');
var nav1 = document.getElementById('nav-1');
var nav2 = document.getElementById('nav-2');
var nav3 = document.getElementById('nav-3');
var nav4 = document.getElementById('nav-4');
function toggleNav() {
    menuBars.classList.toggle('change');
    overlay.classList.toggle('overlay-active');
    if (overlay.classList.contains('overlay-active')) {
        overlay.classList.remove('overlay-slide-left');
        overlay.classList.add('overlay-slide-right');
        //animate in nav-items
        nav1.classList.remove('slide-out-1');
        nav1.classList.add('slide-in-1');
        nav2.classList.remove('slide-out-2');
        nav2.classList.add('slide-in-2');
        nav3.classList.remove('slide-out-3');
        nav3.classList.add('slide-in-3');
        nav4.classList.remove('slide-out-4');
        nav4.classList.add('slide-in-4');
    }
    else {
        overlay.classList.remove('overlay-slide-right');
        overlay.classList.add('overlay-slide-left');
        // animate out - nav items
        nav1.classList.remove('slide-in-1');
        nav1.classList.add('slide-out-1');
        nav2.classList.remove('slide-in-2');
        nav2.classList.add('slide-out-2');
        nav3.classList.remove('slide-in-3');
        nav3.classList.add('slide-out-3');
        nav4.classList.remove('slide-in-4');
        nav4.classList.add('slide-out-4');
    }
}
menuBars.addEventListener('click', toggleNav);
nav1.addEventListener('click', toggleNav);
nav2.addEventListener('click', toggleNav);
nav3.addEventListener('click', toggleNav);
nav4.addEventListener('click', toggleNav);
//Theme Site
var toggleSwitch = document.querySelector('input[type="checkbox"]');
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
//Event Listener
toggleSwitch.addEventListener('change', switchTheme);
//Slider
var slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].setAttribute('style', "display:none");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].setAttribute('style', "display:block");
    dots[slideIndex - 1].className += " active";
}
