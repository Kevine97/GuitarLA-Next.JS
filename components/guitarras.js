import Link from "next/link";
import Image from "next/image";
import styles from '../styles/guitarra.module.css';

const Guitarras = ({guitarra}) => {
  const { descripcion, imagen, nombre, precio, url } = guitarra?.attributes;
  let imagenGuitarra = imagen?.data?.attributes?.formats?.medium?.url;
  return (
    <div className={`contendor-styles ${styles.guitarra}`}>
      <Image src={imagenGuitarra} alt={nombre} width={600} height={400} />
      <div className={styles.contenido}>
        <h3>{nombre}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
        <p className={styles.precio}>${precio}</p>
      </div>
      <div className={styles.gridPrecio}>
        <Link className="enlace" href={`/guitarras/${url}`}>
          {" "}
          Ver producto{" "}
        </Link>
      </div>
    </div>
  );
};

export default Guitarras;
