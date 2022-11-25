import axios from "axios";
import { useState } from "react";
// import {  } from '../hooks/RoutersLinks';

export const useForm = (initialForm, validationForm) => {

   const urlApi = '';

   const [form, setForm] = useState(initialForm);
   const [error, setError] = useState({});
   const [loading, setLoading] = useState(false);
   const [responseApi, setResponseApi] = useState(null);
   const [autorizar, setAutorizar] = useState(false);


   const handleChange = (e) => {

      const target = e.target;
      const value = target.value;
      const name = target.name;

      setForm({
         ...form,
         [name]: value
      });
   };

   const handleBlur = (e) => {
      handleChange(e);
      setError(validationForm(form));
   }

   const handleSubmit = (e, arrValores) => {
      e.preventDefault();
      form['valores'] = arrValores;

      handleBlur(e);

      if (Object.keys(error).length === 0) {

         setLoading(true);

         axios.post(`${urlApi}/index.php`, form)
            .then((response) => {

               setResponseApi(response.data);
               if (response.data === true) {
                  resetForm();
               }

            })
            .catch((error) => {

               setResponseApi('error');
               console.log(error)

            })
            .finally(() => {

               setLoading(false);
               setTimeout(() => {
                  setResponseApi(null);
               }, 5000);

            })
      }
   };

   const resetForm = () => {
      document.getElementById("formReconocimiento").reset();
      setForm(initialForm);
      setError({ status: false })
   }

   return {
      form,
      error,
      loading,
      responseApi,
      autorizar,
      handleChange,
      handleBlur,
      handleSubmit
   }
}