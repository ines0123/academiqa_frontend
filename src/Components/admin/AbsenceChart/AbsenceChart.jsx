import React from 'react';
import "./AbsenceChart.css"
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

const AbsenceChart = () => {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);
    const absenceData = {
        labels: ['mpi', 'cba', 'GL2', 'RT2', 'IMI2', 'IIA2', 'GL3', 'RT3', 'IMI3', 'IIA3', 'GL4', 'RT4', 'IMI4', 'IIA4', 'GL5', 'RT5', 'IMI5', 'IIA5'],
        datasets: [
            {
                label: 'September',
                data: [12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'October',
                data: [2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'November',
                data: [15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                label: 'December',
                data: [10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(155,213,62,0.2)',
                borderColor: 'rgba(155,213,62, 1)',
                borderWidth: 1,
            },
            {
                label: 'January',
                data: [5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'February',
                data: [20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2],
                backgroundColor: 'rgba(255,94,198,0.2)',
                borderColor: 'rgba(255,94,198, 1)',
                borderWidth: 1,
            },
            {
                label: 'March',
                data: [15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'April',
                data: [3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
            {
                label: 'May',
                data: [12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10, 15, 12, 19, 3, 5, 2, 3, 20, 10],
                backgroundColor: 'rgba(77,208,248,0.2)',
                borderColor: 'rgb(77,208,248)',
                borderWidth: 1,
            },
        ]
    };

    const convertToRate = (data) => {
        const totalStudents = 90; // Assuming 90 students per class
        return data.map(absenceCount => Math.round((absenceCount * 100) / totalStudents));
    };

    const data = {
        responsive: true,
        maintainAspectRatio: false,
        labels: absenceData.labels,
        datasets: absenceData.datasets.map(dataset => ({
            ...dataset,
            data: convertToRate(dataset.data),
        }))
    };

    const options = {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                display: false,
            }
        },
        plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'black',
                        usePointStyle: true,
                        boxWidth: 10,
                        padding: 20,
                }
            },
            title: {
                display: true,
                position: 'top',
                text: 'Absence Rate per Level and Month',
                font: {
                    size: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + '%';
                        }
                        return label;
                    }
                }
            }
        },
    };

    return (

        <Bar className="absence-chart p-1 w-full bg-gray-50 ml-6 shadow rounded-2xl mb-4 "
             data={data}
             options={options}
        />

    );

}
export default AbsenceChart;