import axios from 'axios';
export default class Cart{
	
	constructor(){
	}
	
	async getCartData(){
		try{
	
			//var res = await axios('http://localhost:5003/cart-8c825/us-central1/app/cart.json');
			var res = await axios('http://localhost:3000/cart.json');
			this.result = res.data;
		} catch(error){
			console.log(error);
		}
	}

	async updateCartData(id, size, color, quantity){
		try{
			//var res = await axios.post('http://localhost:5003/cart-8c825/us-central1/app/updatecart', {
			var res = await axios.post('http://localhost:3000/updatecart', {
			    id: id,
			    size: size,
			    color: color,
			    quantity: quantity
			});

			this.response = res.data;
			console.log('daat received',this.response);
		} catch(error){
			console.log(error);
		}
	}
	
	async deleteItem(id){
		try{
			var res = await axios.post('http://localhost:3000/deleteitem', {
			    id: id
			});

			this.response = res.data;
			console.log('daat received',this.response);
		} catch(error){
			console.log(error);
		}
	}

	async getProductDetails(product_id){
		try{
	
			//var res = await axios(`http://localhost:5003/cart-8c825/us-central1/app/productDetails.json?id=${product_id}`);
			var res = await axios(`http://localhost:3000/productDetails.json?id=${product_id}`);
			this.productDetails = res.data;
		} catch(error){
			console.log(error);
		}
	}
	
}