import React from 'react';
import '../css/BottonValor.css';

const BottonValor = ({ imgValor, valor }) => {
   return (
      <div className='BottonValor'>
         <img src={imgValor} alt="" />
         <p>{valor}</p>
      </div>
   );
};

export default BottonValor;