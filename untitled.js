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
  setStyles();
}

function setStyles() {
	var newitems = JSON.parse(localStorage.getItem("items"));
	var newtotalAmount = localStorage.getItem("totalsum");
	while( list.firstChild ){
  list.removeChild( list.firstChild );
}
	for (var k = 0; k <newitems.length; k++) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(newitems[k].join(" - ") + "₴"));
		list.appendChild(li);
	}
	items = newitems;
	totalAmount = parseInt(newtotalAmount, 10);
	sum.innerHTML = totalAmount;
}

function newItem(e) {
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
}


function updateSum(e) {
	for (var u = 0; u < items.length; u++) {
		integer = parseInt(items[u][1], 10);
	}
	totalAmount = totalAmount + integer;
	sum.innerHTML = totalAmount;
	e.preventDefault();
}


accept.addEventListener("click", newItem);
accept.addEventListener("click", updateSum);
accept.addEventListener("click", populateStorage);


