import React, { PureComponent } from "react";
import * as d3 from "d3";

class Arc extends PureComponent {
    initialArc = d3
      .arc()
      .innerRadius(90)
      .outerRadius(140)
      .cornerRadius(4);

     arc = d3
      .arc()
      .innerRadius(80)
      .outerRadius(150)
      .cornerRadius(4);

    arcOver = d3
      .arc()
      .innerRadius(70)
      .outerRadius(160)
      .cornerRadius(4);

    hover = () => {
      const { d } = this.props; 

      d3
        .select(this.refs.elem)
        .transition()
        .duration(300)
        .attr("d", this.arcOver(d));
    };

    unhover = () => {
      const { d } = this.props; 

      d3
        .select(this.refs.elem)
        .transition()
        .duration(300)
        .attr("d", this.arc(d));
    }
    
    componentDidMount() {
       const { d, animate } = this.props; 
       if(animate) {
        d3
        .select(this.refs.elem)
        .transition()
        .duration(300)
        .attr("d", this.arc(d));
       }
    }

    render() {
        const { color, d } = this.props;
        const pathD = this.initialArc(d);
    
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

const emptyPieChartData = [
  {
  color: "#5D69BD",
  amount: 1,

  },
  {
    color: "#5D69BD",
    amount: 1,

  },
  {
    color: "#5D69BD",
    amount: 1,

  },
]

class Piechart extends PureComponent {
    pie = d3
      .pie()
      .value(d => d.amount)
      .sortValues(d => d.amount)
      .padAngle(0.005);

    render() {
      let { portfolio } = this.props;
        return (
          <svg width="400" height="400">
            <g transform={'translate(200, 200)'}>
                {portfolio.length ? 
                  this.pie(portfolio).map((item) => (
                    <Arc d={item} color={item.data.color} key={item.data.symbol} animate={true} />
                  )): (
                    this.pie(emptyPieChartData).map((item) => (
                      <Arc d={item} color={item.data.color} key={item.data.symbol} animate={false} />
                    ))
                  )}
            </g>
            </svg>
        );
    }
}

export default Piechart;