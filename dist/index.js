"use strict";
let btn = document.querySelector(".selected");
let select = document.querySelector(".select");
btn.addEventListener("click", () => {
    if (select.classList.contains("open")) {
        select.classList.add("close");
        select.classList.remove("open");
    }
    else {
        select.classList.add("open");
        select.classList.remove("close");
    }
});
const region = document.querySelectorAll(".select__menu_option");
const search = document.querySelector(".search");
const API = new XMLHttpRequest();
API.open("GET", "https://restcountries.com/v3.1/all");
API.send();
API.addEventListener("load", () => {
    const data = JSON.parse(API.responseText);
    const grid = document.querySelector(".grid");
    data.forEach((element) => {
        let img = element.flags.png;
        let name = element.name.common;
        let population = element.population;
        let region = element.region;
        let capital = element.capital;
        let country = document.createElement("div");
        country.classList.add("grid_item");
        country.innerHTML = `
          
               <img src="${img}" alt="${img}">
               <h3 class="grid_item_title">${name}</h3>
               <div class="grid_item_text">
                    <h5>Population:</h5><p> ${population}</p>
               </div class="grid_item_text">
               <div class="grid_item_text">
                    <h5>Region:</h5><p> ${region}</p>
               </div>
               <div class="grid_item_text">
                    <h5>Capital:</h5><p> ${capital}</p>
               </div>
          
          `;
        grid.appendChild(country);
        search.addEventListener("keyup", () => {
            let search_val = search.value;
            let patren = /[A-Z]/g;
            if (search_val === element.name.common) {
                country.innerHTML = `
                                        <img src="${img}" alt="${img}">
                                        <h3 class="grid_item_title">${name}</h3>
                                        <div class="grid_item_text">
                                             <h5>Population:</h5><p> ${population}</p>
                                        </div class="grid_item_text">
                                        <div class="grid_item_text">
                                             <h5>Region:</h5><p> ${region}</p>
                                        </div>
                                        <div class="grid_item_text">
                                             <h5>Capital:</h5><p> ${capital}</p>
                                        </div>
                                        `;
                grid.innerHTML = "";
                grid.appendChild(country);
            }
        });
    });
});
