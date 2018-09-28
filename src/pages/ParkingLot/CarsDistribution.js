import React, { Component } from "react";
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from "../function/parkingFunc";

require("echarts/map/js/province/jiangxi.js");

@inject("parkingLotData") @observer
class CarsDistributionComponent extends Component {
    render() {
        const { _carsDistribution, _carsDistribution3 } = this.props.parkingLotData;
        if (!_carsDistribution.mapDataSeries[0].data.length) {
            return <div>暂无数据</div>
        } else {
            const option = echartsOption(_carsDistribution, 'CarsDistribution');
            const option2 = echartsOption(_carsDistribution.mapDataSeries[0].data, 'CarsDistribution2')
            const option3 = echartsOption(_carsDistribution3, 'CarsDistribution3');
            return (
                <div style={{width: '100%', height: '100%'}}>
                    <ReactEcharts
                        option={option}
                        style={{width: '50%',height: '50%'}}
                        className='CarsDistribution'
                    />
                    <div style={{width: '50%', height: '50%', display: 'inline-block', textAlign: 'right'}}>
                        <ReactEcharts 
                            option={option2}
                            style={{width: '95%',height: '100%'}}
                            className='CarsDistribution'
                        />
                    </div>
                    <ReactEcharts 
                        option={option3}
                        style={{width: '100%',height: '50%'}}
                        className='CarsDistribution'
                    />
                </div>
            );
        }
    }
}

export default CarsDistributionComponent;