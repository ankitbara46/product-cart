import axios from 'axios';

async function getCartData(){

	var res = await axios('http://localhost:5001/cart-8c825/us-central1/app/cart.json');

	console.log(res.data.item_count);
}

getCartData();