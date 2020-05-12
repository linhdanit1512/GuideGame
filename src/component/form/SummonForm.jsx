import React, { Component, useState, useContext } from 'react';

export default class SummonForm extends Component{
   constructor(props){
      super(props);
      this.Princess = ()=>{
         return '';
      }
   }
   render(){
      var props = getContext();
      console.log(props);
      return (
         <>
         </>
      )
   }
}
