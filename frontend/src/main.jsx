// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// import { AuthContextProvider } from './Context/authContext';
// import ChatContextProvider from './Context/ChatContext';
// import { SocketContextProvider } from './Context/SocketContext';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <ChatContextProvider>
//         <SocketContextProvider>
//           <App />
//         </SocketContextProvider>
//       </ChatContextProvider>
//     </AuthContextProvider>
//   </React.StrictMode>
// );

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/authContext.jsx'
import ChatContextProvider from './Context/ChatContext.jsx'
// import { Provider } from 'react-redux'
// import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)