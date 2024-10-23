
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};



const ChartOne = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Product One',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },

      {
        name: 'Product Two',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded border border-gray-200 bg-white px-5 pt-7 pb-5 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:px-7 xl:col-span-8">
  <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
    <div className="flex w-full flex-wrap gap-3 sm:gap-5">
      <div className="flex min-w-[11.875rem]">
        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-blue-600">
          <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-blue-600"></span>
        </span>
        <div className="w-full">
          <p className="font-semibold text-blue-600">Total Revenue</p>
          <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
        </div>
      </div>
      <div className="flex min-w-[11.875rem]">
        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-sky-400">
          <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-sky-400"></span>
        </span>
        <div className="w-full">
          <p className="font-semibold text-sky-400">Total Sales</p>
          <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
        </div>
      </div>
    </div>
    <div className="flex w-full max-w-[11.25rem] justify-end">
      <div className="inline-flex items-center rounded-md bg-gray-50 p-1.5 dark:bg-gray-700">
        <button className="rounded bg-white py-1 px-3 text-xs font-medium text-gray-900 shadow-sm hover:bg-white hover:shadow-sm dark:bg-gray-800 dark:text-white dark:hover:bg-gray-800">
          Day
        </button>
        <button className="rounded py-1 px-3 text-xs font-medium text-gray-900 hover:bg-white hover:shadow-sm dark:text-white dark:hover:bg-gray-800">
          Week
        </button>
        <button className="rounded py-1 px-3 text-xs font-medium text-gray-900 hover:bg-white hover:shadow-sm dark:text-white dark:hover:bg-gray-800">
          Month
        </button>
      </div>
    </div>
  </div>

  <div>
    <div id="chartOne" className="-ml-5">
      <ReactApexChart
        options={options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  </div>
</div>
  );
};

export default ChartOne;
