import echarts from 'echarts';
import { dateFormat } from '../../Lib';
import 'echarts/extension/bmap/bmap';
import geoCoordMap from '../BigData/data/geoCoordMap';

var data2015 = ["629", "941", "455", "214", "115", "7", "37", "77", "145", "189", "213", "47", "25", "98", "76", "135", "191", "238", "122", "59", "119", "74", "142", "161", "152", "83", "86", "15", "0", "23", "3", "111", "7", "35", "17", "43", "69", "167", "191", "122", "170", "142", "151", "597", "427", "3144", "424", "168", "13", "658", "795", "1033", "1419", "855", "625", "565", "1292", "275", "153", "458", "236", "162", "79", "147", "137", "707", "1835", "938", "581", "247", "797", "1263", "968", "482", "290", "310", "286", "277", "265", "465", "644", "209", "405", "458", "272", "358", "1094", "637", "171", "469", "774", "393", "333", "1364", "1962", "885", "227", "253", "381", "325", "1285", "1941", "683", "784", "539", "848", "684", "1930", "937", "538", "724", "821", "621", "402", "1647", "2633", "425", "699", "729", "728", "8704", "9961", "6741", "722", "702", "421", "952", "487", "1859", "1475", "396", "725", "471", "332", "520", "770", "1175", "466", "729", "608", "663", "519", "1802", "1324", "486", "438", "305", "267", "587", "984", "1620", "709", "463", "326", "238", "371", "1287", "987", "339", "351", "391", "363", "482", "911", "532", "406", "510", "440", "214", "275", "1437", "1520", "942", "386", "511", "408", "418", "685", "650", "493", "266", "664", "485", "543", "818", "1467", "536", "576", "1006", "734", "800", "2081", "1930", "515", "670", "608", "576", "928", "2029", "2609", "1600", "981", "714", "1023", "897", "1956", "2561", "940", "872", "798", "930", "713", "2322", "2156", "647", "877", "802", "945", "901", "2289", "1469", "1043", "996", "967", "1120", "879", "2243", "2201", "1052", "1146", "1005", "3137", "1630", "2738", "3167", "840", "645", "675", "706", "313", "1084", "1746", "355", "1197", "748", "1360", "3284", "1367", "208", "377", "351", "488", "388", "455", "769", "717", "472", "461", "455", "477", "519", "514", "588", "275", "329", "616", "482", "243", "481", "554", "677", "901", "144", "3415", "8250", "10347", "8275", "4550", "4165", "1925", "1032", "963", "1835", "1558", "1239", "1317", "1216", "0", "32", "2135", "1017", "1083", "1257", "1264", "1025", "1117", "2294", "2174", "966", "1895", "1143", "999", "469", "1406", "1270", "815", "872", "1043", "1075", "1065", "1414", "1234", "1053", "823", "743", "669", "720", "1250", "1029", "701", "693", "738", "886", "710", "1069", "1162", "810", "802", "799", "849", "893", "883", "958", "40148", "114", "254", "234", "122", "220", "269", "139", "185", "178", "101", "181", "99", "249", "61", "199", "234", "128", "150", "278", "107", "88", "10", "17", "25", "62", "92", "292", "40152", "164", "59", "223"];
var data2016 = ["853", "1496", "537", "172", "52", "96", "37", "241", "158", "74", "34", "135", "43", "57", "81", "112", "89", "44", "129", "32", "13", "2", "19", "79", "56", "57", "46", "40", "57", "80", "35", "31", "61", "83", "132", "217", "362", "22", "1399", "1322", "2622", "2770", "2280", "615", "408", "407", "753", "933", "687", "482", "902", "0", "0", "279", "156", "302", "343", "501", "1041", "214", "423", "353", "366", "243", "910", "1210", "406", "2185", "30", "53", "226", "658", "367", "302", "299", "181", "195", "121", "1459", "637", "126", "147", "91", "214", "293", "1334", "1395", "515", "337", "106", "359", "462", "1212", "1260", "797", "402", "268", "332", "226", "483", "374", "534", "318", "221", "212", "140", "432", "1226", "569", "338", "272", "305", "254", "538", "767", "202", "23", "630", "509", "492", "2331", "9900", "3718", "810", "665", "213", "349", "1009", "695", "214", "398", "641", "607", "378", "1550", "264", "386", "485", "566", "152", "58", "709", "1039", "325", "597", "176", "196", "349", "863", "675", "378", "417", "562", "270", "144", "846", "823", "312", "210", "213", "862", "1539", "1157", "1218", "1313", "370", "227", "505", "419", "806", "1192", "308", "395", "295", "229", "199", "726", "647", "207", "278", "872", "229", "399", "942", "528", "238", "393", "462", "464", "619", "1002", "786", "312", "368", "480", "488", "372", "709", "672", "219", "500", "501", "424", "427", "1050", "895", "332", "399", "302", "319", "351", "608", "525", "360", "387", "517", "483", "579", "1447", "1090", "572", "673", "463", "536", "381", "866", "903", "454", "283", "168", "315", "363", "746", "975", "375", "348", "359", "378", "453", "993", "1073", "621", "497", "232", "226", "329", "636", "749", "264", "336", "207", "203", "373", "418", "347", "252", "216", "150", "457", "1054", "779", "287", "281", "370", "395", "439", "278", "828", "614", "286", "364", "214", "25", "96", "2454", "3555", "5610", "5438", "4332", "2439", "942", "349", "503", "411", "348", "265", "432", "229", "908", "1115", "630", "451", "169", "488", "333", "434", "434", "269", "221", "232", "410", "263", "551", "485", "143", "201", "193", "272", "260", "874", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
var data2017 = ["0", "382", "132", "123", "78", "15", "43", "117", "87", "87", "29", "15", "36", "128", "100", "70", "38", "9", "18", "83", "148", "149", "159", "185", "113", "138", "30", "2176", "1772", "2140", "2030", "2021", "1073", "1071", "182", "476", "510", "292", "55", "481", "430", "511", "298", "191", "461", "254", "306", "295", "561", "534", "315", "116", "11", "61", "52", "450", "537", "182", "183", "199", "368", "251", "401", "239", "122", "258", "2196", "268", "136", "259", "164", "91", "207", "164", "219", "29", "148", "87", "47", "72", "102", "192", "128", "272", "1101", "380", "162", "146", "102", "151", "401", "1894", "3271", "1344", "420", "252", "249", "764", "576", "156", "561", "347", "506", "576", "1481", "1205", "293", "583", "401", "266", "258", "1594", "2672", "375", "110", "196", "413", "530", "4013", "7089", "10070", "1058", "893", "883", "785", "3910", "3269", "275", "892", "1097", "453", "471", "2886", "3184", "254", "546", "587", "459", "655", "2560", "2289", "335", "380", "384", "445", "382", "505", "2166", "3417", "2604", "478", "151", "487", "1811", "983", "191", "461", "610", "443", "522", "1537", "1022", "393", "372", "757", "256", "181", "1648", "1892", "383", "349", "66", "398", "281", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "356", "1030", "1126", "565", "1028", "869", "726", "741", "1344", "1257", "509", "555", "591", "695", "812", "1569", "2261", "643", "854", "840", "776", "813", "1722", "1841", "727", "700", "1427", "712", "592", "1414", "1937", "1604", "945", "827", "671", "342", "831", "743", "194", "278", "402", "309", "347", "1075", "1291", "294", "300", "339", "371", "220", "1017", "1060", "209", "303", "130", "383", "310", "1053", "1252", "225", "317", "270", "250", "382", "428", "4075", "6939", "7598", "3798", "7051", "7041", "5925", "3091", "508", "302", "357", "361", "452", "818", "490", "181", "215", "319", "459", "363", "1326", "1370", "299", "430", "400", "510", "347", "1899", "1438", "399", "275", "393", "433", "476", "1341", "1196", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];

var toYear = dateFormat(new Date(), 'yyyy')*1;

// 日历热力图
function calendarGridData(arg) {
    function getVirtulData(year) {
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        var i = 0;
        for (var time = date; time < end; time += dayTime) {
        	let ymd = dateFormat(time, 'yyyy-MM-dd');
            data.push([
                ymd,
                arg[ymd]*1
            ]);
		}
        return data;
    }
    var dayLabel = {
        margin: 2,
        textStyle: {
    	    color: '#fff',
    		fontSize: 14
    	}
    };
    var monthLabel = {
    	margin: 6,
    	textStyle: {
        	color: '#fff',
        	fontSize: 14
        }
    };
    var yearLabel = {
    	margin: 18,
    	textStyle: {
        	color: '#fff',
        	fontSize: 18
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
            	fontSize: 14
            }
        },
        visualMap: {
            show: false,
            min: 0,
            max: 5000,
            inRange: {
            	color: ['#00C6FB', '#005BEA'],
            }
        },
        calendar: [{
            range: toYear,
            left: 50,
        }, {
            range: toYear-1,
            left: 200,
        }, {
            range: toYear-2,
            left: 350,
        }],
        series: [{
	        calendarIndex: 0,
	        data: getVirtulData(toYear)
	    }, {
	        calendarIndex: 1,
	        data: getVirtulData(toYear-1)
	    }, {
            calendarIndex: 2,
            data: getVirtulData(toYear-2)
        }]
    };
    option.calendar.map((item) => {
    	item.orient = 'vertical';
    	item.top = 50;
    	item.cellSize = [15, 15];
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

// 地图分析
function anlsMapData(arg) {
	var BJData = [
	    [{
	        name: '仙女湖'
	    }, {
	        name: '浏阳',
	        value: 6708
	    }],
	    [{
	        name: '仙女湖'
	    }, {
	        name: '株洲',
	        value: 5774
	    }],
	    [{
	        name: '仙女湖'
	    }, {
	        name: '长沙',
	        value: 4505
	    }],
	    [{
	        name: '仙女湖'
	    }, {
	        name: '福州',
	        value: 211
	    }],
	    [{
	        name: '仙女湖'
	    }, {
	        name: '上海',
	        value: 13900
	    }],
	    [{
	        name: '仙女湖'
	    }, {
	        name: '苏州',
	        value: 2375
	    }],
	    [{
	        name: '仙女湖'
	    }, {
	        name: '武汉',
	        value: 3371
	    }],
	    [{
	        name: '仙女湖'
	    }, {
	        name: '南京',
	        value: 418
	    }],
	    [{
	        name: '仙女湖'
	    }, {
	        name: '杭州',
	        value: 264
	    }],
	    [{
	        name: '仙女湖'
	    }, {
	        name: '深圳',
	        value: 169
	    }]
	];

	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
	var train = 'path://M67.335,33.596L67.335,33.596c-0.002-1.39-1.153-3.183-3.328-4.218h-9.096v-2.07h5.371 c-4.939-2.07-11.199-4.141-14.89-4.141H19.72v12.421v5.176h38.373c4.033,0,8.457-1.035,9.142-5.176h-0.027 c0.076-0.367,0.129-0.751,0.129-1.165L67.335,33.596L67.335,33.596z M27.999,30.413h-3.105v-4.141h3.105V30.413z M35.245,30.413 h-3.104v-4.141h3.104V30.413z M42.491,30.413h-3.104v-4.141h3.104V30.413z M49.736,30.413h-3.104v-4.141h3.104V30.413z  M14.544,40.764c1.143,0,2.07-0.927,2.07-2.07V35.59V25.237c0-1.145-0.928-2.07-2.07-2.07H-9.265c-1.143,0-2.068,0.926-2.068,2.07 v10.351v3.105c0,1.144,0.926,2.07,2.068,2.07H14.544L14.544,40.764z M8.333,26.272h3.105v4.141H8.333V26.272z M1.087,26.272h3.105 v4.141H1.087V26.272z M-6.159,26.272h3.105v4.141h-3.105V26.272z M-9.265,41.798h69.352v1.035H-9.265V41.798z';
	var tangle = 'path://M150,50L130,130L170,130Z'

	var convertData = function(data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var dataItem = data[i];
	        var fromCoord = geoCoordMap[dataItem[1].name];
	        var toCoord = geoCoordMap[dataItem[0].name];
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
	    ['仙女湖', BJData]
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
	                position: 'bottom',
	                formatter: '{b}',
	                textStyle: {
	                	fontSize: 12
	                }
	            }
	        },
	        symbolSize: function(val) {
	            return val[2]/2 < 20 ? 5 : val[2]/800;
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
	            symbolSize: 2
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
	            symbol: tangle,
	            symbolSize: 10
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 2,
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
	                position: 'bottom',
	                formatter: '{b}',
	                textStyle: {
	                	fontSize: 12
	                }
	            }
	        },
	        symbolSize: function(val) {
	            return val[2]/2 < 20 ? 5 : val[2]/800;
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
	        center: [114.79,27.72],
	        zoom: 6,
	        roam: false,
	        mapStyle: {
	            styleJson: [{
                	featureType: "water",
                	elementType: "all",
                	stylers: {
                    	color: "#044161"
                    }
                },
                {
                	featureType: "land",
                	elementType: "all",
                	stylers: {
                    	color: "#004981"
                    }
                },
                {
                	featureType: "boundary",
                	elementType: "geometry",
                	stylers: {
                    	color: "#064f85"
                    }
                },
                {
                	featureType: "railway",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "highway",
                	elementType: "geometry",
                	stylers: {
                    	color: "#004981"
                    }
                },
                {
                	featureType: "highway",
                	elementType: "geometry.fill",
                	stylers: {
                    	color: "#005b96",
                    	lightness: 1
                    }
                },
                {
                	featureType: "highway",
                	elementType: "labels",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "arterial",
                	elementType: "geometry",
                	stylers: {
                    	color: "#004981"
                    }
                },
                {
                	featureType: "arterial",
                	elementType: "geometry.fill",
                	stylers: {
                    	color: "#00508b"
                    }
                },
                {
                	featureType: "poi",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "green",
                	elementType: "all",
                	stylers: {
                    	color: "#056197",
                    	visibility: "off"
                    }
                },
                {
                	featureType: "subway",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "manmade",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "local",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "arterial",
                	elementType: "labels",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "boundary",
                	elementType: "geometry.fill",
                	stylers: {
                    	color: "#029fd4"
                    }
                },
                {
                	featureType: "building",
                	elementType: "all",
                	stylers: {
                    	color: "#1a5787"
                    }
                },
                {
                	featureType: "label",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                }]
	        }
	    },
	    color: ['gold', 'aqua', 'lime'],
	    backgroundColor: '#404a59',
	    tooltip: {
	        trigger: 'item',
	        textStyle: {
	            fontSize: 16
	        }
	    },
	    series: series
	};
	return option;
}

