import React, { PureComponent } from "react";
import * as d3 from "d3";

class Bullet extends PureComponent {
	hover = () => {
		this.refs.c.classList.toggle('ui-chart__bullet_highlighted');
		this.refs.l.classList.toggle('ui-chart__line_highlighted');
		this.refs.r.classList.toggle('ui-chart__hoverSection_highlighted');
	};

	unhover = () => {
		this.refs.c.classList.toggle('ui-chart__bullet_highlighted');
		this.refs.l.classList.toggle('ui-chart__line_highlighted');
		this.refs.r.classList.toggle('ui-chart__hoverSection_highlighted');
	};

	render() {
		const { d, x, y, height } = this.props;
		return (
			<g>
				<line className="ui-chart__line"
							x1={x(d.date)}
							x2={x(d.date)}
							y1={0}
							y2={height}
							ref="l"
				/>
				<rect className="ui-chart__hoverSection"
							x={x(d.prevDate)}
							y={0}
							width={x(d.date) - x(d.prevDate)}
							height={height}
							ref="r"
							onMouseOver={this.hover}
							onMouseOut={this.unhover}
				/>
				<circle className="ui-chart__bullet"
								r='3'
								cx={x(d.date)}
								cy={y(d.currentHashrate)}
								data-key={'333'}
								ref="c"
				/>
			</g>
		);
	}
}

class Chart extends PureComponent {

  constructor(props){
    super(props);

      this.state = {
        data: [],
				highestHash: 600,
				lowestHash: 0,
      };

      const elementWidth = 1000;
      const elementHeight = 400;
      const chartRange = 900;
      
      this.margin = {top: 30, right: 20, bottom: 30, left: 50};

      this.elementWidth = elementWidth;
      this.elementHeight = elementHeight;
      this.chartRange = chartRange;
  }

  transformTime = (timestamp) => d3.timeParse('%I:%M %p %d-%b-%y')(d3.timeFormat('%I:%M %p %d-%b-%y')(new Date(timestamp*1000)));

  get x() {
    const msec = 86400000;
    const { dateFrom, dateTo } = this.state;
		// console.log(dateFrom, dateTo);

		const now = new Date();
    const from = dateFrom ? dateFrom : new Date(now.getTime() - msec);
    const to = dateTo ? dateTo : now;

    return d3.scaleTime().domain([from, to]).range([0, this.chartRange]);
  }

  get y() {
    const { minY, maxY } = this.state;
    return d3.scaleLinear().domain([minY, maxY]).range([this.elementHeight - this.margin.top - this.margin.bottom, 0])
  }

  renderXAxis(){
    d3.axisBottom(this.x).ticks(12).tickFormat(d3.timeFormat("%H:%M"))(d3.select(this.refs.x));
  }

  renderYAxis(){
		const { ticksY } = this.state;

    d3.axisLeft(this.y).ticks(ticksY)(d3.select(this.refs.y));
  }

  renderRightYAxis(){
		const { ticksY } = this.state;
    d3.axisLeft(this.y).ticks(ticksY).tickFormat('').tickSize(this.chartRange, 0, 0)(d3.select(this.refs.z));
  }

	renderBullets(data) {
  	let prevDate = null;
  	const dots = data.map((el, index) => {
			const { date } = el;
			if(index === 0) {
				prevDate = date;
			}

			const dotData = Object.assign({}, el, {
				prevDate
			});

			prevDate = date;

			return dotData;
		});

		return(
			<g>
				{dots.map((d,i) => (
					<Bullet
						d={d}
						x={this.x}
						y={this.y}
						height={this.elementHeight - 60}
					/>
					)
				)}
			</g>
		);
	};

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

    let highestHash = currentHashRate;
    let lowestHash = currentHashRate;

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

    const maxY = Math.ceil(+highestHash/50) * 50;
    const minY = Math.floor(+lowestHash/50) * 50;
    const ticksY = (maxY - minY) / 50;

    this.setState({
      data: chartData,
      dateFrom: this.transformTime(firstStat.time),
      dateTo: this.transformTime(lastStat.time),
			maxY,
			minY,
			ticksY,
    });
  }
  
  render() {
    const { data } = this.state;
    return (
      <svg width={this.elementWidth} height={this.elementHeight}>
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
						<g ref='x' className='x ui-chart__axis' transform={`translate(0, ${this.elementHeight - this.margin.top - this.margin.bottom})`}>
							{this.renderXAxis()}
						</g>
						<g ref='y' className='y ui-chart__axis'>
							{this.renderYAxis()}
						</g>
						<g ref='z' className='y ui-chart__axis ui-chart__axis_right' transform={`translate(${this.elementWidth - 100}, 0)`}>
							{this.renderRightYAxis()}
						</g>
						<g>
							<path ref='hashLine' className='ui-chart__hashLine ui-chart__hashLine_reported' d={this.reportedLine(data)} />
							<path ref='hashLine' className='ui-chart__hashLine ui-chart__hashLine_current' d={this.currentLine(data)} />
						</g>

						{this.renderBullets(data)}
          </g>
      </svg>
    );
  }
}


export default Chart;