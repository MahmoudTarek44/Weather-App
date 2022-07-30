// Global Variables

/* 1- Web API url for calling data with 'zipCode' , personal 'apiKey' provided.
 * 2- Generating dynamic date with JS
 */

const apiKey = ",&appid=2cf44929c436daab6a88125961d513d0&units=imperial";
const URL = "http://api.openweathermap.org/data/2.5/weather?zip=";

let currentDate = new Date();
let formatedDate = `${
	currentDate.getMonth() + 1
}.${currentDate.getDate()}.${currentDate.getFullYear()}`;

console.log(formatedDate); // test

/* The client action process >>
 * 1- Main function for 'client action'
 * 2- collect user's inputs
 * 3- A chain of promises to excute the whole process according to the event
 */

document.getElementById("generate").addEventListener("click", clientAction);

function clientAction() {
	clientImpression = document.getElementById("feelings").value;
	var cityZip = document.getElementById("zip").value;

	if (cityZip) {
		requestProcess(cityZip)
			.then((data) => {
				storeData("/storeData", {
					Date: formatedDate,
					Temp: data.main.temp,
					city: data.name,
					Feelings: clientImpression,
				});
			})
			.then((data) => {
				displayData();
			});
	} else {
		alert("please enter zip code ..");
	}
}

// "GET" Route for requesting data from the API server:
async function requestProcess(cityZip) {
	try {
		const apiData = await fetch(URL + cityZip + apiKey);
		const convertedApiData = await apiData.json();
		console.log(convertedApiData); // test API response

		return convertedApiData;
	} catch (error) {
		console.log("Error: ", error);
	}
}

// "POST" Route for storing the data recieved from the API into local server:
async function storeData(url = "", apiResponse) {
	console.log(apiResponse);
	const savingData = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(apiResponse),
	});
	try {
		const convertSavedData = await savingData.json();

		return convertSavedData;
	} catch (error) {
		console.log("Error: ", error);
	}
}

// "GET" Route to get the stored date to update the UI:
async function displayData() {
	const callData = await fetch("/useData");
	try {
		const newData = await callData.json();
		console.log(newData); // test user input

		document.getElementById("temp").innerHTML =
			Math.round(newData.Temp) + "° Degrees";
		document.getElementById("content").innerHTML = newData.Feelings;
		document.getElementById("date").innerHTML = newData.Date;
		document.getElementById("city").innerHTML = newData.city;
	} catch (error) {
		console.log("Error: ", error);
	}
}
