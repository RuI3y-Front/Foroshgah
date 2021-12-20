
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
        <img  src = "${coursInfo.imge}" max-width="100px">
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

// Meno Navbar

const menuBars:HTMLElement=document.getElementById('menu-bars');
const overlay:HTMLElement=document.getElementById('overlay');
const nav1:HTMLElement=document.getElementById('nav-1');
const nav2:HTMLElement=document.getElementById('nav-2');
const nav3:HTMLElement=document.getElementById('nav-3');
const nav4:HTMLElement=document.getElementById('nav-4');

function toggleNav():void{
  menuBars.classList.toggle('change');
  overlay.classList.toggle('overlay-active');
  if(overlay.classList.contains('overlay-active')){
    overlay.classList.remove('overlay-slide-left');
    overlay.classList.add('overlay-slide-right');

    //animate in nav-items
    nav1.classList.remove('slide-out-1')
    nav1.classList.add('slide-in-1')
    nav2.classList.remove('slide-out-2')
    nav2.classList.add('slide-in-2')
    nav3.classList.remove('slide-out-3')
    nav3.classList.add('slide-in-3')
    nav4.classList.remove('slide-out-4')
    nav4.classList.add('slide-in-4')
  }else{
    overlay.classList.remove('overlay-slide-right');
    overlay.classList.add('overlay-slide-left');

       // animate out - nav items
       nav1.classList.remove('slide-in-1')
       nav1.classList.add('slide-out-1')
       nav2.classList.remove('slide-in-2')
       nav2.classList.add('slide-out-2')
       nav3.classList.remove('slide-in-3')
       nav3.classList.add('slide-out-3')
       nav4.classList.remove('slide-in-4')
       nav4.classList.add('slide-out-4')
  }
}

menuBars.addEventListener('click',toggleNav);
nav1.addEventListener('click',toggleNav);
nav2.addEventListener('click',toggleNav);
nav3.addEventListener('click',toggleNav);
nav4.addEventListener('click',toggleNav);


//Theme Site
const toggleSwitch = document.querySelector('input[type="checkbox"]');

function switchTheme(event){
  if (event.target.checked){
    document.documentElement.setAttribute('data-theme','dark');
   
  } else{
    document.documentElement.setAttribute('data-theme','light');

  }
}

//Event Listener
toggleSwitch.addEventListener('change',switchTheme);


//Slider

let slideIndex:number = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n:number) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n:number) {
  showSlides(slideIndex = n);
}

function showSlides(n:number) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute('style',"display:none")
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].setAttribute('style',"display:block")
  dots[slideIndex-1].className += " active";
}