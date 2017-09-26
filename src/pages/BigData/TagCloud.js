import React,{ Component } from 'react';
import ReactEcharts from './lib';
import { inject, observer } from 'mobx-react';
import echartsOption from '../function/function';

import './data/wordcloud2.js';

var keywords = [
    ["visuAlmap", 22199],
    ["continuous", 10288],
    ["contoller", 620],
    ["series", 274470],
    ["gauge", 12311],
    ["detail", 1206],
    ["piecewise", 4885],
    ["texTstyle", 32294],
    ["marKpoint", 18574],
    ["pie", 38929],
    ["rosEtype", 969],
    ["label", 37517],
    ["emphasis", 12053],
    ["Yaxis", 57299],
    ["name", 15418],
    ["type", 22905],
    ["griDindex", 5146],
    ["normal", 49487],
    ["iteMstyle", 33837],
    ["min", 4500],
    ["silent", 5744],
    ["animation", 4840],
    ["offseTcenter", 232],
    ["inverse", 3706],
    ["bordeRcolor", 4812],
    ["marKline", 16578],
    ["line", 76970],
    ["radiuSaxis", 6704],
    ["radar", 15964],
    ["data", 60679],
    ["datAzoom", 24347],
    ["tooltip", 43420],
    ["toolbox", 25222],
    ["geo", 16904],
    ["paralleLaxis", 4029],
    ["parallel", 5319],
    ["max", 3393],
    ["bar", 43066],
    ["heatmap", 3110],
    ["map", 20285],
    ["animatioNduration", 3425],
    ["namEgap", 4896],
    ["zooMlock", 571],
    ["hoveRanimation", 2307],
    ["legenDhoveRlink", 3553],
    ["stack", 2907],
    ["throttle", 466],
    ["connecTnulls", 897],
    ["cliPoverflow", 826],
    ["starTvalue", 551],
    ["miNinterval", 3292],
    ["opacity", 3097],
    ["spliTarea", 4775],
    ["filteRmode", 635],
    ["end", 409],
    ["left", 6475],
    ["funnel", 2238],
    ["lines", 6403],
    ["baseline", 431],
    ["align", 2608],
    ["coord", 897],
    ["namEtexTstyle", 7477],
    ["width", 4338],
    ["shadoWblur", 4493],
    ["effect", 929],
    ["period", 225],
    ["areAcolor", 631],
    ["bordeRwidth", 3654],
    ["namElocation", 4418],
    ["position", 11723],
    ["contaiNlabel", 1701],
    ["scatter", 10718],
    ["areAstyle", 5310],
    ["scale", 3859],
    ["pieces", 414],
    ["categories", 1000],
    ["selecteDmode", 3825],
    ["iteMsymbol", 273],
    ["effecTscatter", 7147],
    ["nodes", 644],
    ["candlestick", 3166],
    ["crosSstyle", 466],
    ["edges", 369],
    ["links", 3277],
    ["layout", 846],
    ["baRbordeRcolor", 721],
    ["baRbordeRwidth", 498],
    ["treemap", 3865],
    ["y", 367],
    ["valuEindex", 704],
    ["shoWlegenDsymbol", 482],
    ["maPvaluEcalculation", 492],
    ["optioNtOcontent", 264],
    ["handlEcolor", 187],
    ["handlEsize", 271],
    ["shoWcontent", 1853],
    ["anglEaxiSindex", 406],
    ["enDvalue", 327],
    ["triggeRon", 1720],
    ["contenTtOoption", 169],
    ["buttoNcolor", 71],
    ["rotate", 1144],
    ["hoveRlink", 335],
    ["ouToFrange", 491],
    ["textareAcolor", 58],
    ["textareAbordeRcolor", 58],
    ["texTcolor", 60],
    ["buttoNtexTcolor", 66],
    ["category", 336],
    ["hidEdelay", 786],
    ["alwaySshoWcontent", 1267],
    ["extrAcsStext", 901],
    ["effecTtype", 277],
    ["force", 1820],
    ["ripplEeffect", 723],
    ["edgEsymboLsize", 329],
    ["shoWeffecTon", 271],
    ["gravity", 199],
    ["edgElength", 193],
    ["layouTanimation", 152],
    ["length2", 169],
    ["enterable", 957],
    ["dim", 83],
    ["reaDonly", 143],
    ["levels", 444],
    ["texTgap", 256],
    ["pixeLratio", 84],
    ["nodEscalEratio", 232],
    ["draggable", 249],
    ["brusHtype", 158],
    ["radaRindex", 152],
    ["large", 182],
    ["edgEsymbol", 675],
    ["largEthreshold", 132],
    ["leaFdepth", 73],
    ["childreNvisiblEmin", 73],
    ["miNsize", 35],
    ["maXsize", 35],
    ["sort", 90],
    ["funneLalign", 61],
    ["source", 336],
    ["nodEclick", 200],
    ["curveness", 350],
    ["areAselecTstyle", 104],
    ["paralleLindex", 52],
    ["iniTlayout", 359],
    ["traiLlength", 116],
    ["boXwidth", 20],
    ["back", 53],
    ["rewind", 110],
    ["zooMtOnodEratio", 80],
    ["squarEratio", 60],
    ["paralleLaxiSdefault", 358],
    ["checkpoinTstyle", 440],
];

class TagCloudComponent extends Component {
	constructor() {
		super()
		this.state = {
			maskImage: ''
		}
	}
	componentDidMount() {
		var self = this;
		this.state.maskImage = new Image();
        this.state.maskImage.src = './';
        // maskImage.onload = function() {
        //     myChart.setOption(option);
        // };
        var canvas = document.getElementById('#canvas')
        const setting = {
			gridSize: Math.round(16 * document.getElementById('#canvas').width() / 1024),
			weightFactor: function (size) {
				return Math.pow(size, 2.3) * document.getElementById('#canvas').width() / 1024;
			}
			fontFamily: 'Times, serif',
			color: function (word, weight) {
				return (weight === 12) ? '#f02222' : '#c09292';
			},
			drawMask: this.state.maskImage,
			rotateRatio: 0.5,
			rotationSteps: 2,
        }
	}
	render() {
		return (
		    <canvas id="canvas"></canvas>
		);
	}
}

export default TagCloudComponent;