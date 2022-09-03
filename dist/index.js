"use strict";
const selected = document.querySelector(".selected");
const selec = document.querySelector(".select");
const grid = document.querySelector(".grid");
const search = document.querySelector(".search");
const icon = document.querySelector(".icon");
selected.addEventListener("click", () => {
    if (icon.classList.contains("rotate-in")) {
        icon.classList.remove("rotate-in");
        icon.classList.add("rotate-out");
    }
    else {
        icon.classList.add("rotate-in");
        icon.classList.remove("rotate-out");
    }
    if (selec.classList.contains("open")) {
        selec.classList.add("close");
        selec.classList.remove("open");
    }
    else {
        selec.classList.add("open");
        selec.classList.remove("close");
    }
});
const getInfo = (url) => {
    return new Promise((valid, unvalid) => {
        let myRequest = new XMLHttpRequest();
        myRequest.onload = function () {
            if (myRequest.readyState == 4 && myRequest.status == 200) {
                valid(JSON.parse(this.responseText));
            }
            else {
                unvalid(Error(`Sorry this request did not go threw ready ${myRequest.readyState} and ${myRequest.status}`));
            }
        };
        myRequest.open("GET", url);
        myRequest.send();
    });
};
getInfo("https://restcountries.com/v3.1/all")
    .then((result) => {
    result.forEach((ele) => {
        let grid_item = document.createElement("div");
        grid_item.classList.add("grid_item");
        let info;
        (function (info) {
            info[info["name"] = ele.name.common] = "name";
            info[info["flag"] = ele.flags.png] = "flag";
            info[info["population"] = ele.population] = "population";
            info[info["region"] = ele.region] = "region";
            info[info["capital"] = ele.capital] = "capital";
        })(info || (info = {}));
        grid_item.innerHTML = `
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
}).then((result) => {
    let option = document.querySelectorAll(".select__menu_option");
    option.forEach((ele) => {
        ele.addEventListener("click", () => {
            grid.innerHTML = "";
            let value = ele.getAttribute("value");
            console.log(value);
            result.forEach((element) => {
                let info;
                (function (info) {
                    info[info["name"] = element.name.common] = "name";
                    info[info["flag"] = element.flags.png] = "flag";
                    info[info["population"] = element.population] = "population";
                    info[info["region"] = element.region] = "region";
                    info[info["capital"] = element.capital] = "capital";
                })(info || (info = {}));
                if (value == element.region) {
                    let items = document.createElement("div");
                    items.classList.add("grid_item");
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
                    grid.appendChild(items);
                }
            });
        });
    });
    return result;
})
    .then(() => {
    search.addEventListener("input", (e) => {
        const grid_item = document.querySelectorAll(".grid_item");
        grid_item.forEach(ele => {
            const target = e.target;
            const value = target.value;
            if (!ele.childNodes[3].textContent.includes(value)) {
                ele.classList.add("hide");
            }
            else {
                ele.classList.remove("hide");
            }
        });
    });
})
    .catch((rej) => console.log(rej));
localStorage.setItem("light-text", "hsl(200, 15%, 8%)");
localStorage.setItem("light-input", "hsl(0, 0%, 52%)");
localStorage.setItem("light-elements", "hsl(0, 0%, 98%)");
