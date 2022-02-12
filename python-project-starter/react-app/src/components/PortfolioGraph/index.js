import './portgraph.css'
import React, {useState, useEffect} from 'react';
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

      let date1 = new Date(new Date().setDate(new Date().getDate() - 1))
      let date2 = new Date(new Date().setDate(new Date().getDate() - 2))
      let date3 = new Date(new Date().setDate(new Date().getDate() - 3))
      let date4 = new Date(new Date().setDate(new Date().getDate() - 4))
      let date5 = new Date(new Date().setDate(new Date().getDate() - 5))

      if (values.length === 0){
        values = [4000.35, 4600.67, 3400.22, 4700.50, 5600.39]
        dates = [date5.toLocaleDateString("en-US"), date4.toLocaleDateString("en-US"), date3.toLocaleDateString("en-US"), date2.toLocaleDateString("en-US"), date1.toLocaleDateString("en-US")]
      }

      console.log(values)
      const [lineColor, setLineColor] = useState("")
      //for the slice make the second number a variable that will change with a useEffect when the user clicks how many days to view.
      const daySlicer = dates.slice(0, 30)
      const valuesSlicer = values.slice(0, 30)

      useEffect(() =>{
        if(valuesSlicer[0] < valuesSlicer[valuesSlicer.length - 1]){
          setLineColor('rgb(50, 190, 50)')
        }
        if(valuesSlicer[0] > valuesSlicer[valuesSlicer.length - 1]) {
           setLineColor('rgb(255, 0, 0)')
        }
      },[values])

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
