const Nota = props => {
  const { title, text } = props;
  return (
    <div className="nota">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};

export default Nota;
