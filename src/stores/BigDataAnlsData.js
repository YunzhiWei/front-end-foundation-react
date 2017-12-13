import { observable } from 'mobx';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

class BigDataAnlsData {
	@observable _nationalRanking = [
		[{
			name: '湖南省',
			value: 34857
		}, {
			name: '上海市',
			value: 13900
		}, {
			name: '福建省',
			value: 7393
		}, {
			name: '江苏省',
			value: 6541
		}, {
			name: '湖北省',
			value: 5678
		}, ], [{
			name: '湖南省浏阳市',
			value: 6708
		}, {
			name: '湖南省株洲市',
			value: 5774
		}, {
			name: '湖南省长沙市',
			value: 4505
		}, {
			name: '湖南省湘潭市',
			value: 1232
		}, {
			name: '福建省福州市',
			value: 211
		}]
	]
	@observable _JXRanking = [
	    [{
	        "name": "南昌",
	        "value": "42083"
	    }, {
	        "name": "宜春",
	        "value": "35040"
	    }, {
	        "name": "萍乡",
	        "value": "27602"
	    }, {
	        "name": "吉安",
	        "value": "21081"
	    }, {
	        "name": "新余",
	        "value": "18721"
	    }], [{
			name: '南昌市青山湖区',
			value: 9330
		}, {
			name: '宜春市袁州区',
			value: 8412
		}, {
			name: '新余市渝水区',
			value: 8128
		}, {
			name: '南昌市西湖区',
			value: 7810
		}, {
			name: '萍乡市安源区',
			value: 7409
		}]
	]
}

export default BigDataAnlsData;