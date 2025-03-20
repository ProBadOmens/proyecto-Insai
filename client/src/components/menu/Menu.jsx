import { useRef, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import styles from './menu.module.css';
import homeIcon from '../../../public/home2.svg';
import flecha from '../../../public/flecha2.svg';
import admin from '../../../public/admin.svg';
import hormiga from '../../../public/hormiga.svg';
import mundo from '../../../public/mundo.svg';
import grafica from '../../../public/grafica.svg';





function Menu() {
    // Estado para guardar el ítem activo
    const [activeItem, setActiveItem] = useState(null);
    // Estado para abrir/cerrar submenus
    const [openSubmenus, setOpenSubmenus] = useState({});
    const subContainerRefs = useRef({});

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Alterna el estado de abierto/cerrado
    };

    // Abrir y cerrar sublista
    const toggleSubmenu = (id) => {
        const element = subContainerRefs.current[id]; // Accede al ref específico de la sublista
        setOpenSubmenus((prev) => {
            const isOpen = !prev[id];
            if (element) {
                if (isOpen) {
                    element.style.maxHeight = `${element.scrollHeight}px`; // Ajusta la altura automáticamente
                    element.style.opacity = '1'; // Muestra la sublista
                } else {
                    element.style.maxHeight = '0'; // Oculta la sublista
                    element.style.opacity = '0';
                }
            }
            return { ...prev, [id]: isOpen };
        });
    };

    // Función para cambiar el ítem activo
    const handleItemClick = (id) => {
        setActiveItem(id); // Cambia el ítem activo
    };

    return (
        <>
            <div className={styles.container}>
                <img src={mundo} title="El Mundo Gira Alrededor de su Propio Eje!!!" className={styles.iconmundo} />

                <nav>
                    <ul className={styles.navList}>
                        {/* Panel Principal */}
                        <div>
                            <li
                                className={`${styles.navItem} ${
                                    activeItem === 'panel' ? styles.active : ''
                                }`}
                                onClick={() => handleItemClick('panel')}
                            >
                                <Link to="/" className={styles.navLink}>
                                    <img src={homeIcon} alt="Home" className={styles.icon} />
                                    <span>Panel Principal</span>
                                </Link>
                            </li>
                        </div>

                        {/* Categorías */}
                        <div>
                            <ul
                                className={`${styles.navItem} ${
                                    activeItem === 'categoria' ? styles.active : ''
                                }`}
                                onClick={() => handleItemClick('categoria')}
                            >
                                <Link
                                    onClick={() => toggleSubmenu('categoria')}
                                    className={styles.navLink}
                                >
                                    <img src={hormiga} alt="Icono Hormiga" className={styles.icon} />
                                    <span>Categoría</span>
                                    <img
                                        src={flecha}
                                        alt="Flecha"
                                        className={`${styles.iconFlecha} ${
                                            openSubmenus['categoria'] ? styles.iconRotated : ''
                                        }`}
                                    />
                                </Link>

                                {/* Sublista de Categoría */}
                                <ul
                                    ref={(el) => (subContainerRefs.current['categoria'] = el)}
                                    className={`${styles.subContainer} ${
                                        openSubmenus['categoria']
                                            ? styles.subContainerOpen
                                            : ''
                                    }`}
                                >
                                    <li className={styles.subList}>
                                        <Link
                                            to="/vegetal"
                                            className={styles.subList}
                                            onClick={() => handleItemClick('vegetal')}
                                        >
                                            <span>Vegetales</span>
                                        </Link>
                                    </li>
                                    <li className={styles.subList}>
                                        <Link
                                            to="/animal"
                                            className={styles.subList}
                                            onClick={() => handleItemClick('animal')}
                                        >
                                            <span>Animales</span>
                                        </Link>
                                    </li>
                                </ul>
                            </ul>
                        </div>

                        {/* Administrador */}
                        <div>
                            <ul
                                className={`${styles.navItem} ${
                                    activeItem === 'administrador' ? styles.active : ''
                                }`}
                                onClick={() => handleItemClick('administrador')}
                            >
                                <Link
                                    onClick={() => toggleSubmenu('administrador')}
                                    className={styles.navLink}
                                >
                                    <img src={admin} alt="Icono Administrador" className={styles.icon} />
                                    <span>Administrador</span>
                                    <img
                                        src={flecha}
                                        alt="Flecha"
                                        className={`${styles.iconFlecha} ${
                                            openSubmenus['administrador']
                                                ? styles.iconRotated
                                                : ''
                                        }`}
                                    />
                                </Link>

                                {/* Sublista de Administrador */}
                                <ul
                                    ref={(el) => (subContainerRefs.current['administrador'] = el)}
                                    className={`${styles.subContainer} ${
                                        openSubmenus['administrador']
                                            ? styles.subContainerOpen
                                            : ''
                                    }`}
                                >
                                    <li className={styles.subList}>
                                        <Link
                                            to="/Personas"
                                            className={styles.subList}
                                            onClick={() => handleItemClick('Persona')}
                                        >
                                            <span>Personas</span>
                                        </Link>
                                    </li>
                                    <li className={styles.subList}>
                                        <Link
                                            to="/Usuario"
                                            className={styles.subList}
                                            onClick={() => handleItemClick('Usuario')}
                                        >
                                            <span>Usuarios</span>
                                        </Link>
                                    </li>
                                    <li className={styles.subList}>
                                        <Link
                                            to="/Cargo"
                                            className={styles.subList}
                                            onClick={() => handleItemClick('Cargo')}
                                        >
                                            <span>Cargos</span>
                                        </Link>
                                    </li>
                                </ul>
                            </ul>
                        </div>

                        {/* Estadísticas Generales */}
                        <div>
                            <li
                                className={`${styles.navItem} ${
                                    activeItem === 'estadisticas' ? styles.active : ''
                                }`}
                                onClick={() => handleItemClick('estadisticas')}
                            >
                                <Link to="/chart" className={styles.navLink}>
                                    <img src={grafica} alt="Icono gráfica" className={styles.icon} />
                                    <span>Estadísticas Generales</span>
                                </Link>
                            </li>
                        </div>
                    </ul>
                    <Footer />
                </nav>
                <Outlet />
            </div>
        </>
    );
}

export default Menu;

                    

                        