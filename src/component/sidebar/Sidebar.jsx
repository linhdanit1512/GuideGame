import React, { Component } from 'react';
import SidebarItem from 'SidebarItem';
import ControlSidebar from 'ControlSidebar';

var displayText = {
   en: {
      benefit: 'Benefits',
      mission: 'Daily Mission',
      event: 'Events',
      friend: 'Friends',
      pet: 'Pet',
      mail: 'Mail',
      help: 'Helper',
      set: 'Set'
   },
   vi: {
      menu: {
         benefit: 'Lợi ích',
         mission: 'Nhiệm vụ hàng ngày',
         event: 'Sự kiện',
         friend: 'Bạn bè',
         pet: 'Thú cưng',
         mail: 'Thư',
         help: 'Trợ giúp',
         set: 'Thiết lập'

      }
   }
}

class Sidebar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         hide: true,
      }
   }

   hideSidebar() {
      this.state.hide = !this.state.hide;
      this.setState(this.state);
   }

   render() {
      return (
         <div>
            <ControlSidebar hide={this.state.hide} clickAction={this.hideSidebar.bind(this)}></ControlSidebar>
            <div id="sidebar" className={this.state.hide ? 'hide' : 'show'}>
               <SidebarItem itemImage="sy_menu_icon_vip_right" scale="7" itemStyle={{ paddingBottom: '45px' }}>{displayText[this.props.lang].menu.benefit}</SidebarItem>
               <SidebarItem itemImage="sy_menu_icon_task_day" scale="6" textStyle={{ position: 'absolute' }}>{displayText[this.props.lang].menu.mission}</SidebarItem>
               <SidebarItem itemImage="sy_menu_icon_carbon_day" scale="6">{displayText[this.props.lang].menu.event}</SidebarItem>
               <SidebarItem itemImage="sy_menu_icon_friend" scale="6" rotate={true} rotateStyle={{ transformOrigin: '700% 140%' }}>{displayText[this.props.lang].menu.friend}</SidebarItem>
               <SidebarItem itemImage="sy_menu_icon_pet" scale="6">{displayText[this.props.lang].menu.pet}</SidebarItem>
               <SidebarItem itemImage="sy_menu_icon_mail" scale="6">{displayText[this.props.lang].menu.mail}</SidebarItem>
               <SidebarItem itemImage="sy_main_assistant" scale="0" itemStyle={{ paddingBottom: '45px' }}>{displayText[this.props.lang].menu.help}</SidebarItem>
               <SidebarItem itemImage="sy_menu_icon_set" scale="6" itemStyle={{ paddingBottom: '68px' }} rotate={true} rotateStyle={{ transformOrigin: '700% 140%' }}>{displayText[this.props.lang].menu.set}</SidebarItem>
            </div>
         </div>
      );

   }
}


export default  Sidebar;