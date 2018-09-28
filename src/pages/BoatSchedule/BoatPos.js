import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Map, MarkerList, InfoWindow, ScaleControl, NavigationControl, OverviewMapControl, MapTypeControl, Marker, Polyline} from 'react-bmap';

import img from '../mui/images/large-screen-bg.png'

@inject("boatScheduleData") @observer
class BoatPosComponent extends Component {
    render() {
    	const posLineWay = this.props.boatScheduleData._posLineWay;
		var markerData = this.props.boatScheduleData._markerData;
		console.log(markerData[0]);
		return (
			<div style={{height: '100%', width: '100%', position: 'relative'}}>
	            <Map style={{height: '100%', width: '100%'}} center={{lng: 114.789949, lat: 27.715516}} zoom="15">
	                <NavigationControl />
	                <OverviewMapControl />
	                <Marker position={{ lng: 114.801669, lat: 27.730641 }} icon="red1">
	                	 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>仙女湖主码头</div>
	                </Marker>
	                <Marker position={{ lng: 114.755146, lat: 27.74542 }} icon="red2">
	                	 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>杨梅山码头</div>
	                </Marker>
	            	<Marker position={{ lng: 114.798471, lat: 27.726868 }} icon="red3">
	            		 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>桃花岛码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.793423, lat: 27.727267 }} icon="red4">
	            		 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>名人岛码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.754625, lat: 27.74056 }} icon="red5">
	            		 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>圣集寺码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.809278, lat: 27.723758 }} icon="red6">
	            		 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>龙凤苑码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.809682, lat: 27.71418 }} icon="red7">
	            		 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>爱情岛码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.805074, lat: 27.698925 }} icon="red8">
	            		 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>龙王岛码头</div>
	            	</Marker>
	            	<MarkerList 
	            	    data={[
	            	        {
	            	            text: "赣仙游008",
	            	            location: "114.809682,27.71418"
	            	        },
	            	        {
	            	            text: "赣仙游002",
	            	            location: "114.798471,27.726868"
	            	        }
	            	    ]} 
	            	    fillStyle="#ff3333" 
	            	    animation={true} 
	            	    isShowShadow={false} 
	            	    multiple={true} 
	            	    autoViewport={false}
	            	    className="test"
	            	    style={{
	            	    	width: '120px',
	            	    	height: '120px'
	            	    }}
	            	/>
	            	{posLineWay.map((item, i) => (
	            		<Polyline 
	            			key={i}
	            		    strokeColor={item.color} 
	            		    path={item.data}
	            		    width='1px'
	            		/>
	            	))}
	            </Map>
            </div>
        );
	}
}
// 遮罩
// <div className="jxjb" style={{height: '100%', width: '100%', position: 'absolute', zIndex: '10'}}></div>
export default BoatPosComponent;