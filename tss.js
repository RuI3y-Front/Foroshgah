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
        row.innerHTML = "\n    <tr>\n    <td>\n        <img  src = \"".concat(coursInfo.imge, "\" width=\"100px\">\n    </td>\n    <td>\n        ").concat(coursInfo.title, "\n    </td>\n    <td>\n        ").concat(coursInfo.price, "\n    </td>\n    <td>\n    <a class = \"remove\" href = \"#\" data-id =\"").concat(coursInfo.id, "\">X</a>\n</td> \n    \n</tr> \n    ");
        shopingCart.appendChild(row);
    });
}
