import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Table, FormControl, Form, Button } from 'react-bootstrap';

import numeral from 'numeral';

import MyContext from 'MyContext';

import levelList from '../../static-data/levelup.json';
import levelMilestone from '../../static-data/level-milestone.json';

import HeroItem from 'HeroItem';

class CalculatorLevel extends Component {
   constructor(props, context) {
      super(props, context);
      this.state = {
         calc: false,
         begin: 0,
         end: 0,
         level: 0,
         purple_soul: 0,
         gold_soul: 0,
         gold: 0,
         same_princess: 0,
         special_princess: 0,
         princess_5: 0,
         princess_6: 0,
         princess_9: 0,
         awaken: 0,
         only_milestone: true,
      }
   }

   changeCheckResource() {
      this.state.only_milestone = !this.refs.include.checked;
      console.log(this.state.only_milestone);
      this.setState(this.state);
      if (this.state.calc) {
         this.calc();
      }
   }

   calc() {
      let { begin, end, include } = this.refs;

      let sum = {
         level: 0,
         purple_soul: 0,
         gold_soul: 0,
         gold: 0,
         same_princess: 0,
         special_princess: 0,
         princess_5: 0,
         princess_6: 0,
         princess_9: 0,
         awaken: 0,
      }

      levelMilestone.filter((item, index) => {
         if (item.level >= parseInt(begin.value) && item.level <= parseInt(end.value)) {
            for (let attr in item) {
               sum[attr] += item[attr];
            }
         }
      });

      if (!include.checked) {
         for (let i = parseInt(begin.value) - 1; i < parseInt(end.value); i++) {
            for (let attr in levelList[i]) {
               sum[attr] += levelList[i][attr];
            }
         }
      }

      for (let attr in sum) {
         this.state[attr] = sum[attr];
      }

      this.state.calc = true;
      this.state.only_milestone = include.checked;
      this.state.begin = parseInt(begin.value);
      this.state.end = parseInt(end.value);

      this.setState(this.state)

   }

   render() {
      var displayText = this.context.state.displayText[this.context.state.lang].c_level;
      var elementalText = this.context.state.displayText[this.context.state.lang].elemental;
      var regencyText = this.context.state.displayText[this.context.state.lang].regency;

      var princessData = {
         same_princess: { star: 5, img: 'cr_mystery_6' },
         special_princess: { star: 5, img: 'cr_mystery_5' },
         princess_5: { star: 5, img: 'cr_mystery_6' },
         princess_6: { star: 6, img: 'cr_mystery_4' },
         princess_9: { star: 9, img: 'cr_mystery_4' }
      }

      var item = ['same_princess', 'special_princess', 'princess_5', 'princess_6', 'princess_9']

      let milestone = [30, 40, 50, 60, 80, 100, 140, 160, 180, 200]

      var showHero = {
         show_star: true
      }

      return (
         <div className="calculator-box mt-3">
            <h2 className="bold">{this.context.state.displayText[this.context.state.lang].calculator.text + ' ' + this.context.state.displayText[this.context.state.lang].calculator.item.level}</h2>
            <Row className="justify-content-md-center">
               <div className={'col-md-6 col-sm-12 col-xs-12'}>
                  <span className="mr-2">{displayText.begin}</span>
                  <FormControl type="number" max={249} min={1} defaultValue={1} ref="begin" placeholder={'1 - 249'} />
               </div>
               <div className={'col-md-6 col-sm-12 col-xs-12'}>
                  <span className="mr-2">{displayText.end}</span>
                  <FormControl type="number" max={250} min={2} defaultValue={250} ref="end" placeholder={'> ' + displayText.begin} />
               </div>
            </Row>
            <div className="mb-3">
               <Form.Check ref="include" type="checkbox" label={displayText.only_milestone + ' (' + milestone.join(', ') + ')?'} className="pt-3" />
            </div>

            <div>
               <Button variant={'success'} onClick={this.calc.bind(this)}>{this.context.state.displayText[this.context.state.lang].calculator.text}</Button>
            </div>
            <hr className="m-4" />
            {this.state.calc ?
               <div className="mt-2">
                  <h3>{this.context.state.lang == 'en' ? 'Result' : this.context.state.lang == 'vi' ? 'Kết quả' : ''}</h3>
                  <div className="calculator-result">
                     <Table bordered hover className="pr-2">
                        <tbody>
                           <tr>
                              <td className="scale-6"><div className="it_coin_gold"></div></td>
                              <td>{displayText.gold}</td>
                              <td className="text-right">{numeral(this.state.gold).format('0,0')}</td>
                           </tr>
                           {!this.state.only_milestone ?
                              <tr>
                                 <td className="scale-8"><div className="it_coin_soul"></div></td>
                                 <td>{displayText.purple_soul}</td>
                                 <td className="text-right">{numeral(this.state.purple_soul).format('0,0')}</td>
                              </tr>
                              : <tr className="hidden"></tr>
                           }
                           <tr>
                              <td className="scale-8"><div className="it_coin_advanced"></div></td>
                              <td>{displayText.gold_soul}</td>
                              <td className="text-right">{numeral(this.state.gold_soul).format('0,0')}</td>
                           </tr>
                           {this.state.calc && this.state.end >= 100 ?
                              <tr>
                                 <td className="scale-7"><div className="it_coin_awaken_wizard"></div></td>
                                 <td>{displayText.awaken}</td>
                                 <td className="text-right">{numeral(this.state.awaken).format('0,0')}</td>
                              </tr>
                              : <tr></tr>}
                        </tbody>
                     </Table>
                  </div>
                  {this.state.end >= 100 ?
                     <div className="calculator-result">
                        <Table bordered hover className="pl-2">
                           <tbody>
                              {item.map((value, index) => {
                                 return (<tr key={index}>
                                    <td className="scale-6 top-left-transform"><HeroItem data={princessData[value]} show={showHero}></HeroItem></td>
                                    <td>{displayText[value]}</td>
                                    <td className="text-right">{numeral(this.state[value]).format('0,0')}</td>
                                 </tr>)
                              })}
                           </tbody>
                        </Table>
                     </div>
                     : ''}
               </div>
               : ''}
         </div>
      );
   }
}

CalculatorLevel.contextType = MyContext;

export default CalculatorLevel;