document.addEventListener('DOMContentLoaded', function () {
    const locationButtons = document.querySelectorAll('.locationButton');
    const forecastContainer = document.getElementById('forecastContainer');
    let activeButton = null;

    // Function to display weather forecast
    function displayWeatherForecast(location) {

        // Remove the active class from the previous active button
        if (activeButton) {
            activeButton.classList.remove('active');
        }

        // Add the active class to the clicked button
        const clickedButton = document.querySelector(`[data-location="${location}"]`);
        clickedButton.classList.add('active');
        activeButton = clickedButton;

        // Use the WeatherAPI to fetch data
        const apiKey = '2f16f6241e794257a8e151828240601'; 
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Clear previous forecast data
                forecastContainer.innerHTML = '';

                // Display forecast data
                data.forecast.forecastday.forEach(day => {
                    const forecastCard = document.createElement('div');
                    forecastCard.className = 'forecastCard';

                    // Extract relevant data from the API response
                    const date = new Date(day.date);
                    const options = { weekday: 'long' };
                    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);

                    // Format the date
                    const options1 = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    };
                    const formattedDate = new Intl.DateTimeFormat('en-US', options1).format(date);

                    forecastCard.innerHTML = `
                        <b>${dayOfWeek}</b>
                        <p>${formattedDate}</p>
                        <b>${day.day.avgtemp_c} °C</b>
                        <p>${day.day.condition.text}</p>
                    `;

                    forecastContainer.appendChild(forecastCard);
                });
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Attach click event listeners to location buttons
    locationButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedLocation = this.dataset.location;
            displayWeatherForecast(selectedLocation);
        });
    });
});


