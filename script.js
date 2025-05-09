// Select DOM elements 
const searchBtn = document.getElementById('searchBtn');
const countryInput = document.getElementById('countryInput');
const countryInfo = document.getElementById('countryInfo');

// Add event listener for search button
searchBtn.addEventListener('click', () => {
    const countryName = countryInput.value.trim();

    if (countryName !== "") {
        fetchCountryData(countryName);
    } else {
        alert("Please enter a country name.");
    }
});

// Function to fetch country data from API
async function fetchCountryData(country) {
    // Clear previous data
    countryInfo.innerHTML = "";

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`);
        const data = await response.json();

        if (!response.ok || data.status === 404) {
            throw new Error("Country not found");
        }

        data.forEach(country => {
            const countryDetails = document.createElement('div');
            countryDetails.classList.add('country-card');

            // Extract currency info safely
            const currencyObj = country.currencies ? Object.values(country.currencies)[0] : null;
            const currencyName = currencyObj ? currencyObj.name : "N/A";
            const currencySymbol = currencyObj ? currencyObj.symbol : "";

            countryDetails.innerHTML = `
                <h2>${country.name.common}</h2>
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Currency:</strong> ${currencyName} ${currencySymbol}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
            `;
            countryInfo.appendChild(countryDetails);
        });

    } catch (error) {
        countryInfo.innerHTML = `<p class="error">Country cannot be found. Please try again.</p>`;
        console.error("Error fetching country data:", error);
    }
}
