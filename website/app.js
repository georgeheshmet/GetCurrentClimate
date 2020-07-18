/* Global Variables */

// Create a new date instance dynamically with JS
const fixed_weath_url="http://api.openweathermap.org/data/2.5/weather?zip=";
const weather_api_key="673a6f7a6ce5d02910ca7b64bf4de87e"
let d = new Date();

let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const get_data =async function getData(url){
  const res =await fetch(url);
  try{
       const data= res.json();
       return data;
  } catch(error){
      console.log("error",error);
  }
}

const post_data =async function postData(url,data){
    const res =await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
      });
    try{

    } catch(error){
        console.log("error",error);
    }
  }




const  button =document.getElementById("generate");
button.addEventListener("click",update_weather_info);

function update_weather_info()
{     
    /*getting zip code and user feeling from DOM*/
    const zipcode=document.getElementById("zip");
    const user_feeling=document.getElementById("feelings");
    /*debugging for checked conditions*/
    /*if zip code format and length is ok get weather data, post data to server and update UI*/
    if(Number.isInteger(parseInt((zipcode.value),10)) && (zipcode.value.length==5)){
        get_data(fixed_weath_url+zipcode.value+"&units=metric"+"&appid="+weather_api_key).then(function(data){
        post_data("/addWeathData",{Current_temp:data.main.temp+" C", date:newDate, UserFeeling:user_feeling.value}).then(updateUI);
        });
    }
    else{
        alert("Please enter a valid zip code");
    }
}

const updateUI =async function update_UI(){
    /*getting Date, temp, content from DOM*/
    const temp=document.getElementById("temp");
    const date=document.getElementById("date");
    const content=document.getElementById("content");
    /*getting last entry from server*/
    const res=await get_data("/GetLastEntry");
    try{
        temp.textContent= `Current temperature: ${res.Current_temp}`;
        date.textContent= `Date: ${res.date}`;
        content.textContent= `User input: ${res.UserFeeling}`;
    }
    catch(error){
        console.log("error",error);
    }
}