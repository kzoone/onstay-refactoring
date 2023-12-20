import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { useEffect, useState } from 'react';
import { getCookie } from './util/cookie.js'
import axios from 'axios';
import TopButton from './components/common/TopButton';
import DevTools from './components/dev/DevTools.jsx';

function App() {

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    <TopButton />
    <DevTools /> {/** 개발 편의용 유저권한 설정 컴포넌트 (임시) */}
    </>
  );
}

export default App;
