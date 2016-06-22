/*
	Create Weather App that accomplishes the following:
	1. Show current location's weather
		a. Location
		b. Temperature
		c. Weather
	2. Different background dependant on weather
	3. Ability to toggle Celsius/Fahrenheit
*/


//When temperature button is pressed
$(".unit-button").click(function() {
	//convert temperature based on button that is clicked
	convertTemp($(this));

	//Add or remove active button class based on button click
	if ($(this).text() === "C" && !$(this).hasClass(".active-text")) {
		$(this).addClass("active-text");
		$(this).prev().removeClass("active-text");
	} else {
		$(this).addClass("active-text");
		$(this).next().removeClass("active-text");
	}
});

function convertTemp(btn) {
	var $temp = parseInt($("#temperature").text(), 10);
	//If current selection is pressed again nothing happens
	if (btn.hasClass("active-text")) {
	 	$temp = $temp;

	 	//If Celsius selection is pressed and isn't
	 	//currently selected, convert to Celsius
	 } else if (btn.text() === "C") {
	 	$temp = ($temp - 32) * 5/9;

	 	//If Fahrenheit selection is pressed and isn't
	 	//currently selected, convert to Celsius
	 } else {
	 	$temp = ($temp * 9/5) + 32;
	 }

	 $("#temperature").html(Math.round($temp) + "&deg");
}

function getWeather() {
	//Get browser location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			//Get coordinates
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			//Get coordinates URL from getURL function
			var coordinatesURL = setCoordinateURL(latitude, longitude);
			showWeather(coordinatesURL);
		}, function error(){
			alert("We were unable to retrieve your location information. Please ensure your device allows location information retrieval. Default weather location has been loaded.");
			var coordinatesURL = setCoordinateURL(40.748817, -73.985428);
			showWeather(coordinatesURL);
		});
	} else {
		alert("This browser does not support location-based applications. Please use a different browser.");
	}

	//Get API Key
	function getKey() {
		var apiKey = "fe68f1a0bc76d183";
		return apiKey;
	}

	//Get base API URL
	function getBaseAPI() {
		var apiURL = "https://api.wunderground.com/api/";
		return apiURL;
	}

	//Get location coordinates and 
	function setCoordinateURL(lat, lon) {
		var coordinatesURL = getBaseAPI() + getKey() + "/conditions/q/" + lat + "," + lon + ".json";
		return coordinatesURL;
	}	
}

