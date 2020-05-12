import React, { PureComponent, useState, useEffect } from 'react'
/**
 props: {

 }
 */
class FeatureItem extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         boxClass: ''
      }
   }

   componentDidMount() {
      if (this.props.animation) {
         let time = parseInt(Math.random() * 2000);
         let _self = this;
         setTimeout(function () {
            _self.state.boxClass = 'aniTop';
            _self.setState(_self.state);
         }, time);
      }
   }

   render() {
      return (
         <div className={'building-' + this.props.feature}>
            <div className={"feature-box " + this.state.boxClass} id={this.props.feature}>
               <div className="m-1 w-100">
                  <div className="w-100" style={{ margin: 'auto' }}>
                     <div className={this.props.imageClass ? this.props.imageClass : ''}>
                        <div className={this.props.image + " feature-image"}></div>
                     </div>
                  </div>
                  <div className="w-100">
                     <div className={this.props.imageTextClass ? this.props.imageTextClass : ''}>
                        <div className="scale-6">
                           <div className="gn_steps_brave feature-text">
                              <div>{this.props.children}</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default  FeatureItem;