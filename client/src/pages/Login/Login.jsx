import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Insai from '../../../public/assets/insai.png';
import Perro from '../../../public/assets/perro.png';
import Importancia from '../../../public/assets/impor.png';
import icon from '../../components/iconos/iconos';

// Componente Slider
function Slider({ slides, currentSlide }) {
    return (
        <div className={styles.slider}>
            <img
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                className={styles.sliderImage}
            />
            <p className={styles.sliderText}>{slides[currentSlide].text}</p>
        </div>
    );
}

// Componente InputGroup
function InputGroup({ iconSrc, type, placeholder, value, onChange, onClick }) {
    return (
        <div className={styles.inputGroup}>
            <img
                src={iconSrc}
                alt="Input Icon"
                className={styles.icon}
                onClick={onClick}
            />
            <input
                type={type}
                className={styles.inputField}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

// Componente PhraseContainer
function PhraseContainer({ randomPhrase }) {
    return (
        <div className={styles.phraseContainer}>
            <p className={styles.phrase}>{randomPhrase}</p>
        </div>
    );
}

// Componente principal Login
function Login() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [randomPhrase, setRandomPhrase] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
    const navigate = useNavigate();

    const phrases = [
        "La seguridad y eficiencia son nuestra prioridad.",
        "Optimiza tus procesos con SIGENSAI.",
        "SIGENSAI: Facilitamos tu labor.",
        "Tu aliado en la innovación y eficiencia.",
    ];

    const slides = [
        { image: Insai, text: 'Bienvenido al sistema SIGENSAI' },
        { image: Perro, text: 'Gestión eficiente y segura' },
        { image: Importancia, text: 'Optimiza tus procesos agrícolas' },
    ];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 8000);
        return () => clearInterval(slideInterval);
    }, []);

    useEffect(() => {
        const phraseInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * phrases.length);
            setRandomPhrase(phrases[randomIndex]);
        }, 5000);

        return () => clearInterval(phraseInterval);
    }, []);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        setRandomPhrase(phrases[randomIndex]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario
        navigate('/Home'); // Redirige a la página deseada
    };

    return (
        <div className={styles.loginContainer}>
            {/* Formulario */}
            <div className={styles.loginCard}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles.loginTitle}>Iniciar Sesión</h1>

                    {/* Campo de usuario */}
                    <InputGroup
                        iconSrc={icon.user}
                        type="text"
                        placeholder="Usuario"
                    />

                    {/* Campo de contraseña */}
                    <InputGroup
                        iconSrc={showPassword ? icon.ojito : icon.ojitoculto}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        onClick={() => setShowPassword(!showPassword)} // Cambia la visibilidad de la contraseña
                    />

                    <button type="submit" title="Entrar" className={styles.submitButton}>
                        Entrar
                        <img src={icon.llave} alt="Cerrar sesión" className={styles.iconbtn} />
                    </button>
                </form>

                {/* Apartado para frases */}
                <div className={styles.frases}>
                    <PhraseContainer randomPhrase={randomPhrase} />
                </div>

                   {/* footer */}
            <footer className={styles.footer}>
                <p>© 2025 SIGENSAI. Todos los derechos reservados.</p>
                <a href="/terms">Términos de Servicio</a>
                <a href="/privacy">Política de Privacidad</a>
            </footer>
            </div>

            {/* Slider */}
            <Slider slides={slides} currentSlide={currentSlide} />

        </div>
    );
}

export default Login;
