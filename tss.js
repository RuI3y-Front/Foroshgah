var courses = document.querySelector(".row");
var shopingCart = document.querySelector("#cart-content tbody");
eventListeners();
function eventListeners() {
    courses.addEventListener("click", buyCourse);
}
function buyCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains("add-to-cart")) {
        var cours = e.target.parentElement;
        getCourseInfo(cours);
    }
    else
        alert('این ایتم در دسترس نیست');
}
function getCourseInfo(cours) {
    debugger;
    var coursInfo = {
        imge: cours.querySelector(".thumb").src,
        title: cours.querySelector(".proje-name").textContent,
        price: cours.querySelector(".price").textContent
    };
    addToCart(coursInfo);
}
function addToCart(coursInfo) {
    var row = document.createElement("tr");
    row.innerHTML = "\n    <tr>\n    <td>\n        <img  src = \"".concat(coursInfo.imge, "\" width=\"100px\">\n    </td>\n    <td>\n        ").concat(coursInfo.title, "\n    </td>\n    <td>\n        ").concat(coursInfo.price, "\n    </td>\n    \n</tr> \n    ");
    shopingCart.appendChild(row);
}
