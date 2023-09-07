import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Bar = ({monthlyRevenueData}) => {
  
    console.log(monthlyRevenueData);
  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', 
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + ' Rs';
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + ' Rs';
        },
      },
    },
    title: {
      text: 'Monthly Revenue',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  };

  const series = [{
    name: 'Revenue',
    data: monthlyRevenueData,
  }];

  return (
    <div id="chart" className='w-full md:w-3/4 md:ml-80 mt-4 md:mt-28'>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default Bar