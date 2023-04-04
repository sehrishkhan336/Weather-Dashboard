# WEATHER DASHBOARD
The Weather Dashboard is a client-facing application that provides current and 5-day weather forecasts.
# FEATURES:
Following features are included in weather dashboard application:
 * Displays the current weather conditions for a user-specified location, including Temperature, Wind and Humidity.
 * Allows the user to search for the location by city name and provides the current weathe condition for that day and 5-day weather forecast which also includes temperature, wind and humidity.
 * Displays the 5-day forecast for the specified location with each days forecasts in a card.  Each card includes
    * Day and date of the week
    * Weather icon
    * Temperature
    * Wind
    * Humidity
 * Implementing dynamic styling for the weather icons based on the current weather conditions, including animations for sunny, rainy, cloudy, and night conditions.
 * Utilizing the OpenWeatherMap API to fetch weather data for the specified location.
 * Ability to save search history for previously searched locations and display them as clickable buttons for quick access.
 

# OBJECTIVES:
The objective of the Weather Dashboard application is to provide users with up-to-date and accurate weather information for their desired location, including the current weather and a 5-day forecast. Also, to provide users with a convenient and reliable tool to help them plan their daily activities based on the weather conditions.
## HTML
Bootstrap is a free and open-source CSS framework used for building responsive and mobile-first websites. It includes HTML and CSS-based design templates for typography, forms, buttons, navigation, and other interface components, as well as optional JavaScript extensions. It is used in this application to provide a sharper and cleaner code with ease of styling.
## CSS
Most of the styling is done in HTML using bootstrap however , icons and few classes are styled in CSS separately as well.
## JavaScript/JQuery
jQuery is used in this application to dynamically update the HTML content with weather data fetched from the OpenWeatherMap API. It is used to modify the DOM elements based on the data received from the API, such as updating the temperature, wind speed, and humidity values in the UI. jQuery is also used to make AJAX requests to the API and to handle events, such as the form submission to search for a new city. Overall, jQuery simplifies the process of writing JavaScript code for manipulating the DOM and making AJAX requests, making the application more efficient and easier to maintain.

# INSTALLATION:
Google Chrome is required to be installed in order to use this project. The project files should be downloaded and the 'index.html' file can be accessed and viewed directly within the browser. VS code is required to be installed in order to access the file to view and modify the code in HTML and CSS.

# USAGE:
The primary purpose of this application is to provide convenient access to current weather conditions and 5-day forecasts for a specified location, with the goal of improving the user experience.

# SCREENSHOT OF THE WEBSITE:
![alt text](./Images/Web%20capture_3-4-2023_23540_.jpeg)

# DEPENDENCIES:
This project depends on the use of external API to provide weather data: OpenWeatherMap API.
 * https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial
 * https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}
 * https://openweathermap.org/weather-conditions#Icon-list

# LICENSE:
This project is licensed under the MIT license. See the LICENSE.md file for more details.

# CONTACT INFORMATION:
If you have any questions or feedback about this project, you can contact the project owner [Sehrish Khan, contact information: sehrishkhan336@gmail.com].

# LINK TO Deployed Website:

# REFERENCES AND LINKS:
https://www.youtube.com/watch?v=QEu8_5bYm-w
https://www.youtube.com/watch?v=w0VEOghdMpQ
https://getbootstrap.com/docs/3.4/javascript/
Instructors Guidance
Slack BCs Learning assistance 

