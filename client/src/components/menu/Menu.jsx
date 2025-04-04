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

    const handleLogout = () => {
        navigate('/'); // Redirige al login o cualquier ruta deseada
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
                    <NavItem
                        id="Agentes Agropecuarios"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.cliente}
                        label="Agentes Agropecuarios"
                        linkTo="/*"
                    />
                    <NavItem
                        id="Inspecciones"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.escudobien}
                        label="Inspecciones"
                        linkTo="/*"
                    />
                   {/* Medidas de Prevencion ///////////////////7 */}
                    <NavItem
                            id="medidasprevencion"
                            openSubmenus={openSubmenus}
                            setOpenSubmenus={setOpenSubmenus}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            iconSrc={icon.escudomalo}
                            label="Medidas de Prevención"
                        >
                        <ul className={styles.submenu}>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'programas' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('programas')}
                                >
                                    Programas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Animal"
                                    className={`${styles.submenuItem} ${selectedItem === 'cuarentenafitosanitaria' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('cuarentenafitosanitaria')}
                                >
                                    Cuarentena Fitosanitaria
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'cuarentenazoosanitaria' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('cuarentenazoosanitaria')}
                                >
                                    Cuarentena Zoosanitaria
                                </Link>
                            </li>
                        </ul>
                    </NavItem>

                      {/* Categoriasssssssssssss */}
                    <NavItem
                        id="categoria"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.hormiga}
                        label="Categorías"
                    >
                        <ul className={styles.submenu}>
                            <li>
                                <Link
                                    to="/Vegetal"
                                    className={`${styles.submenuItem} ${selectedItem === 'vegetal' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('vegetal')}
                                >
                                    Vegetales
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Animal"
                                    className={`${styles.submenuItem} ${selectedItem === 'animal' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('animal')}
                                >
                                    Animales
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'insumos' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('insumos')}
                                >
                                    Repertorio de Insumos
                                </Link>
                            </li>
                        </ul>
                    </NavItem>

                    {/* Gestion de Operaciones */}
                    <NavItem
                        id="Gestion de Operaciones"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.altavoz}
                        label="Gestion de Operaciones"
                    >
                        <ul className={styles.submenu}>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'controlfitosanitario' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('controlfitosanitario')}
                                >
                                    Control Fitosanitario
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'controlzoosanitario' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('controlzoosanitario')}
                                >
                                    Control Zoosanitario
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'controlvacunacion' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('controlvacunacion')}
                                >
                                    Control de Vacunación
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'epidemiologiafitosanitaria' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('epidemiologiafitosanitaria')}
                                >
                                    Epidemiología Fitosanitaria
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/*"
                                    className={`${styles.submenuItem} ${selectedItem === 'epidemiologiazoosanitaria' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('epidemiologiazoosanitaria')}
                                >
                                    Epidemiología Zoosanitaria
                                </Link>
                            </li>
                        </ul>
                    </NavItem>
                
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
                                    to="/Personas"
                                    className={`${styles.submenuItem} ${selectedItem === 'personas' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('personas')}
                                >
                                    Personas
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
                                    to="/Cargo"
                                    className={`${styles.submenuItem} ${selectedItem === 'cargo' ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem('cargo')}
                                >
                                    Cargos
                                </Link>
                            </li>
                        </ul>
                    </NavItem>
                    <NavItem
                        id="bitacora"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.bitacora}
                        label="Bitacora"
                        linkTo="/Bitacora"
                    />
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
