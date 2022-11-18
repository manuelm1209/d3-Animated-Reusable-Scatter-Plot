import { scatterPlot } from './scatterPlot.js';

const csvUrl = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

// Adding a "+" before a string, will convert it into a number.
const parseRow = (d) => {
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
    return d;
}

const width = window.innerWidth;
const height = window.innerHeight;    

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);
    
// // The second argument is a funtion that takes as input a single row and replace it.  
// // First way to import data.
// d3.csv(csvUrl, parseRow).then(data => {
//     console.log(data);
// });

// This is a better way to import data.
const main = async () => {
    const data = await d3.csv(csvUrl, parseRow);
    const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(data)
    // Columns for the range.
    .xValue((d) => d.petal_length)
    .yValue((d) => d.sepal_length)
    // d3 margin convention.
    .margin({top: 20, right: 20, bottom: 40, left:50})
    svg.call(plot);

    const columns = [
        'petal_width',
        'sepal_width',
        'petal_length',
        'sepal_length'
    ];

    let i = 0;

    setInterval(() => {
        console.log(i % columns.length);
        plot.xValue((d) => d[columns[i % columns.length]])
        svg.call(plot);
        i++;
    }, 5000);


};
main();
