import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MyContext from 'MyContext';

export default class LegalBattle extends Component {
   constructor(props) {
      super(props);
      this.legalImage = {
         '1_1_1_1_1_1': 'sk_psty_crit_down',
         '2_2_2_2_2_2': 'sk_psty_crit_up',
         '3_3_3_3_3_3': 'sk_psty_crit_up_attack',
         '4_4_4_4_4_4': 'sk_psty_crit_up_defend',
         '5_5_5_5_5_5': 'sk_psty_critdmg_down',
         '6_6_6_6_6_6': 'sk_psty_critdmg_down',
         '1_2_3_4_5_6': 'sk_psty_critdmg_up_attack',
         '5_5_5_6_6_6': 'sk_psty_death_friend',
         '1_1_1_3_3_3': 'sk_psty_armor_up',
         '2_2_2_4_4_4': 'sk_psty_death_enemy',
         '1_1_3_3_5_5': 'sk_psty_break_up',
         '2_2_4_4_6_6': 'sk_psty_break_down',
         '3_3_3_4_4_4': 'sk_psty_skilldmg_up',
         '1_1_1_4_4_4': 'sk_psty_armor_up_attack',
         '2_2_2_3_3_3': 'sk_psty_atta_up_defend',
         '1_1_1_2_2_2': 'sk_psty_break_up_attack'
      }
      this.elementalItemText = 'cr_fact_';

      this.state = {
         show: false
      }
      this.handleClose = () => { this.state.show = false; this.setState(this.state) }
      this.handleShow = () => { this.state.show = true; this.setState(this.state) }
   }

   getClassLegalName(name) {
      return this.legalImage[name] ? this.legalImage[name] : 'sy_circ_light_1 gray-mask'
   }

   changeLegalToArray() {
      let result = []
      for (let item in this.legalImage) {
         result.push({ key: item, value: this.legalImage[item] });
      }
      return result;
   }

   render() {
      return (
         <MyContext.Consumer>
            {({ state }) => {
               const lang = state.lang;
               const legalText = state.displayText[lang].form.team;
               const currentAttribute = legalText.legalText[this.props.data] ? legalText.legalText[this.props.data].effect : {};

               return (
                  <div className="team-legal">
                     <div className="team-legal-text" >{legalText.legal}</div>

                     <div variant="outline-infor" onClick={this.handleShow.bind(this)} className={"team-legal-img"} id={this.props.id || "team-legal"}>
                        <div className={this.getClassLegalName(this.props.data)}></div>
                        <div className="elementals bold ml-2">
                           {Object.keys(currentAttribute).map((attr, index) => {
                              return <div key={index}><span>{attr}</span> {' ' + currentAttribute[attr]}%</div>
                           })}

                        </div>
                     </div>

                     <Modal show={this.state.show} onHide={this.handleClose.bind(this)} size="md">
                        <Modal.Header closeButton>
                           <Modal.Title><b>{legalText.legalTitle}</b></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           <h3>{legalText.legalListTitle}</h3>
                           {
                              this.changeLegalToArray().map((item, index) => {
                                 return (
                                    <div key={index} className={"legal-list-item"+ (item.key == this.props.data ? ' active':'')}>
                                       <div className={"icon" + (item.key == this.props.data ? '' : ' gray-mask')}>
                                          <div className={item.value}></div>
                                       </div>
                                       <div className="content ml-2">
                                          <div className="title">{legalText.legalText[item.key].name}</div>
                                          <div className="elementals">
                                             {item.key.split('_').map((i, index2) => {
                                                return <div className={this.elementalItemText + i} key={index2}></div>
                                             })}
                                          </div>
                                       </div>
                                       <div className="attributes text-right">
                                          {Object.keys(legalText.legalText[item.key].effect).map((attr, index3) => {
                                             return <div key={index3}><span>{attr}</span> {' ' + legalText.legalText[item.key].effect[attr]}%</div>
                                          })}
                                       </div>
                                    </div>
                                 )
                              })
                           }
                        </Modal.Body>
                        <Modal.Footer>
                           <Button variant="secondary" onClick={this.handleClose.bind(this)}>Close</Button>{' '}
                        </Modal.Footer>
                     </Modal>
                  </div>
               )
            }}
         </MyContext.Consumer>
      );
   }
}