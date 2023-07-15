
$(document).ready(function () {
    var searchFormEl = $("#city-search-form");
    var searchHistoryEl = $("#search-history");
    var cityNameElement = $('.city-info');
    var temperatureElement = $('.value span:first-of-type');
    var windSpeedElement = $('.value:nth-of-type(2) span');
    var humidityElement = $('.value:last-of-type span');
    var iconElement = $('.icon');
    var iconApi = "https://openweathermap.org/img/w/";
    var searchHistory = [];
    var forecastEl = $(".forecast-container");
    var weatherClassMap = {
        '01d': 'sunny',
        '02d': 'partly-cloudy',
        '03d': 'cloudy',
        '04d': 'cloudy',
        '09d': 'rainy',
        '10d': 'rainy',
        '11d': 'thunderstorm',
        '13d': 'snowy',
        '50d': 'mist',
        '01n': 'night',
        '02n': 'partly-cloudy-night',
        '03n': 'cloudy-night',
        '04n': 'cloudy-night',
        '09n': 'rainy-night',
        '10n': 'rainy-night',
        '11n': 'thunderstorm-night',
        '13n': 'snowy-night',
        '50n': 'mist-night'
    };

    var cityArray = [];
    function saveSearchHistory(city) {
        if (cityArray.indexOf(city) !== -1) {
            return;
        }
        cityArray.push(city)
        localStorage.setItem("search-history", JSON.stringify(cityArray));
        displayHistoryButton();
    }

    function displayHistoryButton() {
        var citySearch = $(".city-list");
        citySearch.empty();
        var storedHistory = localStorage.getItem("search-history");
        if (storedHistory) {
            cityArray = JSON.parse(storedHistory);
        }
        cityArray.forEach(function (city) {
            var btn = $("<button>");
            btn.text(city);
            btn.addClass("History")
            citySearch.append(btn);
        })
    }

    $(".city-list").on("click", function (event) {
        if (!event.target.matches(".History")) {
            return;
        }
        var cityName = event.target.textContent;
        // Get the current date and update the HTML element
        var currentDateEl = $('#current-date');
        var dateEl = dayjs().format('MM/DD/YYYY');
        currentDateEl.text(dateEl);
        //my date element isnt providing updated date
        console.log(currentDateEl);
        // An API to fetch the weather data for the city
        var apiKey = "06de102a53257d1289598a386f064bba";
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                dateEl.innerHTML = currentDateEl.val();
                // console.log(currentDateEl);
                // Update the weather data
                updateWeatherData(data);
                // Add the city to the search history
                // searchHistory.push(cityName);
                updateSearchHistory();
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                // for forecast
                // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
                var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

                fetch(forecastApiUrl)
                    .then(response => response.json())
                    .then(data => updateForecast(data, cityName));
                console.log(updateForecast);
            });
    })
    initHistoryButton();
    function initHistoryButton() {
        var storedHistory = localStorage.getItem("search-history");
        if (storedHistory) {
            cityArray = JSON.parse(storedHistory);
        }
        displayHistoryButton();
    }

    // Retrieve the value of the input field where the user enters the city name.
    searchFormEl.on("submit", function (event) {
        event.preventDefault();
        var cityName = $("#search-for-city").val();
        console.log(cityName);
        saveSearchHistory(cityName);
        // An API to fetch the weather data for the city
        var apiKey = "06de102a53257d1289598a386f064bba";
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;


        // Get the current date and update the HTML element
        var currentDateEl = $('#current-date');
        var dateEl = dayjs().format('MM/DD/YYYY');
        currentDateEl.text(dateEl);
        //my date element isnt providing updated date
        console.log(currentDateEl);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                dateEl.innerHTML = currentDateEl.val();
                console.log(currentDateEl);
                // Update the weather data
                updateWeatherData(data);

                // Clear the input area
                $("#search-for-city").val("");
                // Add the city to the search history
                searchHistory.push(cityName);
                updateSearchHistory();
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                // for forecast
                // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
                var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

                fetch(forecastApiUrl)
                    .then(response => response.json())
                    .then(data => updateForecast(data, cityName));
                console.log(updateForecast);
            });
    });


    // Declare the relevant information from the weather data
    function updateWeatherData(data) {
        cityNameElement.text(data.name);
        temperatureElement.text(Math.round(data.main.temp));
        windSpeedElement.text(data.wind.speed);
        humidityElement.text(data.main.humidity);
        iconElement.attr('src', iconApi + data.weather[0].icon + '.png');
        console.log(data);
        animateWeatherCondition(data);
        // Save the weather data to localStorage
        // localStorage.setItem("weatherData", JSON.stringify(data));
    }


    // Update the search history
    function updateSearchHistory() {
        // Get the search history from localStorage
        searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

        // Clear the search history
        searchHistoryEl.empty();

        // Loop through the search history array and create a list item for each city
        $.each(searchHistory, function (_index, city) {
            var listItem = $("<li>").text(city);
            searchHistoryEl.append(listItem);

            // Add click event handler to new search history item
            listItem.on("click", handleSearchHistoryClick);
        });
    }
    //update 5-day Forecast cards
    function updateForecast(data, cityName) {
        var apiKey = "06de102a53257d1289598a386f064bba";
        forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
        var forecastCardSelector = ".forecast-cards .card";

        var myData = [];
        for (var i = 6; i < data.list.length; i += 8) {
            myData.push(data.list[i]);
        }
        $(forecastCardSelector).each(function (i) {
            $(this).find(".card-header").empty();
            $(this).find("img").attr({
                "src": "",
                "alt": "",
                "width": "",
                "height": ""
            });
            $(this).find(".card-title").empty();
            $(this).find(".card-text").eq(0).empty();
            $(this).find(".card-text").eq(1).empty();
        });

        $(forecastCardSelector).each(function (i) {
            var day = myData[i];
            var iconCode = day.weather[0].icon;
            var iconEl = $(this).find("img");
            iconEl.attr({
                "src": "https://openweathermap.org/img/w/" + iconCode + ".png",
                "alt": "weather icon",
                "width": 40,
                "height": 40
            });
            var weatherClass = weatherClassMap[iconCode];
            if (weatherClass) {
                iconEl.addClass(weatherClass);
            }
            var date = dayjs.unix(day.dt).format('dddd MM/DD/YYYY');
            var headerEl = $(this).find(".card-header");
            var headerTextEl = document.createElement("div");
            headerTextEl.textContent = date;
            headerEl.append(headerTextEl);

            var iconCode = day.weather[0].icon;
            var temp = day.main.temp;
            var humidity = day.main.humidity;
            var windSpeed = day.wind.speed;

            var imgEl = $(this).find("img");
            imgEl.attr({
                "src": "https://openweathermap.org/img/w/" + iconCode + ".png",
                "alt": "weather icon",
                "width": 40,
                "height": 40
            });

            var titleEl = $(this).find(".card-title");
            titleEl.text("Temp: " + temp + "°F");

            var windEl = $(this).find(".card-text").eq(0);
            windEl.text("Wind: " + windSpeed + "mph");

            var humidityEl = $(this).find(".card-text").eq(1);
            humidityEl.text("Humidity: " + humidity + "%");
        });

        // Save the forecast data to localStorage
        // localStorage.setItem("forecastData", JSON.stringify(data));
    }

    // Function to handle click events on the search history list
    function handleSearchHistoryClick(_event) {
        var cityName = $(this).text();

        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Update the weather data
                updateWeatherData(data);

                // Add the city to the search history and save it to localStorage
                searchHistory.push(cityName);
                saveSearchHistory();

                // Update the search history
                updateSearchHistory();

                // Update the forecast data
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

                fetch(forecastApiUrl)
                    .then(response => response.json())
                    .then(data => updateForecast(data));
            });
    }

});
// Save search of the city to persist when reloading the page


function animateWeatherCondition(data) {
    var weatherCode = data.weather[0].icon;
    var animationContainer = $('body');
    var animationDelay = 5000;

    // Clear existing weather animations
    animationContainer.removeClass('sunny cloudy rainy stormy night');

    if (weatherCode.includes('01')) {
        // Sunny
        animationContainer.addClass('sunny');
    } else if (weatherCode.includes('02') || weatherCode.includes('03')) {
        // Cloudy
        animationContainer.addClass('cloudy');
    } else if (weatherCode.includes('04') || weatherCode.includes('09') || weatherCode.includes('10')) {
        // Rainy
        animationContainer.addClass('rainy');
    } else if (weatherCode.includes('11')) {
        // Stormy
        animationContainer.addClass('stormy');
    } else if (weatherCode.includes('13')) {
        // Snowy
        animationContainer.addClass('snowy');
    } else {
        // Default animation for unknown weather condition
        animationContainer.addClass('night');
    }

    // Shrink and expand animation
    animationContainer.find('.icon').addClass('animated pulse');

    // Reset animation after delay
    setTimeout(function () {
        animationContainer.removeClass('rainy snowy stormy sunny cloudy night');
        animationContainer.find('.icon').removeClass('animated pulse');
    }, animationDelay);
}

