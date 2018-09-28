import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react'
import echartsOption from '../function/function';

@inject("echartsData") @observer
class TransportationComponent extends Component {
    render() {
        const { echartsData } = this.props;
        const option = echartsOption(echartsData.weather, 'Transportation');
        return (
            <ReactEcharts
              option={option}
              style={{width: '100%',height: '100%'}}
              className='Transportation'
            />
        );
    }
};

export default TransportationComponent;
