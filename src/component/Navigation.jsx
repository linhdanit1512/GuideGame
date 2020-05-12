import React, { useContext, useRef } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import MyContext from 'MyContext';
import { Navbar, Nav, Button, Form, NavDropdown } from 'react-bootstrap';

import Logo from 'Logo';

function Navigation() {

   const value = useContext(MyContext);
   const inputSearch = useRef();
   const changeLang = useRef();

   function changeLanguage() {
      let lang = changeLang.current.value;
      value.updateProvider('lang', lang);
   }

   let displayText = value.state.displayText[value.state.lang].nav;
   return (
      <Navbar bg="dark" expand="lg" variant="dark">
         <Navbar.Brand><Link to="/"><Logo /></Link></Navbar.Brand>
         <Navbar.Toggle aria-controls="menubar" />
         <Navbar.Collapse id="menubar">
            <Nav className="mr-auto">
               <NavLink exact={true} className="nav-link" to="/" activeClassName="active">{displayText.index}</NavLink>
               <NavLink className="nav-link" to="/forum" activeClassName="active">{displayText.forum}</NavLink>
               <NavLink className="nav-link" to="/post" activeClassName="active">{displayText.post}</NavLink>
               <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/h/addhero/0">Add Hero</NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                  <NavDropdown.Item href="#/h/addskill/0">Add Skill</NavDropdown.Item>
               </NavDropdown>
               <NavDropdown title="List" id="listDropdown">
                  <NavDropdown.Item href="#/list/skill">Skill</NavDropdown.Item>
                  <NavDropdown.Item href="#/list/heroes">Princess</NavDropdown.Item>
               </NavDropdown>
            </Nav>
            <Form inline className="my-2 my-lg-0">
               <Form.Control as="select" ref={changeLang} onChange={changeLanguage}>
                  <option value="en">English</option>
                  <option value="vi">Tiếng Việt</option>
               </Form.Control>
               <Form.Control type="text" ref={inputSearch} type="text" placeholder={displayText.searchBox} />
               <Button variant="outline-success">{displayText.searchBtn}</Button>
            </Form>
         </Navbar.Collapse>
      </Navbar>
   );
}

export default connect((state) => {
   return { lang: state.appLanguage }
})(Navigation)
