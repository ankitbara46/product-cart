//const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/cart.json', (request, response) => { 
  
  fs.readFile('public/cartData.json', function(err, data) {
	let cartData = JSON.parse(data.toString());
	let subtotal = 0;
	fs.readFile('public/products.json', function(err, data) {
		const products = JSON.parse(data.toString());
		let productsArray = [];
		products.items.forEach( product => {
			productsArray[product.id] = product;
		} );
		
		
		cartData.items.forEach( (item, index) => {
			let product_id = cartData.items[index].product_id;
			cartData.items[index].name = productsArray[product_id].name;
			cartData.items[index].style = productsArray[product_id].style;
			cartData.items[index].price = productsArray[product_id].price;
			cartData.items[index].image = productsArray[product_id].image;
			cartData.items[index].selling_price = productsArray[product_id].selling_price;
			subtotal += productsArray[product_id].selling_price*cartData.items[index].qty;
		} );
		cartData.subtotal = subtotal;
		cartData.discount = 10;
		cartData.total = subtotal - 10;
		response.json(cartData);
		response.end();
	  });
	});
 });

app.get('/productDetails.json', (request, response) => {
  
  fs.readFile('public/products.json', function(err, data) {
	const product_id = request.query.id;
	const products = JSON.parse(data.toString());

	products.items.forEach( product => {
		if(product.id == product_id){
			response.json(product);
			response.end();
		}
	} )

  });
  
 });




 	
 app.post('/updatecart', (request, response) => {

	if (request.method === 'POST') {
	      
	      fs.readFile('public/cartData.json', function(err, data) {
		    let jsonData = JSON.parse(data.toString());
		    let items = jsonData.items;

		    items.forEach( (item, index) => {
		    	
		    	if(request.body.id == item.id){
		    		if(request.body.quantity){
		    			items[index]['qty'] =  request.body.quantity;	
		    		}

		    		if(request.body.size){
		    			items[index]['size'] =  request.body.size;	
		    		}
		    		
					if(request.body.color){
						items[index]['color'] = request.body.color;	
					}
					 		    		
		    	}
	
		    })

		    jsonData.items = items;

		    fs.writeFile('public/cartData.json', JSON.stringify(jsonData), function(err, data) {
			    if(err) {
			        response.json({"success": false});
			    } else {
			    	response.json({"success": true});
			    }
				response.end();
			});

		  });
	}
 
 });



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 //exports.app = functions.https.onRequest(app);
 app.listen(port, () => console.log(`Example app listening on port ${port}!`))
