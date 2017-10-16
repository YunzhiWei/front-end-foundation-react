import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Map, MarkerList, InfoWindow, ScaleControl, Marker} from 'react-bmap';

import img from '../mui/images/large-screen-bg.png'

@inject("boatScheduleData") @observer
class BoatPosComponent extends Component {
    render() {
		return (
			<div style={{height: '100%', width: '100%', position: 'relative'}}>
				<div className="jxjb" style={{height: '100%', width: '100%', position: 'absolute', zIndex: '10'}}></div>
	            <Map style={{height: '100%', width: '100%'}} center={{lng: 114.802949, lat: 27.715516}} zoom="16">
	                <InfoWindow position={{lng: 114.833381, lat: 27.719736}} text="信息窗口内容" title="信息窗口标题"/>
	                <Marker position={{lng: 114.785437, lat: 27.722742}} icon="red1"/>
	                <Marker position={{lng: 114.833381, lat: 27.719736}} icon="red2"/>
	            </Map>
            </div>
        );
	}
}

export default BoatPosComponent;