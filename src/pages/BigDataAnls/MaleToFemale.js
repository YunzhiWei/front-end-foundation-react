import React, { Component } from "react";

import ReactEcharts from '../lib';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

@inject("bigDataAnlsData") @observer
class MaleToFemaleComponent extends Component {
    render() {
        const { _maleToFemale } = this.props.bigDataAnlsData;
        const option = echartsOption(_maleToFemale, 'MaleToFemale');    
        return (
            <ReactEcharts
                option={option}
                style={{width: '100%',height: '100%'}}
                className='MaleToFemale'
            />
        );
    }
}

export default MaleToFemaleComponent;