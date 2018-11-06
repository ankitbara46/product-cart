
const renderCartProduct = (product, index, pd) => {
	const markup = 	`
		<li class="item">
		<article>
			<div class="item-thumb-img"><img src="${product.image}" style="width: 100%;" alt="${product.title}"></div>
			<div>
				<div class="item-desc" style="display:flex;">
				<div>
				<ul>
					<li><strong>${product.name}</strong></li>
					<li class="size-small">Style: ${product.style}</li>
					<li class="size-small">Color: ${product.color}</li>
				</ul>
				</div>
				<div aria-label="size ${product.size}"><span class="item-desc-label">Size:</span><span class="color-secondary">${product.size}</span></div>
				<div><span class="item-desc-label">Qty</span><input type="number" min="1" max="20" value="${product.qty}" style="width:30px;" aria-label="Quantity ${product.qty}"></div>
				<div>
					${
						 product.selling_price < product.price ? `<span class="item-price" aria-label="Price ${product.price}"><span class="item-currency">$</span><span>${product.price*product.qty}</span></span>`:''
					 }
					<span aria-label="Price ${product.selling_price*product.qty}"><span class="item-currency">$</span><span class="price">${product.selling_price*product.qty}</span></span>
				</div>
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




export const renderResults = cartDetails => {
	document.querySelector('.cart-items').innerHTML = '';
	let cartProducts = cartDetails.items;
	localStorage.setItem("cartData", JSON.stringify(cartProducts));
	cartProducts.forEach(renderCartProduct);
	
	document.querySelector('.sub-total').textContent = cartDetails.subtotal;
	document.querySelector('.promotion').textContent = cartDetails.discount;
	document.querySelector('.total-price').textContent = cartDetails.total;
	const item_count = document.querySelectorAll('.item-count');
	item_count[0].textContent = cartProducts.length;
	item_count[1].textContent = cartProducts.length;
	
}


export const editOverlay = (product, productDetails) => {
	//console.log(product);
	const markup = `
		<div class="item-details-wrapper-overlay">
			<div class="item-details-overlay">
			<form name="updatecart" onsubmit="return false">
			<h3 class="title-overlay"> ${productDetails.name}</h3>
			<p><span class="item-currency-overlay ">$</span><span class="item-price-overlay color-secondary">${productDetails.price}</span></p>
			
			<p class="color-selector">
			<div class="text-uppercase">${productDetails.brand}</div>
			${
				productDetails.color.map( color => `<label class="color-container"><input type="radio" name="color" value="${color.name}" ${color.name==product.color ? `checked`:``} data-img="${color.image}"><span class="product-color" style="background-color:${color.colorcode}"></span></label>`).join('')
			}
			</p>
			<p>
				<span>
				<input type="hidden" name="id" value="${product.id}">
				<select name="size">
					<option value="">SIZE</option>
					${
						productDetails.size.map( size => `<option value="${size}" ${size==product.size ? `selected`:``}>${size}</option>`).join('')
					}
				</select></span> 

				<span> 
				
					<select name='qty'>
					<option value="">QTY</option>
					${
						Array(parseInt(productDetails.qty)).join(0).split(0).map( (sz, i) => `<option value="${i+1}" ${i+1==product.qty ? `selected`:``}>${i+1}</option>`).join('')
					}
				</select></span>
				</p>
			<BUTTON class="add-tobag-btn">Edit</BUTTON>
			<div><a href="#">See product details</a></div>
			</form>
			</div>
		</div>
		<div class="item-img-selected">
			<img class="item-img">
		</div>
		`;
		document.querySelector('.overlay-content').innerHTML = markup;
}