// 省级地图分析
function anlsProvMapData(arg) {
	var geodata = [{
	    name: '南昌市',
	    value: geoCoordMap['南昌']
	}, {
	    name: '宜春市',
	    value: geoCoordMap['宜春']
	}, {
	    name: '萍乡市',
	    value: geoCoordMap['萍乡']
	}, {
	    name: '吉安市',
	    value: geoCoordMap['吉安']
	}, {
	    name: '新余市',
	    value: geoCoordMap['新余']
	}, {
	    name: '赣州市',
	    value: geoCoordMap['赣州']
	}, {
	    name: '抚州市',
	    value: geoCoordMap['抚州']
	}, {
	    name: '九江市',
	    value: geoCoordMap['九江']
	}, ];
	var geodata1 = [{
	    name: '仙女湖',
	    value: geoCoordMap['仙女湖']
	}];
	const option = {
	    backgroundColor: '#044061',
	    geo: {
	        map: '江西',
	        label: {
	            emphasis: {
	                show: false
	            }
	        },
	        roam: false,
	        zoom: 1.2,
	        zlevel: 1,
	        itemStyle: {
	            normal: {
	                areaColor: '#004881',
	                borderColor: '#019FD4',
	                borderWidth: 2
	            },
	            emphasis: {
	                areaColor: '#004881'
	            }
	        }
	    },
	    series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 3,
            symbol: 'circle',
            symbolSize: 10,
            rippleEffect: {
                brushType: 'stroke',
                period: 5,
                scale: 5
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'top',
                    offset: [0, -20],
                    show: true,
                    textStyle: {
                        color: "yellow",
                        fontSize: 14
                    }
                }
            },
            itemStyle: {
                normal: {
                    show: true,
                    color: 'yellow'
                }
            },
            data: geodata
        }, {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 3,
            symbol: 'circle',
            symbolSize: 10,
            rippleEffect: {
                brushType: 'stroke',
                period: 2,
                scale: 6
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    offset: [20, 0],
                    show: true,
                    textStyle: {
                        color: "#00EBEB",
                        fontSize: 14
                    }
                }
            },
            itemStyle: {
                normal: {
                    show: true,
                    color: '#00EBEB'
                }
            },
            data: geodata1
        }]
	};
	return option;
}

