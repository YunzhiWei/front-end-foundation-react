import React, { Component } from "react";

import ReactEcharts from '../lib';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

@inject("echartsData") @observer
class CustomerTendComponent extends Component {
    render() {
        const option = echartsOption(this.props.echartsData.pass.barData, 'CustomerTend');   
        return (
            <ReactEcharts
                option={option}
                style={{width: '100%',height: '100%'}}
                className='CustomerTend'
            />
        );
    }
}

export default CustomerTendComponent;