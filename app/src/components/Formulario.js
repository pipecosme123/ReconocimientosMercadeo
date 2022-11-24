import React, { useState } from 'react';
import { Valores } from '../constants/Valores';
import BottonValor from './BottonValor';
import '../css/Formulario.css';

const Formulario = () => {

   const [checked, setChecked] = useState({
      innovacion: false,
      enfoque: false,
      empoderamiento: false,
      iniciativa_digital: false,
      claro_valiente: false,
      fomenta_curiosidad: false,
      construye_conﬁanza: false,
      promueve_cambio: false,
      pasion: false,
      escucha_activa: false
   });
   let seleccionado = [];

   const handleChacked = (valor) => {

      if (!seleccionado.includes(valor)) {
         seleccionado.push(valor);
      } else {
         const filtrado = seleccionado.filter((item) => item !== `${valor}`)
         seleccionado = filtrado;
      }

      console.log(seleccionado);
   }

   const handleEstado = (status) => {
      setChecked({
         ...checked,
         [status]: !checked[status]
      })
   }

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
                     // if (index < 5) {
                     return (
                        <BottonValor key={index} data={data} selected={false} handleChacked={handleChacked} handleEstado={handleEstado} />
                     )
                     // }
                  })}
               </div>
               {/* <div className='row'>
                  {Valores.map((data, index) => {
                     if (index >= 5) {
                        return (
                           <BottonValor imgValor={data.img} valor={data.valor} />
                        )
                     }
                  })}
               </div> */}
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