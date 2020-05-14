import React, { Component, PureComponent } from 'react';
import { Row, Table, FormControl, Form, Button } from 'react-bootstrap';

import MyContext from 'MyContext';
import materials from '../../static-data/meterial';

class HandbookMaterial extends Component {
   constructor(props, context) {
      super(props, context);
   }

   render() {
      return (
         <div className="handbook-box pt2 mb-2">
            <h2 className="bold">{this.context.state.displayText[this.context.state.lang].handbook.item.material}</h2>
            <Table striped hover>
               <tbody>
                  {materials.map((value, index) => {
                     return (
                        <tr key={index}>
                           <td><MaterialItem color={value.color} item={value.item} scale={value.scale}></MaterialItem></td>
                           <td>{value.name[this.context.state.lang]}</td>
                           <td>{value.desc[this.context.state.lang]}</td>
                        </tr>
                     )
                  })}
               </tbody>
            </Table>
         </div>
      )
   }
}

class MaterialItem extends PureComponent {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className={"material-item"}>
            <div className={`cr_step_${this.props.color} material-bg`}></div>
            <div className={"item"+  (this.props.scale ? ' scale' : '')}>
               <div className={this.props.item}></div>
            </div>
            <div className={`cr_it_frame_${this.props.color} material-frame`}></div>
         </div>
      )
   }
}

HandbookMaterial.contextType = MyContext;

export default HandbookMaterial;