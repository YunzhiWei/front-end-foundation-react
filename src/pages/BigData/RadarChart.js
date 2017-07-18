import React, { Component } from 'react';
import ReactEcharts from './lib';

class RadarChart extends Component {
    render() {
        const { radarSeries, radarIndicator } = this.props.radarData;
        radarSeries.type = 'radar';
        const legendData = radarSeries.data.map((item) => {
            return item.name;
        });
        const option = {
            legend: {
                data: legendData,
                textStyle: { color: '#fff' },
            },
            radar: radarIndicator,
            series: radarSeries
        };

        return (
            <div className='examples'>
                <div className='parent' style={{position: 'relative'}}>
                    <ReactEcharts
                        option={option}
                        style={{height: 400,width: 500,margin: '0 0 0 -50%',left: '50%'}} />
                </div>
            </div>
        );
    }
};

export default RadarChart;
