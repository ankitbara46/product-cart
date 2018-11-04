import axios from 'axios';
export default class Cart{
	
	constructor(query){
		this.query = query;
	}
	
	async getCartData(){
		try{
	
			var res = await axios('http://localhost:5003/cart-8c825/us-central1/app/cart.json');
			this.result = res.data;
		} catch(error){
			console.log(error);
		}
	}

	async updateCartData(id, size, color, quantity){
		try{
			var res = await axios.post('http://localhost:5003/cart-8c825/us-central1/app/updatecart', {
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

	async getProductDetails(product_id){
		try{
	
			var res = await axios(`http://localhost:5003/cart-8c825/us-central1/app/productDetails.json?id=${product_id}`);
			this.productDetails = res.data;
		} catch(error){
			console.log(error);
		}
	}
	
}