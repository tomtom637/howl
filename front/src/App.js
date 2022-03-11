import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoBg from './components/LogoBg/LogoBg';
//import './icons.css';
import GlobalStyles from './global-styles/GlobalStyles';
import Header from './patterns/Header/Header';
import Hero from './patterns/Hero/Hero';
import Footer from './components/Footer/Footer';

export default function App() {  
  return (
    <>
      <GlobalStyles />
      <div className="site-wrapper">
        <Header />
        <Hero />
        <Footer />
      </div>
    </>
  );
}