import React, { useState } from 'react';
import { Spinner, Toast } from 'react-bootstrap';

export default {
   Waiting(props) {
      return props.show ? <Spinner animation="border" className="waiting" /> : '';
   },

   ShowNotify(props) {
      return (
         <div className={props.className + (props.show ? '' : 'hidden') + ' notify-message'}>
            <Toast onClose={props.hide} show={props.show} delay={props.delay} autohide>
               <Toast.Header>
                  <strong className="mr-auto">{props.title || ''}</strong>
                  <small>{props.time || ''}</small>
               </Toast.Header>
               <Toast.Body>{props.msg}</Toast.Body>
            </Toast>
         </div>
      );
   }
}