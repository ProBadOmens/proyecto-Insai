import React, { useState } from 'react';
import styles from './usuario.module.css';
import '../../main.css';
import icon from '../../components/iconos/iconos';
import SearchBar from "../../components/searchbart/SearchBar";


function Usuario() {

    // Datos iniciales
    const datosIniciales = [
        {
            id: "1",
            usuario: "runsaijose@gmail.com",
            tipo: "Administrador",
            empleado: "José Martines",
        },
        {
            id: "2",
            usuario: "insaiyulisaca@gmail.com",
            tipo: "Moderador",
            empleado: "Yulisca Alvares",
        },
        {
            id: "3",
            usuario: "exampleuser@gmail.com",
            tipo: "Usuario",
            empleado: "Juan Pérez",
        },
        {
            id: "4",
            usuario: "anotheruser@gmail.com",
            tipo: "Usuario",
            empleado: "Ana López",
        },
        // Agrega más datos si es necesario
        ];  

    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
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
    
    // modal//////////////////////////////
    const handleOpenModal = () => {
        setIsModalOpen(true); // Abre el modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

    const handleSave = () => {
        // Aquí puedes manejar la lógica para guardar el registro
        console.log('Registro guardado');
        setIsModalOpen(false); // Cierra el modal después de guardar
    };

    
        // Componente para el encabezado de la tabla
        const EncabezadoTabla = () => (
            <thead>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Tipo</th>
                <th>Empleado</th>
                <th>Acción</th>
            </tr>
        </thead>
        );
         // Componente para el cuerpo de la tabla
        const CuerpoTabla = ({ datos }) => (
            <tbody>
                {datos.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.usuario}</td>
                    <td>{item.tipo}</td>
                    <td>{item.empleado}</td>
                    <td>
                    <div className='iconContainer'>
                        <img
                        src={icon.editar}
                        alt="Editar"
                        className='iconeditar'
                        title="Editar"
                        />
                        <img 
                        src={icon.eliminar} 
                        alt="Eliminar" 
                        className='iconeliminar' 
                        title="Eliminar" 
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
        <div className={styles.usuarioContainer}>
        

            {/* Modal */}
            {isModalOpen && (
                <div className='modalOverlay'>
                    <div className='modal'>
                        <button className='closeButton' onClick={handleCloseModal}>
                            &times; {/* Ícono de cerrar */}
                        </button>
                        <h2>Registrar Usuario</h2>
                        <form className='modalForm'>
                            
                        </form>
                    </div>
                </div>
            )}

            {/* Tabla */}
            <div className='tableSection'>
                 {/* Contenedor para filtros y acciones */}
                <div className='filtersContainer'>
                    <h2>Usuarios</h2>
                    <div className='searchContainer'>
                        <SearchBar data={datosIniciales} onSearch={setDatosFiltrados} />
                        <img src={icon.lupa} alt="Buscar" className='iconlupa' />
                    </div>
                </div>
            
                <table className='table'>
                    <EncabezadoTabla />
                    <CuerpoTabla datos={currentData} />
                </table>
                 {/* Contenedor para Footer en tabla */}
                <PieTabla/>
            </div>
        </div>
    );
}

export default Usuario;