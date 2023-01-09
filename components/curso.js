
import styles from '../styles/curso.module.css';

const Curso = ({ curso }) => {
  const { contenido, imagen, titulo } = curso;
  console.log(imagen.data.attributes.url);
  return (
    <>
      <div className={`contenedor ${styles.cursoGrid}`}>
        <div className={styles.contenido}>
          <h2 className='heading'>{titulo}</h2>
          <p className={styles.texto}>{contenido}</p>
        </div>
      </div>
    </>
  );
};

export default Curso;
