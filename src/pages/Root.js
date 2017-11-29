import React, { Component } from 'react';
import './lib/flipster/jquery.flipster.css';
import './lib/flipster/jquery.flipster.js';
import Bg from './images/index-bg.jpg';
import $ from 'jquery';

class RootPage extends Component {
	componentDidMount() {
		// var canvas = document.getElementById('canvas'),
		//   ctx = canvas.getContext('2d'),
		//   w = canvas.width = window.innerWidth,
		//   h = canvas.height = window.innerHeight,

		//   hue = 217,
		//   stars = [],
		//   count = 0,
		//   maxStars = 1300;//星星数量

		// var canvas2 = document.createElement('canvas'),
		//   ctx2 = canvas2.getContext('2d');
		// canvas2.width = 100;
		// canvas2.height = 100;
		// var half = canvas2.width / 2,
		// gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
		// gradient2.addColorStop(0.025, '#CCC');
		// gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
		// gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
		// gradient2.addColorStop(1, 'transparent');

		// ctx2.fillStyle = gradient2;
		// ctx2.beginPath();
		// ctx2.arc(half, half, half, 0, Math.PI * 2);
		// ctx2.fill();

		// // End cache

		// function random(min, max) {
		//   if (arguments.length < 2) {
		//     max = min;
		//     min = 0;
		//   }

		//   if (min > max) {
		//     var hold = max;
		//     max = min;
		//     min = hold;
		//   }

		//   return Math.floor(Math.random() * (max - min + 1)) + min;
		// }

		// function maxOrbit(x, y) {
		//   var max = Math.max(x, y),
		//     diameter = Math.round(Math.sqrt(max * max + max * max));
		//   return diameter / 2;
		//   //星星移动范围，值越大范围越小，
		// }

		// var Star = function() {

		//   this.orbitRadius = random(maxOrbit(w, h));
		//   this.radius = random(60, this.orbitRadius) / 8; 
		//   //星星大小
		//   this.orbitX = w / 2;
		//   this.orbitY = h / 2;
		//   this.timePassed = random(0, maxStars);
		//   this.speed = random(this.orbitRadius) / 500000; 
		//   //星星移动速度
		//   this.alpha = random(2, 10) / 10;

		//   count++;
		//   stars[count] = this;
		// }

		// Star.prototype.draw = function() {
		//   var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
		//     y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
		//     twinkle = random(10);

		//   if (twinkle === 1 && this.alpha > 0) {
		//     this.alpha -= 0.05;
		//   } else if (twinkle === 2 && this.alpha < 1) {
		//     this.alpha += 0.05;
		//   }

		//   ctx.globalAlpha = this.alpha;
		//   ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
		//   this.timePassed += this.speed;
		// }

		// for (var i = 0; i < maxStars; i++) {
		//   new Star();
		// }

		// function animation() {
		//   ctx.globalCompositeOperation = 'source-over';
		//   ctx.globalAlpha = 0.5; //尾巴
		//   ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
		//   ctx.fillRect(0, 0, w, h)

		//   ctx.globalCompositeOperation = 'lighter';
		//   for (var i = 1, l = stars.length; i < l; i++) {
		//     stars[i].draw();
		//   };

		//   window.requestAnimationFrame(animation);
		// }
		// animation();
		
		$(".flipster").flipster({ 
			style: 'carousel', 
			start: 0,
			fadeIn: 400,
			autoplay: true,
			loop: true,
		});
	}
	render() {
		return (
			<div className="flipster large-screen" style={styles.div}>
				<div className="bigdata_title">
					<a href="/">
						<span className="bigdata_l"></span>
						<span className="bigdata_c">景区智能管控平台大屏幕</span>
						<span className="bigdata_r"></span>
					</a>
				</div>
				<ul>
					<li>
						<a href="./bigdata">
							<img src={require('./images/ReactApp1.jpg')} style={styles.img} />
						</a>
						<p style={styles.p}>综合管控</p>
					</li>
					<li>
						<a href="./parkinglot">
							<img src={require('./images/ReactApp2.jpg')} style={styles.img} />
						</a>
						<p style={styles.p}>智能停车场</p>
					</li>
					<li>
						<a href="./boat">
							<img src={require('./images/ReactApp3.jpg')} style={styles.img} />
						</a>
						<p style={styles.p}>游船调度</p>
					</li>
					<li>
						<a href="./bigdata2">
							<img src={require('./images/ReactApp4.jpg')} style={styles.img} />
						</a>
						<p style={styles.p}>客流分析</p>
					</li>
					<li>
						<a href="./bigdata">
							<img src={require('./images/ReactApp1.jpg')} style={styles.img} />
						</a>
						<p style={styles.p}>综合管控</p>
					</li>
				</ul>
			</div>
		);
	}
}

const styles = {
	div: {
		position: "relative",
		backgroundImage: `url(${Bg})`,
		backgroundSize: "cover"
	},
	p: {
		textAlign: "center",
		fontSize: 82,
		color: "#04ffcd"
	},
	canvas: {
		position: "absolute",
		top: 0,
		zIndex: -1,
		width: "100%",
		height: "100%"
	}

}

export default RootPage;
