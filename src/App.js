import './App.css';
import React from 'react';
import { Routes, Route, Link, Navigate} from "react-router-dom";
import OneProduct from "./components/OneProduct";
import Create from "./components/Create";
import Update from "./components/Update";
import DeletePage from './components/DeletePage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App"style={{ background: 'rgba(0,0,0,0.7)'}}>
      <div style={{}}>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between',alignItems:'center', background: 'rgba(0,0,0,0.3)', fontFamily:'cursive', fontSize:'16px',padding:'5px 15px'}}>
          <h1 style={{background:'aliceblue', padding:'5px 15px', borderRadius:'7%', fontSize:'22px'}}><Link to={'/'} style={{textDecoration:'none', color:'chocolate'}}>HOME 📺</Link></h1>
          <h1 style={{color:'cyan', fontWeight:'bold'}}>🎡🎶🖥 PRODUCTS 🎮💻💻</h1>
          <h1 style={{background:'aliceblue', padding:'5px 8px', borderRadius:'7%', fontSize:'22px'}}><Link to='/products/create' style={{textDecoration:'none'}}>Add Product 💼</Link></h1>
        </div>
      </div>
        {/* THE THEATRE STAGE */}
      <Routes>
        
          {/* DASHBOARD  */}
        <Route path="/" element={<Navigate to="/products/dashboard" />} />
        <Route path="/products/dashboard/" element={<Dashboard/>} />

          {/* READ ONE */}
        <Route path="/products/:id" element={<OneProduct/>}/>

          {/* CREATE */}
        <Route path="/products/create" element={<Create/>} />

          {/* UPDATE */}
        <Route path="/products/update/:id" element={<Update/>} />

          {/* DELETE */}
        <Route path="/products/delete/:id" element={<DeletePage/>} />


      </Routes>


    </div>
  );
}

export default App;
