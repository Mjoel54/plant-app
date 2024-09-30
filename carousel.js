async function fetchPlants() {
    try {
        const response = await fetch('https://perenual.com/api/species-list?key=sk-0DiM66f533d6706cc7011');
        
        if (response.status === 429) {
            console.error('Rate limit exceeded. Please wait and try again later.');
            return;
        }

        const data = await response.json();
        const plants = data.data ? data.data.slice(0, 9) : []; // Fetch 9 plants for the carousel

        const plantsContainer = document.getElementById('plants-container');
        
        // Loop through each plant and create a carousel item for each
        plants.forEach((plant, index) => {
            const plantDiv = document.createElement('div');
            plantDiv.classList.add('carousel-item');

            // Add 'active' class to the first item only
            if (index === 0) {
                plantDiv.classList.add('active');
            }

            // Create plant content (name and image)
            plantDiv.innerHTML = `
                <h1>${plant.common_name || 'Unknown'}</h1>
                <img src="${plant.default_image?.regular_url || 'fallback-image-url.jpg'}" alt="${plant.common_name || 'Unknown'}" class="plant-image">
            `;

            // Append the new item to the carousel
            plantsContainer.appendChild(plantDiv);

            // Add click event to store plant name and redirect on image click
            const plantImage = plantDiv.querySelector('img');
            plantImage.addEventListener('click', () => {
                localStorage.setItem('selectedPlant', plant.common_name);
                window.location.href = 'plantDetails.html';
            });
        });
    } catch (error) {
        console.error('Error fetching plants:', error);
    }
}

// Load plants when the page is loaded
window.onload = fetchPlants;
