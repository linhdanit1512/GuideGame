import React, { Component } from 'react';
import BoxItem from 'BoxItem';

class Calculator extends Component {
   constructor(props) {
      super(props);
      this.state = {

      }
   }

   render() {
      var displayText = this.props.displayText;
      return (
         <div className="sp-box">
            <div className="sp-box-title">
               <div className="img-title">
                  <div className="sy_activity_icon_check_in"></div>
               </div>
               <h3 className="text-title">{displayText.text} <small className="sub-title">{displayText.subtext}</small> </h3>
            </div>
            <div className="hb">
               <BoxItem id="c_artifact" img="it_equi_artif_6_faction_5" classBox="scale-8">{displayText.item.artifact}</BoxItem>
               <BoxItem id="c_rune" img="it_equi_treas_5_crit_damage" classBox="scale-8">{displayText.item.rune}</BoxItem>
               <BoxItem id="c_level" img="sy_activity_icon_check_in" classBox="p-3 scale-13">{displayText.item.level}</BoxItem>
               <BoxItem id="c_pet" img="cr_p_green" classBox="scale-8">{displayText.item.pet}</BoxItem>
            </div>
         </div>
      );
   }
}

export default  Calculator;