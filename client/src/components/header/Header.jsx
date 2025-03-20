import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import styles from './header.module.css';
import salida from '../../../public/salida.svg'
import Logo from '../../../public/assets/image.png';
import lupa from '../../../public/lupa.svg'
import pdf from '../../../public/pdf.svg'
import campana from '../../../public/campana.svg'


function Header() {
    const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad del header
    const [lastScrollY, setLastScrollY] = useState(0); // Estado para rastrear la posición del scroll
    const navigate = useNavigate(); // Inicializa el hook useNavigate


    // Función para manejar el clic en el botón "Salir"
    const handleLogout = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado
        console.log("Cerrando sesión..."); // Acción adicional (opcional)
        navigate('/login'); // Redirige a la página de inicio de sesión
    };


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Si el usuario hace scroll hacia abajo y pasa los 50px, oculta el header
                setIsVisible(false);
            } else {
                // Si el usuario hace scroll hacia arriba, muestra el header
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY); // Actualiza la posición del scroll
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`${styles.header} ${!isVisible ? styles.hidden : ''}`}>
            <div className={styles.header}>

                {/* sección izquierda */}
                <div className={styles.izquierda} title='BIENVENIDA'>
                    <div className={styles.Logo}>
                        <img src={Logo} alt="Logo De la Institución" title='Logo INSAI' />
                    </div>

                    <span className={styles.spansito}>Bienvenidos a SIGENSAI  $Usuario</span>
                </div>

                {/* Sección central */}
                <div className={styles.center}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Buscar en la página..."
                            className={styles.searchBar}
                        />
                        <img src={lupa} alt="Buscar..." title='Buscar...' className={styles.icon2} />
                    </div>
                </div>

                 {/* Sección derecha */}
                <div className={styles.derecha}>
                    
                    <button title="Exportar PDF" className={styles.btn3}>
                        <img src={pdf} alt="PDF" className={styles.icon} />
                    </button>

                    <button title="Notificaciones" className={styles.btn2}>
                        <img src={campana} alt="Notificaciones" className={styles.icon} />
                    </button>
                    
                    <button  onClick={handleLogout} type="submit" title="Salir" className={styles.btn}>
                        <img src={salida} alt="Cerrar sesión" className={styles.icon} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;