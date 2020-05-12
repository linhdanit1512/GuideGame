import React, { Component } from 'react';
import BoxItem from 'BoxItem';

class HandBook extends Component {
   constructor(props) {
      super(props);
   }


   render() {
      var displayText = this.props.displayText;
      return (
         <div className="sp-box">
            <div className="sp-box-title">
               <div className="img-title">
                  <div className="sy_main_assistant left"></div>
               </div>
               <h3 className="text-title">{displayText.text} <small className="sub-title">{displayText.subtext}</small> </h3>
            </div>
            <div className="hb">
               <BoxItem url="/h/heroes" id="h_hero" img="sy_activity_icon_fusion" classBox="">{displayText.item.hero}</BoxItem>
               <BoxItem url="/h/material" id="h_material" img="sy_main_knapsack" classBox="scale-9">{displayText.item.material}</BoxItem>
               <BoxItem url="/h/equipment" id="h_equip" img="it_equi_gen_6" classBox="scale-9">{displayText.item.equip}</BoxItem>
               <BoxItem url="/h/shard" id="h_shard" img="it_hero_piece_3" classBox="p-3">{displayText.item.shard}</BoxItem>
               <BoxItem url="/h/artifact" id="h_artifact" img="it_equi_artif_piece_5" classBox="scale-8">{displayText.item.artifact}</BoxItem>
               <BoxItem url="/h/guild" id="h_guild" img="sy_main_guild" classBox="scale-9">{displayText.item.guild}</BoxItem>
               <BoxItem url="/h/battle" id="h_battle" img="sy_main_battle" classBox="">{displayText.item.battle}</BoxItem>
               <BoxItem url="/h/map" id="h_map" img="sy_main_map" classBox="p-3 scale-13 top-left-transform" img_style={{ marginTop: '-10px', marginLeft: '-8px' }}>{displayText.item.map}</BoxItem>
               <BoxItem url="/h/building" id="h_building" img="sy_main_castle" classBox="">{displayText.item.building}</BoxItem>
               <BoxItem url="/h/skills" id="h_skill" img="sk_acty_arrow" classBox="scale-7 top-left-transform" img_style={{ marginTop: '10px', marginLeft: '28px' }}>{displayText.item.skill}</BoxItem>
               <BoxItem url="/h/pet" id="h_pet" img="sy_menu_icon_pet" classBox="">{displayText.item.pet}</BoxItem>
            </div>
         </div>
      );
   }
}

export default HandBook;