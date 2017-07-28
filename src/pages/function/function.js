import geoCoordMap from '../BigData/data/geoCoordMap';


// 背景色
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
	roam: false,
	type: 'map',
	map: '',
	itemStyle: { 
		normal: { color: '#323c47', borderColor: '#122E41' },
        emphasis: { areaColor: '#2a333d' }
    }
};

// 原SalesVolume
function blockArea(arg) {
	const {geoMapName, map, visualMin, visualMax, visualLabel, mapDataSeries} = arg;
    mapDataSeries.forEach((item) => {
        item.type = "map";
        item.mapType = geoMapName,
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

function airportCoord(arg) {
	const {geoMapName, directionOut, fromtoLines, iconPath} = arg;
    function convertName2Coor(dataItem) {
        const toCoord = geoCoordMap[dataItem.to];
        const fromCoord = geoCoordMap[dataItem.from];
        if (fromCoord && toCoord) {
            return ({
                fromName: dataItem.from,
                toName: dataItem.to,
                coords: [fromCoord, toCoord]
            });
        } else return ({});
    };
    function convertSourceName2Marker(dataItem) {
        return {
            name: dataItem.from,
            value: geoCoordMap[dataItem.from].concat([dataItem.value])
        };
    };
    function convertTargetName2Marker(dataItem) {
        return {
            name: dataItem.to,
            value: geoCoordMap[dataItem.to].concat([dataItem.value])
        };
    };
    const series = { series: [] };
    fromtoLines.forEach((item, i) => {
        const staticlines = {
            name: item.legendName,
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 1
            },
            lineStyle: {
                normal: {
                    color: item.color,
                    width: 0,
                    curveness: 0.2
                }
            },
            data: item.data.map(convertName2Coor)
        };
        const dynamiclines = {
            name: item.legendName,
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 3,
            lineStyle: {
                normal: {
                    color: item.color,
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                },
                emphasis: {
                    color: item.color,
                    width: 3,
                    opacity: 0.6,
                    curveness: 0.2
                }
            },
            data: item.data.map(convertName2Coor)
        };
        if ((iconPath != undefined) && (iconPath != null)) {
            dynamiclines.effect = {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: iconPath,
                symbolSize: 15
            };
        }
        const markers = {
            name: item.legendName,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    // formatter: '{b}'
                    formatter: function(item) {
                        return item.name + '：' + item.value[2]
                    }
                }
            },
            symbolSize: function(val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: item.color
                }
            },
            data: item.data.map(directionOut ? convertTargetName2Marker : convertSourceName2Marker)
        };
        series.series.push(staticlines, dynamiclines, markers);
    });
    const option = {
    	backgroundColor,
    	tooltip,
    	legend,
    	geo,
    	series,
    }
    option.legend.data = fromtoLines.map((item) => { return item.legendName; });
    option.geo.roam = true;
}

// 原LineAndHistogram
function barLines(arg) {
	// body...
}






function echartsOption(arg) {
	return blockArea(arg);
}

export default echartsOption;
