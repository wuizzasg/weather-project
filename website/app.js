/* Global Variables */
const baseUrl = 'https://openweathermap.org/data/2.5/forecast?zip';
const apiKey = '&appid=4afbf40929e296b2ace135b50d9a25c1&units=imperial';
let zipCode;
// Async get function to retrieve API data succesfully
const getWeatherData = async (baseUrl, zip, key) => {
    const response = await fetch(baseUrl+zipCode+apiKey);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};
//Event listener function
document.getElementById('generate').addEventListener('click', generateAction );

function generateAction(e) {
    zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherData(baseUrl,zipCode,apiKey)

    .then(function(data){
    console.log(data)
    postData('/addData', {date: newDate, temp:data.main.temp, content: feelings});
    updateUI();
    });

};

const postData = async ( url = '', data = {})=>{
    console.log(data);

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

const updateUI = async () =>{
    const request = await fetch('/getData');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById("date").innerHTML = `date: ${allData[0].date}`
    document.getElementById('temp').innerHTML = `temp: ${allData[0].temp}`;
    document.getElementById('content').innerHTML = `feel:${alldata[0].content}`;
   
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
};
   




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

