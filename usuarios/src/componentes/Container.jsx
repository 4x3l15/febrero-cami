import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import './Container.css';

const Container = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsuarios(respuesta.data);
    } catch (err) {
      setError("Error al obtener los usuarios");
    }
    setCargando(false);
  };

  const buscarUsuario = () => {
    const termino = inputRef.current.value.toLowerCase();
    if (termino === "") {
      obtenerUsuarios();
      return;
    }
    setUsuarios((prevUsuarios) =>
      prevUsuarios.filter((usuario) => usuario.name.toLowerCase().includes(termino))
    );
  };

  const limpiar = () => {
    inputRef.current.value = "";
    obtenerUsuarios();
  };

  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <h2>Lista de Usuarios</h2>
        <input
          type="text"
          placeholder="Buscar usuario"
          ref={inputRef}
        />
        <div className="buttons">
          <button onClick={buscarUsuario}>Buscar</button>
          <button onClick={limpiar}>Limpiar</button>
        </div>
        {cargando && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.name} - {usuario.email}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Container;
