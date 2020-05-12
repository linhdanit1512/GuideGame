import React, { Component, useState, useEffect } from 'react'

/**
 props: {

 }
 */
class SidebarItem extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className={"gn_set_unclick_btn sp-btn" + (this.props.active == true ? ' active' : '')}>
            <div className={"sp-icon scale-" + this.props.scale}>
               <div className={this.props.rotate ? "rotate--90" : ''} style={this.props.rotateStyle ? this.props.rotateStyle : {}}>
                  <div className={this.props.itemImage + " left inline"} style={this.props.itemStyle ? this.props.itemStyle : {}}></div>
               </div>
            </div>
            <span className="sy_menu_text" style={this.props.textStyle ? this.props.textStyle : {}}>{this.props.children}</span>
         </div>
      );
   }
}

export default  SidebarItem;