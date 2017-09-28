import React, { Component } from "react";
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from "../function/parkingFunc";

require("echarts/map/js/province/jiangxi.js");

@inject("parkingLotData") @observer
class CarsDistributionComponent extends Component {
    render() {
        const option = echartsOption(this.props.parkingLotData._carsDistribution, 'CarsDistribution');
        const option2 = echartsOption(this.props.parkingLotData._carsDistribution.mapDataSeries[0].data, 'CarsDistribution2')
        const option3 = echartsOption(this.props.radarData, 'RadarChart');
        return (
            <div style={{width: '100%', height: '100%'}}>
                <ReactEcharts
                    option={option}
                    style={{width: '50%',height: '100%'}}
                    className='CarsDistribution'
                />
                <div style={{width: '50%', height: '100%', display: 'inline-block', textAlign: 'right'}}>
                    <ReactEcharts 
                        option={option2}
                        style={{width: '80%',height: '50%'}}
                        className='CarsDistribution'
                    />
                    <ReactEcharts 
                        option={option3}
                        style={{width: '80%',height: '50%'}}
                        className='CarsDistribution'
                    />
                </div>
            </div>
        );
    }
}

export default CarsDistributionComponent;