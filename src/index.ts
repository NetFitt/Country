


const selected = document.querySelector(".selected")
const selec = document.querySelector(".select")
const grid = document.querySelector(".grid")
const search = document.querySelector(".search") as HTMLInputElement
const icon = document.querySelector(".icon")

selected.addEventListener("click" , ()=>{
    if(icon.classList.contains("rotate-in")){
        icon.classList.remove("rotate-in")
        icon.classList.add("rotate-out")
    }
    else{
        icon.classList.add("rotate-in")
        icon.classList.remove("rotate-out")
    }
    
    

    if(selec.classList.contains("open")) {

        selec.classList.add("close");
        selec.classList.remove("open");
    }
    else {
        selec.classList.add("open");
        selec.classList.remove("close");
    }
})

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

getInfo("https://restcountries.com/v3.1/all")
    .then((result:any)=>{
        result.forEach((ele: any) => {
            let grid_item = document.createElement("div")
            grid_item.classList.add("grid_item")
            enum info {
                name = ele.name.common,
                flag = ele.flags.png,
                population = ele.population,
                region = ele.region,
                capital = ele.capital,
                
            }

            grid_item.innerHTML =`
                <img src="${info.flag}" alt="${info.flag}">
                <h3 class="grid_item_title">${info.name}</h3>
                <div class="grid_item_text">
                    <h5>Population:</h5><p> ${info.population}</p>
                </div class="grid_item_text">
                <div class="grid_item_text">
                    <h5>Region:</h5><p> ${info.region}</p>
                </div>
                <div class="grid_item_text">
                    <h5>Capital:</h5><p> ${info.capital}</p>
                </div>
            `;
            grid.appendChild(grid_item); 
        });
        return result;
    }).then((result:any) => {
        let option = document.querySelectorAll(".select__menu_option")
        
        
        option.forEach((ele)=> {
            
            ele.addEventListener("click",()=>{
                grid.innerHTML = "";
                let value = ele.getAttribute("value")
                console.log(value)
                
                result.forEach((element:any)=>{
                    enum info {
                        name = element.name.common,
                        flag = element.flags.png,
                        population = element.population,
                        region = element.region,
                        capital = element.capital
                    }

                    if(value == element.region){
                        let items = document.createElement("div")
                        items.classList.add("grid_item")
                        items.innerHTML = `
                            <img src="${info.flag}" alt="${info.flag}">
                            <h3 class="grid_item_title">${info.name}</h3>
                            <div class="grid_item_text">
                                <h5>Population:</h5><p> ${info.population}</p>
                            </div class="grid_item_text">
                            <div class="grid_item_text">
                                <h5>Region:</h5><p> ${info.region}</p>
                            </div>
                            <div class="grid_item_text">
                                <h5>Capital:</h5><p> ${info.capital}</p>
                            </div>
                        `;
                        grid.appendChild(items)
                    }
                })
            })
        })
        return result;
    }) 
    .then(()=>{ // the Input thing

        search.addEventListener("input",(e)=>{
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

            const grid_item = document.querySelectorAll(".grid_item")
            
            grid_item.forEach(ele =>{
                const target = e.target as HTMLInputElement;
                const value = target.value;
                if(!ele.childNodes[3].textContent.includes(value)){
                    ele.classList.add("hide")
                }else{
                    ele.classList.remove("hide")
                }
                
            })
        })            
    })
    .catch((rej: Error)=> console.log(rej))

// Dark Mode please 

localStorage.setItem("light-text" , "hsl(200, 15%, 8%)")
localStorage.setItem("light-input" , "hsl(0, 0%, 52%)")
localStorage.setItem("light-elements" , "hsl(0, 0%, 98%)")





// $light-Text:hsl(200, 15%, 8%);
// $light-Input:hsl(0, 0%, 52%);
// $light-elements:hsl(0, 0%, 98%);
// $dark-Text:hsl(200, 15%, 8%);
// $dark-elements: hsl(209, 23%, 22%);
// $dark-background:hsl(207, 26%, 17%);