// 男女比例
function maleToFemaleData(arg) {
    const option = {
    	color: ['#5ab1ef', '#a9ADF3'],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {d}%"
	    },
	    calculable : true,
	    series : [{
            name:'面积模式',
            type:'pie',
            center: ['50%', '45%'],
            radius : ['30%', '60%'],
            roseType : 'radius',
            label: {
            	normal: {
            		position: 'inner',
            		formatter: function (data) {
            			return data.data.value + '%'
            		},
            		textStyle: {
            			fontSize: 16
            		}
            	}
            },
            data:[
                {value:63.77, name:'男'},
                {value:36.23, name:'女'},
            ]
        }]
	};
	return option;
}

// 景区团散比
function indvToGroupData(argument) {
	const option = {
	    color: ['#83D560', '#AF89D6', '#a9ADF3'],
	    tooltip: {
	        trigger: 'item',
	        formatter: "{b}: {c} ({d}%)",
	        textStyle: {
	        	fontSize: 16
	        }
	    },
	    series: [//外圈
	        {
	            name: '外圈',
	            type: 'pie',
	            radius: ['40%', '50%'], 
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'outside', //center  
	                    formatter: function(param) {
	                        return param.name + '\n' + param.percent + '%';
	                    },
	                    textStyle: {
	                        color: '#F0F05B',
	                        fontWeight: 'normal',
	                        fontSize: 12
	                    }
	                },

	                emphasis: {
	                    show: false,
	                }
	            },
	            labelLine: {
	                normal: {
	                    smooth: true,
	                    lineStyle: {
	                        width: 2
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    shadowBlur: 8,
	                    shadowColor: 'rgba(0, 0, 0, 0.4)'
	                }
	            },

	            data: [{
	                value: 1778.2,
	                name: '散客'
	            }, {
	                value: 7218,
	                name: '团客'
	            }]
	        }, {
	            name: '最外圈',
	            silent: true,
	            type: 'pie',
	            radius: ['55%', '60%'],
	            color: ['#ffff00'],
	            avoidLabelOverlap: false,
	            itemStyle: {
	                normal: {
	                    color: '#F2F2F2'
	                },
	                emphasis: {
	                    color: '#ADADAD'
	                }
	            },
	            label: {
	                normal: {
	                	show: false,
	                }
	            },

	            data: [{
	                value: 1778.2,
	                name: '散客'
	            }, {
	                value: 7218,
	                name: '团客'
	            }]
	        }
	    ]
	};
	return option;
}

