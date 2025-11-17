import React from 'react';
import Chatbot from '@site/src/components/components/Chatbot';

export default function Root({ children }) {
  return (
    <>
      {children}
      <Chatbot />
    </>
  );
}
