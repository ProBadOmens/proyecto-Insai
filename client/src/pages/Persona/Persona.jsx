import React, { useState } from 'react';
import styles from './persona.module.css';
import '../../main.css';
import icon from '../../components/iconos/iconos';
import SearchBar from "../../components/searchbart/SearchBar";


function Persona() {


      // Datos iniciales
        const datosIniciales = [
        {
            id: "1",
            cedula: "10246789",
            nombre: "José",
            apellido: "Martines",
            contacto: "04122131256",
            cargo: "Gerente de Oficina",
        },
        {
            id: "2",
            cedula: "16547789",
            nombre: "Yulisca",
            apellido: "Alvares",
            contacto: "04122678256",
            cargo: "Gerente de Oficina",
        },
        {
            id: "3",
            cedula: "16547789",
            nombre: "Campanita",
            apellido: "Pampanante",
            contacto: "04122678256",
            cargo: "Lider del Bosque",
        }
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

    // modal //////////////////////////
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
                    <th>Cedula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Contacto</th>
                    <th>Cargo</th>
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
                    <td>{item.cedula}</td>
                    <td>{item.nombre}</td>
                    <td>{item.apellido}</td>
                    <td>{item.contacto}</td>
                    <td>{item.cargo}</td>
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
        <div className={styles.personaContainer}>
        

            {/* Modal /////////////////////////////////////// */}
            {isModalOpen && (
                <div className='modalOverlay'>
                    <div className='modal'>
                        <button className='closeButton' onClick={handleCloseModal}>
                            &times; {/* Ícono de cerrar */}
                        </button>
                        <h2>Registrar Persona</h2>
                        <form className='modalForm'>
                            
                            <div className='formGroup'>
                                <label htmlFor="Cedula">Cedula de Identidad:</label>
                                <input
                                    type="text"
                                    id="Cedula"
                                    placeholder="V-********"
                                    className='input'
                                />
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="personaName">Nombre:</label>
                                <input
                                    type="text"
                                    id="personaName"
                                    placeholder="Rellene el Campo"
                                    className='input'
                                />
                                <label htmlFor="apellidoPersona">Apellido:</label>
                                <input
                                    type="text"
                                    id="apellidoPersona"
                                    placeholder="Rellene el Campo"
                                    className='input'
                                />
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="TLF">Contacto:</label>
                                <input
                                    type="text"
                                    id="TLF"
                                    placeholder="04**-*******"
                                    className='input'
                                />
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="CargoPersona">Cargo:</label>
                                <select 
                                        id="CargoPersona"
                                        className='select'
                                    >
                                        <option value="">Gerente de Oficina</option>
                                        <option value="">Inspector de Rutina</option>
                                        <option value="">Jefe de Programa</option>
                                </select>
                            </div>

                            <button type="button" className='saveButton' onClick={handleSave}>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Tabla */}
            <div className='tableSection'>
                 {/* Contenedor para filtros y acciones */}
                <div className='filtersContainer'>
                    <button 
                        type='button'
                        onClick={handleOpenModal} 
                        className='create'
                        title='Registrar'
                    >
                        Registrar
                    </button>
                    <h2>Personas</h2>
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
                <PieTabla />
            </div>
        </div>
    );
}

export default Persona;