


const elements:any = {
    selected : document.querySelector(".selected"),
    select : document.querySelector(".select"),
    grid : document.querySelector(".grid"),
    search : document.querySelector(".search") as HTMLInputElement,
    icon : document.querySelector(".icon"),
    
// for darkmode
    header : document.querySelector("header"),
    btn_mode : document.querySelector(".btn-mode"),
    body : document.querySelector("body"),
    text : document.querySelectorAll("[data-text]"),
    list : document.querySelector("[data-list]"),
    glass : document.querySelector("[glass]"),

}

// this is the selected btn



elements.selected.addEventListener("click" , ()=>{
    

    if(elements.icon.classList.contains("rotate-in")){
        elements.icon.classList.remove("rotate-in")
        elements.icon.classList.add("rotate-out")
    }
    else{
        elements.icon.classList.add("rotate-in")
        elements.icon.classList.remove("rotate-out")
    }   
    if(elements.select.classList.contains("open")) {
        elements.select.classList.add("close");
        elements.select.classList.remove("open");
    }
    else {
        elements.select.classList.add("open");
        elements.select.classList.remove("close");
    }

})

// Dark mode
if(localStorage.getItem("dark_mode")== null){

    localStorage.setItem("dark_mode" , "false")
}



elements.btn_mode.addEventListener("click" ,()=>{


    if(localStorage.getItem("dark_mode") == null){
        localStorage.setItem("dark_mode" , "false")
    }


    if(localStorage.getItem("dark_mode") == "false"){
        
        
        elements.body.classList.remove("dark-mode")
        elements.list.classList.remove("dark-mode")
        elements.glass.classList.remove("dark-mode_glass")
        elements.header.classList.remove("dark-mode")
        elements.search.classList.remove("dark-mode_input")
        elements.selected.classList.remove("dark-mode_elements")
        

        elements.text.forEach((element:any)=>{
            element.classList.remove("dark-mode_text")    
        })

    }
    else{
        elements.body.classList.add("dark-mode")
        elements.list.classList.add("dark-mode")
        elements.glass.classList.add("dark-mode_glass")
        elements.header.classList.add("dark-mode")
        elements.search.classList.add("dark-mode_input")
        elements.selected.classList.add("dark-mode_elements")

        elements.text.forEach((element:any)=>{
            element.classList.add("dark-mode_text")    
        })
    
    }


})

if(localStorage.getItem("dark_mode") == "true"){
    elements.body.classList.remove("dark-mode")
    elements.list.classList.remove("dark-mode")
    elements.glass.classList.remove("dark-mode_glass")
    elements.header.classList.remove("dark-mode")
    elements.search.classList.remove("dark-mode_input")
    elements.selected.classList.remove("dark-mode_elements")

    elements.text.forEach((element:any)=>{
        element.classList.remove("dark-mode_text")    
    })

}else{
    elements.body.classList.add("dark-mode")
    elements.list.classList.add("dark-mode")
    elements.glass.classList.add("dark-mode_glass")
    elements.header.classList.add("dark-mode")
    elements.search.classList.add("dark-mode_input")
    elements.selected.classList.add("dark-mode_elements")

    elements.text.forEach((element:any)=>{
        element.classList.add("dark-mode_text")    
    })

}


// fetching and displaying informations 

const getInfo = (url:string)=>{
    return new Promise((valid , unvalid) => {
        let myRequest = new XMLHttpRequest();
        myRequest.onload = function () {
            if(myRequest.readyState == 4 && myRequest.status == 200){
                valid(JSON.parse(this.responseText));

            }else{

                unvalid(Error(`Sorry this request did not go threw ready ${myRequest.readyState} and ${myRequest.status}`));

            }
        }
        myRequest.open("GET", url);
        myRequest.send();
    });

}

// API FETCHING DATA FOR REAL

