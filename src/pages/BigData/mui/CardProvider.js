import React from 'react';
import './css/base.css';
import './css/large-screen.css';

const CardProvider = (props) => (
    <div className={props.className} style={{margin: '1em auto'}}>
          <div className={"echart-list "+props.color} >
              <div className="border-line standard top-line"></div>
              <div className="border-line vertical right-line"></div>
              <div className="border-line standard bottom-line"></div>
              <div className="border-line vertical left-line"></div>
              <span className="tip-line left-top">
                  <em></em>
              </span>
              <span className="tip-line top-right">
                  <em></em>
              </span>
              <span className="tip-line right-bottom">
                  <em></em>
              </span>
              <span className="tip-line bottom-left">
                  <em></em>
              </span>
              <div className="title-box">
                  <div className="title-mess">
                      {props.title}
                      <span className="title-tip left-top">
                          <em></em>
                      </span>
                      <span className="title-tip top-right">
                          <em></em>
                      </span>
                      <span className="title-tip right-bottom">
                          <em></em>
                      </span>
                      <span className="title-tip bottom-left">
                          <em></em>
                      </span>
                  </div>
              </div>
              <div className="content" id="echarts-content1" style={{position: 'relative', height: '400px'}}>
                  {props.children}
              </div>
          </div>
      </div>
);

export default CardProvider;

