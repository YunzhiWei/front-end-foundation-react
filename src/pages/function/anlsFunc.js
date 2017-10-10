import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import geoCoordMap from '../BigData/data/geoCoordMap';

// 日历热力图
function calendarGridData(arg) {
    function getVirtulData(year) {
        year = year || '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 1000)
            ]);
        }
        return data;
    }
    var dayLabel = {
        margin: 10,
        textStyle: {
    	    color: '#fff',
    		fontSize: 36
    	},
    };
    var monthLabel = {
    	margin: 25,
    	textStyle: {
        	color: '#fff',
        	fontSize: 36
        }
    };
    var yearLabel = {
    	margin: 75,
    	textStyle: {
        	color: '#fff',
        	fontSize: 48
        }
    };
    const option = {
        tooltip: {
            position: 'top',
            formatter: function (p) {
                var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
                return format + ': ' + p.data[1];
            },
            textStyle: {
            	fontSize: 36
            }
        },
        visualMap: {
            show: false,
            min: 0,
            max: 1000,
            inRange: {
            	color: ['#0EF', '#07F'],
            }
        },
        calendar: [{
            range: '2015',
            left: 250,
        }, {
            range: '2016',
            left: 800,
        }, {
            range: '2017',
            left: 1350,
        }],
        series: [{
	        calendarIndex: 0,
	        data: getVirtulData(2015)
	    }, {
	        calendarIndex: 1,
	        data: getVirtulData(2016)
	    }, {
            calendarIndex: 2,
            data: getVirtulData(2017)
        }]
    };
    option.calendar.map((item) => {
    	item.orient = 'vertical';
    	item.top = 120;
    	item.cellSize = [50, 50];
    	item.dayLabel = dayLabel;
    	item.monthLabel = monthLabel;
    	item.yearLabel = yearLabel;
    })
    option.series.map((item) => {
    	item.type = 'heatmap';
	    item.coordinateSystem = 'calendar';
    })
    return option;
}

function anlsMapData(arg) {
	var BJData = [
	    [{
	        name: '北京'
	    }, {
	        name: '上海',
	        value: 95
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '广州',
	        value: 90
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '大连',
	        value: 80
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '南宁',
	        value: 70
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '南昌',
	        value: 60
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '拉萨',
	        value: 50
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '长春',
	        value: 40
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '包头',
	        value: 30
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '重庆',
	        value: 20
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '常州',
	        value: 10
	    }]
	];

	var SHData = [
	    [{
	        name: '上海'
	    }, {
	        name: '包头',
	        value: 95
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '昆明',
	        value: 90
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '广州',
	        value: 80
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '郑州',
	        value: 70
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '长春',
	        value: 60
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '重庆',
	        value: 50
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '长沙',
	        value: 40
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '北京',
	        value: 30
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '丹东',
	        value: 20
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '大连',
	        value: 10
	    }]
	];

	var GZData = [
	    [{
	        name: '广州'
	    }, {
	        name: '福州',
	        value: 95
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '太原',
	        value: 90
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '长春',
	        value: 80
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '重庆',
	        value: 70
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '西安',
	        value: 60
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '成都',
	        value: 50
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '常州',
	        value: 40
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '北京',
	        value: 30
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '北海',
	        value: 20
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '海口',
	        value: 10
	    }]
	];

	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

	var convertData = function(data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var dataItem = data[i];
	        var fromCoord = geoCoordMap[dataItem[0].name];
	        var toCoord = geoCoordMap[dataItem[1].name];
	        if (fromCoord && toCoord) {
	            res.push({
	                fromName: dataItem[0].name,
	                toName: dataItem[1].name,
	                coords: [fromCoord, toCoord]
	            });
	        }
	    }
	    return res;
	};

	var color = ['#a6c84c', '#ffa022', '#46bee9'];
	var series = [];
	[
	    ['北京', BJData],
	    ['上海', SHData],
	    ['广州', GZData]
	].forEach(function(item, i) {
	    series.push({
	        name: item[0] + ' Top10',
	        type: 'effectScatter',
	        coordinateSystem: 'bmap',
	        zlevel: 2,
	        rippleEffect: {
	            brushType: 'stroke'
	        },
	        label: {
	            normal: {
	                show: true,
	                position: 'right',
	                formatter: '{b}'
	            }
	        },
	        symbolSize: function(val) {
	            return val[2] / 4;
	        },
	        showEffectOn: 'render',
	        itemStyle: {
	            normal: {
	                color: color[i]
	            }
	        },
	        data: [{
	            name: item[0],
	            value: geoCoordMap[item[0]].concat([100])
	        }]
	    }, {
	        name: item[0] + ' Top10',
	        type: 'lines',
	        coordinateSystem: 'bmap',
	        zlevel: 1,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0.7,
	            color: '#fff',
	            symbolSize: 3
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 0,
	                curveness: 0.2
	            }
	        },
	        data: convertData(item[1])
	    }, {
	        name: item[0] + ' Top10',
	        type: 'lines',
	        coordinateSystem: 'bmap',
	        zlevel: 2,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0,
	            symbol: planePath,
	            symbolSize: 15
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 1,
	                opacity: 0.4,
	                curveness: 0.2
	            }
	        },
	        data: convertData(item[1])
	    }, {
	        name: item[0] + ' Top10',
	        type: 'effectScatter',
	        coordinateSystem: 'bmap',
	        zlevel: 2,
	        rippleEffect: {
	            brushType: 'stroke'
	        },
	        label: {
	            normal: {
	                show: true,
	                position: 'right',
	                formatter: '{b}'
	            }
	        },
	        symbolSize: function(val) {
	            return val[2] / 4;
	        },
	        showEffectOn: 'render',
	        itemStyle: {
	            normal: {
	                color: color[i]
	            }
	        },
	        data: item[1].map(function(dataItem) {
	            return {
	                name: dataItem[1].name,
	                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
	            };
	        })
	    });
	});

	const option = {
	    bmap: {
	        center: [104.114129, 37.550339],
	        zoom: 6,
	        roam: false,
	        mapStyle: {
	            styleJson: [{
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                        "color": "#044161"
                    }
                },
                {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                        "color": "#004981"
                    }
                },
                {
                    "featureType": "boundary",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#064f85"
                    }
                },
                {
                    "featureType": "railway",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#004981"
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#005b96",
                        "lightness": 1
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#004981"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#00508b"
                    }
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                        "color": "#056197",
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "subway",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "manmade",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "local",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "boundary",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#029fd4"
                    }
                },
                {
                    "featureType": "building",
                    "elementType": "all",
                    "stylers": {
                        "color": "#1a5787"
                    }
                },
                {
                    "featureType": "label",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }]
	        }
	    },
	    color: ['gold', 'aqua', 'lime'],
	    backgroundColor: '#404a59',
	    tooltip: {
	        trigger: 'item'
	    },
	    legend: {
	        orient: 'vertical',
	        top: 'bottom',
	        left: 'right',
	        data: ['北京 Top10', '上海 Top10', '广州 Top10'],
	        textStyle: {
	            color: '#fff'
	        },
	        selectedMode: 'single'
	    },
	    series: series
	};
	return option;
}


function echartsOption(data, name) {
    switch(name) {
        case 'CalendarGrid':
            return calendarGridData(data);
        case 'AnlsMap':
        	return anlsMapData(data);
        default :
            return;
    }
}

export default echartsOption;