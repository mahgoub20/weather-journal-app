//Get the date
let d = new Date();
let newDate = d.toDateString();
/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = "&appid=28ddaa849e9a7b3fd248cf5aea9f7e24&units=metric";

// add event to generate button
document.getElementById('generate').addEventListener('click', button);

function button(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemperature(baseURL,zipCode,key)
    .then(function (data){
        // Add data to POST request
        postData('http://localhost:8080/addData', {temperature: data.main.temp, date: newDate, content: feelings } )
        // Function which updates UI
        .then(function() {
            updateUI()
        })
    })
}

// Async GET
const getTemperature = async (baseURL, code, key)=>{
// const getTemperatureDemo = async (url)=>{
    const response = await fetch(baseURL + code+ key)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        console.log('PIRMAS');
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

// post rout
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch('http://localhost:8080/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
        console.log('error', error);
    }
}