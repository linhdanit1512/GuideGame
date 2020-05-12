import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Form, InputGroup, Table, Button } from 'react-bootstrap';

import MyContext from 'MyContext';
import HeroItem from 'HeroItem';
import HeroSkill from 'HeroSkill';
import axios from 'axios';

export default function HeroExtend(props) {
   const context = useContext(MyContext);
   const lang = context.state.lang;
   const displayText = context.state.displayText[lang].form.hero;
   const powerText = context.state.displayText[lang].form.power;
   var heroID = useState('');

   var refs_form = {
      avt: React.createRef(),
      star: React.createRef(),
      maxLevel: React.createRef(),
      awaken: React.createRef(),
      strength: React.createRef(),
      HP: React.createRef(),
      ATT: React.createRef(),
      DEF: React.createRef(),
      speed: React.createRef(),
      abilitiDamage: React.createRef(),
      hit: React.createRef(),
      dodge: React.createRef(),
      critHit: React.createRef(),
      critHitDamage: React.createRef(),
      defPen: React.createRef(),
      freeControlRate: React.createRef(),
      mitigation: React.createRef(),
      realDamageRate: React.createRef()
   }

   var form_state = {
      star: useState(1),
      avt: useState(props.avt || ''),
      skill: useState([]),
   }

   var [skillList, setSkillList] = useState([]);

   function getFormData() {
      let data = {};
      for (let item in refs_form) {
         data[item] = refs_form[item].current.value;
      }

      data.awaken = refs_form.awaken.current.checked;
      if (props.avt !== '' && (!data.avt || data.avt == '')) {
         data.avt = props.avt;
      }
      if (heroID[0] && heroID[0] !== '') {
         data._id = heroID[0];
      }

      data.skill = skillList;

      return data;
   }

   function heroRegency(regency) {
      return <div className={"cr_occu_" + regency}></div>
   }

   function pushToParent() {
      let index = props.index;
      if (index >= 0) {
         props.pushData(getFormData(), index);
      }
   }

   function removeFromParent() {
      let index = props.index;
      if (index >= 0) {
         props.removeData(index);
      }
   }

   function setFormValue(data) {
      if (data) {
         for (let key in data) {
            if (form_state[key])
               form_state[key][1](data[key]);
            if (refs_form[key] && refs_form[key].current)
               refs_form[key].current.value = data[key];
         }
         if (data.skill) {
            setSkillList((items) => {
               return data.skill
            });
         }


      }
   }

   function setStar() {
      let star = parseInt(refs_form.star.current.value);
      form_state.star[1](star);
   }

   function showGallery() {
      props.setHeroGalleryIndex(props.index);
      props.showGallery();
   }

   useEffect(() => {
      if (props.data && props.data._id) {
         heroID[1](props.data._id);
         setFormValue(props.data);
      } else {
         let defaultData = {
            star: 1,
            avt: '',
            maxLevel: 40,
            skill: [],
            awaken: false,
            strength: '',
            HP: 0,
            ATT: 0,
            DEF: 0,
            speed: 0,
            abilitiDamage: 0,
            hit: 0,
            dodge: 0,
            critHit: 0,
            critHitDamage: 0,
            defPen: 0,
            freeControlRate: 0,
            mitigation: 0,
            realDamageRate: 0
         };
         setFormValue(defaultData);
      }
   }, []);

   return (
      <Row className="hero-extend mb-3">
         <Col md={2}>
            <div className="hero-logo">
               <HeroItem data={
                  {
                     name: '',
                     elemental: props.elemental,
                     regency: props.regency,
                     star: form_state.star[0],
                     img: props.avt
                  }
               } show={
                  {
                     show_elemental: true,
                     show_regency: true,
                     show_level: true,
                     show_star: true
                  }

               }>
                  <div className="hero-regency">
                     {heroRegency(props.regency)}
                  </div>
               </HeroItem>
            </div>

            <div className="princess-card">
               <div className={'princess-image princess-' + props.avt}></div>
            </div>
         </Col>
         <Col md={10}>
            <Row>
               <Col md={6}>
                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text>{displayText['avt']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control onClick={showGallery} name={'avt' + props.index} defaultValue={props.avt} ref={refs_form.avt} type="text" placeholder={displayText['avt']} aria-label={displayText['avt']} />
                  </InputGroup>
               </Col>
               <Col md={6}>
                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text>{displayText['star']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control ref={refs_form.star} as="select" onChange={setStar} placeholder={displayText['star']} aria-label={displayText['star']}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                           return <option value={item} key={item}>{item}</option>
                        })}
                     </Form.Control>
                  </InputGroup>
               </Col>

               <Col md={6}>
                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text>{displayText['maxLevel']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control ref={refs_form.maxLevel} type="text" placeholder={displayText['maxLevel']} aria-label={displayText['maxLevel']} />
                  </InputGroup>
               </Col>

               <Col md={6}>
                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text>{displayText['awaken']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Check ref={refs_form.awaken} type="checkbox" label="&nbsp;" className="pt-2" />
                  </InputGroup>
               </Col>
            </Row>
            <Col md={12}>
               <Table className="hero-extend-table" cellSpacing={10}>
                  <caption>{displayText.title}</caption>
                  <tbody>
                     <tr>
                        <td colSpan={4} className="hasinput">
                           <InputGroup>
                              <InputGroup.Prepend>
                                 <InputGroup.Text>{displayText.strength}</InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control ref={refs_form.strength} type="text" placeholder="0" />
                           </InputGroup>
                        </td>
                     </tr>
                     {
                        [['HP', 'ATT', 'DEF'], ['speed', 'hit', 'dodge'], ['critHit', 'critHitDamage', 'abilitiDamage'], ['defPen', 'freeControlRate', 'mitigation'], ['realDamageRate']].map((arr, index) => {
                           return (
                              <tr key={index}>
                                 {
                                    arr.map((item, index2) => {
                                       return (
                                          <td key={index2} className="hasinput">
                                             <InputGroup>
                                                <InputGroup.Prepend>
                                                   <InputGroup.Text>{powerText[item]}</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control ref={refs_form[item]} type="text" placeholder="0" />
                                             </InputGroup>
                                          </td>);
                                    })
                                 }
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </Table>
            </Col>
            <div className="clearfix"></div>
         </Col>
         <div className="clearfix"></div>
         <div className="skill-hero">
            <HeroSkill skillList={skillList} setSkillList={setSkillList}></HeroSkill>
         </div>
         <div className="clearfix"></div>
         <div className="text-right">
            <Button variant="outline-success" onClick={pushToParent}><i className="fa fa-2x fa-save"></i></Button>{' '}
            <Button variant="outline-danger" onClick={removeFromParent}><i className="fa fa-2x fa-times"></i></Button>
         </div>
      </Row>
   );
}