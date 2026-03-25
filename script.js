let cities = [];

// 1. Apni pasand ki Popular Cities ki IDs yahan set karo (Order wise)
const myPopularIds = [61, 97, 49, 101, 34, 92, 58, 89,]; 

// 🟢 DATA FETCHING
fetch("cities.json")
    .then(res => res.json())
    .then(data => {
        cities = data;
        showFeatured(cities);
        loadStates(cities);
    })
    .catch(err => console.error("JSON Load Error:", err));


// 🟢 SHOW CITIES (For Search & Filters)
function showCities(data) {
    let container = document.getElementById("featuredCities");
    let html = "";
    
    if (data.length === 0) {
        container.innerHTML = "<h3 class='no-results'>No Cities Found! Try another search.</h3>";
        return;
    }

    data.forEach(city => {
        html += `
        <a href="city.html?id=${city.id}" class="city-card">
            <img src="${city.image}" loading="lazy">
            <div class="city-info">
                <h3>${city.name}</h3>
                <p>${city.state} | ${city.category.toUpperCase()}</p>
            </div>
        </a>
        `;
    });

    container.innerHTML = html;

    document.getElementById("popular")
        .scrollIntoView({ behavior: 'smooth' });
}


// 🟢 SHOW POPULAR CITIES (WITH AUTO SCROLL)
function showFeatured(data) {

    let popularData = data.filter(city => myPopularIds.includes(city.id));

    popularData.sort(
        (a, b) => myPopularIds.indexOf(a.id) - myPopularIds.indexOf(b.id)
    );

    let html = "";

    popularData.forEach(city => {
        html += `
        <a href="city.html?id=${city.id}" class="city-card">
            <img src="${city.image}" loading="lazy">
            <div class="city-info">
                <h3>${city.name}</h3>
                <p>${city.state}</p>
            </div>
        </a>
        `;
    });

    const container = document.getElementById("featuredCities");
    container.innerHTML = html;

    // ⭐ AUTO SCROLL
    let autoScroll = 0;

    setInterval(() => {

        autoScroll += 180;

        if (autoScroll >= container.scrollWidth - container.clientWidth) {
            autoScroll = 0;
        }

        container.scrollTo({
            left: autoScroll,
            behavior: "smooth"
        });

    }, 2500);
}


// 🟢 DYNAMIC STATE FILTER OPTIONS
function loadStates(data) {
    let states = [...new Set(data.map(c => c.state))];

    let options = `<option value="">All States</option>`;

    states.sort().forEach(state => {
        options += `<option value="${state}">${state}</option>`;
    });

    document.getElementById("stateFilter").innerHTML = options;
}


// 🟢 FILTER LOGIC
function applyFilters() {

    let stateVal = document.getElementById("stateFilter").value;
    let catVal = document.getElementById("categoryFilter").value;

    let filtered = cities.filter(city => {

        let stateMatch = stateVal === "" || city.state === stateVal;
        let catMatch = catVal === "" || city.category === catVal;

        return stateMatch && catMatch;

    });

    showCities(filtered);
}


// 🟢 CATEGORY CLICK
function filterByCategory(cat) {

    document.getElementById("categoryFilter").value = cat;

    applyFilters();
}


// 🟢 SEARCH SUGGESTIONS
let searchInput = document.getElementById("search");
let suggestions = document.getElementById("suggestions");

searchInput.addEventListener("input", function() {

    let value = this.value.toLowerCase().trim();

    if (value.length < 1) {
        suggestions.innerHTML = "";
        suggestions.style.display = "none";
        return;
    }

    let filtered = cities.filter(city => 
        city.name.toLowerCase().startsWith(value) || 
        city.state.toLowerCase().includes(value)
    );

    let html = "";

    filtered.slice(0, 6).forEach(city => {
        html += `
        <div class="suggestion-item" onclick="goCity(${city.id})">
            <span>${city.name}</span> 
            <small>${city.state}</small>
        </div>
        `;
    });
    
    if(html) {
        suggestions.innerHTML = html;
        suggestions.style.display = "block";
    } else {
        suggestions.style.display = "none";
    }
});


// 🟢 NAVIGATION
function goCity(id) {
    window.location.href = "city.html?id=" + id;
}


document.getElementById("searchBtn")
.addEventListener("click", goFirst);


function goFirst() {

    let value = searchInput.value.toLowerCase().trim();

    if(!value) return;

    let city = cities.find(
        c => c.name.toLowerCase() === value
    );

    if (!city) {
        city = cities.find(
            c => c.name.toLowerCase().includes(value)
        );
    }

    if (city) {
        goCity(city.id);
    } else {
        alert("Bhai, ye city list mein nahi hai.");
    }
}


// Close suggestions
document.addEventListener("click", (e) => {
    if (e.target !== searchInput) {
        suggestions.style.display = "none";
    }
});