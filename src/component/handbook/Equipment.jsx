import React, { Component, PureComponent } from 'react';
import { Row, Table, FormControl, Form, Button } from 'react-bootstrap';

import MyContext from 'MyContext';
import equipments from '../../static-data/equipment';

class HandbookEquipment extends Component {
   constructor(props, context) {
      super(props, context);
   }

   render() {
      var lang = this.context.state.lang;
      var tmp = {
         vi: ['Vũ khí', 'Giáp', 'Phụ kiện', 'Mũ'],
         en: ['Weapons', 'Armour', 'Acc', 'Helmet']
      }

      return (
         <div className="handbook-box pt2 mb-2">
            <h2 className="bold mt-3 mb-3">{this.context.state.displayText[lang].handbook.item.equip}</h2>
            <Table className="table-equipment">
               <thead>
                  <tr className="text-center bg-warrning">
                     <th colSpan={2} className="text-center">{lang == 'vi' ? 'Trang bị' : 'Equipment'}</th>
                     <th>{lang == 'vi' ? 'Tên Trang bị' : 'Equipment Names'}</th>
                     <th>{lang == 'vi' ? 'Sức mạnh' : 'Power'}</th>
                     <th>{lang == 'vi' ? 'Bộ hợp thành' : 'Group'}</th>
                  </tr>
               </thead>
               <tbody className="bold">
                  {equipments[0][0].map((equip, index) => {
                     let merge = equip.color + '' + equip.star;
                     return (
                        <React.Fragment key={index}>
                           <tr>
                              <td>
                                 <MaterialItem color={equipments[0][0][index].color} style={equipments[0][0][index].style} title={equipments[0][0][index].name[lang]} star={equipments[0][0][index].star} item={equipments[0][0][index].img}></MaterialItem></td>
                              <td><MaterialItem color={equipments[0][1][index].color} style={equipments[0][1][index].style} title={equipments[0][1][index].name[lang]} star={equipments[0][1][index].star} item={equipments[0][1][index].img}></MaterialItem></td>
                              <td rowSpan={2}>
                                 <div>{tmp[lang][0] + ': '}{equipments[0][0][index].name[lang]}</div>
                                 <div>{tmp[lang][1] + ': '}{equipments[0][1][index].name[lang]}</div>
                                 <div>{tmp[lang][2] + ': '}{equipments[0][2][index].name[lang]}</div>
                                 <div>{tmp[lang][3] + ': '}{equipments[0][3][index].name[lang]}</div>
                              </td>
                              <td rowSpan={2}>
                                 <div>+{equipments[0][0][index].attr.value}{' '}{equipments[0][0][index].attr.type}</div>
                                 <div>+{equipments[0][1][index].attr.value}{' '}{equipments[0][1][index].attr.type}</div>
                                 <div>+{equipments[0][2][index].attr.value}{' '}{equipments[0][2][index].attr.type}</div>
                                 <div>+{equipments[0][3][index].attr.value}{' '}{equipments[0][3][index].attr.type}</div>
                              </td>
                              {equipments[1][merge] ? (
                                 <td className="text-warning bold" rowSpan={2}>
                                    <div>{equipments[1][merge].name[lang]}</div>
                                    {equipments[1][merge].attr.map((attr, i) => {
                                       return <div key={i}>+{attr.value}{attr.unit + ' '}{attr.type}</div>
                                    })}
                                 </td>
                              ) : <td rowSpan={2}>{lang == 'vi' ? 'Không hợp thành bộ' : 'None'}</td>}
                           </tr>
                           <tr>
                              <td>
                                 <MaterialItem color={equipments[0][2][index].color} style={equipments[0][2][index].style} title={equipments[0][2][index].name[lang]} star={equipments[0][2][index].star} item={equipments[0][2][index].img}></MaterialItem>
                              </td>
                              <td>
                                 <MaterialItem color={equipments[0][3][index].color}  style={equipments[0][3][index].style} title={equipments[0][3][index].name[lang]} star={equipments[0][3][index].star} item={equipments[0][3][index].img}></MaterialItem>
                              </td>
                           </tr>
                        </React.Fragment>
                     )
                  })}

               </tbody>
            </Table>
            <Table className="table-equipment equip-3-col">
               <thead className="text-center">
                  <tr>

                     <th colSpan={3}>{this.context.state.displayText[lang].handbook.item.equip}</th>
                     <th>{lang == 'vi' ? 'Mô tả' : 'Description'}</th>
                  </tr>
               </thead>
               <tbody className="bold">
                  <tr>
                     <td><MaterialItem color={1} item={'it_equi_gen_1'}></MaterialItem></td>
                     <td><MaterialItem color={2} item={'it_equi_gen_2'}></MaterialItem></td>
                     <td><MaterialItem color={3} item={'it_equi_gen_3'}></MaterialItem></td>
                     <td rowSpan={7}>{
                        lang == 'vi' ?
                           <div>
                              Trang bị anh hùng (nhận ngẫu nhiên một trang bị vũ khí, giáp, phụ kiện, mũ)<br />
                     Tương ứng với cấp bậc của hộp
                  </div> :
                           <div>
                              Hero equipment (random parts in weapons, clothes, acc, helmet)<br />
                     Corresponds to the rank of the box
                  </div>
                     }</td>
                  </tr>
                  <tr>
                     <td><MaterialItem color={4} item={'it_equi_gen_4'}></MaterialItem></td>
                     <td><MaterialItem color={5} item={'it_equi_gen_5'}></MaterialItem></td>
                     <td><MaterialItem color={6} item={'it_equi_gen_6'}></MaterialItem></td>
                  </tr>
                  <tr>
                     <td><MaterialItem color={7} item={'it_equi_gen_7'}></MaterialItem></td>
                  </tr>
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

   equipmentStar(star) {
      star = parseInt(star);
      switch (star) {
         case 1: return (
            <div className="equipment-star star-1">
               <div className="cr_stars_1"></div>
            </div>
         );
         case 2: return (
            <div className="equipment-star star-2">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         );
         case 3: return (
            <div className="equipment-star star-3">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         )

         case 4: return (
            <div className="equipment-star star-4">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         )

         case 5: return (
            <div className="equipment-star star-5">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         );

         case 6: return (
            <div className="equipment-star star-6">
               <div className="cr_stars_2"></div>
            </div>
         );
         case 7: return (
            <div className="equipment-star star-7">
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
            </div>
         );
         case 8: return (
            <div className="equipment-star star-8">
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
            </div>
         )
         case 9: return (
            <div className="equipment-star star-9">
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
            </div>
         )
         case 10: return (
            <div className="equipment-star star-10">
               <div className="cr_stars_3"></div>
            </div>
         )
         default: return '';
      }
   }

   render() {
      return (
         <div className={"equipment-item"} title={this.props.title}>
            <div className={`cr_step_${this.props.color} equipment-bg`}></div>
            <div className={"item"} style={this.props.style ||{}}>
               <div className={this.props.item}></div>
            </div>
            <div className={`cr_it_frame_${this.props.color} equipment-frame`}></div>
            {this.equipmentStar(this.props.star)}
         </div>
      )
   }
}

HandbookEquipment.contextType = MyContext;

export default HandbookEquipment;