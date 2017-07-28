import BlockAreaDataArray from '../BigData/data/MapExampleBlockArea';

const backgroundColor = 'transparent';

// hover提示框
const tooltip = { trigger: 'item' };

const legend = {
	orient: 'horizontal',
	top: 'top',
	textStyle: { color: '#f' },
	// data: legendData
};

const visualMap = {
	// min: visualMin,
	// max: visualMax,
	right: 'right',
	top: 'bottom',
	// text: 'visualLabel',
	calculabel: true,
	textStyle: { color: '#bfdaed' }
};

const geo = { 
	type: 'map',
	map: '',
	itemStyle: { normal: { color: '#323c47' } },
};

// 原SalesVolume
function blockArea(arg) {
	const {geoMapName, visualMin, visualMax, visualLabel, mapDataSeries} = arg;
    mapDataSeries.forEach((item) => {
        item.type = "map";
        item.mapType = geoMapName,
        console.log('test'+item.mapType);
        item.label = {
            normal: {
                show: true,
                textStyle: {
                    color: '#0',
                }
            }
        };
    });
    const legendData = mapDataSeries.map((item) => {
        return item.name;
    });
	const option = {
		backgroundColor,
		tooltip,
		legend,
		visualMap,
		geo,
		series: mapDataSeries
	}
	option.legend.data = legendData;
	option.visualMap.min = visualMin;
	option.visualMap.max = visualMax;
	option.text = visualLabel;
	option.geo.map = geoMapName;
	return option;
}

// 原LineAndHistogram
function barLines(arg) {
	// body...
}

function airportCoord(arg) {

}

function echartsOption(arg) {
	return blockArea(arg);
}

var result = echartsOption(BlockAreaDataArray[1]);

export default echartsOption;
