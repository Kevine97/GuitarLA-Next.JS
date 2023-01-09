import "../styles/globals.css";
import { useState, useEffect, createContext } from "react";
import { alertaMensaje, textoMensaje } from "../utils/helper";
import AppContext from "../components/AppContext";

export default function App({ Component, pageProps }) {
  const guitarraLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) || [] : [];
  const [carrito, setCarrito] = useState(guitarraLS);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [paginaLista, setPaginaLista] = useState(false);
  useEffect(() => {
    setPaginaLista(true)
  }, [])
  
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));

    carrito?.length > 0 &&
      setCantidadCarrito(
        carrito.reduce((total, guitarra) => total + guitarra.cantidad, 0)
      );
  }, [carrito]);

  const agregarCarrito = (guitarra) => {
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      const guitarraActualizada = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad;
        }
        return guitarraState;
      });

      setCarrito(guitarraActualizada);
    } else {
      setCarrito([...carrito, guitarra]);
    }
  };

  const actualizarCantidad = (guitarra) => {
    const guitarraActualizada = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }
      return guitarraState;
    });
    alertaMensaje(
      textoMensaje.actualizarGuitarra.mensaje,
      textoMensaje.actualizarGuitarra.icon
    );
    setCarrito(guitarraActualizada);
  };

  const eliminarGuitarra = (id) => {
    const guitarraActualizada = carrito.filter(
      (guitarraState) => guitarraState.id !== id
    );
    alertaMensaje(
      textoMensaje.eliminarGuitarra.mensaje,
      textoMensaje.eliminarGuitarra.icon
    );
    setCarrito(guitarraActualizada);
  };
  return (
    paginaLista ? 
    <AppContext.Provider
    value={{
      carrito,
      cantidadCarrito,
      agregarCarrito,
      actualizarCantidad,
      eliminarGuitarra,
    }}
    >
      <Component
      {...pageProps}
    />
    </AppContext.Provider>
    : null
  );
}
