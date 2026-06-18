import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Compnents/Header';
import Home from './Compnents/Screens/Home';
import Edit from './Compnents/Screens/Edit';
import DashBoard from './Compnents/Screens/DashBoard';
import Statis from './Compnents/Screens/Statis';
import Login from './Compnents/Screens/Login';
function App() {
  return (
    <>
      <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/edit/:id" element={<Edit />} />
      <Route path='Statistics/' element={<Statis/>}/>
      <Route path="Login/" element={<Login/>}/>
    </Routes>
    </>
      )
}

      export default App