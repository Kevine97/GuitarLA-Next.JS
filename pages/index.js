import Curso from "../components/curso";
import Image from 'next/image'
import Link from 'next/link'
import Guitarras from "../components/guitarras";
import Layout from "../components/layout";
import stylesGuitarra from "../styles/guitarra.module.css";
import stylesCurso from "../styles/curso.module.css";
import stylesBlog from "../styles/blog.module.css";
import { formatearFecha } from "../utils/helper";

export default function Home({ guitarra, curso, blog }) {
  return (
    <>
      <Layout
        title={"Home"}
        description={"blog de musica, venta de guitarra y mas . . ."}
      >
        <main className="contenedor">
          <h2 className="heading"> Nuestra coleccion </h2>
          {guitarra?.length && (
            <div className={stylesGuitarra.guitarrasGrid}>
              {guitarra?.slice(0, 6)?.map((g) => (
                <Guitarras key={g.id} guitarra={g} />
              ))}
            </div>
          )}
        </main>

        <section
          className={stylesCurso.curso}
          style={{
            backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 0.65), rgb(0 0 0 / .7)),url(${curso.attributes.imagen.data.attributes.url})`,
          }}
        >
          <Curso curso={curso.attributes} />
        </section>

        <section className="contenedor">
          <h2 className="heading">Blog</h2>
          {blog?.length && (
            <div className={stylesBlog.blog}>
              {blog.slice(0, 3)?.map((post) => {
                const { contenido, imagen, publishedAt, titulo, url } =
                  post.attributes;

                return (
                  <article
                    key={post.id}
                    className={`contendor-styles ${stylesBlog.post}`}
                  >
                    <Image
                      className="imagen"
                      src={imagen.data[0].attributes.formats.small.url}
                      alt={titulo}
                      width={600}
                      height={400}
                    />
                    <div className={stylesBlog.contenido}>
                      <h3>{titulo}</h3>
                      <p className={stylesBlog.fecha}>
                        {formatearFecha(publishedAt)}
                      </p>
                      <p className={stylesBlog.resumen}> {contenido}</p>
                      <Link className="enlace" href={`/blog/${url}`}>
                        Leer post
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const urlGuitarra = `${process.env.API_URL}${process.env.URL_GUITARRA}`;
  const urlCurso = `${process.env.API_URL}${process.env.URL_CURSO}`;
  const urlBlog = `${process.env.API_URL}${process.env.URL_POST}`;
  const [resGuitarra, resCurso, resBlog] = await Promise.all([
    fetch(urlGuitarra),
    fetch(urlCurso),
    fetch(urlBlog),
  ]);
  const [{ data: guitarra }, { data: curso }, { data: blog }] =
    await Promise.all([resGuitarra.json(), resCurso.json(), resBlog.json()]);
  return {
    props: {
      guitarra,
      curso,
      blog,
    },
  };
}
