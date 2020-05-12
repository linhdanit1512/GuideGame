import React, { Component } from 'react';
import princesses from 'princesses';

export default class HeroCardGallery extends Component {
   constructor(props, context) {
      super(props, context);
      this.input_search = React.createRef();
      this.state = {
         filter: '',
         selectedItem: '',
         elemental: this.props.elemental,
         regency: this.props.elemental,
      }
   }

   renderList(heroList) {
      let _self = this;
      return heroList.map((data, index) => {
         return (
            <div key={index} title={data.name} className={"princess-card" + (_self.props.selectedHero == data.figure ? ' active' : '')} onClick={() => { _self.selectHero(data.figure)}}>
               <div className={'princess-image princess-'+ data.img}></div>
            </div>
         );
      })
   }

   selectHero(hero) {
      this.state.selectedItem = hero;
      this.setState(this.state);
      console.log(hero)
      if (this.props.action) {
         this.props.action(hero, 'img');
      }
   }

   changeFilterText() {
      let text = this.input_search.current.value;
      this.state.filter = text;
      this.setState(this.state);
   }

   filterPrincess() {
      return princesses.filter(princess =>
         princess.figure.toLowerCase().includes(this.state.filter.toLowerCase()) &&
         (princess.regency == this.props.regency || this.props.regency == 0) &&
         (princess.elemental == this.props.elemental || this.props.elemental == 0)
      );
   }

   render() {
      var list = this.filterPrincess();
      return (<div className="">
         <div className="hero-card-gallery">
            <div className="gallery-search">
               <input ref={this.input_search} type="text" className="form-control col-md-6 col-sm-12" onChange={this.changeFilterText.bind(this)} />
            </div>
            <div>
               <div className="gallery-content">
                  {this.renderList(list)}
               </div>
            </div>
         </div>
      </div>)
   }
}