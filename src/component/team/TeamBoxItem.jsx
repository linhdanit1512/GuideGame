import React, { Component } from 'react';
import HeroItem from 'HeroItem';
export default class TeamBoxItem extends Component {
   constructor(props, context) {
      super(props, context);
   }

   render() {
      var data = this.props.data || {};
      let show = {
         show_elemental: true,
         show_regency: false,
         show_level: true,
         show_star: true
      };
      return (
         <HeroItem data={data} show={show}></HeroItem>
      )
   }

}