import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import { useDidMount, useWillUnmount } from '../hooks';


const AccountsUIWrapper = () => {
  const container = useRef();
  let template;

  useDidMount(() => {
    template = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(container.current));
  });

  useWillUnmount(() => {
    Blaze.remove(template);
  })

  return (
    <span ref={container} />
  )
};

export default AccountsUIWrapper;