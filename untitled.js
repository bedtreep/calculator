var items = [];
var sum = document.getElementById("sum");
var list = document.getElementById("list");
var itemName = document.getElementById("item_name");
var amount = document.getElementById("amount");
var accept = document.getElementById("accept");
var i=0;
var totalAmount = 0;
var integer;


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
	e.preventDefault();
}


function updateSum() {
	for (var u = 0; u < items.length; u++) {
		integer = parseInt(items[u][1], 10);
	}
	totalAmount = totalAmount + integer;
	sum.innerHTML = totalAmount;
}

accept.addEventListener("click", newItem);
accept.addEventListener("click", updateSum);

