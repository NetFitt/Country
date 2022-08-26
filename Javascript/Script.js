
let btn = document.querySelector(".selected");
let select = document.querySelector(".select");

btn.addEventListener("click",()=>{
   if(select.classList.contains("open")){
        select.classList.add("close")
        select.classList.remove("open")

   }else{
        select.classList.add("open")
        select.classList.remove("close")
   }

});