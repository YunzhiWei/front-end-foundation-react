import React, { Component } from "react";

import ReactEcharts from '../lib';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

@inject("bigDataAnlsData") @observer
class IndvToGroupComponent extends Component {
    render() {
        const option = echartsOption(this.props.bigDataAnlsData, 'IndvToGroup');    
        return (
            <ReactEcharts
                option={option}
                style={{width: '100%',height: '100%'}}
                className='IndvToGroup'
            />
        );
    }
}

export default IndvToGroupComponent;