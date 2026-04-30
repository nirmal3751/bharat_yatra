/* ============================================================
   🚀 BHARAT YATRA - MASTER JAVASCRIPT LOGIC
   ============================================================ */

let cities = [];

// 1. Popular Cities IDs (Inhe wahi rehne do jo JSON mein hain)
const myPopularIds = [61, 97, 49, 101, 34, 92, 58, 89]; 

// 🟢 DATA FETCHING: JSON se data load karna
fetch("cities.json")
    .then(res => res.json())
    .then(data => {
        cities = data;
        showFeatured(cities); // Home page ke liye popular cities
        loadStates(cities);   // Filters ke liye states
        console.log("Data Loaded: Success");
    })
    .catch(err => console.error("JSON Load Error: Bhai cities.json check kar!", err));


// 🟢 NAVIGATION LOGIC (The Fix): Ye function sabse zaroori hai
function goCity(cityName) {
    if(!cityName) return;
    // URL mein City ka Name bhej rahe hain (id nahi)
    window.location.href = `city.html?city=${encodeURIComponent(cityName)}`;
}


// 🟢 SHOW CITIES: Search aur Filter ke baad cards dikhana
function showCities(data) {
    let container = document.getElementById("featuredCities");
    let html = "";
    
    if (data.length === 0) {
        container.innerHTML = "<h3 class='no-results'>No Cities Found! Try another search.</h3>";
        return;
    }

    data.forEach(city => {
        html += `
        <div class="city-card" onclick="goCity('${city.name}')" style="cursor:pointer;">
            <img src="${city.image}" loading="lazy" alt="${city.name}">
            <div class="city-info">
                <h3>${city.name}</h3>
                <p>${city.state} | ${city.category.toUpperCase()}</p>
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
    
    // Smooth scroll to results
    const popularSection = document.getElementById("popular");
    if(popularSection) popularSection.scrollIntoView({ behavior: 'smooth' });
}


// 🟢 SHOW FEATURED: Home page par limited popular cities dikhana
function showFeatured(data) {
    let popularData = data.filter(city => myPopularIds.includes(city.id));

    // Order maintain karna IDs ke hisab se
    popularData.sort((a, b) => myPopularIds.indexOf(a.id) - myPopularIds.indexOf(b.id));

    let html = "";
    popularData.forEach(city => {
        html += `
        <div class="city-card" onclick="goCity('${city.name}')" style="cursor:pointer;">
            <img src="${city.image}" loading="lazy" alt="${city.name}">
            <div class="city-info">
                <h3>${city.name}</h3>
                <p>${city.state}</p>
            </div>
        </div>
        `;
    });

    const container = document.getElementById("featuredCities");
    if(container) container.innerHTML = html;
}


// 🟢 FILTER LOGIC: State aur Category dropdown
function loadStates(data) {
    let states = [...new Set(data.map(c => c.state))];
    let options = `<option value="">All States</option>`;
    states.sort().forEach(state => {
        options += `<option value="${state}">${state}</option>`;
    });

    const stateFilter = document.getElementById("stateFilter");
    if(stateFilter) stateFilter.innerHTML = options;
}

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

function filterByCategory(cat) {
    const catFilter = document.getElementById("categoryFilter");
    if(catFilter) {
        catFilter.value = cat;
        applyFilters();
    }
}


// 🟢 SEARCH & SUGGESTIONS: Navbar wala search bar
let searchInput = document.getElementById("search");
let suggestions = document.getElementById("suggestions");

if(searchInput) {
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
            <div class="suggestion-item" onclick="goCity('${city.name}')">
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
}

// Search Button aur Enter Key logic
function goFirst() {
    let value = searchInput.value.toLowerCase().trim();
    if(!value) return;

    let city = cities.find(c => c.name.toLowerCase() === value);
    if (!city) {
        city = cities.find(c => c.name.toLowerCase().includes(value));
    }

    if (city) {
        goCity(city.name);
    } else {
        alert("Bhai, ye shehar hamari list mein nahi hai!");
    }
}

const searchBtn = document.getElementById("searchBtn");
if(searchBtn) searchBtn.addEventListener("click", goFirst);

// Close suggestions on outside click
document.addEventListener("click", (e) => {
    if (e.target !== searchInput && suggestions) {
        suggestions.style.display = "none";
    }
});
window.addEventListener("load", function() {
    const splash = document.getElementById('splash-screen');
    
    // 2 Second ka wait karega
    setTimeout(() => {
        // 1. Parda dhire-dhire gayab hoga
        splash.classList.add('fade-out');
        
        // 2. 0.5 second baad display none kar dega taaki home screen aa jaye
        setTimeout(() => {
            splash.style.display = 'none';
        }, 500);

    }, 2000); // 2000 matlab 2 second
});