//Get API weather components
function showWeather(url) {
	$.getJSON(url, function(json){
		var location = json.current_observation.display_location.city + ", " + json.current_observation.display_location.state;
		var temperature = Math.round(json.current_observation.temp_f) + "&deg;";
		var weatherDescription = json.current_observation.weather;
		var weatherIconURL = json.current_observation.icon_url;
		var secureWeatherIconURL = weatherIconURL.replace('http://', 'https://');
		var weatherBackground = setWeatherBackground(json.current_observation.weather.toUpperCase());
		var windSpeed = Math.round(json.current_observation.wind_mph);
		var windDirection = setWindDirection(Math.round(json.current_observation.wind_degrees));
		var humidity = json.current_observation.relative_humidity;
		//Build the HTML weather components
		buildHTML(location, temperature, weatherDescription, weatherBackground, secureWeatherIconURL, windSpeed, windDirection, humidity);
	});

	//Set background based on weather conditions
	function setWeatherBackground(weather) {
		var url = "";		
		switch (weather) {
			case "THUNDERSTORM":
			case "LIGHT THUNDERSTORM":
			case "HEAVY THUNDERSTORM":
			case "THUNDERSTORMS AND RAIN":
			case "LIGHT THUNDERSTORMS AND RAIN":
			case "HEAVY THUNDERSTORMS AND RAIN":
			case "THUNDERSTORMS AND SNOW":
			case "LIGHT THUNDERSTORMS AND SNOW":
			case "HEAVY THUNDERSTORMS AND SNOW":
			case "THUNDERSTORMS AND ICE PELLETS":
			case "LIGHT THUNDERSTORMS AND ICE PELLETS":
			case "HEAVY THUNDERSTORMS AND ICE PELLETS":
			case "THUNDERSTORMS WITH HAIL":
			case "LIGHT THUNDERSTORMS WITH HAIL":
			case "HEAVY THUNDERSTORMS WITH HAIL":
			case "THUNDERSTORMS WITH SMALL HAIL":
			case "LIGHT THUNDERSTORMS WITH SMALL HAIL":
			case "HEAVY THUNDERSTORMS WITH SMALL HAIL":
			case "SQUALLS":
				url = "images/thunderstorm.jpg";
				break;
			case "DRIZZLE":
			case "LIGHT DRIZZLE":
			case "HEAVY DRIZZLE":
			case "MIST":
			case "LIGHT MIST":
			case "HEAVY MIST":
			case "FREEZING DRIZZLE":
			case "LIGHT FREEZING DRIZZLE":
			case "HEAVY FREEZING DRIZZLE":
				url = "images/drizzle.jpg";
				break;
			case "RAIN":
			case "LIGHT RAIN":
			case "HEAVY RAIN":
			case "RAIN MIST":
			case "LIGHT RAIN MIST":
			case "HEAVY RAIN MIST":
			case "RAIN SHOWERS":
			case "LIGHT RAIN SHOWERS":
			case "HEAVY RAIN SHOWERS":
			case "FREEZING RAIN":
			case "LIGHT FREEZING RAIN":
			case "HEAVY FREEZING RAIN":
			case "UNKNOWN PRECIPITATION":
				url = "images/rain.jpg";
				alert(url);
				break;
			case "SNOW":
			case "LIGHT SNOW":
			case "HEAVY SNOW":
			case "SNOW GRAINS":
			case "LIGHT SNOW GRAINS":
			case "HEAVY SNOW GRAINS":
			case "ICE CRYSTALS":
			case "LIGHT ICE CRYSTALS":
			case "HEAVY ICE CRYSTALS":
			case "ICE PELLETS":
			case "LIGHT ICE PELLETS":
			case "HEAVY ICE PELLETS":
			case "HAIL":
			case "LIGHT HAIL":
			case "HEAVY HAIL":
			case "LOW DRIFTING SNOW":
			case "LIGHT LOW DRIFTING SNOW":
			case "HEAVY LOW DRIFTING SNOW":
			case "BLOWING SNOW":
			case "LIGHT BLOWING SNOW":
			case "HEAVY BLOWING SNOW":
			case "SNOW SHOWERS":
			case "LIGHT SNOW SHOWERS":
			case "HEAVY SNOW SHOWERS":
			case "HAIL SHOWERS":
			case "LIGHT HAIL SHOWERS":
			case "HEAVY HAIL SHOWERS":
			case "SMALL HAIL SHOWERS":
			case "LIGHT SMALL HAIL SHOWERS":
			case "HEAVY SMALL HAIL SHOWERS":
			case "SMALL HAIL":
				url = "images/snow.jpg";
				break;
			case "OVERCAST":
			case "PARTLY CLOUDY":
			case "MOSTLY CLOUDY":
			case "SCATTERED CLOUDS":
				url = "images/clouds.jpg";
				break;
			default:
				url = "images/snow-mountains-nature-summer-edited.jpg";
				break;
		}
		return url;
	}

	//Find wind direction based on degree
	function setWindDirection(degree) {
		var windDirection = 0;		
		//Reverse degree direction to demonstrate
		//where wind is blowing TO instead of where
		//it is blowing FROM
		if (degree < 180) {
			windDirection = degree + 180;
		} else {
			windDirection = degree - 180;
		}
		return windDirection;
	}

	//Build the HTML to output weather components
	function buildHTML(loc, temp, weatherDescription, weatherBackground, iconURL, windSpeed, windDirection, humidity) {	
		var iconHTML = "<img src=" + iconURL + " alt='weather icon'>";
		$("#location").html(loc);
		$("#weather-icon").html(iconHTML);
		$("#temperature").html(temp);
		$("#weather-description").html(weatherDescription);
		$("#wind-direction-icon").css("transform", "rotate(" + windDirection + "deg)");
		$("#wind-speed").html(windSpeed + " mph");
		$("#humidity").html(humidity);
		$("body").css("background", "url(" + weatherBackground + ") no-repeat center center");
	}
}

function getDateTime() {

	var today = new Date();

	showDate(today);
	showTime(today);

	//Use date object to show date
	function showDate(date) {
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var day = date.getDate();
		//Access months array through getMonth() method
		//Month returned corresponds to array
		var month = months[date.getMonth()];
		var year = date.getFullYear();
		var fullDate = month + " " + day + ", " + year;
		$("#date-time-container p:last-child").html(fullDate);
	}

	//Use date object to show time
	function showTime(date) {
		var am_pm = "AM";
		var hours = date.getHours();		
		var minutes = date.getMinutes();

		if (hours > 12) {
			hours -= 12;
			am_pm = "PM";
		}

		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		var fullTime = hours + ":" + minutes + " " + am_pm;
		$("#date-time-container p:first-child").html(fullTime);
	}
}

getWeather();
getDateTime();


































































