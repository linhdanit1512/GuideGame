import React, { useContext, useState, useEffect, useCallback, Component } from 'react';
import { Button, Form, InputGroup, Modal, Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TagsInput from 'react-tagsinput';

import axios from 'axios';

import MyContext from 'MyContext';
import HeroExtend from 'HeroExtend';
import HeroGallery from 'HeroGallery';

class AddHero extends Component {
   constructor(props) {
      super(props);
      this.state = {
         heroID: '',
         updateInfo: {},
         form_state: {
            name: '',
            eleemental: '',
            regency: '',
            keyword: []
         },
         heroList: [],
         showGallery: false,
         heroGalleryIndex: -1,
         selectedHeroGallery: ''

      }
      this.refs_form = {
         name: React.createRef(),
         slug: React.createRef(),
         elemental: React.createRef(),
         regency: React.createRef(),
      }
      this.params = this.props.match.params;
   }

   setName() {
      let name = this.refs_form.name.value;
      this.state.form_state.name = name;
      this.setState(this.state);
   }

   setElemental() {
      let elemental = parseInt(this.refs_form.elemental.value);
      this.state.form_state.elemental = elemental;
      this.setState(this.state);
   }

   setRegency() {
      let regency = parseInt(this.refs_form.regency.value);
      this.form_state.regency = regency;
      this.setState(this.state);
   }

   addExtend() {
      this.pushToHeroList({});
   }

   pushToHeroList(data, index) {
      if (data) {
         if (index !== undefined) {
            if (index < this.state.heroList.length && index >= 0) {
               this.state.heroList[index] = data;
               this.setState(this.state);
            }
         } else {
            this.state.heroList.push(data);
            this.setState(this.state);
         }
      }
   }

   removeToHeroList(index) {
      if (index >= 0 && index < this.state.heroList.length) {
         this.state.heroList.splice(index, 1);
         this.setState(this.state);
      }
   }

   handleClose() {
      this.state.showGallery = false;
      this.setState(this.state);
   }
   handleShow() {
      this.state.showGallery = true;
      this.setState(this.state);
   }

   setHeroAvatar(avt) {
      if (this.state.heroGalleryIndex !== undefined && this.state.heroGalleryIndex >= 0 && this.state.heroGalleryIndex < this.state.heroList.length) {
         this.state.heroList[this.state.heroGalleryIndex].avt = avt;

         this.state.heroList[this.state.heroGalleryIndex].avt = avt;
         document.getElementsByName('avt' + this.state.heroGalleryIndex)[this.state.heroGalleryIndex].value = avt;
         this.checkHeroExistByImage(this.state.heroGalleryIndex);
         this.handleClose();
         this.setState(this.state);
      }
   }

   checkHeroExistByImage(index) {
      var img = document.getElementsByName('avt' + this.state.heroGalleryIndex)[this.state.heroGalleryIndex].value
      if (img == '') return;
      let data = { avt: img };
      if (this.state.heroID !== '' && this.state.heroID !== undefined) {
         data._id = this.state.heroID;
      }
      axios({
         url: '/admin' + this.routeLink.check_princess_exist_image,
         data: data,
         method: 'post'
      }).then(res => {
         if (res.data && res.data._id && res.data._id != data._id) {
            this.context.showNotify('hero_exist', 'Check Princess Exist');
            this.setHeroAvatar('');
         }
      }).catch(e => {
         console.error(e);
      })


   }

   setFormData(data, callback) {
      if (data) {
         for (let key in data) {
            if (document.getElementsByName(key)[0]) {
               document.getElementsByName(key)[0].value = data[key];
            }
         }

         this.state.form_state.name = data.name;
         this.state.form_state.elemental = data.elemental;
         this.state.form_state.regency = data.regency;

         if (data.keyword)
            this.state.form_state.keyword = data.keyword;
         if (data.princessLevels) {
            this.heroList = data.princessLevels;
         }
         this.setState(this.state);
         if (callback) callback();
      }
   }

   getFormData() {
      let data = {};
      for (let item in this.refs_form) {
         data[item] = this.refs_form[item].value;
      }

      if (!data.name) {
         data.name = (Math.random()).toString().substring(2, 10);
      }

      if (data.slug == '' || data.slug == undefined) {
         data.slug = data.name.toLowerCase().replace(/ /g, '-');
      }

      data.keyword = this.state.form_state.keyword;

      if (!data.keyword || data.keyword.length == 0) {
         data.keyword = [data.name, regencies[data.regency], elementals[data.elemental]]
      }

      data.princessLevel = this.state.heroList;

      let url = this.routeLink.add_princess;
      if (this.state.updateInfo._id) {
         data._id = this.state.updateInfo._id;
         url = this.routeLink.update_princess;
      }

      axios({
         url: '/admin' + url,
         method: 'post',
         responseType: 'json',
         data: data
      }).then(res => {
         if (res.data.success) {
            this.context.showNotify((data._id ? 'update' : 'add') + '_success');
         } else {
            this.context.showNotify('request_failure');
         }
      }).catch(e => {
         console.error(e);
      })

   }

   componentDidMount() {
      this.routeLink = this.context.state.routeLink;

      let defaultData = {
         elemental: 1,
         regency: 1,
         name: ''
      }
      if (this.params.slug && this.params.slug != 0 && this.params.slug !== '0') {
         this.context.waiting();
         axios({
            method: 'post',
            url: '/admin' + this.routeLink.get_princess,
            data: this.params,
            responseType: 'json'
         }).then(res => {
            if (res.data.data) {
               this.setFormData(res.data.data, function () {
                  this.state.heroID = res.data.data._id;
                  this.state.updateInfo = res.data.data;
                  this.context.waiting();
               });
               document.title = 'Update Hero';
            } else {
               this.context.waiting();
               this.setFormData(defaultData);
               document.title = 'Add Hero';
            }
         }).catch(e => {
            this.context.waiting();
            this.setFormData(defaultData);
            document.title = 'Add Hero';
         })

      } else {
         this.setFormData(defaultData);
         document.title = 'Add Hero';
      }
   }

   render() {
      const lang = this.context.state.lang;
      const displayText = this.context.state.displayText[lang].form.hero;
      const elementals = this.context.state.displayText[lang].elemental;
      const regencies = this.context.state.displayText[lang].regency;
      return (

         <Form className="form hero-form" method="post" >
            <h2 className="mb-3 mt-3">Add Princess</h2>
            <Row>
               <Col md={6}>
                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text id="h_name">{displayText['name']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control ref={this.refs_form.name} name="name" type="text" placeholder={displayText['name']} onChange={this.setName.bind(this)} aria-label={displayText['name']} aria-describedby="h_name" />
                  </InputGroup>

                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text id="h_regency">{displayText['regency']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control as="select" ref={this.refs_form.regency} name="regency" onChange={this.setRegency.bind(this)} placeholder={displayText['regency']} aria-label={displayText['regency']} aria-describedby="h_regency">
                        {Object.keys(regencies).map((item) => {
                           return <option value={item} key={item}>{regencies[item]}</option>
                        })}
                     </Form.Control>
                  </InputGroup>

                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text id="h_elemental">{displayText['elemental']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control ref={this.refs_form.elemental} as="select" onChange={this.setElemental.bind(this)} name="elemental" placeholder={displayText['elemental']} aria-label={displayText['elemental']} aria-describedby="h_elemental">
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
                     <Form.Control ref={this.refs_form.slug} type="text" name="slug" placeholder={displayText['slug']} aria-label={displayText['slug']} aria-describedby="h_slug" />
                  </InputGroup>

                  <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                        <InputGroup.Text id="h_keyword">{displayText['keyword']}</InputGroup.Text>
                     </InputGroup.Prepend>
                     <TagsInput
                        value={this.state.form_state.keyword}
                        onChange={(tags) => { this.state.form_state.keyword = tags; this.setState(this.state) }}
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
            {this.state.heroList.map((item, index) => {
               return <HeroExtend
                  key={index}
                  index={index}
                  data={item}
                  avt={this.state.heroList[index].avt}
                  elemental={this.state.form_state.elemental}
                  regency={this.state.form_state.regency}
                  setHeroGalleryIndex={(data) => { this.state.heroGalleryIndex = data; this.setState(this.state); }}
                  showGallery={this.handleShow.bind(this)}
                  hideGallery={this.handleClose.bind(this)}

                  pushData={this.pushToHeroList.bind(this)}
                  removeData={this.removeToHeroList.bind(this)}
               ></HeroExtend>
            })
            }
            <div>
               <Button variant="outline-info" onClick={this.addExtend.bind(this)} className="fa fa-plus fa-3x"></Button>{' '}
            </div>
            <div className="text-right">
               <Button onClick={this.getFormData.bind(this)} variant="outline-success">{displayText['submit']}</Button>{' '}
            </div>

            <Modal show={this.state.showGallery} onHide={this.handleClose.bind(this)} size="lg">
               <Modal.Header closeButton>
                  <Modal.Title>{displayText.avt}: <b>{this.state.selectedHeroGallery}</b></Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <HeroGallery hideFilter={true} action={this.setHeroAvatar.bind(this)} elemental={this.state.form_state.elemental} regency={this.state.form_state.regency} selectedHero={this.state.selectedHeroGallery}></HeroGallery>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose.bind(this)}>Close</Button>{' '}
                  <Button variant="outline-success" onClick={this.handleClose.bind(this)}>Select</Button>
               </Modal.Footer>
            </Modal>
         </Form >
      )
   }
}
AddHero.contextType = MyContext;

export default AddHero;