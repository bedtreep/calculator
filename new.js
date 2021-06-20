var monthPicker = document.getElementById("month");
var incomePicker = document.getElementById("income");
var submitButton = document.getElementById("submit");
var savedMoney = document.getElementById("saved-average");
var leftLiving = document.getElementById("left-living");
var averageTotal = document.getElementById("average-total");
var monthTotal = document.getElementById("month-total");
var totalSumUp = document.getElementById("total-sumup");
var warning = document.getElementById("warning");
var hoorey = document.getElementById("hoorey");
var buttonColor = "rgb(10, 2, 107)";
var darkMode = false;
var main = document.getElementsByClassName("main");
var header = document.getElementsByClassName("header");
var nightIcon = document.getElementById("dark");
var container = document.getElementById("total-container");

if(!localStorage.getItem("items")) {
	console.log("bye");
} else {
	console.log("sosi");
  setStyles();
}

function setStyles() {
	var newAverageTotal = localStorage.getItem("averageTotal");
	var newLeftLiving = localStorage.getItem("leftLiving");
	var newSavedMoney = localStorage.getItem("savedMoney");
	var newMonthTotal = localStorage.getItem("monthTotal");
	var newDarkMode = localStorage.getItem("darkModeStatus");

	leftLiving.innerHTML = newLeftLiving;
	savedMoney.innerHTML = newSavedMoney;
	monthTotal.innerHTML = newMonthTotal;
	averageTotal.innerHTML = newAverageTotal;

	if (newDarkMode == "true") {
		darkMode = false;}
		else if (newDarkMode == "false") {
			darkMode = true;
		}
	darkmodeEnable();

	if (parseInt(leftLiving.innerHTML,10) <= 7000) {
		warning.style.display="flex";
		hoorey.style.display="none";
	} else if (parseInt(leftLiving.innerHTML,10) >= 7000) {
		warning.style.display="none";
		hoorey.style.display="flex";
	}

}

function checkInputs () {
	if (monthPicker.value == "" || incomePicker.value == "") {
		submitButton.disabled = true;
		submitButton.style.background = "#d1d1d1";
		submitButton.style.cursor = "default";
	} else {
		submitButton.disabled = false;
		submitButton.style.background = buttonColor;
		submitButton.style.cursor = "pointer";
	}
}

function submitData (e) {
	monthTotal.innerHTML = parseInt(monthPicker.value, 10);
	averageTotal.innerHTML = parseInt(incomePicker.value, 10);
	localStorage.setItem("monthTotal", monthPicker.value);
  	localStorage.setItem("averageTotal", incomePicker.value);
	monthPicker.value = "1";
	incomePicker.value = "";
	checkInputs();
	e.preventDefault();
}

function calculations (e) {
	savedMoney.innerHTML
	var a = parseInt((localStorage.getItem("totalsum")/parseInt(monthPicker.value, 10))*100)/100;
	savedMoney.innerHTML = a;
	var b = parseInt(incomePicker.value, 10) - parseInt(savedMoney.innerHTML,10);
	leftLiving.innerHTML = b;
	localStorage.setItem("savedMoney", a);
  	localStorage.setItem("leftLiving", b);
	if (parseInt(leftLiving.innerHTML,10) <= 7000) {
		warning.style.display="flex";
		hoorey.style.display="none";
	} else {
		warning.style.display="none";
		hoorey.style.display="flex";
	}
}

function darkmodeEnable(){
	if (darkMode == false || darkMode == "false") {
		console.log("dark");
		main[0].style.background = "#121212";
		main[0].style.color = "white";
		monthPicker.style.color = "white";
		monthPicker.style.background = "#424242";
		incomePicker.style.color = "white";
		incomePicker.style.background = "#424242";
		buttonColor = "#08cf89";
		header[0].style.background="linear-gradient(-45deg, #ffd15c, #61d63d, #0062f7)"
		header[0].style.backgroundSize="400% 400%"
		container.style.background="#424242";
		darkMode = true;
		localStorage.setItem("darkModeStatus", darkMode);
	} else if (darkMode == true || darkMode == "true") {
		console.log("light");
		main[0].style.background = "white";
		main[0].style.color = "black";
		monthPicker.style.color = "black";
		monthPicker.style.background = "#f1f0f0";
		incomePicker.style.color = "black";
		incomePicker.style.background = "#f1f0f0";
		buttonColor = "rgb(10, 2, 107)";
		header[0].style.background="linear-gradient(-45deg, #291D98, #EC49E7, #FBBE62)"
		header[0].style.backgroundSize="400% 400%"
		container.style.background="#f1f0f0";
		darkMode = false;
		localStorage.setItem("darkModeStatus", darkMode);
	}
}


checkInputs();
monthPicker.onchange = checkInputs;
incomePicker.onchange = checkInputs;
nightIcon.addEventListener("click", darkmodeEnable);
submitButton.addEventListener("click", calculations);
submitButton.addEventListener("click", submitData);


