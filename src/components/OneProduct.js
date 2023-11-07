import { useParams } from "react-router"; //To grab movie id!
import '../App.css';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const OneMovie = () => {
  const { id } = useParams();
  const [oneproduct, setOneProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/' + id)
      .then(res => {
        console.log(res.data)
        setOneProduct(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);
  return (
    <div style={{ fontFamily: 'cursive', color: 'cornflowerblue', height:'90vh' }}>
      {
        oneproduct ?
          <div style={{ margin: '15px 10%', border: '1px solid aquamarine', borderRadius: '5%', padding: '20px' }}>
            <div key={oneproduct.product._id} style={{ fontFamily: 'cursive', color: 'coral', height: '100%', background: 'rgba(0,0,0,0.1)' }}>
              <h5 style={{ marginTop: '5px', fontSize: '22px', borderBottom: '2px solid aquamarine', padding: '12px', margin: '0', borderRadius: '7%', background: 'black', color: 'aquamarine' }}>🏹 {oneproduct.product.title} 📦</h5>
              <div style={{ padding: '15px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 'bold', background: 'azure', borderBottom: '1px solid aquamarine', padding: '15px', margin: '0', borderRadius: '7%' }}>
                  <Link to={'/products/' + oneproduct.product._id} style={{ textDecoration: 'none', color: 'navy' }}>
                    Price: {oneproduct.product.price}
                  </Link>
                </h1>
                <h1 style={{ fontSize: '18px', fontWeight: 'bold', background: 'black', borderBottom: '1px solid aquamarine', padding: '15px', margin: '0', borderRadius: '7%' }}>
                  <Link to={'/products/' + oneproduct.product._id} style={{ textDecoration: 'none', color: 'khaki' }}>
                    Description: {oneproduct.product.description}
                  </Link>
                </h1>
              </div>
              <h1 style={{ borderRadius: '7%', background: 'coral', fontSize: '18px', padding: '15px' }}>
                <Link to={`/products/update/${oneproduct.product._id}`} style={{ textDecoration: 'none', background: 'black', padding: '10px 25px', borderRadius: '7%', color: 'beige' }}>🔩 Update Product 🩺</Link>
              </h1>
              <button style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold', padding: '25px', background: 'rgba(0,0,0,0.7)', borderRadius: '7%', cursor: 'pointer', color: 'ivory', margin: '15px 0'}}>
                <Link to={`/products/delete/${oneproduct.product._id}`} style={{ textDecoration: 'none', background: 'black', padding: '10px 40px', borderRadius: '7%', color: 'aquamarine', fontWeight: 'bold' }}>✂ Delete Product 🎡🎡</Link>
              </button>

              <Link to={'/'} style={{ textDecoration: 'none' }}><h4 style={{ color: 'coral', padding: '50px', background: 'rgba(0,0,0,0.7)', borderRadius: '7%' }}>🚀 Go Back </h4> </Link>
            </div>
          </div> : <h1>Loading...</h1>
      }
    </div>
  )
}

export default OneMovie