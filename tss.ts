const courses:HTMLElement = document.querySelector(".row");
const shopingCart:HTMLElement = document.querySelector("#cart-content tbody");
eventListeners();
function eventListeners() {
  courses.addEventListener("click", buyCourse);
}

function buyCourse(e:any) {
   
  e.preventDefault();
  if (e.target.classList.contains("add-to-cart")) {
    const cours:HTMLElement = e.target.parentElement;
    getCourseInfo(cours);
    
  }else
  alert('این ایتم در دسترس نیست')
}
interface cursinf{
    imge:string,
    title:string,
    price:string
}
function getCourseInfo(cours) {
     debugger
  const coursInfo:cursinf = {
    imge: cours.querySelector(".thumb").src,
    title: cours.querySelector(".proje-name").textContent,
    price: cours.querySelector(".price").textContent,
  };

  addToCart(coursInfo);
}
function addToCart(coursInfo) {
  let row = document.createElement("tr");
  row.innerHTML = `
    <tr>
    <td>
        <img  src = "${coursInfo.imge}" width="100px">
    </td>
    <td>
        ${coursInfo.title}
    </td>
    <td>
        ${coursInfo.price}
    </td>
    
</tr> 
    `;
  shopingCart.appendChild(row);
}
