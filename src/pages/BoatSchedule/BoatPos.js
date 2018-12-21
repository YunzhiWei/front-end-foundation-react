import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Map, MarkerList, InfoWindow, ScaleControl, NavigationControl, OverviewMapControl, MapTypeControl, Marker, Polyline} from 'react-bmap';

import img from '../mui/images/large-screen-bg.png'

@inject("boatScheduleData") @observer
class BoatPosComponent extends Component {
	componentDidMount() {
		this.map.map.setMapStyle({
			styleJson: [{
			    "featureType": "land",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "color": "#f5f5f5ff"
			    }
			}, {
			    "featureType": "water",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "color": "#bedbf9ff"
			    }
			}, {
			    "featureType": "green",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "color": "#d0edccff"
			    }
			}, {
			    "featureType": "building",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "building",
			    "elementType": "geometry.fill",
			    "stylers": {
			        "color": "#ffffffb3"
			    }
			}, {
			    "featureType": "building",
			    "elementType": "geometry.stroke",
			    "stylers": {
			        "color": "#dadadab3"
			    }
			}, {
			    "featureType": "subwaystation",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "color": "#b15454B2"
			    }
			}, {
			    "featureType": "education",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "color": "#e4f1f1ff"
			    }
			}, {
			    "featureType": "medical",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "color": "#f0dedeff"
			    }
			}, {
			    "featureType": "scenicspots",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "color": "#e2efe5ff"
			    }
			}, {
			    "featureType": "highway",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "weight": 4
			    }
			}, {
			    "featureType": "highway",
			    "elementType": "geometry.fill",
			    "stylers": {
			        "color": "#f7c54dff"
			    }
			}, {
			    "featureType": "highway",
			    "elementType": "geometry.stroke",
			    "stylers": {
			        "color": "#fed669ff"
			    }
			}, {
			    "featureType": "highway",
			    "elementType": "labels",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "highway",
			    "elementType": "labels.text.fill",
			    "stylers": {
			        "color": "#8f5a33ff"
			    }
			}, {
			    "featureType": "highway",
			    "elementType": "labels.text.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "highway",
			    "elementType": "labels.icon",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "arterial",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "weight": 2
			    }
			}, {
			    "featureType": "arterial",
			    "elementType": "geometry.fill",
			    "stylers": {
			        "color": "#d8d8d8ff"
			    }
			}, {
			    "featureType": "arterial",
			    "elementType": "geometry.stroke",
			    "stylers": {
			        "color": "#ffeebbff"
			    }
			}, {
			    "featureType": "arterial",
			    "elementType": "labels",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "arterial",
			    "elementType": "labels.text.fill",
			    "stylers": {
			        "color": "#525355ff"
			    }
			}, {
			    "featureType": "arterial",
			    "elementType": "labels.text.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "local",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "weight": 1
			    }
			}, {
			    "featureType": "local",
			    "elementType": "geometry.fill",
			    "stylers": {
			        "color": "#d8d8d8ff"
			    }
			}, {
			    "featureType": "local",
			    "elementType": "geometry.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "local",
			    "elementType": "labels",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "local",
			    "elementType": "labels.text.fill",
			    "stylers": {
			        "color": "#979c9aff"
			    }
			}, {
			    "featureType": "local",
			    "elementType": "labels.text.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "railway",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "weight": 1
			    }
			}, {
			    "featureType": "railway",
			    "elementType": "geometry.fill",
			    "stylers": {
			        "color": "#949494ff"
			    }
			}, {
			    "featureType": "railway",
			    "elementType": "geometry.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "subway",
			    "elementType": "geometry",
			    "stylers": {
			        "visibility": "on",
			        "weight": 1
			    }
			}, {
			    "featureType": "subway",
			    "elementType": "geometry.fill",
			    "stylers": {
			        "color": "#d8d8d8ff"
			    }
			}, {
			    "featureType": "subway",
			    "elementType": "geometry.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "subway",
			    "elementType": "labels",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "subway",
			    "elementType": "labels.text.fill",
			    "stylers": {
			        "color": "#979c9aff"
			    }
			}, {
			    "featureType": "subway",
			    "elementType": "labels.text.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "continent",
			    "elementType": "labels",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "continent",
			    "elementType": "labels.icon",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "continent",
			    "elementType": "labels.text.fill",
			    "stylers": {
			        "color": "#333333ff"
			    }
			}, {
			    "featureType": "continent",
			    "elementType": "labels.text.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "city",
			    "elementType": "labels.icon",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "city",
			    "elementType": "labels",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "city",
			    "elementType": "labels.text.fill",
			    "stylers": {
			        "color": "#454d50ff"
			    }
			}, {
			    "featureType": "city",
			    "elementType": "labels.text.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "town",
			    "elementType": "labels.icon",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "town",
			    "elementType": "labels",
			    "stylers": {
			        "visibility": "on"
			    }
			}, {
			    "featureType": "town",
			    "elementType": "labels.text.fill",
			    "stylers": {
			        "color": "#454d50ff"
			    }
			}, {
			    "featureType": "town",
			    "elementType": "labels.text.stroke",
			    "stylers": {
			        "color": "#ffffffff"
			    }
			}, {
			    "featureType": "poilabel",
			    "elementType": "labels.icon",
			    "stylers": {
			        "visibility": "off"
			    }
			}, {
			    "featureType": "poilabel",
			    "elementType": "labels",
			    "stylers": {
			        "visibility": "off"
			    }
			}]
		})
	}
    render() {
    	const { _posLineWay, _mapCenter, _posMakers, _wharfList } = this.props.boatScheduleData;
		return (
			<div style={{height: '100%', width: '100%', position: 'relative'}}>
	            <Map ref={ref => this.map = ref} style={{height: '100%', width: '100%'}} center={_mapCenter} zoom="15">
	                <NavigationControl />
	                <OverviewMapControl />
	                {Object.keys(_wharfList).map((wharfName, i) => (
	                	<Marker position={_wharfList[wharfName]} icon={`red${i+1}`} key={i}>
	                		 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>{wharfName}</div>
	                	</Marker>
	                ))}
	            	<MarkerList 
	            	    data={_posMakers} 
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
	            	{_posLineWay.map((item, i) => (
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