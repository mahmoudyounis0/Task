import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const CustomerGraph = ({ graphData, customerName }) => {
    const data = {
        labels: graphData.map(item => item.date),
        datasets: [
            {
                label: 'Transaction Amount',
                data: graphData.map(item => item.amount),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Transaction Graph for ${customerName}`,
            },
        },
    };

    return (
        <div className="mt-4">
            <Line data={data} options={options} />
        </div>
    );
};

export default CustomerGraph;
