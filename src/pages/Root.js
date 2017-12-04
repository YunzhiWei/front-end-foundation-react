import React, { Component } from 'react';
import './lib/flipster/jquery.flipster.css';
import './lib/flipster/jquery.flipster.js';
import Bg from './images/index-bg.jpg';
import $ from 'jquery';

class RootPage extends Component {
	componentDidMount() {
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
		fontSize: 41,
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
