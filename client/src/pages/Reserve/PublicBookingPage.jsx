import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import BusinessHeader from "../../components/Booking/BusinessHeader";
import ServiceList from "../../components/Booking/ServiceList";
import BookingModal from "../../components/Booking/BookingModal";
import ReservationCallToAction from "../../components/Booking/ReservationCallToAction";
import BusinessInfoSection from "../../components/Booking/BusinessInfoSection";
import BusinessLocationSection from "../../components/Booking/BusinessLocationSection";
import BusinessFooter from "../../components/Booking/BusinessFooter";

const PublicBookingPage = () => {
  const { slug_url } = useParams();
  const [businessData, setBusinessData] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [paso, setPaso] = useState(1);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});
  const [datosCliente, setDatosCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
    notas: "",
  });
  const [mostrarServicios, setMostrarServicios] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/negocios/slug_url/${slug_url}`
        );
        if (!res.ok) throw new Error("Negocio no encontrado");

        const data = await res.json();
        if (!data || Object.keys(data).length === 0) throw new Error("Vacío");

        setBusinessData(data);
      } catch (error) {
        console.error("Error al cargar el negocio:", error);
        setBusinessData(false);
      }
    };

    fetchBusiness();
  }, [slug_url]);

  const abrirReserva = (servicio) => {
    setServicioSeleccionado(servicio);
    setPaso(1);
    setModalAbierto(true);
    setDia("");
    setHora("");
    setErrores({});
    setCargando(false);
    setDatosCliente({ nombre: "", email: "", telefono: "", notas: "" });
  };

  const mostrarSeccionReserva = () => setMostrarServicios(true);
  const mostrarSeccionInfo = () => setMostrarServicios(false);

  const inicioRef = useRef(null);
  const contactoRef = useRef(null);

  const irAInicio = () => {
    if (inicioRef.current) {
      inicioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const irAContacto = () => {
    if (!mostrarServicios) {
      contactoRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setMostrarServicios(false);
      setTimeout(() => {
        contactoRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  if (businessData === null) return <p>Cargando negocio...</p>;
  if (businessData === false) return <p>Negocio no encontrado.</p>;

  // 🔄 Procesar datos dinámicamente
  const { negocio, dias_laborales, servicios } = businessData;

  const logo = negocio.logo_url || "https://via.placeholder.com/150";
  const nombreEmpresa = negocio.nombre;
  const esloganEmpresa = negocio.eslogan;
  const sobreNosotros = negocio.descripcion;

  const horarios = dias_laborales.map((dia) => {
    const franjas = dia.franjas_horarias.map(
      (f) => `${f.hora_inicio.slice(0, 5)} - ${f.hora_fin.slice(0, 5)}`
    );
    const horarioTexto = dia.habilitado ? franjas.join(", ") : "Cerrado";
    return [dia.dia.slice(0, 3), horarioTexto];
  });

  const serviciosActivos = servicios
    .filter((s) => s.activo === 1 && s.eliminado_en === null)
    .map((s) => ({
      id: s.id,
      nombre: s.nombre,
      descripcion: s.descripcion,
      duracion: s.duracion_minutos,
      precio: parseFloat(s.precio),
      modalidad: s.modalidad === "virtual" ? "Online" : "Presencial",
      direccion: negocio.direccion,
      link: s.modalidad === "virtual" ? s.plataforma_virtual?.link : undefined,
    }));

  const posicion =
    negocio.latitud && negocio.longitud
      ? [parseFloat(negocio.latitud), parseFloat(negocio.longitud)]
      : [-34.6037, -58.3816]; // fallback

  return (
    <div className="bg-blue-600" ref={inicioRef}>
      <BusinessHeader
        logo={logo}
        onInicioClick={irAInicio}
        onContactoClick={irAContacto}
      />

      <ReservationCallToAction
        nombreEmpresa={nombreEmpresa}
        esloganEmpresa={esloganEmpresa}
        onMapClick={mostrarSeccionInfo}
        onReservarClick={mostrarSeccionReserva}
      />

      {!mostrarServicios && (
        <BusinessInfoSection
          horarios={horarios}
          sobreNosotros={sobreNosotros}
        />
      )}

      {mostrarServicios && (
        <ServiceList servicios={serviciosActivos} onReservar={abrirReserva} />
      )}

      <BookingModal
        abierto={modalAbierto}
        onClose={() => setModalAbierto(false)}
        paso={paso}
        setPaso={setPaso}
        servicio={servicioSeleccionado}
        dia={dia}
        setDia={setDia}
        hora={hora}
        setHora={setHora}
        datosCliente={datosCliente}
        setDatosCliente={setDatosCliente}
        errores={errores}
        setErrores={setErrores}
        cargando={cargando}
        setCargando={setCargando}
      />

      {!mostrarServicios && (
        <BusinessLocationSection
          ref={contactoRef}
          address={negocio.direccion}
          phone={negocio.telefono || ""}
          email=""
          whatsapp=""
          website=""
          instagram=""
          position={posicion}
        />
      )}

      <BusinessFooter />
    </div>
  );
};

export default PublicBookingPage;
