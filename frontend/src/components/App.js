import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { auth } from '../utils/authApi.js';
import { AccountContext } from '../contexts/AccountContext.js';
import ProtectedRoute from './ProtectedRoute';

import Header from './Header';
import AroundTheUS from './AroundTheUS';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Footer from './Footer';



function App() {

  const history = useHistory();

  const [loggedIn, setLoggedIn]= useState(false);
  const [accountData, setAccountData]= useState({ _id: '', email: ''});

  const [isLoading, setIsLoading]= useState(false);

  const [isTooltipSuccessOpen, setIsTooltipSuccessOpen]= useState(false);
  const [isTooltipErrorOpen, setIsTooltipErrorOpen]= useState(false);
  const [isTooltipInvalidOpen, setIsTooltipInvalidOpen]= useState(false);



  const closeAllTooltips= () => {
    setIsTooltipInvalidOpen(false);
    setIsTooltipSuccessOpen(false);
    setIsTooltipErrorOpen(false);
    setListener(false);
  }

  const closeOnEsc= (e) => { 
    if(e.key === 'Escape') closeAllTooltips(); 
  }

  const setListener= (listen) => {
    listen ?
      document.addEventListener('keyup', closeOnEsc) :
      document.removeEventListener('keyup', closeOnEsc);
  }

  const handleRegister= (credentials) => {
    setIsLoading(true);
    auth.register(credentials)
      .then((res) => {
        setIsTooltipSuccessOpen(true);
        login(res.data);
      })
      .catch(() => {
        setIsTooltipErrorOpen(true);
      })
      .finally(() => {
        setListener(true);
        setIsLoading(false);
      });
  }

  const handleLogin= (credentials) => {
    setIsLoading(true);
    return auth.login(credentials)
      .then((res) => {
        login(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsTooltipInvalidOpen(true);
        setListener(true);
        setIsLoading(false);
      });
  }

  const handleLogout= () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  const login= (userData) => {
    setLoggedIn(true);
    setAccountData(userData);
    history.push('/');
  }


  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setAccountData(res.data);
          history.push('/');
        }
      });
    }
  }, []);



  return (
    <AccountContext.Provider value={{ loggedIn, accountData }}>
      <div className="container">

        <Header handleLogout={handleLogout} />

        <Switch>
          <ProtectedRoute exact path="/" component={AroundTheUS} />

          <Route path="/signin">
            <Login handleLogin={handleLogin} isLoading={isLoading} />
          </Route>

          <Route path="/signup">
            <Register handleRegister={handleRegister} isLoading={isLoading} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>

        </Switch>

        <InfoTooltip type="success" isOpen={isTooltipSuccessOpen} onClose={closeAllTooltips}>
          Success! You have now been registered.
        </InfoTooltip>

        <InfoTooltip type="error" isOpen={isTooltipErrorOpen} onClose={closeAllTooltips}>
          Oops, something went wrong! Please try again.
        </InfoTooltip>

        <InfoTooltip type="error" isOpen={isTooltipInvalidOpen} onClose={closeAllTooltips}>
          Oops, your email or password was incorrect! Please try again.
        </InfoTooltip>

        <Footer />

      </div>
    </AccountContext.Provider>
  );

}

export default App;

