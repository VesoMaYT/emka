var confirmElement = document.querySelector(".confirm");

function closePage(){
  clearClassList();
}

function openPage(page){
  clearClassList();
  var classList = confirmElement.classList;
  classList.add("page_open");
  classList.add("page_" + page + "_open");
}

function clearClassList(){
  var classList = confirmElement.classList;
  classList.remove("page_open");
  classList.remove("page_1_open");
  classList.remove("page_2_open");
  classList.remove("page_3_open");
}

var time = document.getElementById("time");
var options = { year: 'numeric', month: 'numeric', day: '2-digit' };
var optionsTime = { second: 'numeric', minute: 'numeric', hour: '2-digit' };

if (localStorage.getItem("update") == null){
  localStorage.setItem("update", "24.12.2024")
}

var date = new Date();

var updateText = document.querySelector(".bottom_update_value");
updateText.innerHTML = localStorage.getItem("update");

var update = document.querySelector(".update");
update.addEventListener('click', () => {
  var newDate = date.toLocaleDateString("pl-PL", options);
  localStorage.setItem("update", newDate);
  updateText.innerHTML = newDate;

  scroll(0, 0)
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

setClock();
function setClock(){
    date = new Date();
    time.innerHTML = "Czas: " + date.toLocaleTimeString("pl-PL", optionsTime) + " " + date.toLocaleDateString("pl-PL", options);    
    delay(1000).then(() => {
        setClock();
    })
}

var unfold = document.querySelector(".info_holder");
unfold.addEventListener('click', () => {

  if (unfold.classList.contains("unfolded")){
    unfold.classList.remove("unfolded");
  }else{
    unfold.classList.add("unfolded");
  }

})

function getStorage() {
  try {
    return window.localStorage;
  } catch (error) {
    try {
      return window.sessionStorage;
    } catch (error) {
      return null;
    }
  }
}

function getCookieData() {
  try {
    const cookieValue = document.cookie.split("; ").find(row => row.startsWith("moby_id_data="));
    if (!cookieValue) return null;
    const value = cookieValue.split("=")[1];
    return JSON.parse(decodeURIComponent(value));
  } catch (error) {
    return null;
  }
}

function getSavedData() {
  const storage = getStorage();
  if (storage) {
    try {
      const stored = storage.getItem("moby_id_data");
      if (stored) {
        return JSON.parse(stored) || null;
      }
    } catch (error) {
      // continue to cookie fallback
    }
  }
  return getCookieData();
}

function saveData(data) {
  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem("moby_id_data", JSON.stringify(data));
    } catch (error) {
      // ignore storage errors
    }
  }
  try {
    const cookieData = Object.assign({}, data);
    delete cookieData.image;
    const value = encodeURIComponent(JSON.stringify(cookieData));
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `moby_id_data=${value}; max-age=${maxAge}; path=/; samesite=lax`;
  } catch (error) {
    // ignore cookie errors
  }
}

var data = {};
var params = new URLSearchParams(window.location.search);
for (var key of params.keys()){
  data[key] = params.get(key);
}

var savedData = getSavedData();
if (Object.keys(data).length === 0 && savedData) {
  data = savedData;
} else if (savedData) {
  data = Object.assign({}, savedData, data);
}

if (Object.keys(data).length !== 0) {
  saveData(data);
}

//document.querySelector(".id_own_image").style.backgroundImage = `url(${data['image']})`;

var birthdayRaw = data['birthday'] || "";
var birthday = "";
var day = 0;
var month = 0;
var year = 0;
var sex = data['sex'] || "";

if (birthdayRaw) {
  var birthdaySplit = birthdayRaw.split(".");
  day = parseInt(birthdaySplit[0]);
  month = parseInt(birthdaySplit[1]);
  year = parseInt(birthdaySplit[2]);

  var birthdayDate = new Date();
  birthdayDate.setDate(day);
  birthdayDate.setMonth(month - 1);
  birthdayDate.setFullYear(year);

  birthday = birthdayDate.toLocaleDateString("pl-PL", options);
}

if (sex === "m"){
  sex = "Mężczyzna"
}else if (sex === "k"){
  sex = "Kobieta"
} else {
  sex = "";
}

setData("name", (data['name'] || "").toUpperCase());
setData("surname", (data['surname'] || "").toUpperCase());
setData("nationality", (data['nationality'] || "").toUpperCase());
setData("birthday", birthday);
setData("familyName", data['familyName']);
setData("sex", sex);
setData("fathersFamilyName", data['fathersFamilyName']);
setData("mothersFamilyName", data['mothersFamilyName']);
setData("birthPlace", data['birthPlace']);
setData("countryOfBirth", data['countryOfBirth']);
setData("adress", "ul. " + (data['adress1'] || "") + "<br>" + (data['adress2'] || "") + " " + (data['city'] || ""));
setData("pesel", data['pesel']);

if (localStorage.getItem("homeDate") == null){
  var homeDay = getRandom(1, 25);
  var homeMonth = getRandom(0, 12);
  var homeYear = getRandom(2012, 2019);

  var homeDate = new Date();
  homeDate.setDate(homeDay);
  homeDate.setMonth(homeMonth);
  homeDate.setFullYear(homeYear)

  localStorage.setItem("homeDate", homeDate.toLocaleDateString("pl-PL", options))
}

document.querySelector(".home_date").innerHTML = localStorage.getItem("homeDate")

if (birthdayRaw && parseInt(year) >= 2000){
  month = 20 + month;
}

var later;

if (sex.toLowerCase() === "mężczyzna"){
  later = "0295"
}else{
  later = "0382"
}

if (birthdayRaw) {
  if (day < 10){
    day = "0" + day
  }

  if (month < 10){
    month = "0" + month
  }
}

var pesel = "";
if (birthdayRaw) {
  pesel = year.toString().substring(2) + month + day + later + "7";
}
//setData("pesel", pesel)

function setData(id, value){
  document.getElementById(id).innerHTML = value || "";
}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

const imageUrl = data.image || params.get('image');

if (imageUrl) {
    document.querySelector(".id_own_image").style.backgroundImage =
        `url('${imageUrl}')`;
}
