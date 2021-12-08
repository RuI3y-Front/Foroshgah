const courses: HTMLElement = document.querySelector(".row");
const shopingCart: HTMLElement = document.querySelector("#cart-content tbody");
eventListeners();
function eventListeners(): void {
  courses.addEventListener("click", buyCourse),
  shopingCart.addEventListener('click', removeCourse)

  document.addEventListener('DOMContentLoaded', showCoursOnload)

}

function buyCourse(e: any): void {
  e.preventDefault();
  if (e.target.classList.contains("add-to-cart")) {
    const cours: HTMLElement = e.target.parentElement;
    getCourseInfo(cours);
  } else alert("این ایتم در دسترس نیست");
}
interface cursinf {
  imge: string;
  title: string;
  price: string;
  id: number;
}
function getCourseInfo(cours:any) {
  let coursInfo: cursinf = {
    imge: cours.querySelector(".thumb").src,
    title: cours.querySelector(".proje-name").textContent,
    price: cours.querySelector(".price").textContent,
    id: cours.querySelector("button").getAttribute("data-id"),
  };

  addToCart(coursInfo);
}

function addToCart(coursInfo: cursinf) {
  let row: HTMLElement = document.createElement("tr");
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
    <td class = "remove" style="width: 100px; height: 70px;">
    <a  class = "remove" href = "#" data-id ="${coursInfo.id}">X</a>
</td> 
    
</tr> 
    `;
  shopingCart.appendChild(row);
  svToLocalStorage(coursInfo);
}

function svToLocalStorage(coursInfo:cursinf):void {
  let courses:any[] = getFromsStorage();
  courses.push(coursInfo);

  localStorage.setItem('coursess' ,JSON.stringify(courses));
}



function getFromsStorage():any[] {
  let courses:any[]
  if (localStorage.getItem("coursess")) {
    courses = JSON.parse(localStorage.getItem("coursess"));
  } else {
    courses = [];
  }
  return courses;
}
// remove course from the DOM
function removeCourse(e:any):void{
    let course:HTMLElement , courseId:string;
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove()
        course =  e.target.parentElement.parentElement
        courseId = course.querySelector('a').getAttribute('data-id')
    }
    // remove course from LS
    removeCourseLS(courseId)
}
function removeCourseLS (id:string){
    let coursesLs=getFromsStorage()
    coursesLs.forEach((course,index) =>{
        if (course.id ===id){
            coursesLs.splice(index,1)
        }
    })
    localStorage.setItem('coursess',JSON.stringify(coursesLs))
}




function showCoursOnload() {
  let coursesLS = getFromsStorage();

  coursesLS.forEach((coursInfo) => {
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
    <td>
    <a class = "remove" href = "#" data-id ="${coursInfo.id}">X</a>
</td> 
    
</tr> 
    `;
    shopingCart.appendChild(row);
  });
}
