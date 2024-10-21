import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
//import QRScanner from './components/QRScanner';
import QRCodeGenerator from './components/QRCodeGenerator';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [discount, setDiscount] = useState(0);
  const [qrValue, setQrValue] = useState('');
  const [userId, setUserId] = useState('');
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [isLocked, setIsLocked] = useState(() => {
    const lockedStatus = localStorage.getItem('isLocked');
    return lockedStatus === 'true'; // 从 localStorage 读取锁定状态
  });
  
  const generateUniqueId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 3; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  };

  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
    } else {
      const newUserId = generateUniqueId();
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('isLocked', isLocked); // 存储锁定状态到 localStorage
  }, [isLocked]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    if (product.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const applyDiscount = (discountCode) => {
    const discountAmount = discountCode === 'DISCOUNT10' ? 10 : 0;
    setDiscount(discountAmount);

    // 解锁按钮
    if (discountCode === 'UNLOCK') {
      setIsLocked(false);
    }
  };

  const generateQRCode = () => {
    const discountCode = 'DISCOUNT10';
    setQrValue(discountCode);
  };

  const sendCartData = () => {
    if (isLocked) {
      alert('You cannot send orders again without scanning the QR code.');
      return;
    }

    const product1 = cart.find(item => item.name === 'Product 1'); // 替换为实际产品名
    const product2 = cart.find(item => item.name === 'Product 2'); // 替换为实际产品名

    const product1Quantity = product1 ? product1.quantity : 0;
    const product2Quantity = product2 ? product2.quantity : 0;
    const totalPrice = calculateTotalPrice();

    const data = {
      buyerId: userId,
      product1Quantity,
      product2Quantity,
      totalPrice,
      timestamp: new Date().toISOString()
    };
//kokoa.bitter.jp
    fetch('http://localhost:3003/receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      console.log('Successfully sent cart data:', result);
      alert('Your order has been sent!');
      setPurchasedItems(cart);
      setCart([]);
      setIsLocked(true); // 订单成功后锁定按钮
      navigate('/confirmation', { state: { cart: data } });
    })
    .catch(error => {
      console.error('Error sending cart data:', error);
      alert('Failed to send cart data. Please try again later.');
    });
  };

  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return (totalPrice - discount).toFixed(2);
  };
  
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Products</Link> | <Link to="/cart">Cart</Link> | <Link to="/scan">Scan QR</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} cart={cart} />} />
        <Route 
          path="/cart" 
          element={
            <Cart
              cart={cart}
              calculateTotalPrice={calculateTotalPrice}
              discount={discount}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              sendCartData={sendCartData}
              purchasedItems={purchasedItems}
              isLocked={isLocked} // 将锁定状态传递给 Cart 组件
            />
          } 
        />
        {/* <Route path="/scan" element={<QRScanner applyDiscount={applyDiscount} />} /> */}
      </Routes>

      {/* <div>
        <h2>Generate Discount QR Code</h2>
        <button onClick={generateQRCode}>Generate QR Code</button>
        {qrValue && <QRCodeGenerator value={qrValue} />}
      </div> */}

      <div>
        <h2>Your Unique User ID: 電波 {userId}</h2>
      </div>
    </div>
  );
}

export default App;

