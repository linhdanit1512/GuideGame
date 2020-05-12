import React, { PureComponent } from 'react'

export default class HeroItem extends PureComponent {
   constructor(props) {
      super(props);
   }

   heroBackground(star) {
      star = parseInt(star);
      switch (star) {
         case 1: return (<div className="cr_step_1 hero-background"></div>);
         case 2: return (<div className="cr_step_2 hero-background"></div>);
         case 3: return (<div className="cr_step_3 hero-background"></div>);
         case 4: return (<div className="cr_step_4 hero-background"></div>);
         case 5: return (<div className="cr_step_5 hero-background"></div>);
         case 6:
         case 7:
         case 8:
         case 9: return (<div className="cr_step_6 hero-background"></div>);
         case 10: return (<div className="cr_step_7 hero-background"></div>);
         default: return '';
      }
   }

   heroFrame(star) {
      star = parseInt(star);
      switch (star) {
         case 1: return (<div className="cr_it_frame_1 hero-frame"></div>);
         case 2: return (<div className="cr_it_frame_2 hero-frame"></div>);
         case 3: return (<div className="cr_it_frame_3 hero-frame"></div>);
         case 4: return (<div className="cr_it_frame_4 hero-frame"></div>);
         case 5: return (<div className="cr_it_frame_5 hero-frame"></div>);
         case 6:
         case 7:
         case 8:
         case 9: return (<div className="cr_it_frame_6 hero-frame"></div>);
         case 10: return (<div className="cr_it_frame_7 hero-frame"></div>);
         default: return '';
      }
   }

   heroStar(star) {
      star = parseInt(star);
      switch (star) {
         case 1: return (
            <div className="hero-star star-1">
               <div className="cr_stars_1"></div>
            </div>
         );
         case 2: return (
            <div className="hero-star star-2">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         );
         case 3: return (
            <div className="hero-star star-3">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         )

         case 4: return (
            <div className="hero-star star-4">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         )

         case 5: return (
            <div className="hero-star star-5">
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
               <div className="cr_stars_1"></div>
            </div>
         );

         case 6: return (
            <div className="hero-star star-6">
               <div className="cr_stars_2"></div>
            </div>
         );
         case 7: return (
            <div className="hero-star star-7">
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
            </div>
         );
         case 8: return (
            <div className="hero-star star-8">
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
            </div>
         )
         case 9: return (
            <div className="hero-star star-9">
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
               <div className="cr_stars_2"></div>
            </div>
         )
         case 10: return (
            <div className="hero-star star-10">
               <div className="cr_stars_3"></div>
            </div>
         )
         default: return '';
      }
   }

   heroLevel(star) {
      star = parseInt(star);
      switch (star) {
         case 1: return 40;
         case 2: return 50;
         case 3: return 60;
         case 4: return 80;
         case 5: return 100;
         case 6: return 140;
         case 7: return 160;
         case 8: return 180;
         case 9: return 200;
         case 10: return 250;
         default: return '';
      }
   }

   render() {
      let tmp = function () { }
      let action = this.props.action || tmp;
      if (!this.props.data || !this.props.data.star) {
         return (<div onClick={action} className={"hero-box" + (this.props.active == true ? ' active' : '')}>
            {this.heroFrame(1)}
         </div>)
      }
      let hero = this.props.data;
      let show = this.props.show || {};
      return (
         <div onClick={action} className={"hero-box" + (this.props.active == true ? ' active' : '')} title={hero.name}>
            {this.heroBackground(hero.star)}
            {this.heroFrame(hero.star)}
            <div className="hero">
               <div className={hero.img}></div>
            </div>
            {show.show_star ? this.heroStar(hero.star) : ''}
            <div className="hero-level"><span>{show.show_level ? (hero.level ? hero.level : this.heroLevel(hero.star)) : ''}</span></div>
            <div className={(show.show_elemental ? 'cr_fact_' + hero.elemental : '') + ' hero-elemental'}> </div>
            {this.props.children}
         </div>
      )
   }
}