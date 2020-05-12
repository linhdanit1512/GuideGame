import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Button, Form, InputGroup, Modal, Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TagsInput from 'react-tagsinput';

import axios from 'axios';

import MyContext from 'MyContext';
import HeroExtend from 'HeroExtend';
import HeroGallery from 'HeroGallery';

export default function AddHero(props) {
   const context = useContext(MyContext);
   const params = useParams();
   const lang = context.state.lang;
   const displayText = context.state.displayText[context.state.lang].form.hero;
   const routeLink = context.state.routeLink;
   var heroID = useState('');
   var updateInfo = useState({
      vote: null,
      use: null,
      difficult: null,
      keyword: null,
      _id: null,
      name: null,
      slug: null,
      elemental: 0,
      regency: 0,
      princessLevels: null,
      comments: null,
   });


   var refs_form = {
      name: React.createRef(),
      slug: React.createRef(),
      elemental: React.createRef(),
      regency: React.createRef(),
   }

   var form_state = {
      name: useState(''),
      elemental: useState(''),
      regency: useState(''),
      keyword: useState([])
   }

   var [heroList, setHeroList] = useState([]);

   const elementals = context.state.displayText[context.state.lang].elemental;
   const regencies = context.state.displayText[context.state.lang].regency;

   function setName() {
      let name = refs_form.name.current.value;
      form_state.name[1](name);
   }

   function setElemental() {
      let elemental = parseInt(refs_form.elemental.current.value);
      form_state.elemental[1](elemental);
   }

   function setRegency() {
      let regency = parseInt(refs_form.regency.current.value);
      form_state.regency[1](regency);

   }

   function addExtend() {
      pushToHeroList({});
   }

   function pushToHeroList(data, index) {
      if (data) {
         if (index !== undefined) {
            if (index < heroList.length && index >= 0) {
               setHeroList(items => {
                  items[index] = data;
                  return [...items];
               })
            }
         } else {
            setHeroList(items => [...items, data]);
         }
      }
   }

   function removeToHeroList(index) {
      if (index >= 0 && index < heroList.length) {
         setHeroList(items => {
            return items.filter((item, i) => i !== index);
         });
      }
   }

   const [showGallery, setShowGallery] = useState(false);
   const handleClose = () => setShowGallery(false);
   const handleShow = () => setShowGallery(true);
   const [heroGalleryIndex, setHeroGalleryIndex] = useState(-1);
   const [selectedHeroGallery, setSelectedHeroGallery] = useState('');

   function setHeroAvatar(avt) {
      if (heroGalleryIndex !== undefined && heroGalleryIndex >= 0 && heroGalleryIndex < heroList.length) {
         setHeroList(items => {
            items[heroGalleryIndex].avt = avt;
            setSelectedHeroGallery(avt);
            document.getElementsByName('avt' + heroGalleryIndex)[heroGalleryIndex].value = avt;
            checkHeroExistByImage(heroGalleryIndex);
            return items;
         });
         handleClose();
      }
   }

   function checkHeroExistByImage(index) {
      var img = document.getElementsByName('avt' + heroGalleryIndex)[heroGalleryIndex].value
      if (img == '') return;
      let data = { avt: img };
      if (heroID[0] !== '' && heroID[0] !== undefined) {
         data._id = heroID[0];
      }
      axios({
         url: '/admin' + routeLink.check_princess_exist_image,
         data: data,
         method: 'post'
      }).then(res => {
         if(res.data && res.data._id && res.data._id != data._id){
            context.showNotify('hero_exist', 'Check Princess Exist');
            setHeroAvatar('');
         }
      }).catch(e => {
         console.error(e);
      })


   }

   function setFormData(data, callback) {
      if (data) {
         for (let key in data) {
            if (document.getElementsByName(key)[0]) {
               document.getElementsByName(key)[0].value = data[key];
            }
         }

         form_state.name[1](data.name);
         form_state.elemental[1](data.elemental);
         form_state.regency[1](data.regency);

         if (data.keyword)
            form_state.keyword[1](items => data.keyword);
         if (data.princessLevels) {
            setHeroList(data.princessLevels);
         }
         if (callback) callback();
      }
   }

   function getFormData() {
      let data = {};
      for (let item in refs_form) {
         data[item] = refs_form[item].current.value;
      }

      if (!data.name) {
         data.name = (Math.random()).toString().substring(2, 10);
      }

      if (data.slug == '' || data.slug == undefined) {
         data.slug = data.name.toLowerCase().replace(/ /g, '-');
      }

      data.keyword = form_state.keyword[0];

      if (!data.keyword || data.keyword.length == 0) {
         data.keyword = [data.name, regencies[data.regency], elementals[data.elemental]]
      }

      data.princessLevel = heroList;

      let url = routeLink.add_princess;
      if (updateInfo[0]._id) {
         data._id = updateInfo[0]._id;
         url = routeLink.update_princess;
      }

      axios({
         url: '/admin' + url,
         method: 'post',
         responseType: 'json',
         data: data
      }).then(res => {
         if (res.data.success) {
            context.showNotify((data._id ? 'update' : 'add') + '_success');
         }else{
            context.showNotify('request_failure');
         }
      }).catch(e => {
         console.error(e);
      })

   }

   useEffect(() => {
      let defaultData = {
         elemental: 1,
         regency: 1,
         name: ''
      }
      if (params.slug && params.slug != 0 && params.slug !== '0') {
         context.waiting();
         axios({
            method: 'post',
            url: '/admin' + routeLink.get_princess,
            data: params,
            responseType: 'json'
         }).then(res => {
            if (res.data.data) {
               setFormData(res.data.data, function () {
                  heroID[1](res.data.data._id);
                  updateInfo[1](res.data.data);
                  context.waiting();
               });
               document.title = 'Update Hero';
            } else {
               context.waiting();
               setFormData(defaultData);
               document.title = 'Add Hero';
            }
         }).catch(e => {
            context.waiting();
            setFormData(defaultData);
            document.title = 'Add Hero';
         })

      } else {
         setFormData(defaultData);
         document.title = 'Add Hero';
      }
   }, []);

   return (

      <Form className="form hero-form" method="post" >
         <Container>
            <Row>
               <Col md={6}>
                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text id="h_name">{displayText['name']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control ref={refs_form.name} name="name" type="text" placeholder={displayText['name']} onChange={setName} aria-label={displayText['name']} aria-describedby="h_name" />
                  </InputGroup>

                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text id="h_regency">{displayText['regency']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control as="select" ref={refs_form.regency} name="regency" onChange={setRegency} placeholder={displayText['regency']} aria-label={displayText['regency']} aria-describedby="h_regency">
                        {Object.keys(regencies).map((item) => {
                           return <option value={item} key={item}>{regencies[item]}</option>
                        })}
                     </Form.Control>
                  </InputGroup>

                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text id="h_elemental">{displayText['elemental']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control ref={refs_form.elemental} as="select" onChange={setElemental} name="elemental" placeholder={displayText['elemental']} aria-label={displayText['elemental']} aria-describedby="h_elemental">
                        {Object.keys(elementals).map((item) => {
                           return <option value={item} key={item}>{elementals[item]}</option>
                        })}
                     </Form.Control>
                  </InputGroup>
               </Col>
               <Col md={6}>
                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text id="h_slug">{displayText['slug']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control ref={refs_form.slug} type="text" name="slug" placeholder={displayText['slug']} aria-label={displayText['slug']} aria-describedby="h_slug" />
                  </InputGroup>

                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text id="h_keyword">{displayText['keyword']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <TagsInput
                        value={form_state.keyword[0]}
                        onChange={(tags) => { form_state.keyword[1](tags) }}
                        /*
                        9: tab
                        13: enter
                        188: ,
                        186: ;
                        */
                        addKeys={[9, 13, 188, 186]}
                        onlyUnique={true}
                        className={'hasinput react-tagsinput-margin'}
                        inputProps={{
                           className: 'react-tagsinput-input',
                           placeholder: displayText['keyword'],
                        }}
                        tagProps={{
                           className: 'react-tagsinput-tag badge-info',
                           classNameRemove: 'react-tagsinput-remove'
                        }}
                     />
                  </InputGroup>
               </Col>
            </Row>
            {heroList.map((item, index) => {
               return <HeroExtend
                  key={index}
                  index={index}
                  data={item}
                  avt={heroList[index].avt}
                  elemental={form_state.elemental[0]}
                  regency={form_state.regency[0]}

                  setHeroGalleryIndex={setHeroGalleryIndex}
                  showGallery={handleShow}
                  hideGallery={handleClose}

                  pushData={pushToHeroList}
                  removeData={removeToHeroList}
               ></HeroExtend>
            })}
            <div>
               <Button variant="outline-info" onClick={addExtend} className="fa fa-plus fa-3x"></Button>{' '}
            </div>
            <div className="text-right">
               <Button onClick={getFormData} variant="outline-success">{displayText['submit']}</Button>{' '}
            </div>
         </Container>

         <Modal show={showGallery} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>{displayText.avt}: <b>{selectedHeroGallery}</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <HeroGallery hideFilter={true} action={setHeroAvatar} elemental={form_state.elemental[0]} regency={form_state.regency[0]} selectedHero={selectedHeroGallery}></HeroGallery>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>Close</Button>{' '}
               <Button variant="outline-success" onClick={handleClose}>Select</Button>
            </Modal.Footer>
         </Modal>
      </Form>
   )
}