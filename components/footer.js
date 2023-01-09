import Link from "next/link";
import routes from "../routes/routes";
import styles from "../styles/footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`contenedor ${styles.contenido}`}>
        <nav className={styles.navegacion}>
          <Link href={routes.Home.path}>Inicio</Link>
          <Link href={routes.Nosotros.path}>Nosotros</Link>
          <Link href={routes.Tienda.path}>Tienda</Link>
          <Link href={routes.Blog.path}>Blog</Link>
        </nav>
        <div>
          <p className={styles.copyrigth}>
            {" "}
            &copy; Todos los derechos reservador {new Date().getFullYear()}
          </p>
          <p className={styles.nameFooter}>Kevin Esquivel</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
