import React, { Component } from "react";
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

@inject("bigDataAnlsData") @observer
class CalendarGridComponent extends Component {
    render() {
        const option = echartsOption(this.props.bigDataAnlsData, 'CalendarGrid');        
        return (
            <ReactEcharts
                option={option}
                style={{width: '100%', height: '100%', margin: '50px 0'}}
                className='CalendarGrid'
            />
        );
    }
}

export default CalendarGridComponent;