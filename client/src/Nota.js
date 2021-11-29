const Nota = props => {
<<<<<<< HEAD
  const { title, text, id, updateNote, deleteNote } = props;
=======
  const { title, text, id, deleteNote, updateNote } = props;
>>>>>>> 2b2485b73f27680c7aa4177adb1a4de182687c87
  return (
    <div class="note">
      <div className="nota">
        <h2 class="card-header">{title}</h2>
        <p class="p-3">{text}</p>
        <div class="botones btn-group">
          <button type="button" class="btn btn-danger" onClick={() => deleteNote(id)}>Borrar</button>
          <button type="button" class="btn btn-dark" onClick={() => updateNote(id)}>Editar</button>
        </div >

      </div >
    </div>

  );
};

export default Nota;
