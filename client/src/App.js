import { useState } from 'react';
import Axios from 'axios';
const App = () => {

  const[tittle, setTitle]= useState('');
  const[text, setText]= useState('');
  const handleSubmit = e =>{
    e.preventDefault();
    console.log('Enviando formulario...');
    console.log(tittle, text);
    const note = {tittle, text};
    Axios.post('http://localhost:4000/api/notes', note)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  };
  return(

    <div className="app">
        <div className="agregar nota">
            <form onSubmit={handleSubmit}>
            <label>titulo</label>
            <input
            onChange={e => setTitle(e.target.value)}
            value={tittle}
             type="text"
             />
            <label>Texto</label>
            <input
            onChange={e => setText(e.target.value)}
             value={text}
             type="text"
             />
            <input type="submit" value="Guardar" />
             </form>
        </div>
        <div className='notas'>
        </div>
    </div>
  );
};

export default App;
