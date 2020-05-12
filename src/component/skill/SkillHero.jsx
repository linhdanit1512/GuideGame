import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'

import MyContext from 'MyContext';
import { Table, Button, Badge } from 'react-bootstrap';
import { encode } from '../../util/encript';
import axios from 'axios';

let gadge_color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

export default function SkillHero(props) {
   const context = useContext(MyContext);
   const lang = context.state.lang;
   const displayText = context.state.displayText[lang].skill;
   const routeLink = context.state.routeLink;

   var [selectedSkill, setSelectedSkill] = useState('');
   var [skillList, setSkillList] = useState([]);

   useEffect(() => {
      document.title = 'Hero Skill';
      getSkillList();
   }, []);

   function getSkillList() {
      axios({
         url: '/admin' + routeLink.get_skill,
         method: 'get',
         responseType: 'json'
      }).then(res => {
         if (res.data.success == true) {
            setSkillList(() => res.data.data);
         }
      }).catch(e => {
         console.error(e);
      })
   }

   var search_ref = React.createRef();
   var searchState = useState('');
   function changeFilter() {
      let search_key = search_ref.current.value;
      searchState[1](search_key)
   }

   function filterSkill() {
      let search_key = searchState[0].toLowerCase();
      return skillList.filter((item) => {
         let tmp = (item.name && (item.name[0].toLowerCase().includes(search_key)|| item.name[1].toLowerCase().includes(search_key))) ||
            (item.keyword && item.keyword.join(';').toLowerCase().includes(search_key));
         return tmp;
      });
   }

   return (
      <Table striped hover bordered size="sm" className="skill-hero">
         <thead>
            <tr>
               <th colSpan={6} className="hasinput">
                  <input className="form-control" onChange={changeFilter} ref={search_ref} type="text" placeholder={context.state.displayText[lang].nav.searchBox} />
               </th>
            </tr>
            <tr>
               <th></th>
               <th>{displayText.name}</th>
               <th>{displayText.target}</th>
               <th>{displayText.desc}</th>
               <th>{displayText.keyword}</th>
               <th></th>
            </tr>
         </thead>
         <tbody>
            {filterSkill().map((skill, index) => {
               if (skill._id) {
                  skill.id = encode(skill._id);
                  delete skill._id;
               }
               return <SkillHeroItem selectedSkill={selectedSkill} setSkill={setSelectedSkill} data={skill} key={index}></SkillHeroItem>
            })}
         </tbody>
      </Table>
   )
}


function SkillHeroItem(props) {
   const context = useContext(MyContext);
   const lang = context.state.lang;
   const skill = props.data;
   const selectedSkill = props.selectedSkill;
   const setSkill = props.setSkill;

   function setSelectedSkill() {
      setSkill(skill.img);
   }
   return (
      <tr onClick={setSelectedSkill} className={'skill-row' + selectedSkill == skill.img ? 'active' : ''}>
         <td className="no-padding grid">
            <div className="skill-item skill-item-icon">
               <div className="skill-img">
                  <div className={skill.img}></div>
               </div>
               <div className="skill-frame">
                  <div className="it_frame_artifact_4"></div>
               </div>
            </div>
         </td>
         <td className="uc-char">{skill.name instanceof Array ? (lang == 'en' ? skill.name[0] : skill.name[1]) : skill.name}</td>
         <td className="uc-first">{skill.target}</td>
         <td className="uc-first">{skill.desc instanceof Array ? (lang == 'en' ? skill.desc[0] : skill.desc[1]) : skill.desc}</td>
         <td>{skill.keyword ? skill.keyword.map((item, index) => {
            return <Badge variant={gadge_color[index % gadge_color.length]} key={index}>{item}{' '}</Badge>
         }) : ''}</td>
         <td>
            <Button variant="outline-info" size="sm" className="fa fa-info"></Button>
            <Link to={"/h/addskill/" + skill.id}><Button variant="outline-warning" size="sm" className="fa fa-edit"></Button></Link>
            <Button variant="outline-danger" size="sm" className="fa fa-trash"></Button>
         </td>
      </tr>
   );
}