import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './empleados.module.css';
import '../../main.css';
import icon from '../../components/iconos/iconos';
import { filterData } from '../../utils/filterData';
import SearchBar from "../../components/searchbart/SearchBar";
import Notification from '../../components/notification/Notification';
import { useNotification } from '../../utils/useNotification';
import { validateField, validationRules } from '../../utils/validation'; 

function Persona() {
    const [datosOriginales, setDatosOriginales] = useState([]); // Estado para los datos originales
    const [datosFiltrados, setDatosFiltrados] = useState([]); // Estado para los datos filtrados
    const [currentPage, setCurrentPage] = useState(1);
    const [currentModal, setCurrentModal] = useState(null);
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        contacto: '',
        profesion: '',
        cargo: ''
    });
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false); // Controla la visibilidad del modal
    const [selectedEmpleadoId, setSelectedEmpleadoId] = useState(null); // Almacena el ID del empleado a eliminar

    const { notifications, addNotification, removeNotification } = useNotification(); // Hook para manejar notificaciones
    const itemsPerPage = 5; // Número de elementos por página
    
    // reiniciar el modal luego de cerrar
    const resetFormData = () => {
        setFormData({
            cedula: '',
            nombre: '',
            apellido: '',
            contacto: '',
            profesion: '',
            cargo: ''
        });
    };

    const [errors, setErrors] = useState({}); // estado para los formularios en tiempo real

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // Validar el campo en tiempo real
    const { regex, errorMessage } = validationRules[id];
    const { valid, message } = validateField(value, regex, errorMessage);

    setErrors({ ...errors, [id]: valid ? '' : message });

    };

    // Filtrar datos en la barra de búsqueda
    const handleSearch = (searchTerm) => {
        const filtered = filterData(datosOriginales, searchTerm, ['cedula', 'nombre', 'apellido', 'contacto', 'cargo']);
        setDatosFiltrados(filtered);
    };


    // Obtener empleados desde el servidor
    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get('http://localhost:4000/empleados');
                setDatosOriginales(response.data); // Guardar los datos originales
                setDatosFiltrados(response.data); // Inicializar los datos filtrados
            } catch (error) {
                console.error('Error obteniendo empleados:', error);
                addNotification('Error al obtener empleados', 'error');
            }
        };
        fetchEmpleados();
    }, []);


    // Crear un nuevo empleado
    const handleSave = async () => {

        // Validar los campos del formulario
    for (const field in formData) {
        console.log(`Validando campo: ${formData}`);
        if (!validationRules[field]) {
            continue; // Omitir campos sin reglas de validación
        }
        const { regex, errorMessage } = validationRules[field];
        const { valid, message } = validateField(formData[field], regex, errorMessage);

        if (!valid) {
            addNotification(message, 'info'); // Mostrar notificación de error
            return; // Detener el envío del formulario
        }
    }

        try {
            const response = await axios.post('http://localhost:4000/empleados', formData);
            setDatosOriginales([response.data, ...datosOriginales]); /// Actualizar datos originales
            setDatosFiltrados([response.data, ...datosFiltrados]);  /// Actualizar datos filtrados
            closeModal();
            addNotification('Empleado registrado con éxito', 'success');
        } catch (error) {
            console.error('Error creando empleado:', error);
            addNotification('Error al registrar empleado', 'error');
        }
    };

    //edita un empleado
    const handleEdit = async () => {
        // Validar solo campos obligatorios
        const camposObligatorios = ['cedula', 'nombre', 'apellido'];
        for (const field of camposObligatorios) {
            const { regex, errorMessage } = validationRules[field];
            const { valid, message } = validateField(formData[field], regex, errorMessage);

            if (!valid) {
                addNotification(message, 'info'); // Mostrar notificación de error
                return; // Detener el envío del formulario
            }
        }


        try {
            const response = await axios.put(`http://localhost:4000/empleados/${formData.id}`, formData);
            // Actualizar los datos originales y filtrados con el registro editado
            const updatedData = datosOriginales.map((empleado) =>
                empleado.id === response.data.id ? response.data : empleado
            );
            setDatosOriginales(updatedData);
            setDatosFiltrados(updatedData);
            closeModal();
            addNotification('Empleado actualizado con éxito', 'success');
        } catch (error) {
            console.error('Error editando empleado:', error);
            addNotification('Error al actualizar empleado', 'error');
        }
    };

    // Eliminar un empleado
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/empleados/${id}`);
            setDatosOriginales(datosOriginales.filter((empleado) => empleado.id !== id)); // Actualizar datos originales
            setDatosFiltrados(datosFiltrados.filter((empleado) => empleado.id !== id)); // Actualizar datos filtrados
            addNotification('Empleado eliminado con éxito', 'error');
        } catch (error) {
            console.error('Error eliminando empleado:', error);
            addNotification('Error al eliminar empleado', 'error');
        }
    };

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = datosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (indexOfLastItem < datosFiltrados.length) setCurrentPage(currentPage + 1);
    };
    // abrir y cerrar modal 
    const openModal = () => {
        resetFormData(); // Reinicia los campos del formulario
        setCurrentModal('empleado'); // Abre el modal
    };
    const closeModal = () => setCurrentModal(null);
    //abri para editar con el modal
    const openEditModal = (empleado) => {
        setFormData(empleado); // Rellenar el formulario con los datos del empleado seleccionado
        setCurrentModal('empleado'); // Abrir el modal
    };
    // abrir modal de confirmacion para eliminar
    const openConfirmDeleteModal = (id) => {
        setSelectedEmpleadoId(id); // Almacena el ID del empleado
        setConfirmDeleteModal(true); // Muestra el modal de confirmación
    };
    // cerrar modal de confirmacion
    const closeConfirmDeleteModal = () => {
        setSelectedEmpleadoId(null); // Limpia el ID seleccionado
        setConfirmDeleteModal(false); // Oculta el modal
    };

    return (
        <div className={styles.personaContainer}>

            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}

            {/* modal registro y editar */}
            {currentModal === 'empleado' && (
                <div className='modalOverlay'>
                    <div className='modal'>
                        <button className='closeButton' onClick={closeModal}>&times;</button>
                        
                        <h2>{formData.id ? 'Editar Empleado' : 'Registrar Empleado'}</h2>
                        
                        <form className='modalForm'>
                            <div className='formColumns'> 

                                <div className='formGroup'>
                                    <label htmlFor="cedula">Cédula:</label>
                                    <input type="text" id="cedula" value={formData.cedula} onChange={handleChange} className='input' placeholder='V-********'/>
                                    {errors.cedula && <span className='errorText'>{errors.cedula}</span>}
                                </div>

                                <div className='formGroup'>
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} className='input' placeholder='Rellene el Campo'/>
                                    {errors.nombre && <span className='errorText'>{errors.nombre}</span>}
                                </div>

                                <div className='formGroup'>
                                    <label htmlFor="apellido">Apellido:</label>
                                    <input type="text" id="apellido" value={formData.apellido} onChange={handleChange} className='input' placeholder='Rellene el Campo'/>
                                    {errors.apellido && <span className='errorText'>{errors.apellido}</span>}
                                </div>

                                <div className='formGroup'>
                                    <label htmlFor="contacto">Contacto:</label>
                                    <input type="text" id="contacto" value={formData.contacto} onChange={handleChange} className='input' placeholder='04**-*******'/>
                                    {errors.contacto && <span className='errorText'>{errors.contacto}</span>}
                                </div>

                                <div className='formGroup'>
                                    <label htmlFor="profesion">Profesión:</label>
                                    <input type="text" id="profesion" value={formData.profesion} onChange={handleChange} className='input' placeholder='Rellene el campo'/>
                                    {errors.profesion && <span className='errorText'>{errors.profesion}</span>}
                                </div>

                                <div className='formGroup'>
                                    <label htmlFor="cargo">Cargo:</label>
                                    <input type="text" id="cargo" value={formData.cargo} onChange={handleChange} className='input' placeholder='Rellene el campo'/>
                                    {errors.cargo && <span className='errorText'>{errors.cargo}</span>}
                                </div>
                            </div>

                            <button 
                                type="button" 
                                className='saveButton' 
                                onClick={formData.id ? handleEdit : handleSave} // Usar handleEdit si es edición, handleSave si es nuevo
                                title={formData.id ? 'Actualizar Empleado' : 'Registrar Empleado'}>
                                    Guardar
                            </button>

                        </form>
                    </div>
                </div>
            )}

            {/* modal de confirmacion para eliminar */}
            {confirmDeleteModal && (
                <div className='modalOverlay'>
                    <div className='modal'>
                        <h2>Confirmar Eliminación</h2>
                        <p>¿Estás seguro de que deseas eliminar este empleado?</p>
                        <div className='modalActions'>
                            <button
                                className='cancelButton'
                                onClick={closeConfirmDeleteModal}
                            >
                                Cancelar
                            </button>
                            <button
                                className='confirmButton'
                                onClick={() => {
                                    handleDelete(selectedEmpleadoId); // Llama a la función de eliminar
                                    closeConfirmDeleteModal(); // Cierra el modal
                                }}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='tableSection'>
                <div className='filtersContainer'>
                    <button 
                        type='button'
                        onClick={openModal} 
                        className='create'
                        title='Registrar Empleado'>
                        <img src={icon.crear} alt="Crear" className='icon' />
                        Registrar
                    </button>

                    <h2>Empleados</h2>

                    <div className='searchContainer'>
                        <SearchBar onSearch={handleSearch} />
                        <img src={icon.lupa} alt="Buscar" className='iconlupa' />
                    </div>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Cédula</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Contacto</th>
                            <th>Profesión</th>
                            <th>Cargo</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((empleado) => (
                            <tr key={empleado.id}>
                                <td>{empleado.cedula}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.contacto}</td>
                                <td>{empleado.profesion}</td>
                                <td>{empleado.cargo}</td>
                                <td>
                                    <div className='iconContainer'>
                                        <img
                                            onClick={() => openEditModal(empleado)}
                                            src={icon.editar}
                                            className='iconeditar'
                                            title='Editar'
                                        />
                                        <img 
                                            onClick={() => openConfirmDeleteModal(empleado.id)} 
                                            src={icon.eliminar} 
                                            className='iconeliminar' 
                                            title='eliminar'
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='tableFooter'>
                    <img onClick={handlePreviousPage} src={icon.flecha3} className='iconBack' title='Anterior'/>
                    <span>{currentPage}</span>
                    <img onClick={handleNextPage} src={icon.flecha2} className='iconNext' title='Siguiente'/>
                </div>
            </div>
        </div>
    );
}

export default Persona;