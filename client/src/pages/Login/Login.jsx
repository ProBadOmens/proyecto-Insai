import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Insai from '../../../public/assets/insai.png';
import Perro from '../../../public/assets/perro.png';
import Importancia from '../../../public/assets/impor.png';
import inspecciones from '../../../public/assets/export.png';
import icon from '../../components/iconos/iconos';
import Notification from '../../components/notification/Notification';
import { useNotification } from '../../utils/useNotification';

// Componente Slider
function Slider({ slides, currentSlide, onMouseEnter, onMouseLeave }) {
    return (
        <div
            className={styles.slider}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
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
function InputGroup({ iconSrc, type, placeholder, value, onChange, onClick, error }) {
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
            {error && <p className={styles.errorText}>{error}</p>}
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { notifications, addNotification, removeNotification } = useNotification();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false); // Pausar slider al interactuar

    const phrases = [
        "La seguridad y eficiencia son nuestra prioridad.",
        "Optimiza tus procesos con SIGENSAI.",
        "SIGENSAI: Facilitamos tu labor.",
        "Tu aliado en la innovación y eficiencia.",
    ];

    const slides = [
        { image: inspecciones, text: 'Inspecciones sanitarias' },
        { image: Insai, text: 'Bienvenido al sistema SIGENSAI' },
        { image: Perro, text: 'Gestión eficiente y segura' },
        { image: Importancia, text: 'Optimiza tus procesos agrícolas' },
    ];

    // Control del slider
    useEffect(() => {
        if (isHovered) return; // Pausa el slider cuando el usuario interactúa

        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 6000);
        return () => clearInterval(slideInterval);
    }, [isHovered]);

    // Frases aleatorias
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        setRandomPhrase(phrases[randomIndex]);
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar si los campos están vacíos
        if (!username.trim()) {
            addNotification('El campo de usuario no puede estar vacío.', 'error');
            return;
        }

        if (!password.trim()) {
            addNotification('El campo de contraseña no puede estar vacío.', 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login exitoso
                console.log('Token recibido:', data.token);
                localStorage.setItem('token', data.token); // Almacena el token en localStorage
                // addNotification('Bienvenido al sistema SIGENSAI', 'success');
                navigate('/Home'); // Redirige al usuario a la página principal
            } else {
                // Manejo de errores
                addNotification(data.message || 'Error al iniciar sesión', 'error');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            addNotification('Error al conectar con el servidor', 'error');
        }
    };

    return (
        <div className={styles.loginContainer}>
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}

            {/* Formulario */}
            <div className={styles.loginCard}>
                <form onSubmit={handleSubmit} id="loginForm">
                    <h1 className={styles.loginTitle}>Iniciar Sesión</h1>

                    {/* Campo de usuario */}
                    <InputGroup
                        iconSrc={icon.user}
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    {/* Campo de contraseña */}
                    <InputGroup
                        iconSrc={showPassword ? icon.ojito : icon.ojitoculto}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onClick={() => setShowPassword(!showPassword)}
                    />

                    <button type="submit" title="Entrar" className={styles.submitButton}>
                        Entrar
                        <img src={icon.llave} alt="Cerrar sesión" className={styles.iconbtn} />
                    </button>
                </form>

                {/* Recuperación de contraseña */}
                <div className={styles.oldpass}>
                    <a href="/terms">¿Has Olvidado la Contraseña?</a>
                </div>

                {/* Apartado para frases */}
                <div className={styles.frases}>
                    <PhraseContainer randomPhrase={randomPhrase} />
                </div>

                {/* Footer */}
                <footer className={styles.footer}>
                    <p>© 2025 SIGENSAI. Todos los derechos reservados.</p>
                    <a href="/terms">Términos de Servicio</a>
                    <a href="/privacy">Política de Privacidad</a>
                </footer>
            </div>

            {/* Slider */}
            <Slider
                slides={slides}
                currentSlide={currentSlide}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
        </div>
    );
}

export default Login;