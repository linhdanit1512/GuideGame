import React, { Component } from 'react'
import { Button, Form, Table, Container, Row, Col, Media, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import HeroItem from 'HeroItem';
import MyContext from 'MyContext';

import princesses from 'princesses';

export default class TeamBoxForm extends Component {
   constructor(props, context) {
      super(props, context);
      this.state = {
         selectedValue: '',
         searchable: ''
      }
      this.select = React.createRef();
      this.level = React.createRef();
      this.star = React.createRef();

   }

   princessOption() {
      let result = [];
      princesses.forEach((p) => {
         p.value = p.regency + '-' + p.elemental + ' ' + p.name;
         result.push(p);
      });
      return result;
   }

   selectChange(option) {
      this.state.selectedValue = option;
      this.setState(this.state);
      let data = this.props.data;

      let currentStar = data.star;
      let currentLevel = data.level;
      var current = data;
      let key = ['figure', 'regency', 'elemental', 'name', 'img', 'value', 'star'];
      key.forEach(attr => {
         current[attr] = option[attr];
      });
      current.star = currentStar || option.star;
      current.level = currentLevel || 1;
      this.props.updateLegal(current.elemental, this.props.index);
      this.props.updateData(current, this.props.index);
   }

   changeLevel() {
      let level = parseInt(this.level.current.value);
      let data = this.props.data;
      data.level = level;
      this.props.updateData(data, this.props.index);
   }

   changeStar() {
      let star = parseInt(this.star.current.value);
      let data = this.props.data;
      data.star = star;
      this.props.updateData(data, this.props.index);
   }

   render() {
      return (
         <div className="team-box w-100 mb-2">
            <MyContext.Consumer>
               {({ state }) => {
                  return (
                     <Row>
                        <Col md={1} className={'text-right'}>{this.props.index + 1}</Col>
                        <Col md={5}>
                           <Select
                              value={this.state.selectedValue}
                              name='teambox-select'
                              options={this.princessOption()}
                              ref={this.select}
                              searchable={this.state.searchable}
                              onChange={this.selectChange.bind(this)}
                              components={{ Option }}
                              optionRenderer={{ Option }}
                              placeholder={state.displayText[state.lang].form.team.select}
                           ></Select>
                        </Col>
                        <Col md={3}>
                           <FormControl type='number' onChange={this.changeLevel.bind(this)} min={1} ref={this.level} placeholder={state.displayText[state.lang].calculator.item.level} />
                        </Col>
                        <Col md={3}>
                           <select className="form-control" onChange={this.changeStar.bind(this)} ref={this.star} placeholder={state.displayText[state.lang].form.hero.star}>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                                 return <option value={item} key={index}>{item}</option>
                              })}
                           </select>
                        </Col>
                     </Row >
                  )
               }}
            </MyContext.Consumer>
         </div>
      )
   }
}

function Option(props) {
   delete props.innerProps.onMouseMove;
   delete props.innerProps.onMouseOver;
   let data = props.data;
   let show = {
      show_elemental: true,
      show_regency: false,
      show_level: true,
      show_star: true
   };

   function handleMouseDown(event) {
      event.preventDefault();
      event.stopPropagation();
      props.selectOption(props.data, event);
   }

   return (
      <Media className={'hero-selectbox'} onMouseDown={handleMouseDown}>
         <div className="hero-img"><HeroItem data={data} show={show}></HeroItem></div>
         <Media.Body><b className={'mt-2'}>{data.name}</b></Media.Body>
      </Media>
   )
}