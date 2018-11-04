
const renderCartProduct = product => {
	const markup = 	`
		<li class="item">
		<article>
			<div style="width:100px"><img src="${product.image}" style="width: 100%;"></div>
			<div>
				<div class="item-desc" style="display:flex;">
				<div>
					<strong>${product.name}</strong>
					<p>Style: ${product.style}</p>
					<p>Color: ${product.color}</p>
				</div>
				<div><span class="item-desc-label">Size</span>${product.size}</div>
				<div><span class="item-desc-label">Qty</span><input type="number" min="1" max="20" value="${product.qty}" style="width:30px;"></div>
				<div>${product.price}</div>
				</div>
				<div class="cart-controls">
				<ul>
					<li class="edit" id="${product.id}">Edit</li><li class="remove">Remove</li><li class="saveFL">Save For Later</li>
				</ul>
				</div>
			</div>
		</article>
	</li>
	`;
	
	const itemsDom = document.querySelector('.cart-items');
	
	itemsDom.insertAdjacentHTML('beforeend', markup);

}


export const renderResults = cartProducts => {
	document.querySelector('.cart-items').innerHTML = '';
	localStorage.setItem("cartData", JSON.stringify(cartProducts));
	cartProducts.forEach(renderCartProduct);
}


export const editOverlay = (product, productDetails) => {
	//console.log(product);
	const markup = `
		<div>
			<form name="updatecart" onsubmit="return false">
			<p> ${productDetails.name}</p>
			<p>${productDetails.price}</p>
			<p>
			${
				productDetails.color.map( sz => `<label class="color-container"><input type="radio" name="color" value="${sz}" ${sz==product.color ? `checked`:``}><span class="product-color" style="background-color:${sz}"></span></label>`)
			}
			</p>
			<p>
				<span>
				<input type="hidden" name="id" value="${product.id}">
				<select name="size">
					<option value="">SIZE</option>
					${
						productDetails.size.map( sz => `<option value="${sz}" ${sz==product.size ? `selected`:``}>${sz}</option>`)
					}
				</select></span> 

				<span> 
				
					<select name='qty'>
					<option value="">QTY</option>
					${
						Array(parseInt(productDetails.qty)).join(0).split(0).map( (sz, i) => `<option value="${i+1}" ${i+1==product.qty ? `selected`:``}>${i+1}</option>`)
					}
				</select></span>
				</p>
			<BUTTON class="add-tobag-btn">Add To Bag</BUTTON>
			</form>
		</div>
		<div>
			<img src="https://cart-8c825.firebaseapp.com/img/item1.jpeg" style="width: 100%; max-width: 200px;">
		</div>
		`;
		document.querySelector('.overlay-content').innerHTML = markup;
}


