import Formulario from './components/Formulario';
import Informacion from './components/Informacion';

import './css/App.css';

function Page() {

   return (
      <div className="App">
         <Informacion />
         <div className="seccionForm">
            <Formulario />
         </div>
      </div>
   );
}

export default Page;
