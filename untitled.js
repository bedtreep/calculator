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

	while( list.firstChild ){
  list.removeChild( list.firstChild );
}

/*	for (var k = 0; k <newitems.length; k++) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(newitems[k].join(" - ") + "₴"));
		list.appendChild(li);
	}*/
	items = newitems; 
	list.innerHTML = localStorage.getItem("listsOfItems");
	totalAmount = parseInt(newtotalAmount, 10);
	sum.innerHTML = totalAmount;
}

function newItem(e) {
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
		accept.style.background = "#0a026b";
		accept.style.cursor = "pointer";
	}
}

checkInputs();
amount.onchange = checkInputs;
itemName.onchange = checkInputs;
accept.addEventListener("click", newItem);
accept.addEventListener("click", updateSum);
accept.addEventListener("click", populateStorage);
clear[0].addEventListener("click", clearItems);
list.addEventListener('click', hide, false);
list.addEventListener("click", populateStorage);


