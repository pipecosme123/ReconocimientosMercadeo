import React from 'react';
import { ImagenesGenerales, ImgValoresInfo } from '../constants/Imagenes';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';

import '../css/Informacion.css';

const Informacion = () => {
   return (
      <>
         <div className='Informacion'>
            <img className='logo_inspira' src={ImagenesGenerales.logo_inspira} alt="" />
            <div className="container">

               <div className="info-texto pc">
                  <img className='titulo' src={ImagenesGenerales.titulo} alt="" />
                  <img className='fotografia' src={ImagenesGenerales.fotografia} alt="" />
                  <div className="parrafo">
                     <p><ImQuotesLeft className='comillas' /> Reconocer a quienes de forma positiva nos inspira con sus buenas acciones es un acto que inspira a ser mejores <ImQuotesRight className='comillas' /> </p>
                  </div>
               </div>

               <div className="info-texto phone">
                  <img className='fotografia' src={ImagenesGenerales.fotografia} alt="" />
                  <img className='titulo' src={ImagenesGenerales.titulo} alt="" />
                  <div className="parrafo">
                     <p><ImQuotesLeft className='comillas' /> Reconocer a quienes de forma positiva nos inspira con sus buenas acciones es un acto que inspira a ser mejores <ImQuotesRight className='comillas' /> </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="seccion-valores">
            <>
               <div className='caja-valores'>
                  <p className="texto">Cada logro tiene consigo valores basados en FEED y los nuevos principios de liderazgo:</p>
                  <div className="valores">
                     <img src={ImgValoresInfo.info_innovacion} alt="" />
                     <img src={ImgValoresInfo.info_enfoque} alt="" />
                     <img src={ImgValoresInfo.info_empoderamiento} alt="" />
                     <img src={ImgValoresInfo.info_iniciativadigital} alt="" />
                     <img src={ImgValoresInfo.info_claro} alt="" />
                     <img src={ImgValoresInfo.info_curiusidad} alt="" />
                     <img src={ImgValoresInfo.info_confianza} alt="" />
                     <img src={ImgValoresInfo.info_cambio} alt="" />
                     <img src={ImgValoresInfo.info_pasion} alt="" />
                     <img src={ImgValoresInfo.info_escucha} alt="" />
                  </div>
               </div>
               <p className='texto-valor'>Reconoce a alguien que con su esfuerzo está haciendo la diferencia y es un modelo que influye.</p>
               <p className='texto-valor'>Es indispensable que los nombres sean escritos correctamente para darle validez al reconocimiento, no usar apodos, ni diminutivos.</p>
            </>
         </div>
      </>
   );
};

export default Informacion;