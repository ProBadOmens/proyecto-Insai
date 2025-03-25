import { useState, useEffect } from 'react';
import styles from './header.module.css';
import icon from '../../components/iconos/iconos';
import insai from '../../../public/assets/image.png'

// Componente principal Header
function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={insai} alt="Logo Institucional" className={styles.logo} />
                <h1 className={styles.title}>Admin Panel</h1>
            </div>
            <div className={styles.userMenu}>
                <img src={icon.campana} alt="Notificaciones" className={styles.campanaIcon} />
                <span className={styles.username}>Usuario</span>
            </div>
        </header>
    );
}

export default Header;
