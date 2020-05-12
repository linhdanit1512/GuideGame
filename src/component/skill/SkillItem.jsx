import React, { Component } from 'react'

export default class SkillItem extends Component {
   constructor(props) {
      super(props);
   }

   selectSkill() {
      if (this.props.action) {
         this.props.action(this.props.img);
      }
      if (this.props.setSelected) {
         this.props.setSelected(this.props.img);
      }

      if (this.props.getSkill) {
         this.props.getSkill(this.props._id);
      }
   }
   render() {
      var { img, lang, selected } = this.props;
      return (
         <div className={"skill-item" + (selected == img || selected == true ? ' active' : '')} onClick={this.selectSkill.bind(this)}>
            <div className="skill-img">
               <div className={img}></div>
            </div>
            <div className="skill-frame">
               <div className="it_frame_artifact_4"></div>
            </div>
            {this.props.children}
         </div>
      );
   }
}