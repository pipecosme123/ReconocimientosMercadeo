import axios from "axios";
import { useState } from "react";

export const useForm = (initialForm, validationForm) => {

   const urlApi = 'https://inspira.mercadeo.col1.co/api';

   const [form, setForm] = useState(initialForm);
   const [error, setError] = useState({});
   const [loading, setLoading] = useState(false);
   const [responseApi, setResponseApi] = useState(null);

   const handleChange = (e) => {

      const target = e.target;
      const value = target.value;
      const name = target.name;

      setForm({
         ...form,
         [name]: value
      });
   };

   const handleBlur = async (e) => {
      handleChange(e);
      let listError = await validationForm(form)
      setError(listError);
      return Object.keys(listError).length
   }

   const handleSubmit = async (e, arrValores) => {
      e.preventDefault();
      form['valores'] = arrValores;

      let valorError = await handleBlur(e);

      if (valorError === 0) {

         setLoading(true);

         axios.post(`${urlApi}/reconocimiento`, form)
            .then((response) => {
               setResponseApi(response.data);
            })
            .catch((error) => {

               setResponseApi('error');
               console.log(error)

            })
            .finally(() => {
               setLoading(false);
            })
      }
   };

   const resetForm = () => {
      document.getElementById("formReconocimiento").reset();
      setForm(initialForm);
      setError({ status: false });
      setResponseApi(null);
   }

   return {
      form,
      error,
      loading,
      responseApi,
      handleChange,
      handleBlur,
      handleSubmit,
      resetForm
   }
}