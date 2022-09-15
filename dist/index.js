"use strict";
const elements = {
    selected: document.querySelector(".selected"),
    select: document.querySelector(".select"),
    grid: document.querySelector(".grid"),
    search: document.querySelector(".search"),
    icon: document.querySelector(".icon"),
    header: document.querySelector("header"),
    btn_mode: document.querySelector(".btn-mode"),
    body: document.querySelector("body"),
    text: document.querySelectorAll("[data-text]"),
    list: document.querySelector("[data-list]"),
    glass: document.querySelector("[glass]"),
    all_items: document.querySelector(".all_countries"),
    country: document.querySelector(".country"),
    back: document.querySelector(".country_back"),
};
elements.selected.addEventListener("click", () => {
    if (elements.icon.classList.contains("rotate-in")) {
        elements.icon.classList.remove("rotate-in");
        elements.icon.classList.add("rotate-out");
    }
    else {
        elements.icon.classList.add("rotate-in");
        elements.icon.classList.remove("rotate-out");
    }
    if (elements.select.classList.contains("open")) {
        elements.select.classList.add("close");
        elements.select.classList.remove("open");
    }
    else {
        elements.select.classList.add("open");
        elements.select.classList.remove("close");
    }
});
if (localStorage.getItem("dark_mode") == null) {
    localStorage.setItem("dark_mode", "false");
}
elements.btn_mode.addEventListener("click", () => {
    if (localStorage.getItem("dark_mode") == null) {
        localStorage.setItem("dark_mode", "false");
    }
    if (localStorage.getItem("dark_mode") == "false") {
        elements.body.classList.remove("dark-mode");
        elements.list.classList.remove("dark-mode");
        elements.header.classList.remove("dark-mode");
        elements.back.classList.remove("dark-mode_elements");
        elements.glass.classList.remove("dark-mode_glass");
        elements.search.classList.remove("dark-mode_input");
        elements.selected.classList.remove("dark-mode_elements");
        elements.text.forEach((element) => {
            element.classList.remove("dark-mode_text");
        });
    }
    else {
        elements.body.classList.add("dark-mode");
        elements.list.classList.add("dark-mode");
        elements.glass.classList.add("dark-mode_glass");
        elements.header.classList.add("dark-mode");
        elements.search.classList.add("dark-mode_input");
        elements.selected.classList.add("dark-mode_elements");
        elements.back.classList.add("dark-mode_elements");
        elements.text.forEach((element) => {
            element.classList.add("dark-mode_text");
        });
    }
});
if (localStorage.getItem("dark_mode") == "true") {
    elements.body.classList.remove("dark-mode");
    elements.list.classList.remove("dark-mode");
    elements.glass.classList.remove("dark-mode_glass");
    elements.header.classList.remove("dark-mode");
    elements.search.classList.remove("dark-mode_input");
    elements.selected.classList.remove("dark-mode_elements");
    elements.back.classList.remove("dark-mode_elements");
    elements.text.forEach((element) => {
        element.classList.remove("dark-mode_text");
    });
}
else {
    elements.body.classList.add("dark-mode");
    elements.list.classList.add("dark-mode");
    elements.glass.classList.add("dark-mode_glass");
    elements.header.classList.add("dark-mode");
    elements.search.classList.add("dark-mode_input");
    elements.selected.classList.add("dark-mode_elements");
    elements.back.classList.add("dark-mode_elements");
    elements.text.forEach((element) => {
        element.classList.add("dark-mode_text");
    });
}
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
        if (!(ele.name.common == "Israel")) {
            let grid_item = document.createElement("div");
            grid_item.setAttribute("grid-item", "");
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
    let option = document.querySelectorAll(".select__menu_option");
    option.forEach((ele) => {
        ele.addEventListener("click", () => {
            let value = ele.getAttribute("value");
            const grid_item = document.querySelectorAll("[grid-item]");
            grid_item.forEach((element) => {
                const region = element.childNodes[7].childNodes[3].textContent;
                if (!element.classList.contains("hide")) {
                    if (!region.includes(value)) {
                        element.classList.add("hide-region");
                    }
                    else {
                        element.classList.remove("hide-region");
                    }
                }
            });
        });
    });
    elements.search.addEventListener("input", (e) => {
        const grid_item = document.querySelectorAll("[grid-item]");
        grid_item.forEach(ele => {
            const target = e.target;
            const value = target.value.toUpperCase();
            const nome = ele.childNodes[3].textContent.toUpperCase();
            if (!ele.classList.contains("hide-region")) {
                if (!nome.includes(value)) {
                    ele.classList.add("hide");
                }
                else {
                    ele.classList.remove("hide");
                }
            }
        });
    });
    const grid_item = document.querySelectorAll("[grid-item]");
    grid_item.forEach(element => {
        element.addEventListener("click", () => {
            elements.all_items.classList.add("hide");
            elements.country.classList.remove("hide");
            result.forEach((ele) => {
                if (element.childNodes[3].textContent == ele.name.common) {
                    const detail = document.createElement("div");
                    detail.classList.add("detail");
                    const info = {
                        name: ele.name.common,
                        native: ele.name.official,
                        flag: ele.flags.png,
                        population: ele.population,
                        region: ele.region,
                        capital: ele.capital,
                        sub_region: ele.subregion,
                        borders: [ele.borders],
                        lang: Object.values(ele.languages),
                        tld: ele.tld,
                    };
                    if (info.borders == undefined) {
                        info.borders.push("there is none");
                    }
                    let cur = ele.currencies;
                    let curr;
                    for (const val in cur) {
                        curr = cur[val].name;
                    }
                    detail.innerHTML = `

                            
                            <img class="detail_img" src="${info.flag}" alt="${info.name}">
                            <div class="detail_info">
                                <div class="detail_info_name">
                                    <h1 grid-text>${info.name}</h1>
                                    <p grid-text >Native Name: ${info.native}</p>
                                    <p grid-text >Population: ${info.population}</p>
                                    <p grid-text>Region: ${info.region} </p>
                                    <p grid-text>Sub Region: ${info.sub_region}</p>
                                    <p grid-text>Capital: ${info.capital}</p>
                                </div>

                                <div class="detail_info_more">
                                    <p grid-text>Top Level Domain: ${info.tld}</p>
                                    <p grid-text>Currencie: ${curr}</p>
                                    <p grid-text>languages: ${info.lang.map((ele) => { return ele; })}</p>
                                </div>
                                
                                <div class="detail_info_borders" ><p grid-text>Borders Countries:${info.borders.map((ele) => { return `<div class="detail_info_borders_border">${ele}</div>`; }).join('')}</p></div>
                            </div>
                            `;
                    elements.back.after(detail);
                    const text = document.querySelectorAll("[grid-text]");
                    text.forEach(element => {
                        if (theme == "true") {
                            element.classList.remove("dark-mode_text");
                        }
                        else {
                            element.classList.add("dark-mode_text");
                        }
                    });
                }
            });
        });
    });
    let theme = localStorage.getItem("dark_mode");
    const grid_text = document.querySelectorAll("[grid-text]");
    elements.btn_mode.addEventListener("click", () => {
        if (localStorage.getItem("dark_mode") == null) {
            localStorage.setItem("dark_mode", "false");
        }
        const grid_text = document.querySelectorAll("[grid-text]");
        grid_item.forEach(element => {
            if (theme == "false") {
                element.classList.add("grid_item");
                element.classList.remove("dark-mode_elements");
            }
            else {
                element.classList.add("dark-mode_elements");
                element.classList.remove("grid_item");
            }
        });
        grid_text.forEach(element => {
            if (theme == "false") {
                element.classList.remove("dark-mode_text");
            }
            else {
                element.classList.add("dark-mode_text");
            }
        });
        if (localStorage.getItem("dark_mode") == "true") {
            theme = "false";
        }
        else {
            theme = "true";
        }
        localStorage.setItem("dark_mode", theme);
    });
    grid_item.forEach(element => {
        if (theme == "true") {
            element.classList.remove("dark-mode_elements");
        }
        else {
            element.classList.add("dark-mode_elements");
        }
    });
    grid_text.forEach(element => {
        if (theme == "true") {
            element.classList.remove("dark-mode_text");
        }
        else {
            element.classList.add("dark-mode_text");
        }
    });
    elements.back.addEventListener("click", () => {
        const country_detail = document.querySelector(".detail");
        elements.all_items.classList.remove("hide");
        country_detail.innerHTML = "";
        elements.country.classList.add("hide");
    });
})
    .catch((rej) => console.log(rej));
