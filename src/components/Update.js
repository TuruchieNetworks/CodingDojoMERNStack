import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router"; //Top of App.
import { useNavigate } from 'react-router-dom' // Be sure to instantiate- its a 2 step process or errors!!
const Update = () => {
  const [updateTitleErrors, setUpdateTitleErrors] = useState([]);
  const [updateDescriptionErrorCheck, setUpdateDescriptionErrorCheck] = useState([]);
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const { id } = useParams() // useParams returns the destructured obj
  // Grabbing the one product
  useEffect(() => {
    axios.get('http://localhost:8000/api/products/' + id)
      .then(res => {
        console.log(res.data)
        console.log('✔✔✔👌', res.data)
        // Set all inputs from the database
        setTitle(res.data.product.title)
        setPrice(res.data.product.price)
        setDescription(res.data.product.description)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);

  // Submit Handler
  const updateProduct = (e) => {
    e.preventDefault();
    console.log('cool')
    const updatedProduct = {
      title,
      price,
      description
    };

    axios.patch('http://localhost:8000/api/products/' + id, updatedProduct)
      .then(res => {
        console.log('✔✔✔👌', res.data)
        navigate('/');
      })
      .catch(err => {
        console.log('🎡🎡🔭', err)
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
          if (errorResponse[key].message.includes('title')) {
            errorArr.push(errorResponse[key].message)
          } else if (errorResponse[key].message.includes('description')) {
            updateDescriptionErrorCheck.push(errorResponse[key].message)
          }
        }
        // Set Errors
        setUpdateTitleErrors(errorArr);
        setUpdateDescriptionErrorCheck(updateDescriptionErrorCheck);
    });

  }

  return (
    <div style={{ padding: '15px', height: '85vh' }}>
      <div style={{ background: 'aliceblue', fontFamily: 'cursive', margin: '10px 15%', borderRadius: '5%' }}>
        <form onSubmit={updateProduct} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '25px' }}>
          {updateTitleErrors.map((err, index) => <p key={index} style={{ background: 'crimson', padding: '10px 0px', borderRadius: '7%', color: 'khaki', fontSize: '18px', fontWeight: 'bold', width: '80%' }}>{err}</p>)}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px', padding: '5px', width: '80%', fontSize: '22px' }}>
            <label style={{ padding: '10px' }} htmlFor='title'>Title</label>
            <input style={{ padding: '10px', borderRadius: '5%' }} type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} placeholder='Product Title!' />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px', padding: '5px', width: '80%', fontSize: '22px' }}>
            <label style={{ padding: '10px' }} htmlFor='price'>Price</label>
            <input style={{ padding: '10px', borderRadius: '5%' }} type='number' name='price' value={price} onChange={e => setPrice(e.target.value)} placeholder='Price in Dollars!' />
          </div>

          {updateDescriptionErrorCheck.map((err, index) => <p key={index} style={{ background: 'crimson', padding: '10px 0px', borderRadius: '7%', color: 'khaki', fontSize: '18px', fontWeight: 'bold', width: '80%' }}>Opps, {err}!</p>)}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', padding: '5px', width: '80%', fontSize: '22px' }}>
            <label style={{ padding: '10px' }} htmlFor='description'>Description</label>
            <input style={{ padding: '10px', borderRadius: '5%' }} type='text' name='description' value={description} onChange={e => setDescription(e.target.value)} placeholder='Description!' />
          </div>
          <button style={{ padding: '5px', margin: '15px', cursor: 'pointer', width: '80%', fontSize: '26px', fontFamily: 'cursive', fontWeight: 'bold', borderRadius: '5%' }}>Submit</button>
        </form>
      </div></div>
  )
}

export default Update