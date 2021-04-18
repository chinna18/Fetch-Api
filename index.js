var container = myElement('div','container jumbotron');
var row = myElement('div','row');
container.append(row);
document.body.append(container);

//fetch data from Rest countries

fetch('https://restcountries.eu/rest/v2/all')
 .then((response)=> {
	 return response.json()})
      .then((data)=>{
      data.forEach((obj)=>{
          var col = myElement('div','col-lg-4 col-sm-12 mb-4');
          var card = myElement('div','card text-center');
          card.setAttribute('style','background-color:gray')
          var cardheader = myElement('div','card-header');
          cardheader.setAttribute('style','background-color:black;color:white');
          var h6 = myElement('h6');
          h6.setAttribute('style','font-style:italic')
          h6.innerHTML = obj.name;
          cardheader.append(h6);
          var cardbody = myElement('div','card-body');
          var pimg = myElement('p','pimgclass');
          var img = myElement('img','img-fluid');
          img.setAttribute('style','display:block;height:200px;width:100%')
          img.setAttribute('src',obj.flag);
          pimg.append(img);
          var p1 = myElement('p','capital');
          p1.setAttribute('style','font-style:italic;color:white')
          p1.innerHTML = "Capital :"+" "+obj.capital;
          var p2 = myElement('p','region');
          p2.setAttribute('style','font-style:italic;color:white')
          p2.innerHTML = "Region :"+" "+obj.region;
          var p3 = myElement('p','countrycode');
          p3.setAttribute('style','font-style:italic;color:white')
          p3.innerHTML = "Country Code :"+" "+obj.cioc;
		  var p4 = myElement('p','countryweather');
          p4.setAttribute('style','font-style:italic;color:white');
          var pbtn = myElement('p');
          var btn = myElement('button','btn btn-outline-light');
          btn.setAttribute('style','font-style:italic;color:black')
          btn.innerHTML = 'Click for Weather';
		  
		  // On Button click fetch data from Openweather api for that particular country
		  
          btn.setAttribute('onclick','findWeather('+obj.latlng[0]+','+obj.latlng[1]+",'"+obj.name+"')");
          pbtn.append(btn);
          cardbody.append(pimg,p1,p2,p3,p4,pbtn);
          card.append(cardheader,cardbody);
          col.append(card);
          row.append(col);
      })
    }).catch((error)=>console.log(error));

// Find weather of country
function findWeather(a,b,c)
{
    var country = c;
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='+a+'&lon='+b+'&units=metric&appid=8ac2f5b4c0fc26a536b0fc262dc7549f')
          .then((response)=>{
              return response.json()})
            .then((weather)=>{
                console.log(weather);
               //p4.innerHTML = 'Weather :'+' '+obj.name+', '+weather.weather[0].main+' | '+weather.weather[0].description+', '+weather.main.temp+' °C';
               alert('Current Weather in '+c+' : '+weather.weather[0].main+' | '+weather.weather[0].description+', Temperature : '
               +weather.main.temp+' °C, Humidity : '+weather.main.humidity+'%, Wind : '+weather.wind.speed+' m/sec');
              })
             .catch((error)=>{
                 //p4.innerHTML = 'Unable to fetch Weather due to lack of Co-Ordinates';
                 alert('Current Weather in '+c+' '+'cannot be found due to lack of Co-Ordinates');
                 })
}
//creating html element through DOM
function myElement(elemName,elemClass='',elemId='')
{
    var elem = document.createElement(elemName);
    elem.setAttribute('class',elemClass);
    elem.setAttribute('id',elemId);
    return elem;
}
