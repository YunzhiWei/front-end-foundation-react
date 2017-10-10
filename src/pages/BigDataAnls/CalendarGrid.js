import React, { Component } from "react";
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

@inject("bigDataAnlsData") @observer
class CalendarGridComponent extends Component {
    render() {
        const option = echartsOption(this.props.bigDataAnlsData, 'CalendarGrid');        
        return (
            <div style={{width: '100%', height: '2850px', margin: '50px auto'}}>
                <ReactEcharts
                    option={option}
                    style={{width: '100%',height: '100%'}}
                    className='CalendarGrid'
                />
            </div>
        );
    }
}

export default CalendarGridComponent;