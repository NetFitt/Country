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
};
if (localStorage.getItem("dark_mode") == null) {
    localStorage.setItem("dark_mode", "false");
}
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
elements.btn_mode.addEventListener("click", () => {
    if (localStorage.getItem("dark_mode") == "false") {
        elements.body.classList.remove("dark-mode");
        elements.list.classList.remove("dark-mode");
        elements.glass.classList.remove("dark-mode_glass");
        elements.header.classList.remove("dark-mode");
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
    return result;
}).then((result) => {
    let option = document.querySelectorAll(".select__menu_option");
    option.forEach((ele) => {
        ele.addEventListener("click", () => {
            elements.grid.innerHTML = "";
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
                    items.setAttribute("grid-item", "");
                    items.classList.add("grid_item");
                    items.innerHTML = `
                            <img class="grid_item_flags " src="${info.flag}" alt="${info.flag}">
                            <h3 class="grid_item_title grid_item_text" grid-text>${info.name}</h3>
                            <div class="grid_item_div">
                                <h4 class="grid_item_text" grid-text>Population:</h4>
                                <p class="grid_item_text" grid-text> ${info.population}</p>
                            </div>
                            <div class="grid_item_div">
                                <h4 class="grid_item_text" grid-text>Region:</h4>
                                <p class="grid_item_text" grid-text > ${info.region}</p>
                            </div>
                            <div class="grid_item_div">
                                <h4 class="grid_item_text" grid-text>Capital:</h4>
                                <p class="grid_item_text" grid-text> ${info.capital}</p>
                            </div>
                        `;
                    elements.grid.appendChild(items);
                }
            });
        });
    });
    return result;
})
    .then(() => {
    elements.search.addEventListener("input", (e) => {
        let grid_item = document.querySelectorAll("[grid-item]");
        grid_item.forEach(ele => {
            const target = e.target;
            const value = target.value.toUpperCase();
            const nome = ele.childNodes[3].textContent.toUpperCase();
            if (!nome.includes(value)) {
                ele.classList.add("hide");
            }
            else {
                ele.classList.remove("hide");
            }
        });
    });
})
    .then(() => {
    let theme = localStorage.getItem("dark_mode");
    const grid_item = document.querySelectorAll("[grid-item]");
    const grid_text = document.querySelectorAll("[grid-text]");
    console.log(grid_item, 1);
    elements.btn_mode.addEventListener("click", () => {
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
            element.classList.add("grid_item");
            element.classList.remove("dark-mode_elements");
        }
        else {
            element.classList.add("dark-mode_elements");
            element.classList.remove("grid_item");
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
})
    .catch((rej) => console.log(rej));
