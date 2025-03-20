import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Insai from '../../../public/assets/insai.png';
import Perro from '../../../public/assets/perro.png';
import Importancia from '../../../public/assets/impor.png';
import user from '../../../public/user.svg';
import ojito from '../../../public/ojito.svg';
import ojitoculto from '../../../public/ojitoculto.svg';
import llave from '../../../public/llave.svg';

function Login() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [randomPhrase, setRandomPhrase] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
    const navigate = useNavigate(); // Hook para redirigir
    // Array de frases
    const phrases = [
        "La seguridad y eficiencia son nuestra prioridad.",
        "Optimiza tus procesos con SIGENSAI.",
        "SIGENSAI: Facilitamos tu labor.",
        "Tu aliado en la innovación y eficiencia.",
    ];

    // Array de imágenes y textos del slider
    const slides = [
        { image: Insai, text: 'Bienvenido al sistema SIGENSAI' },
        { image: Perro, text: 'Gestión eficiente y segura' },
        { image: Importancia, text: 'Optimiza tus procesos agrícolas' },
    ];

    // Cambiar el slide actual cada 5 segundos
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 8000);

        return () => clearInterval(slideInterval);
    }, []);

    // Cambiar la frase aleatoria cada 5 segundos
    useEffect(() => {
        const phraseInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * phrases.length);
            setRandomPhrase(phrases[randomIndex]);
        }, 5000);

        return () => clearInterval(phraseInterval);
    }, []);

    // Seleccionar una frase inicial al cargar el componente
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        setRandomPhrase(phrases[randomIndex]);
    }, []);

      // Manejar el envío del formulario
        const handleSubmit = (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario
        navigate('/'); // Redirige a la página deseada (ajusta la ruta según tu configuración)
    };



    return (
        <div className={styles.loginContainer}>
            {/* Slider */}
            <div className={styles.slider}>
                <img
                    src={slides[currentSlide].image}
                    alt={`Slide ${currentSlide + 1}`}
                    className={styles.sliderImage}
                />
                <p className={styles.sliderText}>{slides[currentSlide].text}</p>
            </div>

            {/* Formulario */}
            <div className={styles.loginCard}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles.loginTitle}>Iniciar Sesión</h1>
                    
                    <div className={styles.inputGroup}>
                        <img src={user} alt="Usuario" className={styles.icon} />
                        <input
                            type="text"
                            className={styles.inputField}
                            placeholder="Usuario"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <img
                            src={showPassword ? ojito : ojitoculto}
                            alt="Mostrar/Ocultar contraseña"
                            className={styles.icon}
                            onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic
                        />
                        <input
                            type={showPassword ? "text" : "password"} // Cambia el tipo de entrada
                            className={styles.inputField}
                            placeholder="Contraseña"
                        />
                    </div>

                    <button type="submit" title='entrar' className={styles.submitButton}>
                        Entrar
                        <img src={llave} alt="Cerrar sesión" className={styles.iconllave} />
                    </button>
                </form>

                {/* Apartado para frases */}
                <div className={styles.phraseContainer}>
                    <p className={styles.phrase}>{randomPhrase}</p>
                </div>
            </div>
        </div>
    );
}

export default Login;