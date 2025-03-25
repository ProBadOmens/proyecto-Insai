import React, { useState } from 'react';
import styles from '../Home/home.module.css';
import icon from '../../components/iconos/iconos';
import Chart from '../../components/chart/chart4';

function Home() {
    const [selectedChart, setSelectedChart] = useState('bar'); // Estado para el tipo de gráfica

    const handleChartChange = (event) => {
        setSelectedChart(event.target.value); // Actualiza el tipo de gráfica seleccionada
    };

    return (
        <div className={styles.homeContainer}>
            {/* Cartas */}
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <span className={styles.cardNumber}>50</span>
                    <p>Inspectores Activos</p>
                </div>
                <div className={styles.card}>
                    <span className={styles.cardNumber}>75</span>
                    <p>Programas Completados</p>
                </div>
                <div className={styles.card}>
                    <span className={styles.cardNumber}>20</span>
                    <p>Programas Pendientes</p>
                </div>
                <div className={styles.card}>
                    <span className={styles.cardNumber}>5</span>
                    <p>Permisos por Vencer</p>
                </div>
            </div>

            {/* Gráficas */}
            <div className={styles.chartSection}>
                <div className={styles.chartFilter}>
                    
                    {/* tipo de grafica */}
                    <label htmlFor="chartType">Tipo de Gráfica:</label>
                    <select
                        id="chartType"
                        value={selectedChart}
                        onChange={handleChartChange}
                        className={styles.chartSelect}
                    >
                        <option value="bar">Barras</option>
                        <option value="line">Líneas</option>
                        <option value="pie">Pastel</option>
                    </select>
                    
                    {/* filtrado por */}
                    <label htmlFor="chartType">Filtrado por:</label>
                    <select
                        id="chartType"
                        value={selectedChart}
                        onChange={handleChartChange}
                        className={styles.chartSelect}
                    >
                        <option value="bar">Avales por vencer</option>
                        <option value="line">Clientes Registrados</option>
                        <option value="pie">Cuarentenas</option>
                    </select>
                    
                    {/* fecha desde */}
                    <label htmlFor="dateType">Desde:</label>
                    <input id="dateType" type="date"  className={styles.dateInput}/>
                    
                    {/* fecha hasta */}
                    <label htmlFor="dateType">Hasta:</label>
                    <input id="dateType" type="date"  className={styles.dateInput}/>
                </div>
                <div className={styles.chartContainer}>
                    <Chart type={selectedChart} />
                </div>
            </div>


            {/* Tabla */}
            <div className={styles.tableSection}>
                <h2>Operaciones Recientes</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Inspector</th>
                            <th>Tipo de Ins.</th>
                            <th>Hacienda</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Danel Reyes</td>
                            <td>Seguimiento</td>
                            <td>Hacienda Nápoles</td>
                            <td>Completado</td>
                            <td>2025-03-24</td>
                            <td><img src={icon.ver} alt="Ver Mas" className={styles.iconver}/></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jeramy Cañizalez</td>
                            <td>Seguimiento</td>
                            <td>Finca Los Almendros </td>
                            <td>En Progreso</td>
                            <td>2025-03-28</td>
                            <td><img src={icon.ver} alt="Ver Mas" className={styles.iconver}/></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>José Martines</td>
                            <td>Rutina</td>
                            <td>La Granja de Mis Sueños</td>
                            <td>Pendiente</td>
                            <td>2025-04-1</td>
                            <td><img src={icon.ver} alt="Ver Mas" className={styles.iconver}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;