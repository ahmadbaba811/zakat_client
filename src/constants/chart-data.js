

import { currencyConverter } from "./constants"


export const FormatBarChart = (data1 = null, data2 = null, data3 = null, dates = null) => {

  let series = [{
    name: data1.title,
    data: data1.data !== null ? data1.data : [0] //[44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: data2.title,
    data: data2.data !== null ? data2.data : [0] //[76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: data3.title,
    data: data3.data !== null ? data3.data : [0] //[35, 41, 36, 26, 45, 48, 52, 53, 41]
  }]
  let options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: dates,
    },
    yaxis: {
      title: {
        text: 'transactions'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return currencyConverter(val)
        }
      }
    }
  }
  return { series: series, options: options }
}

export const FormatPieChart = (labels, data) => {
  let series = data
  let options = {
    chart: {
      type: 'donut',
    },
    labels: labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  return { series: series, options: options }
}

export const FormatHorizontalBar = (labels, data) => {
  let series = [{
    data: data
  }]
  let options = {
    chart: {
      type: 'bar',
      height: 350
    },
    labels: labels,
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: labels,
    }
  }
  return { series: series, options: options }
}

export const FormatLineGraph = (labels, data) => {
  
    let series = [{
      name: 'Payback',
      data: data,
    }]
    let options = {
      chart: {
        height: 350,
        type: 'line',
      },
      forecastDataPoints: {
        count: 7
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: labels, 
        tickAmount: 10,
        labels: {
          formatter: function(value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM')
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: [ '#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      },
      yaxis: {
        min: Math.min(...data),
        max: Math.max(...data)
      }
    }
    return { series: series, options: options }
}