// 线上线下比
function onToOffData(arg) {
	var tips = 88.97;
	const option = {
	    tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            textStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            }
        },
	    series: [{
	        name: '线上线下占比',
	        type: 'pie',
	        radius: ['75%', '85%'],
	        label: {
	            normal: {
	                show: true,
	                textStyle: {
	                    fontSize: 14,
	                    fontWeight: 'bold'
	                },
	                position: "center"
	            },
	            emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                }
	        },
	        data: [{
	        	name: "线上占比 19.03%",
		        value: 100 - tips,
		        itemStyle: {
		            normal: {
		                color: '#fb358a',
		                shadowBlur: 10,
		                shadowColor: '#fb358a'
		            }
		        }
		    }, {
		    	name: "线下占比 80.97%",
		        value: tips,
		        itemStyle: {
		            normal: {
		                shadowBlur: 10,
		                shadowColor: '#fb358a'
		            }
		        }
		    }]
	    }]
	};
	return option;
}

// 年龄分布
function ageDistributionData(arg) {
	const option = {
	    color: ['#3398DB'],
	    tooltip : {
	        trigger: 'axis',
	        formatter: "{b}岁左右人数： <br/>{c}",
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        },
	        textStyle: {
	        	fontSize: 16
	        }
	    },
	    grid: {
	    	left: 20,
	    	right: 0,
	    	bottom: 42,
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['<9岁', '10-19岁', '20-29岁', '30-39岁', '40-49岁', '50-59岁', '60-69岁', '70-79岁', '>80岁'],
	            axisTick: {
	                alignWithLabel: true
	            },
	            axisLine: {
	            	lineStyle: {
		            	color: '#fff'
		            }
	            },
	            axisLabel: {
	            	textStyle: {
	            		color: '#fff',
		            	fontSize: 12
	            	},
	            	interval: 0,
	            	rotate: 45
	            }
	        }
	    ],
	    yAxis : [
	        {
	        	show: false,
	        }
	    ],
	    series : [
	        {
	            name:'年龄分布',
	            type:'bar',
	            barWidth: '40%',
	            data:[14915, 23712, 36202, 90562, 76352, 21935, 11926, 5949, 395]
	        },
	        
	    ],
	    label: {
	            normal: {
	                show: true,
	                position: 'top',
	                formatter: '{c}',
	                textStyle: {
	                	fontSize: 12,
	                	color: '#00EBEB'
	                }
	            }
	        },
	    itemStyle: {
            normal: {
             
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(17, 168,171, 1)'
                }, {
                    offset: 1,
                    color: 'rgba(17, 168,171, 0.1)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 2
            }
        }
	};
	return option;
}

