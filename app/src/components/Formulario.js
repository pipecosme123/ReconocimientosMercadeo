import React from 'react';
import { Valores } from '../constants/Valores';
import BottonValor from './BottonValor';
import '../css/Formulario.css';

const Formulario = () => {
   return (
      <div className='Formulario'>
         <form action="">
            <h1>FORMULARIO DE RECONOCIMIENTO</h1>

            <div className="inputTextName">
               <label htmlFor="reconocido">A quien se le reconoce:</label>
               <input type="text" name='reconocido' placeholder='Nombre y Apellido*' />
            </div>
            <h4>Seleccione hasta 3 valores que desea reconocer*</h4>
            <div className='opciones'>
               <div className='row'>
                  {Valores.map((data, index) => {
                     if (index < 5) {
                        return (
                           <BottonValor imgValor={data.img} valor={data.valor} />
                        )
                     }
                  })}
               </div>
               <div className='row'>
                  {Valores.map((data, index) => {
                     if (index >= 5) {
                        return (
                           <BottonValor imgValor={data.img} valor={data.valor} />
                        )
                     }
                  })}
               </div>
            </div>
            <div className="mensageAdicional">
               <textarea name="mensaje" placeholder='Dedica un mensaje personalizado (150 max.)'></textarea>
            </div>
            <div className="inputTextName">
               <label htmlFor="reconocedor">Quien hace el reconocimiento:</label>
               <input type="text" name='reconocedor' placeholder='Nombre y Apellido*' />
            </div>

            <input type="submit" value="Guardar" />
         </form>
      </div>
   );
};

export default Formulario;