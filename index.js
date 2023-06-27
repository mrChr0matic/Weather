const image=document.querySelector(".image");
const temp=document.querySelector(".temp");
const descr=document.querySelector(".description");
const city_name=document.querySelector(".city-name");
const input_city=document.querySelector(".input-city");
const sub=document.querySelector(".submit");
const wind=document.querySelector(".wind");
const clouds=document.querySelector(".clouds");
const humidity=document.querySelector(".humidity");
const form=document.querySelector("#form");
const main_box=document.querySelector('.main-box');

var tempo="New Delhi";
weather();

form.addEventListener("submit",(e)=>{
   tempo=input_city.value;
   if(tempo.length==0){
      alert("Enter City to be Searched");
      return;
   }
   input_city.value="";
   city_name.innerHTML=tempo;
   weather();
   e.preventDefault();
});

function weather(){
   fetch('https://api.openweathermap.org/geo/1.0/direct?q='+tempo+'&appid=950ab1803732ab0b7a7ee86549b81a46')
   .then(res=>res.json())
   .then(res=>{
      const lat=res[0].lat;
      const lon=res[0].lon;
      fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=950ab1803732ab0b7a7ee86549b81a46'+'&units=metric')
      .then(response=>response.json())
      .then(response=>{
         console.log(response);
         temp.innerHTML=response.main.temp+'°';
         descr.innerHTML=response.weather[0].description;
         const icon=response.weather[0].icon;
         const imageURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
         image.src=imageURL;
         wind.innerHTML=response.wind.speed+' Km/h';
         clouds.innerHTML=response.clouds.all;
         humidity.innerHTML=response.main.humidity+' g/m³'; 
         photo();
      })
      .catch(()=>{
         alert("City Not Found ! Try again")
      })
   })
   .catch(()=>{
      alert("City Not Found ! Try again")
   }) 
}

function photo(){
   console.log(tempo);
   const query="https://api.unsplash.com/search/photos?query="
   const appid="&client_id=VvHIumtepHdQWB5mYRgFLw0-p0lvanlxUv-NZCw_5Fk";
   fetch(query+ tempo +appid)
   .then(response=>response.json())
   .then(response=>{
      console.log(response);
      var randnum=Math.floor(Math.random()*10);
      console.log(randnum);
      const bgURL=response.results[randnum].urls.raw;
      console.log(bgURL);
      document.getElementsByTagName('body')[0].style.backgroundImage= "url("+bgURL+")";
      document.getElementsByTagName('body')[0].style.backgroundPosition="10%";
   })
   .catch(()=>{
      document.getElementsByTagName('body')[0].style.backgroundImage= "url('images/01.jpg')";
      console.log("No Image")
   })
   return;
}
