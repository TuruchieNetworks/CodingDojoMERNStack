import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const createProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      price,
      description,
    };
    axios.post('http://localhost:8000/api/products', newProduct)
        .then(res => {
          console.log('✔✔✔👌', res.data.data)
          navigate('/');
        })
        .catch(err => console.log('🎡🎡🔭', err));

  }

  return (
    <div style={{background:'aliceblue', fontFamily:'cursive',margin:'0px 15%', height:'90vh', }}>
      <form onSubmit={createProduct} style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
        <div style={{display:'flex', flexDirection:'column',marginBottom:'5px',padding:'5px', width:'80%', fontSize:'22px'}}>
          <label style={{padding:'10px'}}  htmlFor='title'>Title</label>
          <input style={{padding:'10px',borderRadius:'5%'}}  type='text'name='title'value={title} onChange={e => setTitle(e.target.value)}placeholder='Product Title!'/>
        </div>

        <div style={{display:'flex', flexDirection:'column',marginBottom:'5px',padding:'5px', width:'80%', fontSize:'22px'}}>
          <label style={{padding:'10px'}}  htmlFor='price'>Price</label>
          <input style={{padding:'10px',borderRadius:'5%'}}  type='number'name='price'value={price} onChange={e => setPrice(e.target.value)}placeholder='Price in Dollars!'/>
        </div>

        <div style={{display:'flex', flexDirection:'column',marginBottom:'15px',padding:'5px', width:'80%', fontSize:'22px'}}>
          <label style={{padding:'10px'}}  htmlFor='description'>Description</label>
          <input style={{padding:'10px',borderRadius:'5%'}}  type='text'name='description'value={description} onChange={e => setDescription(e.target.value)}placeholder='Description!'/>
        </div>
        <button style={{padding:'5px',margin:'15px', cursor:'pointer', width:'80%', fontSize:'26px', fontFamily:'cursive', fontWeight:'bold',borderRadius:'5%'}}>Submit</button>
      </form>
    </div>
  )
}

export default Create