function customerTendData(arg) {
	var month1 = [1,3,5,7,8,10,12];
	var month2 = [4,6,9,11];
	var month3 = 2;
	function getDays(month, year) {
	    return month1.indexOf(month) + 1 ? 31 : month2.indexOf(month) + 1 ? 30 : month === month3 && year%4 === 0 ? 29 : 28 ;
	}
	function getDate(index) {
	    var year = new Date().getFullYear();
	    var month = new Date().getMonth() + 1;
	    var day = new Date().getDate() - index;
	    var preMonth = month - 1;
	    if(preMonth === 0) {
	        preMonth = month + 11;
	        year -= 1;
	    }
	    var preDay = getDays(preMonth, year);
	    if(day - 1 < 0) {
	        month = preMonth;
	        day = preDay + day;
	    }
	    return [month, day];
	}
	var day = [];
	for (var i = 0; i < 7; i++) {
		day.unshift(getDate(i + 1).join('-'));
	}
	const option= {
		color: ['#38b4ee'],
		tooltip: {
			trigger: 'axis',
			textStyle: {
				fontSize: 16
			}
		},
		xAxis: {
			type: 'category',
			// boundaryGap: false,
			axisTick:{show:false},
			axisLabel:{
			    textStyle:{
			        color:'#dededf',
			        fontSize: 14
			    },
			    interval: 0
			},
			splitLine:{//网格线
                show: true,
                lineStyle:{
                    color:['#23303f'],
                    type:'solid'
                }
            },
			data: day
		},
		yAxis: {
		    // interval:50,
		    axisTick:{show:false},
		    axisLine:{
		        show:false,
		    //    onZero:false
		    },
		    axisLabel:{
			    textStyle:{
			        color:'#dededf',
			        fontSize: 14
			    }
			},
			splitLine:{//网格线
                show: true,
                lineStyle:{
                    color:['#23303f'],
                    type:'solid'
                }
            }
		},
		series: [
			{
				name:'游客趋势',
				type:'line',
				smooth:true,
			    symbolSize:2,
				data: arg.slice(1, 8).reverse(),
				label: {
					normal: {
						show: true,
						position: 'top',
						textStyle: {
							fontSize: 16
						}
					}
				}
			},
		]
	};
	return option;
}


function echartsOption(data, name) {
    switch(name) {
        case 'CalendarGrid':
            return calendarGridData(data);
        case 'AnlsMap':
        	return anlsMapData(data);
    	case 'AnlsProvMap':
    		return anlsProvMapData(data);
		case 'MaleToFemale':
			return maleToFemaleData(data);
		case 'IndvToGroup':
			return indvToGroupData(data);
		case 'OnToOff':
			return onToOffData(data);
		case 'AgeDistribution':
			return ageDistributionData(data);
		case 'CustomerTend':
			return customerTendData(data);
        default :
            return;
    }
}

export default echartsOption;