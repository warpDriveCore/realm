import React, { PureComponent } from "react";
import * as d3 from "d3";

class Chart extends PureComponent {

  constructor(props){
    super(props);

      this.state = {
        data: []
      };

      const elementWidth = 800;
      const elementHeight = 200;
      
      this.margin = {top: 30, right: 20, bottom: 30, left: 50};

      this.x = d3.scaleTime().domain([new Date(2018, 8, 10, 1, 30), new Date(2018, 8, 11, 5, 30)]).range([0, 700]);
      this.y = d3.scaleLinear().domain([350, 550]).range([elementHeight - this.margin.top - this.margin.bottom, 0]);
      this.elementWidth = elementWidth;
      this.elementHeight = elementHeight;
  }

  transformTime = (timestamp) => d3.timeParse("%I:%M %p %d-%b-%y")(d3.timeFormat("%I:%M %p %d-%b-%y")(new Date(timestamp*1000)))

  renderXAxis(){
    d3.axisBottom(this.x).ticks(5)(d3.select(this.refs.x));
  }

  renderYAxis(){
    d3.axisLeft(this.y).ticks(10)(d3.select(this.refs.y));
  }

  get line(){
    return d3.line()
      .x((d)=> (this.x(d.date)))
      .y((d)=> (this.y(d.shares)));
  }

  componentWillReceiveProps(nextProps) {
    const { statistics } = nextProps;
    const { length } = statistics;

    let dateFrom = statistics.slice(0,1).shift();
    let dateTo = statistics.slice(length - 1, length).shift();
  
    this.setState({
      data: statistics.filter((el, index) => el).map(({time, validShares}) => {
        const date = d3.timeFormat("%I:%M %p %d-%b-%y")(new Date(time*1000));
        return ({
          date : this.transformTime(date), 
          shares: validShares
        });
      }),
      dataFrom: this.transformTime(dateFrom.time),
      dateTo: this.transformTime(dateTo.time),
    });
  }
  
  render() {
    const { data, dataFrom, dateTo } = this.state;
    const { statistics } = this.props;
    const line = this.line;
    console.log()
    setTimeout(() => {
      const newData = statistics.filter((el, index) => el).map(({time, validShares}) => {
        const date = d3.timeFormat("%I:%M %p %d-%b-%y")(new Date(time*1000));
        return (
          {date : d3.timeParse("%I:%M %p %d-%b-%y")(date), 
          shares: validShares + 30
        });
      })

      d3.select(this.refs.line)
      .transition()
      .duration(300)
      .attr('d', line(newData))

    }, 1000);

    return (
      <svg width={this.elementWidth} height={this.elementHeight}>

          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
              <path ref='line' className="line" d={this.line(data)} style={{ fill: "none", stroke: 'tomato', strokeWidth: 3 }} />
              <g ref="x" className="x axis" transform={`translate(0, ${this.elementHeight - this.margin.top - this.margin.bottom})`}>
                {this.renderXAxis()}
              </g>
              <g ref='y' className="y axis">
                  {this.renderYAxis()}
              </g>
          </g>
      </svg>
    );
  }
}


export default Chart;