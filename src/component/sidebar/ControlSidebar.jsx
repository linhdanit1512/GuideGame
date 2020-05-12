import React, { Component, useState, useEffect } from 'react';

class ControlSidebar extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className={"show-sidebar " + (this.props.hide ? 'hide' : 'show')} onClick={this.props.clickAction.bind(this)}>
            <div className="gn_btn_swit_white"></div>
         </div>
      );
   }
}

export default  ControlSidebar;