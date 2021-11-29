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
       </div>
     </div>
   </div >
 );
};



export default App;
