import { observable } from 'mobx';
import axios from 'axios';

class EchartsData {
    @observable parking = {};
    constructor(){
        var i = 0;
        var self = this;
        setInterval(function(){
            i = i === 5 ? 1 : i+1;
            self.fetchParkingDate(i);
        }, 2000);
    }
    fetchParkingDate (index) {
        let self = this;
        axios.get('http://localhost:300/parkingLot' + index).then(function(data){
            self.parking = data.data;
        })
    }
    

}

export default EchartsData;