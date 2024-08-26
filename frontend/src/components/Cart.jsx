// Cart.jsx
import React, { useState } from 'react';
import { pizzas } from './pizzas';

const Cart = () => {
  const [cart, setCart] = useState(
    pizzas.map(pizza => ({ ...pizza, quantity: 2 }))
  );

  const increaseQuantity = (id) => {
    setCart(
      cart.map((pizza) =>
        pizza.id === id ? { ...pizza, quantity: pizza.quantity + 1 } : pizza
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((pizza) =>
          pizza.id === id && pizza.quantity > 0
            ? { ...pizza, quantity: pizza.quantity - 1 }
            : pizza
        )
        .filter((pizza) => pizza.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, pizza) => sum + pizza.price * pizza.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.filter(pizza => pizza.quantity > 0).map((pizza) => (
          <li key={pizza.id}>
            <img src={pizza.image} alt={pizza.name} />
            <h5>{pizza.name}</h5>
            <p>Precio: ${pizza.price}</p>
            <p>Cantidad: {pizza.quantity}</p>
            <button onClick={() => increaseQuantity(pizza.id)}>+</button>
            <button onClick={() => decreaseQuantity(pizza.id)}>-</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toLocaleString('en-EU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h3>
      <button>Pagar</button>
    </div>
  );
};

export default Cart;
