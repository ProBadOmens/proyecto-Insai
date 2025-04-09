import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './menu.module.css';
import icon from '../../components/iconos/iconos';

function NavItem({ id, openSubmenus, setOpenSubmenus, selectedItem, setSelectedItem, iconSrc, label, linkTo, children }) {
    const isOpen = openSubmenus[id]; // Verifica si este submenú está abierto
    const isSelected = selectedItem === id; // Verifica si este ítem está seleccionado

    const handleClick = () => {
        if (children) {
            // Solo alterna el submenú si hay hijos
            setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));
        }
        setSelectedItem(id); // Marca este ítem como seleccionado
    };

    return (
        <li
            className={`${styles.navItem} ${isOpen ? styles.open : ''} ${isSelected ? styles.selected : ''}`}
            onClick={handleClick}
        >
            {linkTo ? (
                <Link to={linkTo} className={styles.navLink}>
                    <img src={iconSrc} alt={label} className={styles.icon} />
                    <span className={styles.navLabel}>{label}</span>
                </Link>
            ) : (
                <div className={styles.navLink}>
                    <img src={iconSrc} alt={label} className={styles.icon} />
                    <span className={styles.navLabel}>{label}</span>
                    {/* Renderiza la flecha solo si hay hijos */}
                    {children && (
                        <img
                            src={icon.flecha}
                            alt="Flecha"
                            className={`${styles.iconFlecha} ${isOpen ? styles.iconRotated : ''}`}
                        />
                    )}
                </div>
            )}
            {/* Submenús, si existen */}
            {children && (
                <div className={`${styles.submenuContainer} ${isOpen ? styles.submenuOpen : ''}`}>
                    {children}
                </div>
            )}
        </li>
    );
}

function Menu() {
    const [openSubmenus, setOpenSubmenus] = useState({}); // Estado para manejar los submenús abiertos
    const [selectedItem, setSelectedItem] = useState(null); // Estado para manejar el ítem seleccionado
    const [isCollapsed, setIsCollapsed] = useState(true); // Estado para manejar el colapso del menú
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Realiza la solicitud al servidor para cerrar sesión
            const response = await fetch('http://localhost:4000/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Envía el token si es necesario
                },
            });

            if (response.ok) {
                console.log('Logout exitoso');
                // Limpia el estado del cliente
                localStorage.removeItem('token'); // Elimina el token del almacenamiento local
                navigate('/'); // Redirige al usuario al login
            } else {
                console.error('Error al cerrar sesión:', await response.text());
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };


    return (
        <div
            className={`${styles.container} ${isCollapsed ? styles.collapsed : ''}`}
            onMouseEnter={() => setIsCollapsed(false)} // Expande el menú al pasar el mouse
            onMouseLeave={() => setIsCollapsed(true)} // Colapsa el menú al quitar el mouse
        >
            <nav className={styles.sidebar}>
                <ul className={styles.navList}>
                    <NavItem
                        id="panel"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.homeIcon}
                        label="Panel Principal"
                        linkTo="/Home"
                    />
                    
                     {/* Medidas de Prevencion ///////////////////7 */}
                    <NavItem
                            id="agentesAgropecuarios"
                            openSubmenus={openSubmenus}
                            setOpenSubmenus={setOpenSubmenus}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            iconSrc={icon.cliente}
                            label="Agentes Agropecuarios"
                        >
                        <ul className={styles.submenu}>
                            <li>
                                <Link
                                    to="/Productor"
                                    className={`${styles.submenuItem} ${selectedItem === 'productores' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('productores')}
                                >
                                    Productores 
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Animal"
                                    className={`${styles.submenuItem} ${selectedItem === 'propiedades' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('propiedades')}
                                >
                                    Propiedades
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'cultivos' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('cultivos')}
                                >
                                    Cultivos
                                </Link>
                            </li>
                        </ul>
                    </NavItem>

                   {/* Control Sanitarios ///////////////////7 */}
                    <NavItem
                            id="sanitario"
                            openSubmenus={openSubmenus}
                            setOpenSubmenus={setOpenSubmenus}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            iconSrc={icon.escudomalo}
                            label="Control Sanitario"
                        >
                        <ul className={styles.submenu}>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'operacionesfitosanitarias' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('operacionesfitosanitarias')}
                                >
                                    Operaciones Fitosanitarias
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Animal"
                                    className={`${styles.submenuItem} ${selectedItem === 'cuarentenafitosanitaria' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('cuarentenafitosanitaria')}
                                >
                                    Ficha Sanitaria
                                </Link>
                            </li>
                        </ul>
                    </NavItem>

                    {/* Centro  de Operaciones ////////////////////////// */}
                    <NavItem
                        id="operaciones"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.altavoz}
                        label="Centro de Operaciones"
                    >
                        <ul className={styles.submenu}>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'operaciones' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('operaciones')}
                                >
                                    Operaciones de Campo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'medidas' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('medidas')}
                                >
                                    Medidas de Prevención    
                                    {/* programas */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'controlvacunacion' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('controlvacunacion')}
                                >
                                    Epidemiologías Fitosanitarias
                                </Link>
                            </li>
                        </ul>
                    </NavItem>
                     {/* Insumos /////////////////////// */}
                    <NavItem
                        id="solicitud"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.escudobien}
                        label="Solicitudes"
                        linkTo="/*"
                    />
                    {/* Insumos /////////////////////// */}
                    <NavItem
                        id="recursos"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.cubo}
                        label="Gestión de Recursos"
                        linkTo="/*"
                    />
                    {/*Administradorrrrrrrrrrrrrrrrrrrrr///////////7  */}
                    <NavItem
                        id="admin"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.admin}
                        label="Administrador"
                    >
                        <ul className={styles.submenu}>
                            <li>
                                <Link
                                    to="/Empleados"
                                    className={`${styles.submenuItem} ${selectedItem === 'empleados' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('empleados')}
                                >
                                    Empleados
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Usuario"
                                    className={`${styles.submenuItem} ${selectedItem === 'usuario' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('usuario')}
                                >
                                    Usuarios
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Bitacora"
                                    className={`${styles.submenuItem} ${selectedItem === 'bitacora' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('bitacora')}
                                >
                                    Bitacora
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Cargo"
                                    className={`${styles.submenuItem} ${selectedItem === 'cargo' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('cargo')}
                                >
                                    Cargos
                                </Link>
                            </li>
                        </ul>
                    </NavItem>
                </ul>
                {/* Footer con el botón de salida */}
                <footer className={styles.footer}>
                    <button
                        className={styles.logoutButton}
                        onClick={handleLogout}
                        title="Salir del sistema"
                    >
                        <img src={icon.salida} alt="Terminar Sesión" className={styles.iconsalida} />
                        Salir
                    </button>
                </footer>
            </nav>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}

export default Menu;
