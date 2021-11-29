//app
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nota from './Nota'
import 'bootstrap/dist/css/bootstrap.css';
const App = () => {

  const [notes, setNotes] = useState([]);

  const deleteNote = id => {
    axios.delete('http://localhost:4000/api/notes/' + id)
      .then(res => {
        const notasActualizadas = notes.filter(note => id !== note._id);
        console.log(notasActualizadas);
        setNotes(notasActualizadas);
      })
      .catch(err => console.log(err));
  };

  const updateNote = id => {
    console.log(id);
    const tituloActualizado = prompt('ingrese nuevo titulo');
    const textoActualizado = prompt('ingrese nuevo texto');
    const datos = {
      title: tituloActualizado,
      text: textoActualizado
    };
    axios.put('http://localhost:4000/api/notes/' + id, datos)
      .then(res => {
        const notasActualizadas = notes.map(note => (
          note._id === id ? res.data : note
        ));
        setNotes(notasActualizadas);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    console.log('Vamos a buscar todas las notas');
    axios.get('http://localhost:4000/api/notes')
      .then(res => {
        console.log(res.data);
        setNotes(res.data);
      });
  }, []);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('enviando formulario....');
    console.log(title, text);
    const note = { title, text };
    axios.post('http://localhost:4000/api/notes', note)
      .then(res => {
        console.log(res.data);
        setNotes([res.data, ...notes]);
        setTitle('');
        setText('');
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="container">
      <div className="app">
        <div className="p-3 mb-2 bg-primary text-white">
          <div className="agregar las notas">
            <header>
              <form onSubmit={handleSubmit}>
                <label>Titulo </label>
                <input
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  type="text" />
                <label>Texto </label>
                <input className="m-2  "
                  onChange={e => setText(e.target.value)}
                  value={text}
                  type="text" />
                <input type="button" className="btn btn-light" type="submit" value="guardar" />

              </form>
            </header>
          </div>
        </div>

        <div className="Notas">
          Lista de notas
          <br></br>
          {notes.map(note => {
            return <Nota
              updateNote={updateNote}
              deleteNote={deleteNote}
              key={note._id}
              id={note._id}
              title={note.title} text={note.text} />

          })}
          <div className="fixed-bottom">
           <a href="https://github.com/gastontresca/proyecto-final-g7" >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 16" width="45" height="15">
               <path fillRule="evenodd" d="M18.53 12.03h-.02c.009 0 .015.01.024.011h.006l-.01-.01zm.004.011c-.093.001-.327.05-.574.05-.78 0-1.05-.36-1.05-.83V8.13h1.59c.09 0 .16-.08.16-.19v-1.7c0-.09-.08-.17-.16-.17h-1.59V3.96c0-.08-.05-.13-.14-.13h-2.16c-.09 0-.14.05-.14.13v2.17s-1.09.27-1.16.28c-.08.02-.13.09-.13.17v1.36c0 .11.08.19.17.19h1.11v3.28c0 2.44 1.7 2.69 2.86 2.69.53 0 1.17-.17 1.27-.22.06-.02.09-.09.09-.16v-1.5a.177.177 0 00-.146-.18zM42.23 9.84c0-1.81-.73-2.05-1.5-1.97-.6.04-1.08.34-1.08.34v3.52s.49.34 1.22.36c1.03.03 1.36-.34 1.36-2.25zm2.43-.16c0 3.43-1.11 4.41-3.05 4.41-1.64 0-2.52-.83-2.52-.83s-.04.46-.09.52c-.03.06-.08.08-.14.08h-1.48c-.1 0-.19-.08-.19-.17l.02-11.11c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v3.77s.82-.53 2.02-.53l-.01-.02c1.2 0 2.97.45 2.97 3.88zm-8.72-3.61h-2.1c-.11 0-.17.08-.17.19v5.44s-.55.39-1.3.39-.97-.34-.97-1.09V6.25c0-.09-.08-.17-.17-.17h-2.14c-.09 0-.17.08-.17.17v5.11c0 2.2 1.23 2.75 2.92 2.75 1.39 0 2.52-.77 2.52-.77s.05.39.08.45c.02.05.09.09.16.09h1.34c.11 0 .17-.08.17-.17l.02-7.47c0-.09-.08-.17-.19-.17zm-23.7-.01h-2.13c-.09 0-.17.09-.17.2v7.34c0 .2.13.27.3.27h1.92c.2 0 .25-.09.25-.27V6.23c0-.09-.08-.17-.17-.17zm-1.05-3.38c-.77 0-1.38.61-1.38 1.38 0 .77.61 1.38 1.38 1.38.75 0 1.36-.61 1.36-1.38 0-.77-.61-1.38-1.36-1.38zm16.49-.25h-2.11c-.09 0-.17.08-.17.17v4.09h-3.31V2.6c0-.09-.08-.17-.17-.17h-2.13c-.09 0-.17.08-.17.17v11.11c0 .09.09.17.17.17h2.13c.09 0 .17-.08.17-.17V8.96h3.31l-.02 4.75c0 .09.08.17.17.17h2.13c.09 0 .17-.08.17-.17V2.6c0-.09-.08-.17-.17-.17zM8.81 7.35v5.74c0 .04-.01.11-.06.13 0 0-1.25.89-3.31.89-2.49 0-5.44-.78-5.44-5.92S2.58 1.99 5.1 2c2.18 0 3.06.49 3.2.58.04.05.06.09.06.14L7.94 4.5c0 .09-.09.2-.2.17-.36-.11-.9-.33-2.17-.33-1.47 0-3.05.42-3.05 3.73s1.5 3.7 2.58 3.7c.92 0 1.25-.11 1.25-.11v-2.3H4.88c-.11 0-.19-.08-.19-.17V7.35c0-.09.08-.17.19-.17h3.74c.11 0 .19.08.19.17z">

               </path>
             </svg>
           </a>
         </div>

       </div>
     </div>
   </div >
 );
};



export default App;
