import toast from "react-hot-toast";

const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opcion = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return fechaNueva.toLocaleDateString("es-ES", opcion);
};

const alertaMensaje = (mensaje, icon) => {
  toast(mensaje, {
    duration: 3000,
    position: "top-right",

    // Styling
    style: {
      border: "2px solid #e99401",
      padding: "`1.5rem",
      color: "#000",
      backgroundColor: "#fff",
      fontWeight: 500,
      textAlign: 'center'
    },
    className: "animate__bounceIn",

    // Custom Icon
    icon,

    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#e99401",
      secondary: "#fff",
    },
  });
};

const textoMensaje = {
  agregarGuitarra: {
    mensaje: "Guitarra agregada al carrito!!",
    icon: "🛒",
  },
  actualizarGuitarra: {
    mensaje: "Cantidad de la guitarra actualizada!!",
    icon: "✅",
  },
  eliminarGuitarra: {
    mensaje: "Guitarra eliminada del carrito!!",
    icon: "❌",
  },
};

export { formatearFecha, alertaMensaje, textoMensaje };
