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
                        id="Control de Pestes"
                        openSubmenus={openSubmenus}
                        setOpenSubmenus={setOpenSubmenus}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        iconSrc={icon.altavoz}
                        label="Control de Pestes"
                        linkTo=""
                    />
                    
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
