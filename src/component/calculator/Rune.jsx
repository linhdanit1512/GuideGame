import React, { Component } from 'react';
import MyContext from 'MyContext';
import numeral from 'numeral';

import { Table } from 'react-bootstrap';

import runes from '../../static-data/rune.json';
import { PureComponent } from 'react';

class CalculatorRune extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      let lang = this.context.state.lang;
      let displayText = this.context.state.displayText[lang].c_rune;
      let totalRune = 0;
      let totalGold = 0;
      return (
         <div className="rune-box">
            <h3 className="mt-3 mb-3 bold">{displayText.title}</h3>
            <div>
               <Table striped hover bordered>
                  <thead>
                     <tr className="text-center bold">
                        <td>No.</td>
                        <td></td>
                        <td colSpan={2}>{displayText.table.resource + ' ' + displayText.table.to_rune}</td>
                        <td colSpan={2}>{displayText.table.total + ' ' + displayText.table.resource + ' ' + displayText.table.to_level}</td>
                     </tr>
                  </thead>
                  <tbody className="bold">
                     {runes.map((rune, index) => {
                        totalGold += rune.gold;
                        totalRune += rune.rune;

                        return (
                           <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td><RuneItem data={rune} ></RuneItem></td>
                              <td><MateItem img={'it_coin_gold'}></MateItem>{numeral(rune.gold).format('0,0')}</td>
                              <td><MateItem img={'it_coin_dust'}></MateItem>{numeral(rune.rune).format('0,0')}</td>
                              <td><MateItem img={'it_coin_gold'}></MateItem>{numeral(totalGold).format('0,0')}</td>
                              <td><MateItem img={'it_coin_dust'}></MateItem>{numeral(totalRune).format('0,0')}</td>
                           </tr>
                        )
                     })}
                  </tbody>
               </Table>
            </div>
         </div>
      )
   }
}

class MateItem extends PureComponent {
   render() {
      return (
         <div style={{ transform: 'scale(.33)', transformOrigin: 'top left', width: '33px', height: '19px', display: 'inline-block' }}>
            <div className={this.props.img}></div>
         </div>
      )
   }
}

class RuneItem extends Component {
   constructor(props) {
      super(props);
   }
   runeStar(star) {
      star = parseInt(star);
      switch (star) {
         case 1: return (
            <div className="rune-star star-1">
               <div className="cr_stars_1"></div>
            </div>
         );
         case 2: return (
            <div className="rune-star star-2">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         );
         case 3: return (
            <div className="rune-star star-3">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         )

         case 4: return (
            <div className="rune-star star-4">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         )

         case 5: return (
            <div className="rune-star star-5">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         );
         default: return '';
      }
   }
   render() {
      let data = this.props.data;
      return (
         <div className={"rune-item rune-item-" + (data.level % 2)}>
            <div className="rune-frame">
               <div className={"it_jewel_" + (data.level + 1)}></div>
            </div>
            <div className={"rune-bg-" + data.level}>
               <div className={"it_step_diamond_" + (data.level + 1)}></div>
            </div>
            <div className={"item-" + data.level}>
               <div className={data.img}></div>
            </div>
            {this.runeStar(data.star)}
         </div>
      )
   }
}
CalculatorRune.contextType = MyContext;
export default CalculatorRune;