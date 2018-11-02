import Cart from './models/Cart';
import * as cartView from './views/cartView';

document.addEventListener('DOMContentLoaded', function(){
	console.log(11);
	setCart();
});


async function setCart(){
	const cart = new Cart();
	await cart.getCartData();
	
	cartView.renderResults(cart.result.items);
	
	console.log(cart.result);
	
}
