import Layout from "../components/layout";
import Image from "next/image";
import Link from "next/link";
import { formatearFecha } from "../utils/helper";
import styles from "../styles/blog.module.css";

const Blog = ({ blog }) => {
  // const { contenido, imagen, publishedAt, titulo, url } = blog?.attributes;
  return (
    <Layout
      title="Blog"
      description={"blog de musica, venta de guitarra y mas . . ."}
    >
      <main className="contenedor">
        <h2 className="heading">Blog</h2>
        <div className={styles.blog}>
          {blog?.length > 0 &&
            blog.map((post) => {
              const { contenido, imagen, publishedAt, titulo, url } =
                post.attributes;

              return (
                <article
                  key={post.id}
                  className={`contendor-styles ${styles.post}`}
                >
                  <Image
                    className="imagen"
                    src={imagen.data[0].attributes.formats.small.url}
                    alt={titulo}
                    width={600}
                    height={400}
                  />
                  <div className={styles.contenido}>
                    <h3>{titulo}</h3>
                    <p className={styles.fecha}>
                      {formatearFecha(publishedAt)}
                    </p>
                    <p className={styles.resumen}> {contenido}</p>
                    <Link className="enlace" href={`/blog/${url}`}>
                      Leer post
                    </Link>
                  </div>
                </article>
              );
            })}
        </div>
      </main>
    </Layout>
  );
};

export default Blog;

export async function getServerSideProps({ query: { url } }) {
  const respuesta = await fetch(
    `${process.env.API_URL}${process.env.URL_POST}`
  );
  const { data: blog } = await respuesta.json();
  return {
    props: {
      blog,
    },
  };
}
