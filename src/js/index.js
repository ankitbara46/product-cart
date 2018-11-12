import Cart from './models/Cart';
import * as cartView from './views/cartView';

document.addEventListener('DOMContentLoaded', function(){
	setCart();
	//updateCart();

	document.querySelector(".cart-items").addEventListener("click",function(e) {
	    // e.target is our targetted element.
	    // try doing console.log(e.target.nodeName), it will result LI
	    if(e.target && e.target.nodeName == "LI" && e.target.className =='edit') {
	    	document.getElementById('overlay').style.display = 'flex';
		   	setOverlay(e.target.id);

	    }
	});

	document.querySelector(".close-btn, .overlay-backdrop").addEventListener("click",function(e) {
	   	document.getElementById('overlay').style.display = 'none';
	});

	document.querySelector(".close-btn").addEventListener("click",function(e) {
	   	document.getElementById('overlay').style.display = 'none';
	});

	document.querySelector(".overlay-content").addEventListener("click",function(e) {
	   	if(e.target.className =='add-tobag-btn'){
	   		const form = document.querySelector('form[name="updatecart"]');
	   		const qty = form.querySelector('select[name="qty"]').value;
	   		const size = form.querySelector('select[name="size"]').value;
	   		const color = form.querySelector('input[name="color"]:checked').value;
	   		const id = form.querySelector('input[name="id"]').value;
	   		updateCart(id, size, color, qty);	
	   	}

	   	if(e.target.nodeName == "INPUT"){
			document.querySelector(".item-img").src = e.target.dataset.img;
		}
	   	
	});
});

async function setOverlay(id){
	document.querySelector('.overlay-content').innerHTML = `<img src="img/loader.gif" style="width: 100%;">`;
	let cartData = JSON.parse(localStorage.getItem("cartData"));
	let product;

   	cartData.forEach( item => {
   		if(item.id == id){
   			product = item;	
   		} 
   	});
	const cart = new Cart();
	await cart.getProductDetails(product.product_id);
	cartView.editOverlay(product, cart.productDetails);
	document.querySelector("[name='color']:checked").click();
}



async function setCart(){
	const cart = new Cart();
	await cart.getCartData();
	cartView.renderResults(cart.result);
}

async function updateCart(id, size, color, quantity){
	const cart = new Cart();
	await cart.updateCartData(id, size, color, quantity);
	if(cart.response.success == true){
		document.getElementById('overlay').style.display = 'none';
		setCart();
	}
}
