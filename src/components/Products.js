import React from 'react';

function ProductPage({ cart, addToCart }) {
  const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ];

  // 获取购物车中某个商品的数量
  const getProductQuantity = (productId) => {
    const productInCart = cart.find((item) => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          {/* 显示购物车中的商品数量 */}
          {getProductQuantity(product.id) > 0 && (
            <p>In Cart: {getProductQuantity(product.id)}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductPage;

