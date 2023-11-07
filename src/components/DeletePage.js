import { useParams } from "react-router"; //To grab product id!
import '../App.css';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const DeletePage = () => {
  const { id } = useParams();
  const [oneSingleProduct, setOneSingleProduct] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/' + id)
      .then(res => {
        console.log(res.data.product)
        setOneSingleProduct(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);
  // Pass the delete Idx to the handler with a call back from the onClick 
  const deleteHandler = (deleteIdx) => {
    console.log('🔭🎡🎡 Delete', deleteIdx);
    axios.delete('http://localhost:8000/api/products/' + deleteIdx)
      .then(res => {
        console.log('🚀🚀🚀', res.data);
        navigate('/');
      })
      .catch(err => {
        console.log('🔭🎡🎡', err)
      });
  }
  return (
    <div style={{ fontFamily: 'cursive', height: '90vh'}}>
      {
        oneSingleProduct ?
        <div style={{margin:'10px 10%', border: '1px solid aquamarine', borderRadius:'5%',padding:'18px'}}>
          <div key={oneSingleProduct.product._id} style={{ fontFamily: 'cursive', color: 'coral', background: 'rgba(0,0,0,0.1)' }}>
            <h5 style={{ marginTop: '5px', fontSize: '22px', borderBottom: '2px solid aquamarine', padding: '12px', margin: '0', borderRadius: '7%', background: 'black', color: 'aquamarine' }}>🏹 You are about to delete {oneSingleProduct.product.title} 🗑</h5>
            <div style={{padding:'15px'}}>
                  <h1 style={{ fontSize: '22px', fontWeight: 'bold', background: 'azure', borderBottom: '1px solid aquamarine', padding: '15px', margin: '0', borderRadius: '7%' }}>
                    <Link to={'/products/' + oneSingleProduct.product._id} style={{ textDecoration: 'none', color: 'navy' }}>
                    Price: {oneSingleProduct.product.price}
                    </Link>
                  </h1>
                  <h1 style={{ fontSize: '18px', fontWeight: 'bold', background: 'black', borderBottom: '1px solid aquamarine', padding: '15px', margin: '0', borderRadius: '7%' }}>
                    <Link to={'/products/' + oneSingleProduct.product._id} style={{ textDecoration: 'none', color: 'khaki' }}>
                    Description: {oneSingleProduct.product.description}
                    </Link>
                  </h1>
                </div>
            <h1 style={{ borderRadius: '7%', background: 'coral', fontSize: '18px', padding: '15px' }}>
              <Link to={`/products/update/${oneSingleProduct.product._id}`} style={{ textDecoration: 'none', background: 'black', padding: '10px 25px', borderRadius: '7%', color: 'beige' }}>🔩 Update Product 🩺</Link>
            </h1>
            <button style={{ textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', width: '100%', padding: '22px', background: 'rgba(0,0,0,0.7)', borderRadius: '7%', cursor: 'pointer', color: 'ivory' }} onClick={() => deleteHandler(oneSingleProduct.product._id)}>🗑 Delete Product 🎡</button>

            <Link to={'/'} style={{ textDecoration: 'none' }}><h4 style={{ color: 'coral', padding: '50px', background: 'rgba(0,0,0,0.7)', borderRadius: '7%' }}>🚀 Go Back </h4> </Link>
          </div>
        </div> : <h1>Loading...</h1>
      }
    </div>
  )
}

export default DeletePage