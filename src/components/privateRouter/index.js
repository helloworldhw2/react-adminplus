import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../../utils/cookies'

const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    getToken() ? <Component {...props}/> : <Redirect to='/'/>
  )}/>
)

export default PrivateRouter