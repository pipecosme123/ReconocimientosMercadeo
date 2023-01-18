import React, { useEffect, useState } from 'react';

import { Valores } from '../constants/Valores';
import { useForm } from '../hooks/useForm';

import BottonValor from './BottonValor';
import Spinner from './Spinner';


import '../css/Formulario.css';
import axios from 'axios';
import { urlApi } from '../constants/RoutersLinks';
import Swal from 'sweetalert2';

const initialForm = {
   reconocido: '',
   valores: [],
   reconocedor: '',
   mensaje: ''
}

const validationForm = async (form) => {
   let errors = {};

   let limMsg = 150;

   if (form['reconocido'] === '') {
      errors['reconocido'] = "Debes seleccionar el nombre de una persona";
   } else if (form['reconocido'] === form['reconocedor']) {
      errors['reconocido'] = "El reconocido y reconocedor no pueden ser la misma persona";
   }

   if (form['reconocedor'] === '') {
      errors['reconocedor'] = "Debes seleccionar el nombre de una persona";
   } else if (form['reconocido'] === form['reconocedor']) {
      errors['reconocedor'] = "El reconocido y reconocedor no pueden ser la misma persona";
   }

   if (form['mensaje'] === '') {
      errors['mensaje'] = "Debes llenar este campo";
   } else if (form['mensaje'].length > limMsg) {
      errors['mensaje'] = `Límite de caracteres superado. ${limMsg} max.`;
   }

   if (form['valores'].length === 0) {
      errors['valores'] = "Debes seleccionar como mínimo un valor a reconocer";
   }

   return errors;
}

const Formulario = () => {

   const {
      form,
      error,
      loading,
      responseApi,
      handleChange,
      handleSubmit,
      resetForm
   } = useForm(initialForm, validationForm);

   const [listNombres, setListNombres] = useState([]);

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



   const contador = async () => {
      let cont = 0;

      for (const property in checked) {
         if (checked[property] === true) {
            cont += 1;
         }
      }

      return cont;
   }

   const arrayValores = async () => {

      let arr = [];
      let arrFoto = [];

      for (const property in checked) {
         if (checked[property] === true) {
            let res = Valores.filter((elem) => elem.status === property)
            arr.push(res[0].valor);
            arrFoto.push(res[0])
         }
      }
      // console.log('entro');

      return {
         arr,
         arrFoto
      };
   }

   const handleChacked = async (valor) => {

      let cantidad = await contador();

      if (!checked[valor]) {
         if (cantidad < 3) {
            setChecked({
               ...checked,
               [valor]: true
            })
         }
      } else {
         setChecked({
            ...checked,
            [valor]: false
         })
      }

   }

   const handleSubmitInt = async (e) => {

      let valores = await arrayValores();
      handleSubmit(e, valores.arr);
   }

   const resetFormComp = () => {
      resetForm();
      setChecked({
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
      })
   }

   const respuestaAlerta = () => {

      Swal.fire({
         title: 'Muchas gracias por tu reconocimiento',
         icon: 'success',
         html:
            'En los próximos minutos, tu reconocimiento llegará por correo electrónico a la persona que reconociste',
         focusConfirm: true,
         confirmButtonText: 'Ok!',
      })

      resetFormComp();

   }

   useEffect(() => {

      const getNombres = async () => {
         axios.get(`${urlApi}/nombres`)
            .then((response) => {
               setListNombres(response.data);
            })
            .catch((error) => {
               console.log(error)
            })
      }

      getNombres();

   }, []);

   return (
      <>
         <div className='Formulario'>
            <form id='formReconocimiento' onSubmit={(e) => handleSubmitInt(e)}>
               <h1>FORMULARIO DE RECONOCIMIENTO</h1>

               <div className="inputTextName">
                  <label htmlFor="reconocido">A quien se le reconoce:</label>
                  <select className={`selectNombre ${!error['reconocido'] ? "" : "error"}`} name="reconocido" id="reconocido" defaultValue={""} onChange={handleChange}>
                     <option value="" disabled>Selecciona un nombre</option>
                     {listNombres.map((item, index) => (
                        <option key={index} value={item.nombres}>{item.nombres}</option>
                     ))}
                  </select>
                  {error.reconocido && <span className='error'>{error['reconocido']}</span>}
               </div>
               <h4>Seleccione hasta 3 valores que desea reconocer*</h4>
               <div className={`opciones ${error.valores ? 'error' : ''}`}>
                  <div className='row'>
                     {Valores.map((data, index) => {
                        return (
                           <BottonValor key={index} data={data} selected={checked[data.status]} handleChacked={handleChacked} />
                        )
                     })}
                  </div>
                  {error.valores && <span className='error'>{error['valores']}</span>}
               </div>
               <div className="mensageAdicional">
                  <h4>Dedica un mensaje personalizado</h4>
                  <textarea className={form['mensaje'].length > 150 || error.mensaje ? 'error' : ''} name="mensaje" placeholder='150 max.' autoComplete="off" onChange={handleChange} />
                  <span className={form['mensaje'].length > 150 ? 'error' : 'normal'}>{`${form['mensaje'].length} / 150`}</span>
                  {error.mensaje && <span className='error'>{error['mensaje']}</span>}
               </div>
               <div className="inputTextName">
                  <label htmlFor="reconocedor">Quien hace el reconocimiento:</label>
                  <select className={`selectNombre ${!error['reconocedor'] ? "" : "error"}`} name="reconocedor" id="reconocedor" defaultValue={""} onChange={handleChange}>
                     <option value="" disabled>Selecciona un nombre</option>
                     {listNombres.map((item, index) => (
                        <option key={index} value={item.nombres}>{item.nombres}</option>
                     ))}
                  </select>
                  {error.reconocedor && <span className='error'>{error['reconocedor']}</span>}
               </div>

               <input type="submit" value="Guardar" />
            </form>
            {loading === true && <Spinner />}
            {responseApi === true && respuestaAlerta()}
         </div>

      </>
   );
};

export default Formulario;