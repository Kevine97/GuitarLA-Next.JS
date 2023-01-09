import Layout from "../components/layout";
import styles from "../styles/nosotros.module.css";
import Image from 'next/image';

const Nosotros = ({ nosotros }) => {
  const { Titulo, contenido, imagen } = nosotros?.attributes;
  return (
    <Layout
      title="Nosotros"
      description={"blog de musica, venta de guitarra y mas . . ."}
    >
      <main className="nosotros contenedor">
        <h2 className="heading">{Titulo}</h2>
        <div className={`${styles.contenido} contendor-styles`}>
          <Image src={imagen.data.attributes.url} width={500} height={500} alt="Imagen sobre nosotros" />
          <div>
            <p className="preWrap">{contenido}</p>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default Nosotros;

export async function getServerSideProps() {
  const respuesta = await fetch(
    `${process.env.API_URL}${process.env.URL_NOSOTROS}`
  );
  const { data: nosotros } = await respuesta.json();
  return {
    props: {
      nosotros,
    },
  };
}
