import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { useEffect, useState } from 'react';
import { getCookie } from './util/cookie.js'
import axios from 'axios';
import TopButton from './components/common/TopButton';

function App() {

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    <TopButton />
    </>
  );
}

export default App;
