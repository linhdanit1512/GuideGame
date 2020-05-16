import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

import HeroItem from 'HeroItem';
import princesses from 'princesses';

export default class HeroGallery extends Component {
   constructor(props) {
      super(props);
      this.state = {
         elemental: this.props.elemental || 0,
         regency: this.props.regency || 0,
         filterText: '',
         lang: localStorage.getItem('lang'),
         selectedHero: '',
         star: 0
      }
      this.searchInput = React.createRef();
   }

   renderList(heroList) {
      let _self = this;
      return heroList.map((data, index) => {
         let show = {};
         show.show_elemental = this.state.elemental == 0;
         show.show_regency = this.state.regency == 0;
         show.show_level = true;
         show.show_star = true;
         return <HeroItem action={() => {
            _self.selectHero(data.img);
            this.state.star = data.star
         }} data={data} key={index} show={show} active={(this.state.star == data.star && this.state.selectedHero == data.img) || this.props.selectedHero == data.img}></HeroItem>
      })
   }

   selectHero(hero) {
      this.state.selectedHero = hero;
      this.setState(this.state);
      if (this.props.action) {
         this.props.action(hero, 'avt');
      }
   }


   getListPrincess() {
      return princesses.filter((princess) => {
         return ((princess.regency == this.state.regency || this.state.regency == 0)
            && (princess.elemental == this.state.elemental || this.state.elemental == 0))
            && (princess.name.toLowerCase().includes(this.state.filterText.toLowerCase()))
      });
   }

   changeFilter(e) {
      let elemental = e.target.getAttribute('data-ele');
      let regency = e.target.getAttribute('data-reg');
      let isActive = e.target.classList.contains('active');
      if (elemental && !isActive) {
         this.state.elemental = elemental;
      } else if (elemental) {
         this.state.elemental = 0;
      }
      if (regency && !isActive) {
         this.state.regency = regency;
      } else if (regency) {
         this.state.regency = 0;
      }

      this.setState(this.state);
   }

   changeFilterText() {
      let text = this.searchInput.current.value;
      this.state.filterText = text || '';
      this.state.elemental = 0;
      this.state.regency = 0;
      this.setState(this.state);
   }

   render() {
      var list = this.getListPrincess();
      if (this.props.hideFilter) {
         return (
            <div className="">
               <div className="hero-gallery">
                  <div className="gallery-search mb-3">
                     <FormControl ref={this.searchInput} type="text" className="col-md-6 col-sm-12" onChange={this.changeFilterText.bind(this)}></FormControl>
                  </div>
                  <div className="gallery-content">
                     {this.renderList(list)}
                  </div>
               </div>
            </div>
         )
      } else {
         return (
            <div className="">
               <div className="hero-gallery">
                  <div className="gallery-search mb-3">
                     <FormControl ref={this.searchInput} type="text" className="col-md-6 col-sm-12" onChange={this.changeFilterText.bind(this)}></FormControl>
                  </div>
                  <div className="elemental">
                     {[1, 2, 3, 4, 5, 6].map((data) => {
                        return <div key={data} className={'cr_fact_' + data + ' hero-filter' + (this.state.elemental == data ? ' active' : '')} data-ele={data} onClick={this.changeFilter.bind(this)}></div>
                     })}
                  </div>
                  <div className="regency">
                     {[1, 2, 3, 4, 5].map((data) => {
                        return <div key={data} className={'cr_occu_' + data + ' hero-filter' + (this.state.regency == data ? ' active' : '')} data-reg={data} onClick={this.changeFilter.bind(this)}></div>
                     })}
                  </div>
                  <div className="row">
                     <div className="col-12">
                        <div className="gallery-content">
                           {this.renderList(list)}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )
      }
   }

}