const submitbtn = document.getElementById("submitbutton");
const search = document.getElementById("search");
const city_contname = document.getElementById("city_contname");
const temp = document.getElementById("temp");
const days = document.getElementById("days");
const date = document.getElementById("date");
const weathers = document.getElementById("weathers");


const getsubmitbtn = async (event) => {

            event.preventDefault();
            var searchVal = search.value;
            if (searchVal === "") {
                city_contname.innerText = `plese writebthe name before search`;
                temp.innerText = ` `;
                days.innerText = ` `;
                date.innerText = ` `;
            } else {
                try {
                    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=161c29adc3a6fe7686aa7e0d1b6d3481`;
                    const weatherdata = await fetch(url);
                    const obj = await weatherdata.json();
                    const data = [obj];
                    city_contname.innerHTML = data[0].name;
                    const temperature = data[0].main.temp;
                    const celctemp = temperature - 273.15;
                    temp.innerHTML = (Math.ceil(celctemp)+"^C");
                    var currDay = new Date();
                    const day = currDay.getDay();

                    const weekArray = ["sunday", "monday", "tuesday", "wednsday", "thrusday", "friday", "saturday"];
                    days.innerText = (weekArray[day]);
                    // switch(day){
                    //     case 0 : days.innerText = "sunday";
                    //     break;
                    //     case 1 : days.innerText = "monday";
                    //     break;
                    //     case 2 : days.innerText = "tuesday";
                    //     break;
                    //     case 3 : days.innerText = "wednsday";
                    //     break;
                    //     case 4 : days.innerText = "thrusday";
                    //     break;
                    //     case 5 : days.innerText = "friday";
                    //     break;
                    //     case 6 : days.innerText = "saturday";
                    //     break;
                    // }
                    var dates = new Date();
                    var newdate = dates.getUTCDate();
                    var newmonth = dates.getMonth();
                    var newyear = dates.getFullYear();
                    date.innerText = `${newdate}-${newmonth}-${newyear}`;
                    
                    const newweather = data[0].weather[0].main;

                    if (newweather  == "Clouds") {
                        weathers.innerHTML = '<i class="material-icons md-48">cloud</i>';
                    } else if (newweather  == "Clear") {
                        weathers.innerHTML = '<i class="material-icons-outlined">light_mode</i>';
                    } else if (newweather  == "Rain") {
                        weathers.innerHTML = '<span class="material-icons-outlined"> umbrella</span>';
                    } else {
                        weathers.innerHTML = '<i class="material-icons md-48">cloud</i>';
                    }

                } 
                catch (err) {
                        console.log(err);
                    }



            }
        }   

            submitbtn.addEventListener("click", getsubmitbtn);