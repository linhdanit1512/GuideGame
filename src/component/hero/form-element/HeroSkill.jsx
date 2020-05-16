import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Popover, OverlayTrigger } from 'react-bootstrap';
import MyContext from 'MyContext';
import SkillItem from 'SkillItem';
import axios from 'axios';

function HeroSkill(props) {
   const context = useContext(MyContext);
   const lang = context.state.lang;
   const displayText = context.state.displayText[lang].skill;
   const routeLink = context.state.routeLink

   var skillList = props.skillList;
   var setSkillList = props.setSkillList;
   const [heroSkillList, setHeroSkillList] = useState([]);

   var currentIndex = useState(-1)
   var currentSkill = useState('')

   function getSkillList() {
      axios({
         url: '/admin' + routeLink.get_skill,
         method: 'get',
         params: { lang: lang },
         responseType: 'json'
      }).then(res => {
         if (res.data.success == true) {
            setHeroSkillList(() => res.data.data);
         }
      }).catch(e => {
         console.error(e);
      })
   }

   function pushSkill() {
      setSkillList((items) => {
         return [...items, ''];
      })
   }

   function removeSkill(e) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      let index = parseInt(e.target.getAttribute('data-index'));
      setSkillList((items) => {
         return items.filter((item, i) => {
            return i !== index;
         })
      })
   }

   function setSkillItem(skill, callback) {
      if (currentIndex[0] >= 0 && currentIndex[0] < skillList.length) {

         setSkillList(items => {
            items[currentIndex[0]] = skill;
            return [...items];
         });

         if (callback) callback();
      }
   }

   function findSkill(skill) {

      let s = heroSkillList.filter((item) => {
         return item._id == skill;
      });
      if (s && s.length > 0) return s[0]; else return {};
   }


   const [showSkill, setShowSkill] = useState(false);
   const handleClose = () => setShowSkill(false);
   const handleShow = () => setShowSkill(true);

   function setIndexShowSkill(index, id) {
      currentIndex[1](index);
      currentSkill[1](id);
      handleShow();
   }

   useEffect(() => {
      getSkillList();
   }, []);

   const skillText = {
      add: {
         en: 'Add Skill',
         vi: 'Thêm kỹ năng'
      },
      close: {
         en: 'Close',
         vi: 'Đóng'
      },
      select: {
         en: 'Select',
         vi: 'Chọn'
      }

   }

   const input_search = React.createRef();
   const [filter, setFilter] = useState('');

   function getFilter() {
      return heroSkillList.filter((item) => {
         return item.name.includes(filter) || item.desc.includes(filter);
      })
   }

   function changeFilter() {
      let filter = input_search.current.value.toLowerCase();
      setFilter(filter);
   }


   return (
      <div>
         <div><h3><b>{displayText.title}</b></h3></div>
         <div className="skill-list mb-3">
            {skillList.map((item, index) => {
               let skill = findSkill(item);
               if (skill && skill._id) {
                  return (
                     <SkillItem key={index} img={skill.img} lang={lang} _id={skill._id} action={() => { setIndexShowSkill(index, skill._id); }}>
                        <i className="fa fa-times text-danger skill-remove" onClick={removeSkill} data-index={index}></i>
                     </SkillItem>
                  );
               } else {
                  return <div className={"skill-item"} key={index} onClick={() => { setIndexShowSkill(index, '') }}>
                     <div className="skill-frame">
                        <div className="it_frame_artifact_4"></div>
                     </div>
                  </div>
               }
            })}
            <div className="skill-item">
               <div>
                  <Button variant="outline-info" className={'p-3'} title={skillText.add[lang]} onClick={pushSkill}><i className={'fa fa-5x fa-plus'}></i></Button>
               </div>
            </div>

            <Modal show={showSkill} onHide={handleClose} size="lg">
               <Modal.Header closeButton>
                  <Modal.Title>{displayText.title} {currentSkill[0]!='' ? currentSkill[0] : ''} </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <input type="text" onChange={changeFilter} className="form-control mb-3" ref={input_search} />
                  {
                     getFilter().map((heroSkill, index) => {
                        return (

                           <OverlayTrigger key={'hero-skill' + index} placement="top" containerPadding={20} overlay={
                              <Popover>
                                 <Popover.Title as="h3">{heroSkill.name}</Popover.Title>
                                 <Popover.Content>
                                    {heroSkill.desc}
                                 </Popover.Content>
                              </Popover>
                           }>
                              <div onClick={() => {
                                 currentSkill[1](heroSkill._id);
                              }} className={'skill-hero-item' + (skillList.includes(heroSkill._id) || currentSkill[0] == heroSkill._id ? ' active' : '')}>
                                 <div className="skill-img">
                                    <div className={heroSkill.img}></div>
                                 </div>
                                 <div className="skill-frame">
                                    <div className="it_frame_artifact_4"></div>
                                 </div>
                              </div>
                           </OverlayTrigger>
                        )
                     })
                  }
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>{skillText.close[lang]}</Button>{' '}
                  <Button variant="outline-success" onClick={() => {
                     setSkillItem(currentSkill[0], () => {
                        handleClose();
                     });
                  }}>{skillText.select[lang]}</Button>
               </Modal.Footer>
            </Modal>
         </div>
      </div >
   )
}

export default HeroSkill;