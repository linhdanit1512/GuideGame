import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Switch, Route, Link, NavLink, useHistory, useRouteMatch, useParams } from 'react-router-dom';
import Forum from 'Forum';
import Post from 'Post';
import Navigation from "Navigation";


import AddHero from 'AddHero';
import HeroDetail from 'HeroDetail';
import HeroList from 'HeroList';
import HeroGallery from 'HeroGallery';
import Home from 'Home';
import MyProvider from 'MyProvider';
import SkillGallery from 'SkillGallery';
import SkillForm from 'SkillForm';
import SkillHero from 'SkillHero';
import TeamBox from 'TeamBox';
import HeroListDB from 'HeroListDB';
import CalculatorLevel from 'CalculatorLevel';
import CalculatorRune from 'CalculatorRune';
import HandbookMaterial from 'HandbookMaterial';
import HandbookEquipment from 'HandbookEquipment';


export default class Main extends Component {
   constructor(props) {
      super(props);
      this.inputSearch = React.createRef();
   }

   componentDidMount() {
      document.title = 'Summon Princess';

      var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = './images/favicon/logo.jpg';
      document.getElementsByTagName('head')[0].appendChild(link);
   }

   render() {
      return (
         <MyProvider>
            <HashRouter history={useHistory}>
               <Navigation></Navigation>
               <div className="container-lg container-md">
                  <Switch>
                     <Route path="/" exact={true}><Home></Home></Route>
                     <Route path="/post"><Post></Post></Route>
                     <Route path="/forum"><Forum></Forum></Route>
                     {/** Handbook */}
                     <Route path="/h/heroes"><HeroGallery ></HeroGallery></Route>
                     <Route path="/h/hero/:slug"><HeroDetail></HeroDetail></Route>
                     <Route path="/h/addhero/:slug" component={AddHero}></Route>
                     <Route path="/h/skills"><SkillGallery></SkillGallery></Route>
                     <Route path="/h/addskill/:skill"><SkillForm></SkillForm></Route>
                     <Route path="/list/skill"><SkillHero></SkillHero></Route>
                     <Route path="/list/heroes"><HeroListDB></HeroListDB></Route>
                     <Route path="/h/battle"><TeamBox></TeamBox></Route>
                     <Route path="/h/guild"><TeamBox></TeamBox></Route>
                     <Route path="/c/level" component={CalculatorLevel}></Route>
                     <Route path="/c/rune" component={CalculatorRune}></Route>
                     <Route path="/h/material" component={HandbookMaterial}></Route>
                     <Route path="/h/equipment" component={HandbookEquipment}></Route>
                  </Switch>
               </div>
            </HashRouter>
         </MyProvider>
      );
   }
}