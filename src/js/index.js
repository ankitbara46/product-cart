import Cart from './models/Cart';
import * as cartView from './views/cartView';

document.addEventListener('DOMContentLoaded', function(){
	const cart = new Cart();
	setCart(cart);
	
	document.querySelector(".cart-items").addEventListener("click",function(e) {
	    
		if(e.target && e.target.nodeName == "A" && e.target.parentNode.className =='edit') {
	    	document.getElementById('overlay').style.display = 'flex';
		   	setOverlay(cart, e.target.dataset.id);
	    }
		
		if(e.target && e.target.nodeName == "A" && e.target.parentNode.className =='remove') {
			const itemId = e.target.dataset.id;
	    	var r = confirm("Are you sure you want to remove this item ?");
			if (r == true) {
				deleteItem(cart, itemId);
			}
			
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
	   		updateCart(cart, id, size, color, qty);	
	   	}

	   	if(e.target.nodeName == "INPUT"){
			document.querySelector(".item-img").src = e.target.dataset.img;
		}
	   	
	});
	
	document.addEventListener('keyup', function(e) {
	  if (e.keyCode == 27) { document.getElementById('overlay').style.display = 'none'; }  
	
	});
});

async function setOverlay(cart, id){
	document.querySelector('.overlay-content').innerHTML = `<img src="img/loader.gif" style="width: 100%;">`;
	let cartData = JSON.parse(localStorage.getItem("cartData"));
	let product;

   	cartData.forEach( item => {
   		if(item.id == id){
   			product = item;	
   		} 
   	});
	await cart.getProductDetails(product.product_id);
	cartView.editOverlay(product, cart.productDetails);
	document.querySelector("[name='color']:checked").click();
}



async function setCart(cart){
	await cart.getCartData();
	cartView.renderResults(cart.result);
}

async function updateCart(cart, id, size, color, quantity){
	await cart.updateCartData(id, size, color, quantity);
	if(cart.response.success == true){
		document.getElementById('overlay').style.display = 'none';
		setCart(cart);
	}
}

async function deleteItem(cart, id){
	await cart.deleteItem(id);
	if(cart.response.success == true){
		setCart(cart);
	}
}
