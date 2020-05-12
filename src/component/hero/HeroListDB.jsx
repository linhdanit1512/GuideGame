import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, Container } from 'react-bootstrap';

import HeroItem from 'HeroItem';
import HeroDetail from 'HeroDetail';
import routeLink from '../../util/link';
import Princesses from 'princesses';

export default class HeroListDB extends Component {
   constructor(props) {
      super(props);
      this.state = {
         heroList: [],
         heroFullList: {},
         regency: 0,
         elemental: 0,
         skillType: '',
         filterText: '',
         selectedHero: '',
         star: 0,
         filterStar: 0,
         princess: {},
         showModal: false
      }

      this.searchInput = React.createRef();
   }

   renderList(heroList) {
      let _self = this;
      let show = {};
      show.show_elemental = true;
      show.show_regency = false;
      show.show_level = true;
      show.show_star = true;
      return heroList.map((data, index) => {
         return (
            // <a href={"/#/h/hero/" + data.slug} key={index}>
            <HeroItem action={(e) => {
               _self.selectHero(data);
               _self.state.star = data.star;
               _self.state.selectedHero = data.img;
               _self.state.princess = _self.state.heroFullList[data._id];
               _self.state.showModal = true;
               _self.setState(_self.state);
            }} data={data} key={index} show={show} active={(this.state.star == data.star && this.state.selectedHero == data.img) || this.props.selectedHero == data.img}>
            </HeroItem>
            // </a>
         )
      })
   }

   selectHero(hero) {

   }

   getListPrincess() {
      return this.state.heroList.filter((princess) => {
         return ((princess.regency == this.state.regency || this.state.regency == 0)
            && (princess.elemental == this.state.elemental || this.state.elemental == 0))
            && (princess.star == this.state.filterStar || this.state.filterStar == 0)
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

   changeStar(star) {
      this.state.filterStar = star;
      this.setState(this.state);
   }

   componentDidMount() {
      document.title = 'Princesses';
      axios({
         url: '/admin' + routeLink.list_princess,
         method: 'post',
         responseType: 'json'
      }).then(res => {
         let makeList = [];
         makeList.length = 1000;
         let mapping = {};
         let maxIndex = -1;
         function getHeroIndex(img, star) {
            let index = -1;
            let count = 0;
            while (count < Princesses.length && index < 0) {
               if (Princesses[count].img == img && Princesses[count].star == star) {
                  index = count;
               } else {
                  count += 1;
               }
            }
            return index;
         }
         res.data.forEach((item, index) => {
            if (item.princessLevels) {
               item.princessLevels.forEach((princess, i) => {
                  let arrIndex = getHeroIndex(princess.avt, princess.star);
                  if (maxIndex < arrIndex) maxIndex = arrIndex;
                  if (index >= 0) {
                     makeList[arrIndex] = {
                        _id: item._id,
                        pid: princess._id,
                        name: item.name,
                        slug: item.slug,
                        elemental: item.elemental,
                        regency: item.regency,
                        star: princess.star || 1,
                        keyword: item.keyword,
                        img: princess.avt,
                     };
                     mapping[item._id] = item;
                  }
               })
            }
         });

         makeList.length = maxIndex + 1;
         this.state.heroList = makeList;
         this.state.heroFullList = mapping;
         this.setState(this.state);
      }).catch(e => {

      })
   }

   render() {
      var list = this.getListPrincess();
      var _self = this;
      function hideModal() {
         _self.state.showModal = false;
         _self.state.princess = {};
         _self.setState(_self.state);
      }
      return (
         <Container className="">
            <div className="hero-gallery">
               <div className="gallery-search mb-3">
                  <FormControl ref={this.searchInput} type="text" className="col-md-6 col-sm-12" onChange={this.changeFilterText.bind(this)}></FormControl>
               </div>
               <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                     <div className="elemental">
                        {[1, 2, 3, 4, 5, 6].map((data) => {
                           return <div key={data} className={'cr_fact_' + data + ' hero-filter' + (this.state.elemental == data ? ' active' : '')} data-ele={data} onClick={this.changeFilter.bind(this)}></div>
                        })}
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                     <div className="elemental">
                        {[1, 2, 3, 4, 5].map((data) => {
                           return <div key={data} className={'cr_occu_' + data + ' hero-filter' + (this.state.regency == data ? ' active' : '')} data-reg={data} onClick={this.changeFilter.bind(this)}></div>
                        })}
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                     <div className="elemental">
                        {[1, 2, 3, 4, 5, 6, 10].map(item => {
                           return <Star key={item} star={item} active={this.state.filterStar == item} onClick={() => {
                              if (this.state.filterStar == item) {
                                 this.changeStar(0);
                              } else {
                                 this.changeStar(item);
                              }
                           }}></Star>
                        })}
                     </div>
                  </div>
               </div>
               <div className="clearfix"></div>
               <div className="gallery-content">
                  {this.renderList(list)}
               </div>
            </div>
            <HeroDetail modal={true} data={this.state.princess} show={this.state.showModal} hideFn={hideModal}></HeroDetail>
         </Container>
      )
   }
}

function Star(props) {
   function renderStar() {
      if (props.star == 10) {
         return (
            <div className="star-text star-10">
               <div className={"cr_digit_1"}></div>
               <div className={"cr_digit_0"}></div>
            </div>
         )
      } else {
         return <div className={"star-text cr_digit_" + (props.star || 1)}></div>
      }
   }
   return (
      <div className={"filter-star" + (props.active ? ' active' : '')} onClick={props.onClick}>
         <div className="cr_little_star"></div>
         {renderStar()}
      </div>
   )
}