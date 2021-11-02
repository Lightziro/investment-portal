export const getCharEpsGraph = (graph) => ({
    height: 295,
    options: {
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            type: "line",
        },
        dataLabels: {
            enabled: false,
        },
        // stroke: {
        //     curve: "smooth",
        //     width: 1,
        // },
        // tooltip: {
        //     fixed: {
        //         enabled: false,
        //     },
        //     x: {
        //         show: false,
        //     },
        //     y: {
        //         title: "Ticket ",
        //     },
        //     marker: {
        //         show: false,
        //     },
        // },
    },
    grid: {
        xaxis: {
            lines: {
                show: false,
            },
        },
        yaxis: {
            lines: {
                show: false,
            },
        },
    },
    series: [
        {
            name: "EPS",
            data: graph.map((item) => ({
                y: item.value,
                x: new Date(item.date).getFullYear(),
            })),
        },
    ],
    xaxis: {
        type: "numeric",
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
});
