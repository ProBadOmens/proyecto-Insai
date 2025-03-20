import React, { useState } from 'react';
import styles from '../Home/home.module.css';
import ver from '../../../public/ver.svg';
import Chart from '../../components/chart/chart4';

function Home() {

         // Estados para manejar el modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto
    const [modalContent, setModalContent] = useState(''); // Contenido del modal

    // Función para abrir el modal
    const openModal = (content) => {
        setModalContent(content); // Establece el contenido del modal
        setIsModalOpen(true); // Abre el modal
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

return (
        <div className={styles.parentContainer}>
            {/* Cartas */}
            <section className={styles.cardsContainer}>
                
                <div className={styles.card} title='Calculando...'>Inspectores activos
                    <span>5</span>
                </div>

                <div className={styles.card} title='Calculando...'>Rutinas 
                    <span>3</span>
                </div>

                <div className={styles.card} title='Calculando...'>Cuarentenas
                    <span>3</span>
                </div>

                <div className={styles.card} title='Calculando...'>Programas
                    <span>6</span>
                </div>
            </section>

            {/* Gráfica */}
            <section className={styles.chartContainer}>
                <div className={styles.chartPlaceholder}>
                    
                    <Chart />
                </div>
            </section>

            {/* Notificaciones */}
            <section className={styles.notificationsContainer}>
                <div
                    className={styles.notification}
                    onClick={() => openModal('Aval de traslado vence pronto | Cliente: Danel Reyes')}
                >
                    Aval de traslado vence pronto | Cliente: Danel Reyes
                </div>
                <div
                    className={styles.notification}
                    onClick={() => openModal('Permiso de traslado vegetal solicitado | Cliente: Danel Reyes')}
                >
                    Permiso de traslado vegetal solicitado | Cliente: Danel Reyes
                </div>
                <div
                    className={styles.notification}
                    onClick={() => openModal('Traspaso de hacienda completado con éxito | Cliente: Danel Reyes')}
                >
                    Traspaso de hacienda completado con éxito | Cliente: Danel Reyes
                </div>
            </section>

            {/* Tabla */}
            <section className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Actividad</th>
                            <th>Encargado</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Rutina De Hacienda</td>
                            <td>Inp. Jose Chirinos</td>
                            <td>
                                <button className={styles.buttonver}>
                                    <img src={ver} title="Ver Actividad" className={styles.icon} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Rutina De Hacienda</td>
                            <td>Inp. Edgar Martines</td>
                            <td>
                                <button className={styles.buttonver}>
                                    <img src={ver} title="Ver Actividad" className={styles.icon} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
                
                 {/* Modal */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                        <p>{modalContent}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
