// var item = document.querySelectorAll('.item');
//
// var cancelButtons = document.querySelectorAll('.cancel');
//
// for (var i=0; i<cancelButtons.length; i++) {
//   cancelButtons[i].addEventListener('click', function(e) {
//     e.target.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
//   });
// }

var item = document.querySelectorAll('.item');
var cancelButtons = document.querySelectorAll('.cancel');

var body = document.getElementsByTagName('body')[0];
var total = document.getElementById('total-price');

var newName = document.querySelector('.name-input input');
var newPrice = document.querySelector('.price-input input');

var box = document.querySelector('.box');


window.onload = function(){

  // deleting list items
  body.addEventListener('click', function(e) {
    if (e.target.className === 'cancel') {
      var removalItem = e.target.parentNode.parentNode;
      removalItem.parentNode.removeChild(removalItem);
    }
  });

// update subtotal with quantity value
body.addEventListener('input', function(e) {
  if (e.target.className === 'quantity') {
    var subtotal = e.target.parentNode.nextElementSibling.querySelector('p');
    var price = e.target.parentNode.previousElementSibling.querySelector('p').textContent;
    var input = e.target.value;
    var calculation = (parseInt(price.substring(1)) * parseInt(input)).toFixed(2);
    if (input === "") {
      subtotal.textContent = '$0.00';
    } else {
      subtotal.textContent = '$' + calculation;
    }
  }
});

// update total price
body.addEventListener('click', function(e) {
  if (e.target.id === 'calculate-button') {
    var subtotals = document.querySelectorAll('.item-total p');
    var calculation = 0;
    for (var i=0;i<subtotals.length;i++) {
      calculation += parseInt(subtotals[i].textContent.substring(1));
    }
    total.textContent = '$' + calculation.toFixed(2);
  }
});

// add new item
body.addEventListener('click', function(e) {
  if (e.target.id === 'create-button') {
    if (newName.value === "" || !Number.isInteger(parseInt(newPrice.value))) {
      if (newName.value === "") {
          alert("Item name cannot be empty");
      }
      if (!Number.isInteger(parseInt(newPrice.value))) {
        alert("Unit price must be a number");
      }
    }

    else {
      var priceInput = '$' + parseInt(newPrice.value).toFixed(2);
      var nameInput = newName.value;
      var newItemContent = '<div class="item-name col-md-4"><p></p></div><div class="item-price col-md-3"><p></p></div><div class="item-quantity col-md-3"><span>QTY </span> <input class="quantity" type="text" value="0" ><button type="button" class="cancel">Cancel</button></div><div class="item-total col-md-2"><p>$0.00</p></div>';
      var node = document.createElement("DIV");
      node.className = "item row new";
      node.innerHTML = newItemContent;
      var priceElem = node.querySelector('.item-price p');
      priceElem.textContent = priceInput;
      var nameElem = node.querySelector('.item-name p');
      nameElem.textContent = nameInput;

      if (box.firstChild) {
        box.insertBefore(node, box.firstChild);
      }
      else {
        box.appendChild(node);
      }

      newName.value = "";
      newPrice.value = "";

    }

  }
});

}
