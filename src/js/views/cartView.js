
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
				<div><span class="item-desc-label">Qty</span><input type="number" min="1" max="20" value="1" style="width:30px;"></div>
				<div>${product.price}</div>
				</div>
						<div class="cart-controls">
				<ul>
					<li>Edit</li><li>Remove</li><li>Save For Later</li>
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
	
	cartProducts.forEach(renderCartProduct);
}