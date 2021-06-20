var items = [];
var sum = document.getElementById("sum");
var list = document.getElementById("list");
var itemName = document.getElementById("item_name");
var amount = document.getElementById("amount");
var accept = document.getElementById("accept");
var i=0;
var totalAmount = 0;
var integer;
var listItems = document.getElementsByTagName('li');
var clear = document.getElementsByClassName("clear");
var main = document.getElementsByClassName("main");
var buttonColor = "rgb(10, 2, 107)";
var nightIcon = document.getElementById("dark");
var darkMode = false;
var header = document.getElementsByClassName("header");

if(!localStorage.getItem("items")) {
	console.log("bye");
  populateStorage();
} else {
	console.log("sosi");
  setStyles();
}

function populateStorage() {
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("totalsum", totalAmount);
  localStorage.setItem("listsOfItems", document.getElementsByTagName("ul")[0].innerHTML);
  
  setStyles();
}

function setStyles() {
	var newitems = JSON.parse(localStorage.getItem("items"));
	var newtotalAmount = localStorage.getItem("totalsum");
	var newList = localStorage.getItem("listsOfItems");
	var newDarkMode = localStorage.getItem("darkModeStatus");

	while( list.firstChild ){
  list.removeChild( list.firstChild );
}

/*	for (var k = 0; k <newitems.length; k++) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(newitems[k].join(" - ") + "₴"));
		list.appendChild(li);
	}
	
	if (darkMode == true || darkMode == "true") {
		console.log("dark");
		main[0].style.background = "#121212";
		main[0].style.color = "white";
		amount.style.color = "white";
		amount.style.background = "#424242";
		itemName.style.color = "white";
		itemName.style.background = "#424242";
		list.style.background = "#424242";
		buttonColor = "#35afbd";
		nightIcon[0].style.color = "white";	
		header[0].style.background="linear-gradient(-45deg, #ffd15c, #61d63d, #0062f7)"
		header[0].style.backgroundSize="400% 400%"
	} else if (darkMode == false || darkMode == "false") {
		console.log("light");
		main[0].style.background = "white";
		main[0].style.color = "black";
		amount.style.color = "black";
		amount.style.background = "#f1f0f0";
		itemName.style.color = "black";
		itemName.style.background = "#f1f0f0";
		list.style.background = "#f1f0f0";
		buttonColor = "rgb(10, 2, 107)";
		nightIcon[0].style.color = "black";	
		header[0].style.background="linear-gradient(-45deg, #291D98, #EC49E7, #FBBE62)"
		header[0].style.backgroundSize="400% 400%"
	}*/

	if (newDarkMode == "true") {
		darkMode = false;}
		else if (newDarkMode == "false") {
			darkMode = true;
		}
	darkmodeEnable();
	items = newitems; 
	list.innerHTML = localStorage.getItem("listsOfItems");
	totalAmount = parseInt(newtotalAmount, 10);
	sum.innerHTML = totalAmount;
	if (list.innerHTML.includes("li")) {
	} else {
		list.innerText="Your items will display here...";
	}
}

function newItem(e) {
	if (list.innerHTML.includes("li")) {
	} else {
		list.innerText="";
	}
	i=items.length;
	const n = itemName.value;
	const m = amount.value;
	var newArray = [];
	newArray.push(n);
	newArray.push(m);
	items.push(newArray);
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(items[i].join(" - ") + "₴"));
	list.appendChild(li);
	i++;
	amount.value = "";
	itemName.value = "";

	e.preventDefault();
	checkInputs();
}


function updateSum(e) {
	for (var u = 0; u < items.length; u++) {
		integer = parseInt(items[u][1], 10);
	}
	totalAmount = totalAmount + integer;
	sum.innerHTML = totalAmount;
	e.preventDefault();
}

function clearItems(e) {
	localStorage.setItem("items", "[]");
  localStorage.setItem("totalsum", 0);
  localStorage.setItem("listsOfItems", "");
  setStyles();
  list.innerText="Your items will display here...";
  i=0;
  console.log("cleared");
  e.preventDefault();
}

function hide(e) {
	if (e.target && e.target.nodeName == "LI") {
	e.target.style.textDecoration = "line-through";
	e.target.className += "deleted";
	e.target.style.color="grey";
	var hiddenAmount = parseInt(e.target.innerText.split("-")[1].replace(/[^+\d]/g, ''),10);
	totalAmount = totalAmount - hiddenAmount;
	e.target.style.pointerEvents = "none";}
}

function checkInputs () {
	if (amount.value == "" || itemName.value == "") {
		accept.disabled = true;
		accept.style.background = "#d1d1d1";
		accept.style.cursor = "default";
	} else {
		accept.disabled = false;
		accept.style.background = buttonColor;
		accept.style.cursor = "pointer";
	}
}

function darkmodeEnable(){
	if (darkMode == false || darkMode == "false") {
		console.log("dark");
		main[0].style.background = "#121212";
		main[0].style.color = "white";
		amount.style.color = "white";
		amount.style.background = "#424242";
		itemName.style.color = "white";
		itemName.style.background = "#424242";
		list.style.background = "#424242";
		buttonColor = "#08cf89";
		
		header[0].style.background="linear-gradient(-45deg, #ffd15c, #61d63d, #0062f7)"
		header[0].style.backgroundSize="400% 400%"
		darkMode = true;
		localStorage.setItem("darkModeStatus", darkMode);
	} else if (darkMode == true || darkMode == "true") {
		console.log("light");
		main[0].style.background = "white";
		main[0].style.color = "black";
		amount.style.color = "black";
		amount.style.background = "#f1f0f0";
		itemName.style.color = "black";
		itemName.style.background = "#f1f0f0";
		list.style.background = "#f1f0f0";
		buttonColor = "rgb(10, 2, 107)";
		
		header[0].style.background="linear-gradient(-45deg, #291D98, #EC49E7, #FBBE62)"
		header[0].style.backgroundSize="400% 400%"
		darkMode = false;
		localStorage.setItem("darkModeStatus", darkMode);
	}
}



checkInputs();
amount.onchange = checkInputs;
itemName.onchange = checkInputs;
nightIcon.addEventListener("click", darkmodeEnable);
accept.addEventListener("click", newItem);
accept.addEventListener("click", updateSum);
accept.addEventListener("click", populateStorage);
clear[0].addEventListener("click", clearItems);
list.addEventListener('click', hide, false);
list.addEventListener("click", populateStorage);


