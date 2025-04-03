import React, { useState } from "react";
import styles from "./bitacora.module.css";
import "../../main.css";
import icon from "../../components/iconos/iconos";
import SearchBar from "../../components/searchbart/SearchBar";



    function Bitacora() {

          // Datos iniciales
const datosIniciales = [
    {
        fecha: "10/4/2025",
        dia: "Jueves",
        hora: "10:20 pm",
        accion: "Sesión iniciada",
        tabla: "Control Fitosanitario",
        usuario: "admin",
    },
    {
        fecha: "11/4/2025",
        dia: "Viernes",
        hora: "11:00 am",
        accion: "Registro actualizado",
        tabla: "Inventario",
        usuario: "user1",
    },
    {
        fecha: "11/4/2025",
        dia: "Viernes",
        hora: "11:00 am",
        accion: "Registro actualizado",
        tabla: "Inventario",
        usuario: "user1",
    },
    // Agrega más datos si es necesario
    ];


    const [datosFiltrados, setDatosFiltrados] = useState(datosIniciales);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 2; // Número de elementos por página
        
        // Calcular los datos para la página actual
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentData = datosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
    
            // Cambiar a la página anterior
        const handlePreviousPage = () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        };
    
        // Cambiar a la página siguiente
        const handleNextPage = () => {
            if (indexOfLastItem < datosFiltrados.length) {
                setCurrentPage(currentPage + 1);
            }
        };
    


    // Componente para el encabezado de la tabla
    const EncabezadoTabla = () => (
    <thead>
        <tr>
        <th>Fecha</th>
        <th>Día</th>
        <th>Hora</th>
        <th>Acción</th>
        <th>Tabla</th>
        <th>Usuario</th>
        <th>Detalle</th>
        </tr>
    </thead>
    );

    // Componente para el cuerpo de la tabla
    const CuerpoTabla = ({ datos }) => (
    <tbody>
        {datos.map((item, index) => (
        <tr key={index}>
            <td>{item.fecha}</td>
            <td>{item.dia}</td>
            <td>{item.hora}</td>
            <td>{item.accion}</td>
            <td>{item.tabla}</td>
            <td>{item.usuario}</td>
            <td>
            <div className='iconContainer'>
                <img
                src={icon.ver}
                alt="Ver más"
                className='iconver'
                title="Ver más"
                />
            </div>
            </td>
        </tr>
        ))}
    </tbody>
    );

    // Componente para el pie de la tabla (paginación)
    const PieTabla = () => (
    <div className='tableFooter'>
        <img
        src={icon.flecha3}
        alt="Anterior"
        className='iconBack'
        title="Anterior"
        onClick={handlePreviousPage}
        />
        <span>{currentPage}</span>
        <img
        src={icon.flecha2}
        alt="Siguiente"
        className='iconNext'
        title="Siguiente"
        onClick={handleNextPage}
        />
    </div>
    );


    return (
    <div className={styles.bitacoraContainer}>
    

      {/* Sección de la tabla */}
        <div className='tableSection'>
             {/* Contenedor para filtros y acciones */}
            <div className='filtersContainer'>
                <h2>Bitácora</h2>
                <div className='searchContainer'>
                    <SearchBar data={datosIniciales} onSearch={setDatosFiltrados} />
                    <img src={icon.lupa} alt="Buscar" className='iconlupa' />
                </div>
            </div>
            <table className='table'>
            <EncabezadoTabla />
            <CuerpoTabla datos={currentData} />
            </table>
            <PieTabla />
        </div>
        </div>
    );
    }

export default Bitacora;
