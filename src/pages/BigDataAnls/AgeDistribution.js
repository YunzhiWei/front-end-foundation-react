import React, { Component } from "react";

import ReactEcharts from '../lib';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

@inject("bigDataAnlsData") @observer
class AgeDistributionComponent extends Component {
    render() {
        const { _ageDistribution } = this.props.bigDataAnlsData;
        const option = echartsOption(_ageDistribution, 'AgeDistribution');   
        if (!_ageDistribution.categories.length) {
            return <div></div>
        } else {
            return (
                <ReactEcharts
                    option={option}
                    style={{width: '100%',height: '100%'}}
                    className='AgeDistribution'
                />
            );
        }
    }
}

export default AgeDistributionComponent;