import React, { useState } from 'react';
import styles from '../Home/home.module.css';
import '../../main.css';
import icon from '../../components/iconos/iconos';
import Chart from '../../components/chart/chart4';

function Home() {
    const [chartType, setChartType] = useState('Bar'); // Estado para el tipo de gráfica
    const [chartFilter, setChartFilter] = useState('avales'); // Estado para el filtro
    const [dateRange, setDateRange] = useState({ from: '', to: '' }); // Estado para el rango de fechas

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value); // Actualiza el tipo de gráfica seleccionada
    };

    const handleChartFilterChange = (event) => {
        setChartFilter(event.target.value); // Actualiza el filtro seleccionado
    };

    const handleDateChange = (field, value) => {
        setDateRange((prev) => ({ ...prev, [field]: value })); // Actualiza el rango de fechas
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
                    {/* Tipo de gráfica */}
                    <label htmlFor="chartType">Tipo de Gráfica:</label>
                    <select
                        id="chartType"
                        value={chartType}
                        onChange={handleChartTypeChange}
                        className={styles.chartSelect}
                    >
                        <option value="Bar">Barras</option>
                        <option value="line">Líneas</option>
                        <option value="pie">Pastel</option>
                    </select>
                    
                    {/* Filtrado por */}
                    <label htmlFor="chartFilter">Filtrado por:</label>
                    <select
                        id="chartFilter"
                        value={chartFilter}
                        onChange={handleChartFilterChange}
                        className={styles.chartSelect}
                    >
                        <option  value="avales">Avales por vencer</option>
                        <option  value="clientes">Clientes Registrados</option>
                        <option  value="cuarentenas">Cuarentenas</option>
                    </select>

                    {/* Fecha desde */}
                    <label htmlFor="dateFrom">Desde:</label>
                    <input 
                        id="dateFrom" 
                        type="date" 
                        className={styles.dateInput} 
                        value={dateRange.from}
                        onChange={(e) => handleDateChange('from', e.target.value)}
                    />

                    {/* Fecha hasta */}
                    <label htmlFor="dateTo">Hasta:</label>
                    <input 
                        id="dateTo" 
                        type="date" 
                        className={styles.dateInput} 
                        value={dateRange.to}
                        onChange={(e) => handleDateChange('to', e.target.value)}
                    />
                </div>
                <div className={styles.chartContainer}>
                    {/* Renderizar el componente Chart basado en el tipo y filtro */}
                    <Chart type={chartType} filter={chartFilter} />
                </div>
            </div>

            {/* Tabla */}
            <div className='tableSection'>
                {/* Contenedor para filtros y acciones */}
                <div className='filtersContainer'>
                    <h2>Operaciones Recientes</h2>
                    <div className='searchContainer'>
                        <input
                            type="search"
                            className='search'
                            placeholder="Buscar inspector..."
                            title="Buscar inspector"
                        />
                        <img src={icon.lupa} alt="Buscar" className='iconlupa' />
                    </div>
                </div>

                <table className='table'>
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
                            <td><img src={icon.ver} alt="Ver Mas" className='iconver' /></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jeramy Cañizalez</td>
                            <td>Seguimiento</td>
                            <td>Finca Los Almendros</td>
                            <td>En Progreso</td>
                            <td>2025-03-28</td>
                            <td><img src={icon.ver} alt="Ver Mas" className='iconver' /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>José Martines</td>
                            <td>Rutina</td>
                            <td>La Granja de Mis Sueños</td>
                            <td>Pendiente</td>
                            <td>2025-04-01</td>
                            <td><img src={icon.ver} alt="Ver Mas" className='iconver' /></td>
                        </tr>
                    </tbody>
                </table>

                {/* Footer Tabla */}
                <div className='tableFooter'>
                    <img src={icon.flecha3} alt="BACK" title='Anterior' className='iconBack' />
                    <span>1</span>
                    <img src={icon.flecha2} alt="NEXT" title='Siguiente' className='iconNext' />
                </div>
            </div>
        </div>
    );
}

export default Home;