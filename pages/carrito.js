import { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import Image from 'next/image'
import Spiner from '../components/spiner';
import styles from "../styles/carrito.module.css";
import Layout from "../components/layout";
import AppContext from "../components/AppContext";

const Carrito = () => {
  const content = useContext(AppContext);
  const {carrito, actualizarCantidad, eliminarGuitarra} = content;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, guitarra) => total + guitarra.cantidad * guitarra.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);
  return (
    <Layout
      title="Carrito"
      description={"blog de musica, venta de guitarra y mas . . ."}
    >
      <main className="contenedor">
        <Spiner />
        {carrito.length === 0 ? (
          <h1 className="error">Carrito Vacio</h1>
        ) : (
          <>
            <h1 className="heading">Carrito de compras</h1>
            <div className={styles.contenido}>
              <div className={styles.carrito}>
                <h2>Articulos</h2>
                {carrito?.map((guitarra) => (
                  <div className={`contendor-styles ${styles.producto}`} key={guitarra.id}>
                    <div className={styles.imgCarrito}>
                      <Image
                        src={guitarra.imagen}
                        alt={`imagen-${guitarra.nombre}`}
                        width={130}
                        height={285}
                      />
                    </div>
                    <div className={styles.resumenCarrito}>
                      <p className={styles.nombre}>
                        Nombre: <span>{guitarra.nombre}</span>
                      </p>
                      <p className={styles.cantidad}>Cantidad</p>
                      <select
                        className={`${styles.selectCantidad} contendor-styles`}
                        value={guitarra.cantidad}
                        onChange={(e) =>
                          actualizarCantidad({
                            cantidad: +e.target.value,
                            id: guitarra.id,
                          })
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <p className={styles.precio}>
                        Precio: $ <span>{guitarra.precio}</span>
                      </p>
                      <p className={styles.subTotal}>
                        Subtotal: ${" "}
                        <span>{guitarra.cantidad * guitarra.precio}</span>
                      </p>
                    </div>
                    <button
                      className={styles.btnEliminar}
                      type="button"
                      onClick={() => eliminarGuitarra(guitarra.id)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <aside className={`${styles.resumen} contendor-styles`}>
                <h3>Resumen del pedido</h3>
                <p>
                  Total a pagar:$ <span className={styles.totalPagar}>{total}</span>
                </p>
              </aside>
            </div>
          </>
        )}
        <Toaster />
      </main>
    </Layout>
  );
};

export default Carrito;
