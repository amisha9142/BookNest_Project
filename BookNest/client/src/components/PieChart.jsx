import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ series }) => {

  const [options] = useState({
    chart: {
      width: 380,
      type: 'pie',
      toolbar: {
        show: false,
      },
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        return `${opts.w.globals.series[opts.seriesIndex]}`; 
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  return (
    <div className="flex  justify-center items-center">
      <div id="chart" className="overflow-hidden"> 
        <ReactApexChart options={options} series={series} type="pie" width={380} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
