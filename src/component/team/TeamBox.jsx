import React, { Component } from 'react';

import { Container, Row } from 'react-bootstrap';
import MyContext from 'MyContext';

import TeamBoxForm from 'TeamBoxForm';
import TeamFighter from 'TeamFighter';

export default class TeamBox extends Component {
   constructor(props, context) {
      super(props, context);
      this.state = {
         hero_state: [{}, {}, {}, {}, {}, {}],
         legal: [0, 0, 0, 0, 0, 0]
      }
   }

   getTeamBattle(){
      return this.state.hero_state;
   }

   /**
    hero_state item: img, level, star, regency, elemental
    */

   updateLegalAtIndex(data, index) {
      this.state.legal[index] = data;
      this.setState(this.state);
   }

   updateHeroTeam(data, index) {
      this.state.hero_state[index] = data;
      this.setState(this.state);
   }

   getLegalString() {
      let result = this.state.legal.join('_');
      return result;
   }
   componentDidMount() {
      document.title = "Team Box";
   }

   render() {
      return (
         <div className="team-box">
            <MyContext.Consumer>
               {({ state }) => {
                  const lang = state.lang;
                  const displayText = state.displayText[lang].form.team;
                  return (
                     <Container>
                        <TeamFighter front={displayText.front} back={displayText.back} hero={this.state.hero_state} legal={this.getLegalString()}></TeamFighter>
                        <Row className="mb-3">
                           <TeamBoxForm data={this.state.hero_state[0]} index={0} updateLegal={this.updateLegalAtIndex.bind(this)} updateData={this.updateHeroTeam.bind(this)}></TeamBoxForm>
                           <TeamBoxForm data={this.state.hero_state[1]} index={1} updateLegal={this.updateLegalAtIndex.bind(this)} updateData={this.updateHeroTeam.bind(this)}></TeamBoxForm>
                           <TeamBoxForm data={this.state.hero_state[2]} index={2} updateLegal={this.updateLegalAtIndex.bind(this)} updateData={this.updateHeroTeam.bind(this)}></TeamBoxForm>
                           <TeamBoxForm data={this.state.hero_state[3]} index={3} updateLegal={this.updateLegalAtIndex.bind(this)} updateData={this.updateHeroTeam.bind(this)}></TeamBoxForm>
                           <TeamBoxForm data={this.state.hero_state[4]} index={4} updateLegal={this.updateLegalAtIndex.bind(this)} updateData={this.updateHeroTeam.bind(this)}></TeamBoxForm>
                           <TeamBoxForm data={this.state.hero_state[5]} index={5} updateLegal={this.updateLegalAtIndex.bind(this)} updateData={this.updateHeroTeam.bind(this)}></TeamBoxForm>
                        </Row>
                     </Container>
                  )
               }}
            </MyContext.Consumer>
         </div>
      )
   }
}