import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Map, MarkerList} from 'react-bmap';


@inject("boatScheduleData") @observer
class BoatPosComponent extends Component {
    render() {
		return (
            <Map style={{height: '100%', width: '100%'}} center={{lng: 114.802949, lat: 27.715516}} zoom="16">
                <MarkerList 
                    data={[{
                            text: "游船001",
                            location: "114.84183,27.711712"
                        }, {
                            text: "游船001",
                            location: "114.807565,27.717436"
                        }, {
                            text: "游船001",
                            location: "114.817354,27.724353"
                        }, {
                            text: "游船001",
                            location: "114.824563,27.735208"
                        }, {
                            text: "游船001",
                            location: "114.838324,27.704532"
                        }, {
                            text: "游船001",
                            location: "114.815384,27.690257"
                        }, {
                            text: "游船001",
                            location: "114.785437,27.722742"
                        }, {
                            text: "游船001",
                            location: "114.794536,27.713787"
                        }, {
                            text: "游船001",
                            location: "114.813782,27.693458"
                        }, {
                            text: "游船001",
                            location: "114.833381,27.719736"
                        }, {
                            text: "游船001",
                            location: "114.851111,27.704538"
                        }
                    ]} 
                    fillStyle="#ff3333" 
                    animation={true} 
                    isShowShadow={false} 
                    multiple={true} 
                    autoViewport={false}
                />
            </Map>
        );
	}
}

export default BoatPosComponent;