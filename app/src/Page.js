import { useEffect, useState } from 'react';
import domtoimage from 'dom-to-image';
import Swal from 'sweetalert2';

import Formulario from './components/Formulario';
import Informacion from './components/Informacion';
import Imagen from './components/Imagen';

import './css/App.css';

function Page({ nombre }) {

   const [form, setForm] = useState({
      reconocido: '',
      valores: [],
      reconocedor: '',
      mensaje: ''
   });
   const [arrValores, setArrValores] = useState([]);
   const [descargar, setDescargar] = useState(false);

   const downloadImage = () => {

      setTimeout(() => {
         domtoimage.toJpeg(document.getElementById('certificado'), { quality: 0.95 })
            .then(function (dataUrl) {
               var link = document.createElement('a');
               link.download = `${new Date().getTime()}-inspira.jpg`;
               link.href = dataUrl;
               link.click();

               setTimeout(() => {
                  setDescargar(false);
                  respuestaAlerta();
               }, 1000);
            });
      }, 500);
   }

   const respuestaAlerta = () => {

      Swal.fire({
         title: 'Muchas gracias por tu reconocimiento',
         icon: 'success',
         html:
            'El certificado de tu reconocimiento ya está descargado, puedes enviarlo a la persona que reconociste',
         showCancelButton: false,
         focusConfirm: false,
         confirmButtonText: 'Ok!',
         cancelButtonText: 'No',
      })

   }

   useEffect(() => {
      if (descargar === true) {
         downloadImage();
      }
   }, [descargar]);

   return (
      <div className="App">
         <Informacion />
         <div className="seccionForm">
            <Formulario setArrValores={setArrValores} setDescargar={setDescargar} setForm={setForm} namePage={nombre} />
         </div>
         <div className={descargar === true ? "activa" : "noActiva"}>
            <Imagen arrValores={arrValores} data={form} />
         </div>
      </div>
   );
}

export default Page;
