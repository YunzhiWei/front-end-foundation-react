import React, { Component } from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';

const CardProvider = (props) => (
    <Card className="card" style={props.style}>
      <CardHeader
        title={props.title}
        style={props.style.header}
        titleColor={props.style.titleColor}
        titleStyle={props.style.header.titleStyle}
      />
      <CardText style={props.style.text}>
        {props.children}
      </CardText>
    </Card>
);

export default CardProvider;

