import { useState } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Home from './pages/home';
import Archived from './pages/archived';
import Header from './Header';
import './App.css';

// const zh_CN = 'zh_CN';
const en_US = 'en_US';

function WrappedPageComponent(Component, depend){
  return (props) => {
    const newProps = {
      ...props,
      ...depend
    }
    return <Component {...newProps}/>
  }
}

function App(){
  const [language, setLanguage] = useState(en_US)
  const [address, setAddress] = useState('');
  const [learn, setLearn] = useState([]);
  const [potential, setPotential] = useState([]);
  const depend = {
    language,
    address,
    learn,
    potential
  }
  return (
    <Router>
      <Header
        language={language}
        address={address}
        learn={learn}
        potential={potential}
        callbackToRootComponent={(headerState) => {
          if (headerState.language && language !== headerState.language){
            setLanguage(headerState.language);
          }
          if (headerState.address && address !== headerState.address){
            setAddress(headerState.address);
          }
          if (headerState.learn && headerState.learn.length > 0){
            setLearn(headerState.learn);
          }
          if (headerState.potential && headerState.potential.length > 0){
            setPotential(headerState.potential);
          }
        }}
      />
      <Route path='/' component={WrappedPageComponent(Home, depend)} exact></Route>
      <Route path='/archived' component={WrappedPageComponent(Archived, depend)}></Route>
    </Router>
  )
}

export default App;
