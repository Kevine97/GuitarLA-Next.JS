import Layout from "../../components/layout";
import Image from "next/image";
import Link from "next/link";
import routes from "../../routes/routes.js";
import styles from "../../styles/blog.module.css";
import { formatearFecha } from "../../utils/helper";

const ContenidoBlog = ({ blog }) => {
  const { contenido, imagen, publishedAt, titulo } = blog[0]?.attributes;
  return (
    <Layout title={titulo}>
      <article className={`contendor-styles ${styles.post} ${styles.blogAuto}`}>
        <Image
          className="imagen"
          src={imagen?.data[0]?.attributes?.url}
          alt={titulo}
          width={800}
          height={400}
        />
        <div className={styles.contenido}>
          <h3>{titulo}</h3>
          <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
          <p className={styles.texto}> {contenido}</p>
          <Link className="enlace" href={`${routes.Blog.path}`}>
            Ver otros blog
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default ContenidoBlog;

export async function getServerSideProps({ query: { url } }) {
  const respuesta = await fetch(
    `${process.env.API_URL}posts?filters[url]=${url}&populate=imagen`
  );
  const { data: blog } = await respuesta.json();
  return {
    props: {
      blog,
    },
  };
}
