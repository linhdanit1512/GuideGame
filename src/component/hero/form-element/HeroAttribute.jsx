import React, { Component } from 'react';
import { Row, Col, FormControl, Button } from 'react-bootstrap';

export default class HeroAttribute extends Component {
   constructor(props) {
      super(props);
   }

   getAttribute(){
      let myref = this.refs;
      for(let key in myref){
         console.log(key)
      }
   }

   render() {
      const displayText = this.props.displayText;
      const lang = this.props.lang;
      const power = displayText[lang].form.power;
      return (
         <Row>
            {Object.keys(power).map((attr, index) => {
               return (
                  <Col md={6}>
                     <Col md={4} sm="auto">{power[attr]}</Col>
                     <Col md={8} sm="auto">
                        <input type="text" className="form-control" ref={attr} placeholder="0"/>
                     </Col>
                  </Col>
               );
            })}
         </Row>
      )
   }
}