
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Home from './components/Home'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';
import Store from './store/index';
import Dashboard from './components/Dashboard'
import Create from './components/Create';
import PrivateRoute,{PrivateRouteLogin} from './private/PrivateRoute'
import NotFound404 from './components/NotFound404';
import Edit from './components/Edit'
import EditImage from './components/EditImage';
function App() {
  return (
    <Provider store={Store} >
      <BrowserRouter>
    <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <PrivateRouteLogin exact path="/login" component={Login}/>
        <PrivateRouteLogin exact path="/register" component={Register}/>
        <PrivateRoute exact path='/create' component={Create} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/edit/:id" exact component={Edit} />
        <PrivateRoute path="/updateImage/:id" exact component={EditImage} />
        <Route component={NotFound404} />
      </Switch>
    </BrowserRouter> 
    </Provider>
       
  );
}

export default App;
