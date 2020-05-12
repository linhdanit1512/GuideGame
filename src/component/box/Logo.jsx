import React, { PureComponent } from 'react'

export default  class Logo extends PureComponent {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="logo">
            <div className="logo-ummon"></div>
            <div className="logo-s"></div>
            <div className="logo-wing"></div>
            <div className="logo-cross"></div>
            <div className="logo-p"></div>
            <div className="logo-rincess"></div>
            <div className="logo-text"></div>
            <div className="logo-light"></div>
         </div>
      )
   }
}