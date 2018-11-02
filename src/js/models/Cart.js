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
	
}