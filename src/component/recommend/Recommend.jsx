import React, { Component } from 'react';

import BoxItem from 'BoxItem';
// import MyProvider from 'MyProvider';

class Recommender extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      var displayText = this.props.displayText;
      return (
         <div className="sp-box">
            <div className="sp-box-title">
               <div className="img-title">
                  <div className="sy_menu_icon_vip_right"></div>
               </div>
               <h3 className="text-title">{displayText.text} <small className="sub-title">{displayText.subtext}</small> </h3>
            </div>
            <div className="hb">
               <BoxItem id="r_arena" img="sy_main_battle" classBox="scale-8">{displayText.item.arena}</BoxItem>
            </div>
         </div>
      );
   }
}

export default  Recommender;