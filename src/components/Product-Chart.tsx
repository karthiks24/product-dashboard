import React from "react";
import Highcharts from "highcharts/highstock";
import ColumnChart from "highcharts-react-official";

const ProductChart = (props: any) => {
    const { data, productData } = props
    const productResponse = productData.filter((value: { products: { category: any; }[]; }) => value.products[0].category === data.selectedCategory)
    const selectedProduct = productResponse[0].products
    const selectedCategory = data.selectedProduct.length > 0 ? selectedProduct.filter((value: { title: any; }) => data.selectedProduct.includes(value.title)) : selectedProduct
    const chartData = selectedCategory.map((value: {
        price: any; title: any;
    }) => ({
        y: value.price,
        name: value.title
    }))
    const options = {
        chart: {
            type: "column",
            width: 700, // Set the width in pixels
            height: 600, // Set the height in pixels
        },
        title: {
            text: selectedCategory[0].category,
        },
        credits: {
            enabled: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Price'
            }
        },
        xAxis: {
            categories: chartData.map((value: { name: any; }) => value.name),

        },
        plotOptions: {
            column: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                },
                showInLegend: false,
            },

        },
        series: [
            {
                name: "Price",
                lineWidth: 1,
                data: chartData
            },
        ],
    };

    return (
        <div>
            <ColumnChart highcharts={Highcharts} options={options} />
        </div>
    );
};

export default React.memo(ProductChart);
