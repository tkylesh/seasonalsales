

var categories = {};
var products = {};

var seasonDiscount = document.getElementById('season-discount');

function populateSeasonDiscount(){
	categories= JSON.parse(this.responseText);
    var discount = "<option>season discount</value>";
    for(var i = 0; i < categories.categories.length; i++) {
        discount += `<option value="${(categories.categories[i].discount)}">${categories.categories[i].season_discount}</option>`;
    }
    seasonDiscount.innerHTML += discount;

};


function executeThisCodeAfterFileLoaded () { 
//parses the string received from the xhr request into an actual js object 
//so it can be worked with
  products = JSON.parse(this.responseText);
  buildDisplay();
};
seasonDiscount.addEventListener("change", function() {
    var discountValue = this.value;
    // Selects the text IE. "Winter"
    var discountSeason = this.options[this.selectedIndex].text;
    if(discountSeason === categories.categories[0].season_discount) {
      discountSeason = categories.categories[0].id;
    } else if(discountSeason === categories.categories[1].season_discount) {
      discountSeason = categories.categories[1].id;
    } else {
      discountSeason = categories.categories[2].id;
    }
    calcDiscount(discountValue, discountSeason);
})
  


function buildDisplay(){

  var contentEl = document.getElementById("all-my-products")
  // console.log("contentEl", contentEl);

  var productData = "";
  var currentProduct;

  for (var i = 0; i < products.products.length; i++) {
    currentProduct = products.products[i];

    productData += "<div class='product-card'>";
    //below is ES6 notation
    //can be written "<h1>"+currentProduct.title
      productData += `<h1>${currentProduct.name}</h1>`;
      productData += "<div class='category'>";
        switch(currentProduct.category_id){
        	case 1:
        		productData +=`<p>Apparel</p>`;
        		break;
        	case 2:
        		productData +=`<p>Furniture</p>`;
        		break;
        	case 3:
        		productData +=`<p>Household</p>`;
        		break;
        }
      productData += "</div>";
      productData += "<div class='price'>";
        productData += currentProduct.price;
      productData += "</div>";
    productData += "</div>";

}
  contentEl.innerHTML = productData;
};


function calcDiscount(discount, season) {
    // loop over array and apply the discount
    for(var i = 0; i < products.products.length; i++) {
        if(products.products[i].category_id === season) {
                                            // Limits the decimal value to 2 places
            products.products[i].price = (products.products[i].price * (1.0 - discount)).toFixed(2);
        }
    }
    buildDisplay();
};



var productsRequest = new XMLHttpRequest();
productsRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
productsRequest.open("GET","products.json");
productsRequest.send();

var categoriesRequest = new XMLHttpRequest();
categoriesRequest.addEventListener("load",populateSeasonDiscount);
categoriesRequest.open("GET","categories.json");
categoriesRequest.send();