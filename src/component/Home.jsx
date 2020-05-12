import React, { useEffect, useContext } from 'react';

// import Sidebar from 'Sidebar';
// import Feature from 'Feature';
import Handbook from 'Handbook';
import Calculator from 'Calculator';
import Recommender from 'Recommender';
import MyContext from 'MyContext';

export default function Home() {
   const value = useContext(MyContext);
   return (
      <div>
         <div className="p-3">
            <div className="row">
               <div className="col-md-6 col-sm-12 col-xs-12">
                  <Handbook lang={value.state.lang} displayText={value.state.displayText[value.state.lang].handbook}></Handbook>
               </div>
               <div className="col-md-6 col-sm-12 col-xs-12">
                  <Calculator lang={value.state.lang} displayText={value.state.displayText[value.state.lang].calculator}></Calculator>
                  <Recommender lang={value.state.lang} displayText={value.state.displayText[value.state.lang].recommend}></Recommender>
               </div>
            </div>
         </div>
      </div>
   );
}

