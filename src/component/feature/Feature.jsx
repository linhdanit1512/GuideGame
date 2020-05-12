import React, { Component } from "react";
import FeatureItem from 'FeatureItem';

var displayText = {
   en: {
      hills: 'Hills',
      gate: 'Gates of Void',
      bliss: 'Bliss Tree',
      tower: 'Tower',
      integration: 'Integration',
      summon: 'Summon',
      post: 'Post',
      smithy: 'Smithy',
      wishing: 'Wishing Well',
      altar: 'Virtual Altar',
      arena: 'Arena',
      mart: 'Sun Mart'
   },
   vi: {
      hills: 'Đồi',
      gate: 'Câu hỏi',
      bliss: 'Cây ban phước',
      tower: 'Tháp',
      integration: 'Nâng cấp',
      summon: 'Triệu hồi',
      post: 'Bưu cục',
      smithy: 'Lò rèn',
      wishing: 'Giếng ước',
      altar: 'Tế đàn',
      arena: 'Đấu trường',
      mart: 'Siêu thị Mặt trời'
   }
}

class Feature extends Component {
   constructor(props) {
      super(props);
      this.state = {
         sp_container_left : 0
      }
   }

   mouseRelease(){

   }

   render() {
      return (
         <div className="sp-container">
            <FeatureItem animation={true} classBox="4" feature="hills" image="sy_cast_building_brave">{displayText[this.props.lang].hills}</FeatureItem>
            <FeatureItem animation={true} classBox="4" feature="gate" image="sy_cast_building_hero_trial">{displayText[this.props.lang].gate}</FeatureItem>
            <FeatureItem animation={true} classBox="4" imageTextClass="pt-40" feature="bliss" image="sy_cast_building_tree">{displayText[this.props.lang].bliss}</FeatureItem>
            <FeatureItem animation={true} feature="tower" image="sy_cast_building_tower">{displayText[this.props.lang].tower}</FeatureItem>
            <div className="building-island feature-box"></div>
            <FeatureItem feature="integration" imageClass="scale-7" image="sy_cast_building_hero_upgrade">{displayText[this.props.lang].integration}</FeatureItem>
            <FeatureItem feature="summon" imageClass="scale-8" image="sy_cast_building_get_hero">{displayText[this.props.lang].summon}</FeatureItem>
            <FeatureItem feature="post" image="sy_cast_building_tavern">{displayText[this.props.lang].post}</FeatureItem>
            <FeatureItem feature="smithy" image="sy_cast_building_smithy">{displayText[this.props.lang].smithy}</FeatureItem>
            <FeatureItem feature="wishing" image="sy_cast_building_rotary">{displayText[this.props.lang].wishing}</FeatureItem>
            <FeatureItem animation={true} feature="altar" image="sy_cast_building_altar">{displayText[this.props.lang].altar}</FeatureItem>
            <FeatureItem animation={true} feature="arena" image="sy_cast_building_pvp">{displayText[this.props.lang].arena}</FeatureItem>
            <FeatureItem animation={true} feature="mart" image="sy_cast_building_shop">{displayText[this.props.lang].mart}</FeatureItem>
         </div>
      );
   }
}

export default  Feature;