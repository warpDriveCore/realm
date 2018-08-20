import React, { Component } from "react";
import * as d3 from "d3";

class Arc extends Component {
    arc = d3
        .arc()
        .innerRadius(80)
        .outerRadius(150)
        .cornerRadius(4);

    constructor(props) {
        super(props);

        this.state = {
            color: props.color,
            origCol: props.color,
            d: props.d,
            pathD: this.arc(props.d)
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            color: newProps.color
        });

        d3
            .select(this.refs.elem)
            .transition()
            .duration(80)
            .attr("d", this.arc(newProps.d))
            .on("end", () =>
                this.setState({
                    d: newProps.d
                    //pathD: this.arc(newProps.d)
                })
            );
    }

    hover = () => {
        this.setState({
            color: this.state.color.saturate(2)
        });
    };

    unhover = () => {
        this.setState({
            color: this.state.origCol
        });
    };

    render() {
        const { color, pathD } = this.state;

        return (
            <path
                d={pathD}
                style={{
                    fill: color
                }}
                onMouseOver={this.hover}
                onMouseOut={this.unhover}
                ref="elem"
            />
        );
    }
}

class Piechart extends Component {
    pie = d3
        .pie()
        .value(d => d.amount)
        .sortValues(d => d.tag)
        .padAngle(0.005);

    render() {
      var data = [
        {
          amount:34
        },
        {
          amount:45
        },
        {
          amount:12
        },
        {
          amount:100
        },
        {
          amount:500
        },
    ];

        return (
          <svg width="400" height="400">
            <g transform={'translate(200, 200)'}>
                {this.pie(data).map((d, i) => (
                    <Arc d={d} color={'#fff'} key={'dummy'} />
                ))}
            </g>
            </svg>
        );
    }
}

export default Piechart;