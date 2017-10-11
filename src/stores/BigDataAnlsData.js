import { observable } from 'mobx';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

class BigDataAnlsData {
	@observable _nationalRanking = [
		[{
			name: '浙江省',
			value: 4502
		}, {
			name: '江苏省',
			value: 3248
		}, {
			name: '福建省',
			value: 3048
		}, {
			name: '湖北省',
			value: 2648
		}, {
			name: '广东省',
			value: 2248
		}], [{
			name: '浙江省杭州市',
			value: 298
		}, {
			name: '福建省龙岩市',
			value: 264
		}, {
			name: '湖北省武汉市',
			value: 251
		}, {
			name: '浙江省衢州市',
			value: 229
		}, {
			name: '湖南省醴陵市',
			value: 205
		}]
	]
	@observable _JXRanking = [
		[{
			name: '南昌市',
			value: 4502
		}, {
			name: '宜春市',
			value: 3248
		}, {
			name: '抚州市',
			value: 3048
		}, {
			name: '吉安市',
			value: 2648
		}, {
			name: '赣州市',
			value: 2248
		}], [{
			name: '赣州市信州区',
			value: 298
		}, {
			name: '南昌市西湖区',
			value: 264
		}, {
			name: '南昌市青山湖区',
			value: 251
		}, {
			name: '宜春市袁州区',
			value: 229
		}, {
			name: '新余市渝水区',
			value: 205
		}]
	]
}

export default BigDataAnlsData;