import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

function PortfolioGraph({dates, values}){
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

      //for the slice make the second number a variable that will change with a useEffect when the user clicks how many days to view.
      const daySlicer = dates.slice(0, 30)
      const valuesSlicer = values.slice(0, 30)

      const lineColor = 'rgb(50, 190, 50)'
      const data = {
        labels: daySlicer,
        datasets: [
          {
            label: 'Value',
            data: valuesSlicer,
            fill: true,
            backgroundColor: 'rgb(0, 0, 0)',
            borderColor: lineColor,
            borderWidth: '1.5',
          },
        ],
      };

      const options = {
        scales: {
          xAxes: {
            grid: {
              display: false,
            },
            gridLines: {
              display: true,
              color: 'rgb(255,255,255)',
            },
            ticks: {
              display: false
            }
          },
          yAxes:
            {
              grid: {
                display: false,
              },
              gridLines: {
                display: true,
                color: 'rgb(255,255,255)',
             },
              ticks: {
                display: false,
                beginAtZero: true,
              },
            },
        },
        elements: {
          point:{
              radius: 0
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false
          },
          // title: {
          //   text: (ctx) => {
          //     const {intersect, mode} = ctx.chart.options.interaction;
          //     return 'Mode: ' + mode + ', intersect: ' + intersect;
          //   }
          // },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      };
    return (
        <div className='stock-graph-container'>
             <Line options={options} data={data}/>
        </div>
    )
}

export default PortfolioGraph
