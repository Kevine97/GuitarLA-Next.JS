import Layout from "../components/layout";
import Guitarras from "../components/guitarras";
import styles from '../styles/guitarra.module.css';

const Tienda = ({ guitarra }) => {
  return (
    <Layout
      title="Tienda"
      description={"blog de musica, venta de guitarra y mas . . ."}
    >
      <main className="contenedor">
        <h1 className="heading">Nuestra coleccion</h1>
        {guitarra?.length && (
        <div className={styles.guitarrasGrid}>
          {guitarra?.map((guitarra) => (
            <Guitarras key={guitarra.id} guitarra={guitarra} />
          ))}
        </div>
      )}
      </main>
    </Layout>
  );
};

export default Tienda;

export async function getServerSideProps() {
  const respuesta = await fetch(
    `${process.env.API_URL}${process.env.URL_GUITARRA}`
  );
  const { data: guitarra } = await respuesta.json();
  return {
    props: {
      guitarra,
    },
  };
}
