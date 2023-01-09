import { useState, useContext } from "react";
import Layout from "../../components/layout";
import routes from "../../routes/routes.js";
import Link from "next/link";
import Image from "next/image";
import Message from "../../utils/message";
import styles from '../../styles/guitarra.module.css'
import { alertaMensaje, textoMensaje } from "../../utils/helper";
import { Toaster } from "react-hot-toast";
import AppContext from "../../components/AppContext";

const ProudctoGuitarra = ({ guitarra}) => {

  const content = useContext(AppContext);
  const {agregarCarrito} = content;
  
  const [cantidad, setCantidad] = useState(0);
  const [validacion, setValidacion] = useState(false);
  const { nombre, descripcion, precio, imagen } = guitarra[0]?.attributes;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cantidad < 1) {
        setValidacion(true);
  
        setTimeout(() => {
          setValidacion(false);
        }, 2000);
  
        return;
      }

      const guitarraSeleccionada = {
        id: guitarra[0]?.id,
        imagen: imagen.data.attributes.url,
        nombre,
        precio,
        cantidad,
      };
      alertaMensaje(textoMensaje.agregarGuitarra.mensaje, textoMensaje.agregarGuitarra.icon);
      agregarCarrito(guitarraSeleccionada);
  };

  const handleActualizarCantidad = (e) => {
    setCantidad(+e.target.value);
  };


  return (
    <Layout title={nombre} description="Venta de guitarras y mas ...">
      <Toaster/>
        <main className="contenedor">
        <div className={`${styles.guitarra}`}>
        <Image src={imagen.data.attributes.url} alt={nombre} className="imagen" width={600} height={400}/>
        <div className={styles.contenido}>
          <h3>{nombre}</h3>
          <p className={styles.texto}>{descripcion}</p>
          <p className={styles.precio}>${precio}</p>
          <form onSubmit={handleSubmit} className={styles.formulario}>
            {validacion && <Message mensaje={"Seleccione un cantidad"} />}
            <label htmlFor="cantidad">Cantidad</label>
            <select
              name="cantidad"
              id="cantidad"
              onChange={(e) => handleActualizarCantidad(e)}
            >
              <option value="0">Seleccione</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input
              className="enlace"
              type="submit"
              value="agregar al carrito"
            />
          </form>
        </div>
        <div className={styles.gridPrecio}>
          <Link className="enlace" href={routes.Tienda.path}>
            {" "}
            Ver más guitarras{" "}
          </Link>
        </div>
      </div>
        </main>
    </Layout>
  );
};

export default ProudctoGuitarra;

// export async function getStaticPaths() {
//   const respuesta = await fetch(
//     `${process.env.API_URL}${process.env.URL_GUITARRA}`
//   );
//   const { data } = await respuesta.json();
//   const paths = data.map((guitarra) => ({
//     params: {
//       url: guitarra.attributes.url,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params: {url} }) {
//   const respuesta = await fetch(
//     `${process.env.API_URL}guitarras?filters[url]=${url}&populate=imagen`
//   );
//   const { data: guitarra } = await respuesta.json();

//   console.log('AQUII: ', guitarra);
//   return {
//     props: {
//       guitarra,
//     },
//   };
// }

export async function getServerSideProps({ query: { url } }) {
  const respuesta = await fetch(
    `${process.env.API_URL}guitarras?filters[url]=${url}&populate=imagen`
  );
  const { data: guitarra } = await respuesta.json();
  return {
    props: {
      guitarra,
    },
  };
}
