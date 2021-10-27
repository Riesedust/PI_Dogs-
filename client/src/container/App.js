import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Body from '../components/Body/Body';
import Bar from '../components/Bar/Bar';
import InfoDog from '../components/InfoDog/InfoDog';
import Form from '../components/Form/Form';


export default function App() {
  return (
    <div className="App">
      <Route path='/' exact component={Home}/>
      <Route path='/dogs' exact component={Bar} /> 
      <Route path='/dogs' exact component={Body} />
      <Route path='/dogs/:id' exact render={({match}) => {
        const perro = match.params.id 
        return <InfoDog id= {perro}/>
      }} />
      <Route path='/add' exact component={Form}/>
    </div>
  );
}
