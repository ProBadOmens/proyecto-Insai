import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'; // Importa el plugin Title

// Registro de los elementos necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title); // Asegúrate de registrar el plugin Title

const PieChart = () => {
    const data = {
        labels: ['Cuarentena', 'Rutinas', 'Programas', 'Inspectores', 'Clientes'], // Etiquetas de las categorías
        datasets: [
            {
                label: 'Distribución de colores',
                data: [12, 19, 3, 5, 2], // Datos para la gráfica
                backgroundColor: [
                    '#FF6384', // Rojo
                    '#36A2EB', // Azul
                    '#FFCE56', // Amarillo
                    '#4CAF50', // Verde
                    '#9C27B0', // Morado
                ],
                hoverBackgroundColor: [
                    '#FF4374', // Rojo (hover)
                    '#1E90FF', // Azul (hover)
                    '#FFD700', // Amarillo (hover)
                    '#43A047', // Verde (hover)
                    '#AB47BC', // Morado (hover)
                ],
                borderWidth: 1, // Grosor del borde
            },
        ],
    };

    const options = {
        responsive: true, // Ajusta el tamaño automáticamente
        plugins: {
            legend: { 
                position: 'top', // Coloca la leyenda arriba
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw} unidades`;
                    },
                },
            },
            title: {
                display: true, // Muestra el título
                text: 'Nivel de Actividades', // Texto del título
                font: {
                    size: 18, // Tamaño de la fuente
                    family: 'Poppins, sans-serif', // Fuente personalizada
                    weight: 'bold', // Negrita
                },
                padding: {
                    top: 10, // Espaciado superior
                    bottom: 20, // Espaciado inferior
                },
                align: 'center', // Alineación del título
                color: '#333', // Color del texto
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;