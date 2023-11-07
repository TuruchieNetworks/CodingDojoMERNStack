import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const [errorCheck, setErrorCheck] = useState(false)
  const [errors, setErrors] = useState([]);
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
      .catch(err => {
        console.log('🎡🎡🔭', err)
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message)
        }
        // Set Errors
        setErrors(errorArr);
      });
  }

  return (
    <div style={{height: '85vh',padding:'15px'}}>
      <div style={{ background: 'aliceblue', fontFamily: 'cursive', margin: '15px 18%',padding:'15px', borderRadius:'5%'}}>
        <form onSubmit={createProduct} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom:'15px'}}>
          {errors.map((err, index) => <p key={index}>{err}</p>)}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px', padding: '5px', width: '80%', fontSize: '22px' }}>
            <label style={{ padding: '10px' }} htmlFor='title'>Title</label>
            <input style={{ padding: '12px', borderRadius: '5%' }} type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} placeholder='Product Title!' />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px', padding: '5px', width: '80%', fontSize: '22px' }}>
            <label style={{ padding: '10px' }} htmlFor='price'>Price</label>
            <input style={{ padding: '12px', borderRadius: '5%' }} type='number' name='price' value={price} onChange={e => setPrice(e.target.value)} placeholder='Price in Dollars!' />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '25px', padding: '5px', width: '80%', fontSize: '22px' }}>
            <label style={{ padding: '10px' }} htmlFor='description'>Description</label>
            <input style={{ padding: '12px', borderRadius: '5%' }} type='text' name='description' value={description} onChange={e => setDescription(e.target.value)} placeholder='Description!' />
          </div>
          <button style={{ padding: '5px', margin: '15px', cursor: 'pointer', width: '80%', fontSize: '26px', fontFamily: 'cursive', fontWeight: 'bold', borderRadius: '5%' }}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Create