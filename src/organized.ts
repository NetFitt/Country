

const selected = document.querySelector(".selected")
const selec = document.querySelector(".select")
const grid = document.querySelector(".grid")

selected.addEventListener("click" , ()=>{
    if(selec.classList.contains("open")) {

        selec.classList.add("close");
        selec.classList.remove("open");
    }
    else {
        selec.classList.add("open");
        selec.classList.remove("close");
    }
})



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
            grid_item.innerHTML =`
                <img src="${ele.flags.png}" alt="${ele.flags.png}">
                <h3 class="grid_item_title">${ele.name.common}</h3>
                <div class="grid_item_text">
                    <h5>Population:</h5><p> ${ele.population}</p>
                </div class="grid_item_text">
                <div class="grid_item_text">
                    <h5>Region:</h5><p> ${ele.region}</p>
                </div>
                <div class="grid_item_text">
                    <h5>Capital:</h5><p> ${ele.capital}</p>
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
                    if(value == element.region){
                        let items = document.createElement("div")
                        items.classList.add("grid_item")
                     
                        enum info {
                            name = element.name.common,
                            flag = element.flags.png,
                            population = element.population,
                            region = element.region,
                            capital = element.capital
                        }

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
    })
    .catch((rej: Error)=> console.log(rej))
