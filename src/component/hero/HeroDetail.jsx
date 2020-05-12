import React, { Component } from 'react';

import { Modal, Row, Col, Button } from 'react-bootstrap';
import MyContext from 'MyContext';
import HeroItem from 'HeroItem';
import SkillItem from 'SkillItem';


export default class HeroDetail extends Component {
   constructor(props, context) {
      super(props, context);
      this.state = {
         currentHero: this.props.hero || {},
         show: false,
      }
   }

   render() {
      var princess = this.props.data || {};

      return (
         <MyContext.Consumer>
            {({ state }) => {
               if (this.props.modal == true) {
                  return (
                     <Modal show={this.props.show} onHide={this.props.hideFn} size="lg">
                        <Modal.Header closeButton>
                           <Modal.Title>{state.displayText[state.lang].form.hero.info}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           <HeroDetailContent princess={princess} text={state.displayText[state.lang]}></HeroDetailContent>
                        </Modal.Body>
                        <Modal.Footer>
                           <Button variant="secondary" onClick={this.props.hideFn}>Close</Button>
                        </Modal.Footer>
                     </Modal>
                  )
               } else {
                  <HeroDetailContent princess={princess} text={state.displayText[state.lang]} lang={state.lang}></HeroDetailContent>
               }
            }}
         </MyContext.Consumer>
      )
   }
}

function HeroDetailContent(props) {
   var princess = props.princess || {};
   if (!princess.name || !princess.princessLevels) {
      return <div></div>
   }
   var displayText = props.text;
   var attrArray = ['HP', 'ATT', 'DEF', 'speed', 'hit', 'dodge', 'critHit', 'critHitDamage', 'abilitiDamage', 'defPen', 'freeControlRate', 'mitigation', 'realDamageRate'];
   var percenAttr = ['hit', 'dodge', 'critHit', 'critHitDamage', 'abilitiDamage', 'defPen', 'freeControlRate', 'mitigation', 'realDamageRate']
   return (
      <div className="hero-detail">
         <div className="hero-name">{princess.name || ''}</div>
         <div className="hero-elemental"><div className={'cr_fact_' + princess.elemental}></div> <div className="text bold"> {' ' + displayText.elemental[princess.elemental || 0]}</div></div>
         <div className="hero-regency"><div className={'cr_occu_' + princess.regency}></div> <div className="text bold">{' ' + displayText.regency[princess.regency || 0]}</div></div>
         {princess.princessLevels.map((p, index) => {
            return (
               <div className="princess-level-detail border-top pt-2" key={index}>
                  <Row>
                     <Col md={4} lg={3}>
                        <div className="hero-logo">
                           <HeroItem data={{ name: princess.name, star: p.star, img: p.avt, level: p.maxLevel || 40 }} show={{ show_level: true }}></HeroItem>
                        </div>
                        <div className="princess-card">
                           <div className={'princess-image princess-' + p.avt}></div>
                        </div>
                     </Col>
                     <Col md={8} lg={9} className='mb-2'>
                        <h4>{displayText.form.power.title}</h4>
                        {attrArray.map((item, attrIndex) => {
                           return (
                              <div className="hero-attribute" key={attrIndex}>
                                 <div className="attribute-name">{displayText.form.power[item]}</div>
                                 <div className="attribute-value text-right">{p[item] || '0'}{percenAttr.includes(item) ? '%' : ''}</div>
                              </div>
                           )
                        })}
                     </Col>
                     <Col md={12} className="border-top">
                        <h4>{displayText.skill.title}</h4>
                        <div className="hero-skill">
                           {p.skill.length == 0 ? <div className="hero-skill-empty">{displayText.skill.empty}</div> : (
                              p.skill.map((skill, skillIndex) => {
                                 return (
                                    <div className="skill-detail" key={skillIndex}>
                                       <div className="skill-logo">
                                          <SkillItem img={skill.img}>{skill.level > 0 ? <div className="skill-level">{skill.level}</div> : ''}</SkillItem>
                                       </div>
                                       <div className="skill-name">{skill.name}</div>
                                       <div className="skill-desc">{props.lang == 'en' ? skill.desc[0] : skill.desc[1]}</div>
                                    </div>
                                 )
                              })
                           )}
                        </div>
                     </Col>
                  </Row>
               </div>
            )
         })}
      </div>
   )
}