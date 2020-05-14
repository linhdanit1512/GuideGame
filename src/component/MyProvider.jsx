import React, { Component } from 'react';
import { connect } from 'react-redux';

import Template from 'Template';
import showText from 'DisplayText';
import MyContext from 'MyContext';
import routeLink from '../util/link';
class MyProvider extends Component {
   constructor(props, context) {
      super(props, context);
      this.state = {
         lang: 'en',
         displayText: showText,
         showNotify: false,
         notifyText: '',
         notifyTitle: '',
         notifyTime: '',
         notifyClass: '',
         notifyDelay: '',
         waiting: false,
         routeLink: routeLink
      }
   }

   upperCaseFirst(s) {
      if (!s.split('')[0]) return '';
      return s.split('')[0].toUpperCase() + s.substring(1);
   }

   updateProvider(key, val) {
      this.state[key] = val;
      this.setState(this.state);
      localStorage.setItem(key, val);
      if (key == 'lang') {
         this.props.dispatch({ type: val });
      }
   }

   showNotify(msg, title, time, className) {
      let mes = {
         en: {
            default_title: 'Notify',
            nothing_change: 'Nothing change',
            update_success: 'Update sucessfully',
            add_success: 'Add successfully',
            hero_exist: 'This Hero is exist',
            request_failure: 'An error was occured. Please try again later'
         },
         vi: {
            default_title: 'Thông báo',
            nothing_change: 'Không có gì thay đổi',
            update_success: 'Cập nhật thành công',
            add_success: 'Thêm mới thành công',
            hero_exist: 'Anh hùng này đã tồn tại',
            request_failure: 'Đã có lỗi xảy ra, vui lòng thực hiện sau'
         }
      }
      let lang = this.state.lang;
      this.state.notifyClass = className || ''
      this.state.notifyDelay = 4000;
      this.state.showNotify = true;
      this.state.notifyTime = time || new Date().toTimeString().split('GMT').shift();
      this.state.notifyTitle = title || mes[this.state.lang].default_title;
      this.state.notifyText = mes[lang][msg] || '';
      this.setState(this.state);
   }

   waiting() {
      this.state.waiting = !this.state.waiting;
      this.setState(this.state);
   }

   render() {
      return (
         <MyContext.Provider value={{
            state: this.state,
            updateProvider: this.updateProvider.bind(this),
            upperCaseFirst: this.upperCaseFirst,
            showNotify: this.showNotify.bind(this),
            waiting: this.waiting.bind(this)
         }}>{this.props.children}
            <Template.Waiting show={this.state.waiting} />
            <Template.ShowNotify
               className={this.state.notifyClass}
               delay={this.state.notifyDelay}
               show={this.state.showNotify}
               time={this.state.notifyTime}
               title={this.state.notifyTitle}
               msg={this.state.notifyText}
               hide={() => { this.updateProvider('showNotify', false) }}
            />
         </MyContext.Provider>
      )
   }
}

export default connect((state) => {
   return { lang: state.appLanguage }
})(MyProvider)