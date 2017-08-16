import React,{ Component } from 'react';
import ReactEcharts from './lib';
import echartsOption from '../function/function';

import { inject, observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools';

@inject("dynamicChartStore") @observer
class DynamicChartComponent extends Component {
    render() {
        // const option = echartsOption(this.props, 'DynamicChart');
        const dynamicChartStore = this.props.dynamicChartStore;
        console.log(dynamicChartStore.option);
        return (
            <ReactEcharts
              option={dynamicChartStore.option}
              style={{width: '100%',height: '100%'}}
              className='DynamicChart'
            />
        );
    }
};

export default DynamicChartComponent;
