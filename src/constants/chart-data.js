

export const FormatLineChart = (data1, data2) => {
    series  = data1
    options = {
        chart: {
            type: 'bar',
                height: 430
        },
        plotOptions: {
            bar: {
                horizontal: true,
                    dataLabels: {
                    position: 'top',
            },
            }
        },
        dataLabels: {
            enabled: true,
                offsetX: -6,
                    style: {
                fontSize: '12px',
                    colors: ['#fff']
            }
        },
        stroke: {
            show: true,
                width: 1,
                    colors: ['#fff']
        },
        tooltip: {
            shared: true,
                intersect: false
        },
        xaxis: {
            categories: data2,
        },

    }

    return {series: series, options : options}
}