import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';

import ReactEcharts from './BigData/lib';
import LineAndHistogram from './BigData/LineAndHistogram';



// chart data

const dynamicSeries = [
	{
		name: '游船数量',
		type:'bar',
		data: [6,6,6,6,6,6]
	},
	{
		name: '游客数量',
		type:'line',
		data: [8,8,8,8,8,8]
  }
];

const dynamicXAxisConfig = [
	{
    data: [1,2,3,4,5,6]
	}
];

const dynamicYAxisConfig = [
	{ name: '游客数量', max:20, min:0 },
	{ name: '游船数量', max:12, min:0 }
]

// chart view

const dynamicOption = {
    tooltip: { trigger: 'axis' },
    legend: { textStyle: { color: '#f' } },
    grid: { top: 60, left: 30, right: 60, bottom:30 },
};

function PrepareDynamicOption() {
  dynamicYAxisConfig.forEach((item) => {
    item.type = 'value';
    item.scale = true;
    item.nameTextStyle = { color: '#BF' };
    item.boundaryGap = [0.2, 0.2];
    item.axisLabel = { textStyle : { color: '#f' } };
  });

  dynamicXAxisConfig.forEach((item) => {
    item.type = 'category';
    item.boundaryGap = true;
    item.axisLabel = { textStyle : { color: '#ff' } };
  });

  dynamicSeries.forEach((item) => {
    if (item.type === 'bar') {
      item.itemStyle = {
        normal: { barBorderRadius: 4, opacity: '0.8' },
        emphasis: { opacity: '1' }
      };
      item.animationEasing = 'elasticOut';
      item.animationDelay = function (idx) { return idx * 10 };
      item.animationDelayUpdate = function (idx) { return idx * 10 };
    }
  });

	const legendData = dynamicSeries.map((item, i) => {
	    return item.name;
	});
	dynamicOption.legend.data = legendData;
	dynamicOption.xAxis       = dynamicXAxisConfig;
	dynamicOption.yAxis       = dynamicYAxisConfig;
	dynamicOption.series      = dynamicSeries;

}

async function fetchAll() {
	console.log("componentDidMount +");
	const response = await fetch('http://localhost:3000/api/v1/stickers')
	const status = await response.status;

	if (status === 200) {
		const body = await response.json();
		console.log("body json: ", body);
	}
	else {
		console.log("Status is not 200");
	}
	console.log("componentDidMount -");
}

@inject("chartdata") @observer
class TestPage extends Component {
  constructor(props) {
      super(props);
			PrepareDynamicOption();
  }

	componentDidMount() {
		fetchAll();
	}

  render() {
    const {chartdata} = this.props;

    // const bardata = toJS(chartdata.chartdata);

		const newOption = {...dynamicOption};
		newOption.series.forEach((s, id) => {
			s.data.shift();
			s.data.push(chartdata.newdata[id]);
		});
		// newOption.series[0].data.shift();
		// newOption.series[0].data.push(chartdata.newdata);

		let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
		newOption.xAxis[0].data.shift();
		newOption.xAxis[0].data.push(axisData);


    return (
      <div className="AboutPage">
        <h2>This is the Test Page</h2>
        <p>
          income:
          {/* <span> {chartdata.income} </span> */}
        </p>
        <div>
          {/* <LineAndHistogram	BarLinesData={bardata}	/> */}
        </div>
        <div className='parent' style={{position: 'relative'}}>
          <ReactEcharts ref='echarts_react'
            option={newOption}
            style={{height: 400,width: 850,margin: '0 0 0 -50%',left: '50%'}}
          />
        </div>

      </div>
    );
  }
}

export default TestPage;
