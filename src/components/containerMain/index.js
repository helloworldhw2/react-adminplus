import React, { Component } from 'react'
import {Switch} from 'react-router-dom'
import PrivateRouter from '../../components/privateRouter'
import Components from './components'



export default class ContainerMain extends Component {
  render() {
    return (
      <Switch>
        {
           Components.map((item) =>{
            return <PrivateRouter key={item.path} path={item.path} component={item.conponment} />
          })
        }
      </Switch>
    )
  }
}
