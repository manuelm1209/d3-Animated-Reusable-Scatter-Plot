export const scatterPlot = () => {
    let width;
    let height;
    let data;
    let xValue;
    let yValue;
    let margin;

    const my = (selection) => {
        // X scale
        const x = d3.scaleLinear()
        // Use next line to start the axis from the minimum value.
        .domain(d3.extent(data, xValue))
        // // Use next line to start the axis from 0.
        // .domain([0, d3.max(data, xValue)])
        .range([margin.left, width - margin.right]);

        // Y scale
        const y = d3.scaleLinear()
            // Use next line to start the axis from the minimum value.
            .domain(d3.extent(data, yValue))
            // // Use next line to start the axis from 0
            // .domain([0, d3.max(data, yValue)])
            .range([height - margin.bottom, margin.top]);

        const marks = data.map(d => ({
            x: x(xValue(d)),
            y: y(yValue(d)),
        }));

        // Transition instance
        const t = d3.transition()
        .duration(1500)
        // .ease(d3.easeLinear);

        selection
            .selectAll('circle')
            .data(marks)
            .join(
                enter => enter.append('circle')
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y)
                    .attr('r', 0)
                    .call(enter => enter.transition(t).attr('r', 5)),
                update => update
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y),
                exit => exit.remove()

            )

            // Animation example from https://observablehq.com/@d3/selection-join
            //
            // .join(
            //     enter => enter.append("text")
            //         .attr("fill", "green")
            //         .attr("x", (d, i) => i * 16)
            //         .attr("y", -30)
            //         .text(d => d)
            //       .call(enter => enter.transition(t)
            //         .attr("y", 0)),
            //     update => update
            //         .attr("fill", "black")
            //         .attr("y", 0)
            //       .call(update => update.transition(t)
            //         .attr("x", (d, i) => i * 16)),
            //     exit => exit
            //         .attr("fill", "brown")
            //       .call(exit => exit.transition(t)
            //         .attr("y", 30)
            //         .remove())


        // Left axis
        selection
            .selectAll('g.y-axis')
            .data([null])
            .join('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        // Bottom axis
        selection
            .selectAll('g.x-axis')
            .data([null])
            .join('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x));
    };

    my.width = function (_) {
        return arguments.length
        ? ((width = +_), my)
        : width;
    }

    my.height = function (_) {
        return arguments.length
        ? ((height = +_), my)
        : height;
    }

    my.data = function (_) {
        return arguments.length
        ? ((data = _), my)
        : data;
    }

    my.xValue = function (_) {
        return arguments.length
        ? ((xValue = _), my)
        : xValue;
    }

    my.yValue = function (_) {
        return arguments.length
        ? ((yValue = _), my)
        : yValue;
    }

    my.margin = function (_) {
        return arguments.length
        ? ((margin = _), my)
        : margin;
    }

    return my;
};