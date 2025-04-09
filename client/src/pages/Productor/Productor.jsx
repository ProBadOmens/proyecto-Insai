import React, { useState } from 'react';
import styles from './productor.module.css';
import '../../main.css';
import icon from '../../components/iconos/iconos';
import SearchBar from "../../components/searchbart/SearchBar";


function Productor() {


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


    const [currentModal, setCurrentModal] = useState(null); // Estado para controlar cuál modal está abierto
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
    const openModal = (modalName) => {
        setCurrentModal(modalName); // Abre el modal especificado
    };

    const closeModal = () => {
        setCurrentModal(null); // Cierra cualquier modal
    };

    const handleSave = () => {
        console.log('Registro guardado');
        closeModal(); // Cierra el modal después de guardar
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
                        src={icon.ver} 
                        alt="Eliminar" 
                        className='iconver' 
                        title="Ver Ficha" 
                        />
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
        <div className={styles.productorContainer}>
        

            {/* Modal /////////////////////////////////////// */}
            {currentModal === 'empleado' && (
                <div className='modalOverlay'>
                    <div className='modal'>
                        
                        <button className='closeButton'  onClick={closeModal}>
                            &times; {/* Ícono de cerrar */}
                        </button>
                        
                        <h2>Registrar Empleado</h2>
                        
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
                                <label htmlFor="empleadoName">Nombre:</label>
                                <input
                                    type="text"
                                    id="empleadoName"
                                    placeholder="Rellene el Campo"
                                    className='input'
                                />
                                <label htmlFor="apellidoEmpleado">Apellido:</label>
                                <input
                                    type="text"
                                    id="apellidoEmpleado"
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
                                <label htmlFor="profesionEmpleado">Profesión:</label>
                                <select 
                                        id="profesionEmpleado"
                                        className='select'
                                    >
                                        <option value="">Agronomía y veterinaria</option>
                                        <option value="">Nutricionista</option>
                                        <option value="">Salud</option>
                                </select>
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="CargoEmpleado">Cargo:</label>
                                <select 
                                        id="CargoEmpleado"
                                        className='select'
                                    >
                                        <option value="">Gerente de Oficina</option>
                                        <option value="">Inspector de Rutina</option>
                                        <option value="">Jefe de Programa</option>
                                </select>
                            </div>

                            <button type="button" className='saveButton' onClick={handleSave}>
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            )};

            {currentModal === 'usuario' && (
                <div className='modalOverlay'>
                    <div className='modal'>
                        <button className='closeButton' onClick={closeModal}>
                            &times;
                        </button>
                        <h2>Registrar Usuario</h2>
                        <form className='modalForm'>
                            {/* Aquí va el formulario del usuario */}
                            <div className='formGroup'>
                                <label htmlFor="Persona">Empleado</label>
                                <select 
                                        id="Persona"
                                        className='select'
                                    >
                                        <option value="">Jose Martines</option>
                                        <option value="">Yulisca Alvares</option>
                                </select>
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="correoName">Correo:</label>
                                <input
                                    type="text"
                                    id="correoName"
                                    placeholder="Ingrese su correo @gmail.com"
                                    className='input'
                                />
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="correoClave">Coloque una Contraseña:</label>
                                <input
                                    type="password"
                                    id="correoClave"
                                    placeholder="******"
                                    className='password'
                                />
                                <label htmlFor="confirClave">Confirme la Contraseña:</label>
                                <input
                                    type="password"
                                    id="confirClave"
                                    placeholder="******"
                                    className='password'
                                />
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="tipoUsuario">Tipo De Usuario</label>
                                <select 
                                        id="tipoUsuario"
                                        className='select'
                                    >
                                        <option value="admin">Administrador</option>
                                        <option value="moder">Moderador</option>
                                </select>
                            </div>

                            <button type="button" className='saveButton' onClick={handleSave}>
                                Guardar
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
                        onClick={() => openModal('empleado')}
                        className='create'
                        title='Registrar Empleado'
                    >
                        <img src={icon.crear} alt="Crear" className='icon' />
                        Productor
                    </button>
                    <button 
                        type='button'
                        onClick={() => openModal('usuario')}
                        className='createuser'
                        title='Registrar Usuario'
                    >
                        <img src={icon.user2} alt="Crear Usuario" className='icon' />
                        Propiedad
                    </button>
                
                    <h2>Productores</h2>
                    
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

export default Productor;