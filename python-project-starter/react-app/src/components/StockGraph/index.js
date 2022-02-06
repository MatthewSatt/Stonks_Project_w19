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

function StockGraph({dates, values}){
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
      const daySlicer = dates.slice(90)
      const valuesSlicer = values.slice(90)

      const lineColor = 'rgb(0, 200, 5)'
      const data = {
        labels: daySlicer.reverse(),
        datasets: [
          {
            label: 'Price',
            data: valuesSlicer.reverse(),
            fill: true,
            backgroundColor: 'rgb(, 0, 0)',
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
        <div>
             <Line options={options} data={data}/>
        </div>
    )
}

export default StockGraph
