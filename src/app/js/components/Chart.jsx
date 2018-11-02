import React, { PureComponent } from "react";
import * as d3 from "d3";

class Chart extends PureComponent {

  constructor(props){
    super(props);

      this.state = {
        data: [],
				highestHash: 600,
				lowestHash: 0,
      };

      const elementWidth = 800;
      const elementHeight = 200;
      
      this.margin = {top: 30, right: 20, bottom: 30, left: 50};

      this.elementWidth = elementWidth;
      this.elementHeight = elementHeight;
  }

  transformTime = (timestamp) => d3.timeParse('%I:%M %p %d-%b-%y')(d3.timeFormat('%I:%M %p %d-%b-%y')(new Date(timestamp*1000)))

  get x() {
    const msec = 86400000;
    const { dateFrom, dateTo } = this.state;
		// console.log(dateFrom, dateTo);

		const now = new Date();
    const from = dateFrom ? dateFrom : new Date(now.getTime() - msec);
    const to = dateTo ? dateTo : now;

    return d3.scaleTime().domain([from, to]).range([0, 700]);
  }

  get y() {
    const { highestHash, lowestHash } = this.state;
    return d3.scaleLinear().domain([lowestHash, highestHash]).range([this.elementHeight - this.margin.top - this.margin.bottom, 0])
  }

  renderXAxis(){
    d3.axisBottom(this.x).ticks(12).tickFormat(d3.timeFormat("%H:%M"))(d3.select(this.refs.x));
  }

  renderYAxis(){
    d3.axisLeft(this.y).ticks(10)(d3.select(this.refs.y));
  }

  get currentLine() {
    return d3.line()
      .x((d)=> (this.x(d.date)))
      .y((d)=> (this.y(d.currentHashrate)));
  }
  get reportedLine() {
    return d3.line()
      .x((d)=> (this.x(d.date)))
      .y((d)=> (this.y(d.reportedHashrate)));
  }

  componentWillReceiveProps(nextProps) {
    const { statistics } = nextProps;
    const { length } = statistics;
    const firstStat = statistics.slice(0,1).shift();
    const lastStat = statistics.slice(length - 1, length).shift();
		const currentHashRate = (firstStat.currentHashrate / 1e6).toFixed(0);

    let highestHash = currentHashRate + 30;
    let lowestHash = currentHashRate - 30;

    const chartData = statistics.map(({time, validShares, currentHashrate, reportedHashrate}) => {
			const date = d3.timeFormat("%I:%M %p %d-%b-%y")(new Date(time*1000));
			const current = (currentHashrate / 1e6).toFixed(0);
			const reported = (reportedHashrate / 1e6).toFixed(0);

			highestHash = highestHash > current ? highestHash : current;
			lowestHash = lowestHash < current ? lowestHash : current;
			return ({
				date : d3.timeParse("%I:%M %p %d-%b-%y")(date), // this.transformTime(date),
				shares: validShares,
				currentHashrate: current,
				reportedHashrate: reported,
			});
		});

    this.setState({
      data: chartData,
      dateFrom: this.transformTime(firstStat.time),
      dateTo: this.transformTime(lastStat.time),
			highestHash: + highestHash + 30,
			lowestHash: + lowestHash - 30,
    });
  }
  
  render() {
    const { data } = this.state;
    return (
      <svg width={this.elementWidth} height={this.elementHeight}>
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
              <path ref='line' className="line" d={this.currentLine(data)} style={{ fill: "none", stroke: 'tomato', strokeWidth: 3 }} />
              <path ref='line' className="line" d={this.reportedLine(data)} style={{ fill: "none", stroke: 'green', strokeWidth: 3 }} />
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