getInfo("https://restcountries.com/v3.1/all")
    .then((result:any)=>{
        result.forEach((ele: any) => {
            if(!(ele.name.common == "Israel")){

                let grid_item = document.createElement("div")
                grid_item.setAttribute("grid-item" , "")
                grid_item.classList.add("grid_item")
                enum info {
                    name = ele.name.common,
                    flag = ele.flags.png,
                    population = ele.population,
                    region = ele.region,
                    capital = ele.capital,
                    
                }

                grid_item.innerHTML =`
                    <img class="grid_item_flags" src="${info.flag}" alt="${info.flag}">
                    <h3 class="grid_item_title grid_item_text" grid-text>${info.name}</h3>
                    <div class="grid_item_div">
                        <h4 class="grid_item_text" grid-text>Population:</h4>
                        <p class="grid_item_text" grid-text> ${info.population}</p>
                    </div>
                    <div class="grid_item_div">
                        <h4 class="grid_item_text" grid-text>Region:</h4>
                        <p class="grid_item_text" grid-text> ${info.region}</p>
                    </div>
                    <div class="grid_item_div">
                        <h4 class="grid_item_text" grid-text>Capital:</h4>
                        <p class="grid_item_text" grid-text> ${info.capital}</p>
                    </div>
                `;
                elements.grid.appendChild(grid_item);
            } 
        });
        return result;
    }).then((result:any) => {
        let option = document.querySelectorAll(".select__menu_option")
        
        
        option.forEach((ele)=> {
            
            ele.addEventListener("click",()=>{
                
                let value = ele.getAttribute("value")

                const grid_item = document.querySelectorAll("[grid-item]")
                
                
                
                grid_item.forEach((element:any)=>{

                    const region = element.childNodes[7].childNodes[3].textContent
                    
                    
                    console.log(region.includes(value));
                    
                    if(!region.includes(value)){
                        
                        
                        element.classList.add("hide")
                        // let items = document.createElement("div")
                        // items.setAttribute("grid-item", "")
                        // items.classList.add("grid_item")
                        // items.innerHTML = `
                        //     <img class="grid_item_flags " src="${info.flag}" alt="${info.flag}">
                        //     <h3 class="grid_item_title grid_item_text" grid-text>${info.name}</h3>
                        //     <div class="grid_item_div">
                        //         <h4 class="grid_item_text" grid-text>Population:</h4>
                        //         <p class="grid_item_text" grid-text> ${info.population}</p>
                        //     </div>
                        //     <div class="grid_item_div">
                        //         <h4 class="grid_item_text" grid-text>Region:</h4>
                        //         <p class="grid_item_text" grid-text > ${info.region}</p>
                        //     </div>
                        //     <div class="grid_item_div">
                        //         <h4 class="grid_item_text" grid-text>Capital:</h4>
                        //         <p class="grid_item_text" grid-text> ${info.capital}</p>
                        //     </div>
                        // `;
                        // elements.grid.appendChild(items)
                    
                    }else{
                        element.classList.remove("hide")
                    }

                })
            })
        })
    }) 
    .then(()=>{ // the Input thing

        elements.search.addEventListener("input",(e:any)=>{
            // ================= FIRST METHODE =====================
            // grid.innerHTML =""
            // result.forEach((element:any)=>{
            //     const target = e.target as HTMLInputElement;
            //     const value = target.value;
            //     console.log(value)
                
            //     if(element.name.common.includes(value) || element.region.includes(value)){
            //         // console.log(element.name.common)
            //         // let items = document.createElement("div")
            //         //     items.classList.add("grid_item")
                     
            //             // enum info {
            //             //     name = element.name.common,
            //             //     flag = element.flags.png,
            //             //     population = element.population,
            //             //     region = element.region,
            //             //     capital = element.capital
            //             // }

            //             // items.innerHTML = `
            //             //     <img src="${info.flag}" alt="${info.flag}">
            //             //     <h3 class="grid_item_title">${info.name}</h3>
            //             //     <div class="grid_item_text">
            //             //         <h5>Population:</h5><p> ${info.population}</p>
            //             //     </div class="grid_item_text">
            //             //     <div class="grid_item_text">
            //             //         <h5>Region:</h5><p> ${info.region}</p>
            //             //     </div>
            //             //     <div class="grid_item_text">
            //             //         <h5>Capital:</h5><p> ${info.capital}</p>
            //             //     </div>
            //             // `;
            //             // grid.appendChild(items)
            //     }
            // })
            //  ====================== BETTER METHODE ======================
            let grid_item = document.querySelectorAll("[grid-item]")
            
            grid_item.forEach(ele =>{
                const target = e.target as HTMLInputElement;
                const value = target.value.toUpperCase()
                const nome = ele.childNodes[3].textContent.toUpperCase()

                if(!nome.includes(value)){
                    ele.classList.add("hide")
                }else{
                    ele.classList.remove("hide")
                }
            })
        })            
    })
    .then(()=>{


        let theme:string = localStorage.getItem("dark_mode");
        const grid_item = document.querySelectorAll("[grid-item]")
        const grid_text = document.querySelectorAll("[grid-text]")
        console.log(grid_item , 1);
        
        
    
        elements.btn_mode.addEventListener("click" , ()=>{
            if(localStorage.getItem("dark_mode")== null){

                localStorage.setItem("dark_mode" , "false")
            }
            
            grid_item.forEach(element =>{
                if(theme == "false"){
                    element.classList.add("grid_item")
                    element.classList.remove("dark-mode_elements")
                }else{
                    element.classList.add("dark-mode_elements") 
                    element.classList.remove("grid_item")
                }
        
            })

            grid_text.forEach(element =>{
                if(theme == "false"){
                    element.classList.remove("dark-mode_text")
                }
                else{
                    element.classList.add("dark-mode_text")
                }
            })

            if(localStorage.getItem("dark_mode") == "true"){
                theme = "false";
            }
            else{
                theme = "true";
            }
            localStorage.setItem("dark_mode" , theme)
        })

        // grid back-ground
        grid_item.forEach(element =>{
            if(theme == "true"){
                element.classList.add("grid_item")
                element.classList.remove("dark-mode_elements") 
            }
            else{
                element.classList.add("dark-mode_elements")
                element.classList.remove("grid_item")
            }
        })

        // for grid text
        grid_text.forEach(element =>{
            if(theme == "true"){
                element.classList.remove("dark-mode_text")
            }
            else{
                element.classList.add("dark-mode_text")
            }
        })
        
        
    })    
    .catch((rej: Error)=> console.log(rej))


// Dark Mode please 




// $light-Text:hsl(200, 15%, 8%);
// $light-Input:hsl(0, 0%, 52%);
// $light-elements:hsl(0, 0%, 98%);
// $dark-Text:hsl(200, 15%, 8%);
// $dark-elements: hsl(209, 23%, 22%);
// $dark-background:hsl(207, 26%, 17%);

