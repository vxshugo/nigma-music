import React from 'react';
import Root from './src/root';
import {AuthProvider} from "./src/Context/Authcontext";


export default function App() {
  return (
      <AuthProvider>
          <Root/>
      </AuthProvider>
  );
}

