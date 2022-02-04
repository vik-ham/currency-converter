import React from 'react';
import {Link, Route, Routes } from 'react-router-dom';
import Converter from './Converter';
import Exchange from './Exchange';

const style = {
  nav: {
    backgroundColor: 'powderblue',
    height: '50px'
  },
  ul: {
    display: 'flex',
    maxWidth: '70%',
    margin: 'auto',
    paddingTop: '12px'
  },
  li: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '50%',
    margin: 'auto'
  },
  link: {
    textDecoration: 'none'
  },
  h1: {
    margin: '0',
  }
}

function Main() {

  return (
    <div className="Main"> 
      <nav style={style.nav}>
          <ul style={style.ul}>
            <li style={style.li}>
              <Link style={style.link} to="/">Converter</Link>
              <Link style={style.link} to="/exchange">Exchange</Link>
            </li>
          </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Converter />}/>
            <Route path="/exchange" element={<Exchange />}/>
        </Routes>
    </div>
  );
}

export default Main;
