import { observable } from 'mobx';
import { FetchDY } from '../Api';

class BigDataAnlsData {
	@observable _calendarGridData = {}
	@observable _nationalRanking = [[], []]
	@observable _JXRanking = [[], []]
	@observable _individualToGroup = {
		individual: 0, 
		group: 0
	}
	@observable _ageDistribution = {
		categories: [], 
		data: []
	}
	@observable _maleToFemale = {
		male: 0, 
		female: 0
	}
	constructor(props) {
		this.fetchThreeYearsVisitorsNumber();
		this.fetchStatisticsOfTouristSourcesInYear();
		this.fetchIndividualAndGroupRate();
		this.fetchAgeDistribution();
		this.fetchMaleToFemaleStatistics();
	}
	async fetchThreeYearsVisitorsNumber() {
		let dateSet = {};
		let res = await FetchDY('YTQB');
		if (res.categories.length) {
			res.series.forEach((yearSet) => {
				yearSet.data.forEach((month, i) => {
					month.forEach((val, day) => {
						dateSet[`${yearSet.name}-${res.categories[i].slice(0, -1)}-${ (++day) >= 10 ? day : ('0'+day) }`] = val;
					})
				})
			})
		}
		this._calendarGridData = dateSet;
	}
	async fetchStatisticsOfTouristSourcesInYear() {
		let _JXRanking = [];
		let _nationalRanking = [];
		let QG_ProvinceStatistics = await FetchDY('KYDFBMX');
		let QG_CityStatistics = await FetchDY('KYDFBMX_2');
		let JX_CityStatistics = await FetchDY('KYDFBMX_3');
		let JX_CountryStatistics = await FetchDY('KYDFBMX_4');
		if (QG_ProvinceStatistics.categories.length) {
			_nationalRanking[0] = QG_ProvinceStatistics.series[0].data.sort((a, b) => b.value - a.value);
		};
		if (QG_CityStatistics.categories.length) {
			_nationalRanking[1] = QG_CityStatistics.series[0].data.sort((a, b) => b.value - a.value);
		};
		if (JX_CityStatistics.categories.length) {
			_JXRanking[0] = JX_CityStatistics.series[0].data.sort((a, b) => b.value - a.value);
		};
		if (JX_CountryStatistics.categories.length) {
			_JXRanking[1] = JX_CountryStatistics.series[0].data.sort((a, b) => b.value - a.value);
		};
		this._nationalRanking = _nationalRanking;
		this._JXRanking = _JXRanking;
	}
	async fetchIndividualAndGroupRate() {
		let individual = 0;
		let group = 0;
		let res = await FetchDY('YKTSB');
		if (res.categories.length) {
			res.series[0].data.forEach(item => {
				if (item.name === '团队') {
					group = item.value;
				} else {
					individual = item.value;
				}
			})
		}
		this._individualToGroup = {
			individual: individual, 
			group: group
		}
	}
	async fetchAgeDistribution() {
		let categories = [];
		let data = [];
		let res = await FetchDY('YKNLDTJ');
		if (res.categories.length) {
			res.series[0].data.forEach(item => {
				categories.push(item.name);
				data.push(item.value);
			})
		}
		this._ageDistribution = {
			categories: categories, 
			data: data
		}
	}
	async fetchMaleToFemaleStatistics() { 
		let male = 0;
		let female = 0;
		let res = await FetchDY('YKNLBL');
		if (res.categories.length) {
			res.series[0].data.forEach(item => {
				if (item.name === '男') {
					male = item.value;
				} else {
					female = item.value;
				}
			})
		}
		this._maleToFemale = {
			male: male, 
			female: female
		}
	}
}

export default BigDataAnlsData;