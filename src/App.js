import Login from './views/login'
import Index from './views/Index'
import { Route } from 'react-router-dom'
import PrivateRouter from './components/privateRouter'

function App() {
  return (
    <div>
      <Route exact path='/' component={Login} />
      <PrivateRouter path='/index' component={Index} />
    </div>
  );
}

export default App;
