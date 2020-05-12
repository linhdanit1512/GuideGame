import React, { Component } from 'react';

class SwitchLanguage extends Component {
   constructor(props) {
      super(props);
      
   }

   switchLanguage() {
      let lang = this.refs.lang.value;
      this.props.changeLanguage(lang);
   }

   componentDidMount(){
      if(localStorage.getItem('lang')){
         this.refs.lang.value = localStorage.getItem('lang');
      }
   }

   render() {
      return (
         <select ref="lang" className="form-control" onChange={this.switchLanguage.bind(this)}>
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
         </select>
      );
   }
}

export default  SwitchLanguage;