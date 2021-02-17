import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../../utils/session'

const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    getToken() ? <Component {...props}/> : <Redirect to='/'/>
  )}/>
)

export default PrivateRouter