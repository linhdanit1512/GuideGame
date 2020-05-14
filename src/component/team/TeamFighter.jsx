import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import TeamBoxItem from 'TeamBoxItem';
import LegalBattle from 'LegalBattle';
export default class TeamFighter extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <Row className="mb-3 justify-content-md-center">
            <Col md={7} lg={5}>
               <div className="team-troop">
                  <div className="team-position">{this.props.front || 'Front'}</div>
                  <div className="team-hero-front">
                     <TeamBoxItem data={this.props.hero[0] || {}}></TeamBoxItem>
                     <TeamBoxItem data={this.props.hero[1] || {}}></TeamBoxItem>
                     <TeamBoxItem data={this.props.hero[2] || {}}></TeamBoxItem>
                  </div>
               </div>
               <div className="team-troop">
                  <div className="team-position">{this.props.back || 'Back'}</div>
                  <div className="team-hero-back">
                     <TeamBoxItem data={this.props.hero[3] || {}}></TeamBoxItem>
                     <TeamBoxItem data={this.props.hero[4] || {}}></TeamBoxItem>
                     <TeamBoxItem data={this.props.hero[5] || {}}></TeamBoxItem>
                  </div>
               </div>
            </Col>
            <Col md={4}>
               <LegalBattle data={this.props.legal || '0_0_0_0_0_0'} id="legal_battle"></LegalBattle>
               {this.props.children}
            </Col>
         </Row>
      )
   }
}