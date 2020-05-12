import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Form, Button, InputGroup, FormControl, Modal, Container, Table } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';

import SkillList from 'SkillList';
import SkillItem from 'SkillItem';
import Keyword from 'Keyword';

import axios from 'axios';
import MyContext from 'MyContext';

export default function SkillForm() {
   var { skill } = useParams();
   const context = useContext(MyContext);
   const routeLink = context.state.routeLink;
   var references = {
      nameEN: React.createRef(),
      nameVI: React.createRef(),
      type: React.createRef(),
      img: React.createRef(),
      level: React.createRef(),
      target: React.createRef(),
      nEnemies: React.createRef(),
      descEN: React.createRef(),
      descVI: React.createRef()
   }
   var affects = {
      name: React.createRef(),
      value: React.createRef(),
      unit: React.createRef(),
      target: React.createRef(),
   }

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [image, setImage] = useState('');
   const [skillTable, setSkillTable] = useState(new Array());
   const [update_id, setUpdateData] = useState('');
   const keyword_state = useState([]);

   function setSkillImage(img) {
      references.img.current.value = img;
      setImage(img);
      handleClose();
   }

   function getSkillData() {
      if (skill !== undefined && skill !== 0 && skill !== '0') {
         axios({
            url: '/admin' + routeLink.get_skill + '/' + skill,
            method: 'get',
            responseType: 'json'
         }).then(res => {
            if (res.data.success == true) {
               let data = res.data.data;
               for (let key in data) {
                  if (references[key]) {
                     references[key].current.value = data[key];
                  }
               }
               if (data.desc && data.desc.length > 0) {
                  if (data.desc instanceof Array) {
                     references.descEN.current.value = data.desc[0];
                     if (data.desc[1]) {
                        references.descVI.current.value = data.desc[1];
                     }
                  }
               }

               if (data.name && data.name.length > 0) {
                  if (data.name instanceof Array) {
                     references.nameEN.current.value = data.name[0];
                     if (data.name[1]) {
                        references.nameVI.current.value = data.name[1];
                     }
                  } else if (typeof data.name == 'string') {
                     references.nameEN.current.value = data.name;

                  }
               }
               setUpdateData(data._id);
               setImage(data.img);
               if (data.affect) {
                  setSkillTable(items => [...items, ...data.affect]);
               }
               if (data.keyword) {
                  keyword_state[1](data.keyword);
               }
            }
         }).catch(e => {
            console.error(e);
         })
      }
   }

   function pushDataTable() {
      let data = {};
      for (let item in affects) {
         data[item] = affects[item].current.value;
         affects[item].current.value = '';
      }
      setSkillTable(items => [...items, data]);
   }
   useEffect(() => {
      document.title = 'Skill ';
      getSkillData()
   }, []);

   function removeDataTable(e) {
      var index = e.target.getAttribute('index');
      setSkillTable(items => {
         let result = items.filter((item, i) => i != index);
         return result;
      });
   }

   function getFormData() {
      let data = {};
      for (let item in references) {
         data[item] = references[item].current.value;
      }

      data.img = image;
      data.affect = skillTable;
      data.keyword = keyword_state[0];

      data.desc = [references.descEN.current.value, references.descVI.current.value];
      data.name = [references.nameEN.current.value, references.nameVI.current.value];
      var url = '/admin' + routeLink.add_skill;

      if (update_id && update_id.length > 5) {
         data._id = skill;
         url = '/admin' + routeLink.update_skill;
      }

      delete data.descEN;
      delete data.descVI;
      delete data.nameEN;
      delete data.nameVI;

      axios[url.includes(routeLink.update_skill) ? 'put' : 'post'](url, data).then((res) => {
         alert('Success')
      }).catch(e => {
         alert('Failure')
         console.error(e);
      })
   }

   return (
      <>
         <Form method="post" className="form skill-form">
            <Container>
               <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                     <InputGroup.Text id="lblName">Name</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type="text" ref={references.nameEN} placeholder="Name EN" aria-label="Name" aria-describedby="lblName" />
                  <FormControl type="text" ref={references.nameVI} placeholder="Name VI" aria-label="Name" aria-describedby="lblName" />
               </InputGroup>

               <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                     <InputGroup.Text id="lblType">Type</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control as="select" ref={references.type} aria-label="Type" aria-describedby="lblType">
                     {['poison', 'armors', 'attack', 'defend', 'crit', 'critDmg', 'dodge', 'skilldmg', 'health', 'control', 'other'].map((value, index) => {
                        return <option value={value} key={index}>{value.toUpperCase()}</option>
                     })}
                  </Form.Control>

               </InputGroup>

               <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                     <InputGroup.Text id="lblImage">Image</InputGroup.Text>
                  </InputGroup.Prepend>
                  <SkillItem img={image} action={handleShow}></SkillItem>
                  <FormControl className={'hidden'} type="text" ref={references.img} placeholder="Image" aria-label="Image" aria-describedby="lblImage" />
               </InputGroup>

               <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                     <InputGroup.Text id="lblLevel">Level</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control as="select" ref={references.level} aria-label="Level" aria-describedby="lblLevel">
                     <option value="1">1</option>
                     <option value="1">2</option>
                     <option value="1">3</option>
                  </Form.Control>
               </InputGroup>

               <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                     <InputGroup.Text id="lblName">Target</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control as="select" ref={references.target} placeholder="Target" aria-label="Target" aria-describedby="lblTarget">
                     <option value="back">Back Row</option>
                     <option value="front">Front Row</option>
                     <option value="random">Random</option>
                     <option value="single">Single</option>
                     <option value="all">All</option>
                     <option value="Itseft">Itseft</option>
                  </Form.Control>
               </InputGroup>

               <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                     <InputGroup.Text id="lblEnemies">Enemy Quantity</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control as="select" ref={references.nEnemies} placeholder="Enemies" aria-label="Enemies" aria-describedby="lblEnemies">
                     {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                        return <option value={value} key={value}>{value}</option>
                     })}
                  </Form.Control>
               </InputGroup>

               <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                     <InputGroup.Text id="lblDescription">Description</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl as="textarea" ref={references.descEN} placeholder="Description EN" aria-label="Description" aria-describedby="lblDescription" />
                  <FormControl as="textarea" ref={references.descVI} placeholder="Description VI" aria-label="Description" aria-describedby="lblDescription" />
               </InputGroup>

               <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                     <InputGroup.Text id="lblKeyword">Keyword</InputGroup.Text>
                  </InputGroup.Prepend>
                  <TagsInput
                     value={keyword_state[0]}
                     onChange={(tags) => { keyword_state[1](tags) }}
                     /**
                      suggest
                      */
                     suggestions={Keyword}
                     shouldRenderSuggestions={(value) => value && value.trim().length > 0}
                     getSuggestionValue={(suggestion) => suggestion}
                     renderSuggestion={(suggestion) => <span>{suggestion}</span>}
                     onSuggestionSelected={(e, { suggestion }) => {
                        addTag(suggestion)
                     }}
                     onSuggestionsClearRequested={() => { }}
                     onSuggestionsFetchRequested={() => { }}
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
                        placeholder: 'Keyword',
                     }}
                     tagProps={{
                        className: 'react-tagsinput-tag badge-info',
                        classNameRemove: 'react-tagsinput-remove'
                     }}
                  />
               </InputGroup>

               <Table striped bordered hover size="sm" className="mb-3 input-table" id={'table-skill-attr'}>
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Unit</th>
                        <th>Target</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {skillTable.map((item, index) => {
                        return (
                           <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.value}</td>
                              <td>{item.unit}</td>
                              <td>{item.target == '1' ? 'Friend' : item.target == '2' ? 'Enemy' : 'Itself'}</td>
                              <td><Button variant="outline-danger" size="sm" className="fa fa-trash" index={index} onClick={removeDataTable}></Button></td>
                           </tr>
                        )
                     })}
                  </tbody>
                  <tfoot>
                     <tr>
                        <td className="hasinput"><FormControl ref={affects.name} type="text" placeholder="name" /></td>
                        <td className="hasinput"><FormControl ref={affects.value} type="text" placeholder="value" /></td>
                        <td className="hasinput"><FormControl ref={affects.unit} type="text" placeholder="unit" /></td>
                        <td className="hasinput">
                           <Form.Control as="select" ref={affects.target}>
                              <option value="2">Enemy</option>
                              <option value="1">Friend</option>
                              <option value="3">Itself</option>
                           </Form.Control>
                        </td>
                        <td><Button variant="outline-success" onClick={pushDataTable}>Push</Button></td>
                     </tr>
                  </tfoot>
               </Table>



               <div className="text-right">
                  <Button variant="outline-dark">Cancel</Button>{' '}
                  <Button variant="outline-warning" type="reset"><i className="fa fa-refresh"></i> Reset</Button>{' '}
                  <Button variant="success" onClick={getFormData}><i className="fa fa-save"></i> Submit</Button>{' '}
               </div>
            </Container>
         </Form>
         <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>Select Skill Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div>
                  <SkillList action={setSkillImage}></SkillList>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>Close</Button>{' '}
               <Button variant="outline-success" onClick={handleClose}>Select</Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}
