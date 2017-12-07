import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Map, MarkerList, InfoWindow, ScaleControl, Marker, Polyline} from 'react-bmap';

import img from '../mui/images/large-screen-bg.png'

@inject("boatScheduleData") @observer
class BoatPosComponent extends Component {
    render() {
    	const posLineWay = this.props.boatScheduleData._posLineWay;
		var markerData = this.props.boatScheduleData._markerData.map((item, i) => {
			return { lng: item.lng, lat: item.lat };
		});
		console.log(markerData);
		return (
			<div style={{height: '100%', width: '100%', position: 'relative'}}>
	            <Map style={{height: '100%', width: '100%'}} center={{lng: 114.789949, lat: 27.715516}} zoom="17">
	                <Marker position={{ lng: 114.801669, lat: 27.730641 }} icon="red1">
	                	 <div style={{width: '300px', height: '100px', lineHeight: '100px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-120px", left: "-150px", textAlign: 'center'}}>仙女湖主码头</div>
	                </Marker>
	                <Marker position={{ lng: 114.755146, lat: 27.74542 }} icon="red2">
	                	 <div style={{width: '300px', height: '100px', lineHeight: '100px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-120px", left: "-150px", textAlign: 'center'}}>杨梅山码头</div>
	                </Marker>
	            	<Marker position={{ lng: 114.798471, lat: 27.726868 }} icon="red3">
	            		 <div style={{width: '300px', height: '100px', lineHeight: '100px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-120px", left: "-150px", textAlign: 'center'}}>桃花岛码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.793423, lat: 27.727267 }} icon="red4">
	            		 <div style={{width: '300px', height: '100px', lineHeight: '100px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-120px", left: "-150px", textAlign: 'center'}}>名人岛码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.754625, lat: 27.74056 }} icon="red5">
	            		 <div style={{width: '300px', height: '100px', lineHeight: '100px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-120px", left: "-150px", textAlign: 'center'}}>圣集寺码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.809278, lat: 27.723758 }} icon="red6">
	            		 <div style={{width: '300px', height: '100px', lineHeight: '100px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-120px", left: "-150px", textAlign: 'center'}}>龙凤苑码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.809682, lat: 27.71418 }} icon="red7">
	            		 <div style={{width: '300px', height: '100px', lineHeight: '100px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-120px", left: "-150px", textAlign: 'center'}}>爱情岛码头</div>
	            	</Marker>
	            	<Marker position={{ lng: 114.805074, lat: 27.698925 }} icon="red8">
	            		 <div style={{width: '300px', height: '100px', lineHeight: '100px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-120px", left: "-150px", textAlign: 'center'}}>龙王岛码头</div>
	            	</Marker>
	            	<MarkerList 
	            		data={markerData}
	            		fillStyle="#ff3333" 
	                    coordType="bd09mc" 
	                    animation={true} 
	                    isShowShadow={true}
	                    multiple={true} 
	                    autoViewport={false}
                    />	            	
	            	{posLineWay.map((item, i) => (
	            		<Polyline 
	            			key={i}
	            		    strokeColor={item.color} 
	            		    path={item.data}
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