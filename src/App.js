import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header'
import styled from 'styled-components'
import Sidebar from './Components/Sidebar'
import Chat from './Components/Chat'
import Login from './Components/Login'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth}  from './firebase'
import Spinner from 'react-spinkit'
import DirectMessage from './Components/DirectMessage'

function App() {

  const [user, loading] = useAuthState(auth)

  if(loading){
    return(
      <AppLoading>
        <AppLoadingContents>
          <img alt="Slack" src="https://i.pcmag.com/imagery/reviews/07td46ju7p6lLVb0QGwc5VF-6..1569479844.jpg"/>

          <Spinner
            name="ball-spin-fade-loader"
            color="purple"
            fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ): (
          <>
          <Header/>
          <AppBody>
            <Sidebar />
            <Switch>
              <Route path="/" exact>
                  <Chat />
              </Route>
              <Route path={"/directMessage"} component={DirectMessage}/>
            </Switch>
            
          </AppBody>
        
      </>
        )}
      
    </Router>
    </div>
  );
}

export default App;


const AppBody = styled.div`

  display: flex;
  height: 100vh;

`

const AppLoading = styled.div`
  
`

const AppLoadingContents = styled.div`
  margin-top: 17%;
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
  }
`

