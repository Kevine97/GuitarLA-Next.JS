import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import routes from "../routes/routes";
import styles from "../styles/header.module.css";
import Burguer from "./burguer";
import Spiner from "./spiner";
import AppContext from "./AppContext";

const Header = () => {

  const {cantidadCarrito} = useContext(AppContext);


  const [scrollY, setScrollY] = useState(0);
  const [scrollYActive, setScrollYActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const location = useRouter();

  const buttonTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleOnclick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const verificarScrollY = () => {
      const sizeResolucion = 280;

      if (scrollY >= sizeResolucion) {
        setScrollYActive(true);
      } else {
        setScrollYActive(false);
      }
    };
    verificarScrollY();
  }, [scrollY]);

  useEffect(() => {
    if (!clicked) {
      document.querySelector("body").style.overflow = "initial";
    } else {
      document.querySelector("body").style.overflow = "hidden";
    }
  }, [clicked]);

  useEffect(() => {
    setClicked(false);
  }, [location.pathname]);
  
  return (
    <header className={`${styles.header} ${location.pathname === routes.Home.path ? styles.maxWidth : ''}`}>
      <Spiner/>
      <div className={`contenedor ${styles.barra}`}>
        <Link href={routes.Home.path}>
          <Image className={styles.logo} src="/img/logo.svg" height={250} width={250} alt="Logo image" />
        </Link>
        <nav className={`${styles.navegacion} ${clicked ? styles.activeBurguer : ''}`}>
          <Link className={`${location.pathname === routes.Home.path ? styles.active: ''}`} href={routes.Home.path}>Inicio</Link>
          <Link className={`${location.pathname === routes.Nosotros.path ? styles.active: ''}`} href={routes.Nosotros.path}>Nosotros</Link>
          <Link className={`${location.pathname === routes.Tienda.path ? styles.active: ''}`} href={routes.Tienda.path}>Tienda</Link>
          <Link className={`${location.pathname === routes.Blog.path ? styles.active: ''}`} href={routes.Blog.path}>Blog</Link>
          <Link className={`${styles.carritoNavegacion}`} href={routes.Carrito.path}>
            <Image
              src="/img/carrito.png"
              height={25}
              width={25}
              alt="Carrito de compra"
            />
            <p className={styles.cantidadCariito}>{cantidadCarrito}</p>
          </Link>
        </nav>
        <Burguer clicked={clicked} handleOnclick={handleOnclick} />
      </div>

      {location.pathname === routes.Home.path && (
        <div className={styles.gridHeader}>
          <div className={styles.infoGuitarra}>
            <h2>
              Guitarra
              <span> Borland</span>
            </h2>
            <p className={styles.descripcionHeader}>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Mauris sit amet pharetra quam,
              ut interdum dolor. Donec convallis leo id tincidunt volutpat.
              Integer fermentum
            </p>
            <p className={styles.precioHeader}>$459</p>
            <Link className={styles.btnOutline} href={routes.Tienda.path}>
              Descubre mas guitarras
            </Link>
          </div>
          <div className={`${styles.infoImg} animate__bounceIn`}>
            <Image src='/img/guitarra_02.avif' alt="Imagen Guitarra" width={530} height={990}/>
          </div>
        </div>
      )}

      {scrollYActive && (
        <div className="scollButtons animate__heartBeat" onClick={buttonTop}>
          <img src='/img/icon.png' alt="Scroll top" />
        </div>
      )}
    </header>
  );
};

export default Header;
