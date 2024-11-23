import React from "react";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

const CategoryChart = (props: any) => {
    const { data } = props
    const chartData = data.map((value: {
        price: Number; title: string;
    }) => ({
        y: value.price,
        name: value.title
    }))
    const options = {
        chart: {
            type: "pie",
            width: 200,
            height: 200,
        },
        title: {
            text: data[0].category,
        },
        credits: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: false,
                },
                showInLegend: false,
            },
        },
        series: [
            {
                name: "Price",
                color: "#006600",
                lineWidth: 1,
                marker: {
                    enabled: false,
                    symbol: "circle",
                    radius: 3,
                    states: {
                        hover: {
                            enabled: true,
                            lineWidth: 1,
                        },
                    },
                },
                data: chartData
            },
        ],
    };


    return (
        <div>
            <PieChart highcharts={Highcharts} options={options} />
        </div>
    );
};

export default React.memo(CategoryChart);
