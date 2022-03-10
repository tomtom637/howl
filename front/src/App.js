import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoBg from './components/LogoBg';
//import './icons.css';
import GlobalStyles from './global-styles/GlobalStyles';
import Header from './patterns/Header';
import Hero from './patterns/hero';
import Footer from './components/Footer';

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