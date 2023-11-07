import '../App.css';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        setProduct(res.data)
        console.log('🚀🚀🚀', product)
      })
      .catch(err => {
        console.log('🔭🎡🎡', err)
      });
  }, []);
  return (
    <div>
      <div style={{ background: 'rgba(0,0,0,0.3)' }}>
        {product ?
          product.products.map((product) => {
            return <div key={product._id} style={{ fontFamily: 'cursive'}}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding:'20px 15%'}}>
                {/* Product Info */}
                <div style={{ background: 'rgba(0,0,0,0.3)',  borderRadius:'5%'}}>
                  <h1 style={{ fontSize: '29px', fontWeight: 'bold', borderBottom: '1px solid aquamarine', padding: '15px', margin: '0', borderRadius: '7%' }}>
                    <Link to={'/products/' + product._id} style={{ textDecoration: 'none', color: 'cyan' }}>
                    {product.title}
                    </Link>
                  </h1>
                  <h1 style={{ fontSize: '20px', fontWeight: 'bold', background: 'azure', borderBottom: '1px solid aquamarine', padding: '15px', margin: '0', borderRadius: '7%' }}>
                    <Link to={'/products/' + product._id} style={{ textDecoration: 'none', color: 'aquamarine', color: 'navy' }}>
                    Price: {product.price} Dollars!
                    </Link>
                  </h1>
                  <h1 style={{ fontSize: '16px', fontWeight: 'bold', background: 'black', borderBottom: '1px solid aquamarine', padding: '15px', margin: '0', borderRadius: '7%' }}>
                    <Link to={'/products/' + product._id} style={{ textDecoration: 'none', color:'khaki' }}>
                    Description: {product.description}!
                    </Link>
                  </h1>
                </div>

                {/* Actions Div */}
                <div style={{ background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center',margin:'15px 0px', padding:'5px',borderRadius:'5%'}}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button style={{ borderRadius: '7%', background: 'aquamarine', fontSize: '18px', padding: '15px', margin: '10px' }}>
                      <Link to={`/products/update/${product._id}`} style={{ textDecoration: 'none', background: 'black', padding: '8px 40px', borderRadius: '7%', color: 'aquamarine', fontWeight: 'bold' }}>🔩 Update Product 🩺</Link>
                    </button>
                    <button style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold', width: '100%', padding: '15px', background: 'rgba(0,0,0,0.7)', borderRadius: '7%', cursor: 'pointer', color: 'ivory', margin: '15px' }}>
                      <Link to={`/products/delete/${product._id}`} style={{ textDecoration: 'none', background: 'black', padding: '10px 40px', borderRadius: '7%', color: 'aquamarine', fontWeight: 'bold' }}>✂ Delete Product 🎡🎡</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }) : <h1>Loading...</h1>
        }
      </div>
    </div>
  )
}

export default Dashboard