import React, { PureComponent } from 'react';

class BoxItem extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {

      }
   }

   render() {
      return (
         <a href={'#' + (this.props.url ? this.props.url : this.props.id ? this.props.id.split('_').join('/') : '/')} className="hb-item" id={this.props.id}>
            <div className={(this.props.classBox ? this.props.classBox : '') + ' hb-img'}>
               <div className={this.props.img} style={this.props.img_style || {}}></div>
            </div>
            <div className={(this.props.textClass ? this.props.textClass : '') + ' hb-text'}>{this.props.children}</div>
         </a>
      );
   }
}

export default BoxItem;