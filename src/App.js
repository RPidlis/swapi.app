import './App.css'
import CharactersContainer from './components/CharactersContainer/CharactersContainer'
import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/redux-store'
import { BrowserRouter, Route } from 'react-router-dom'
import ProfileContainer from './components/ProfileContainer/ProfileContainer'
import PageNotFound from './components/PageNotFound'
import { Container } from '@material-ui/core'

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Container fixed={true}>
                    <BrowserRouter>
                        <Route exact strict path={'/'} component={() => <CharactersContainer/>}/>
                        <Route path={'/profile/:userId?'} component={() => <ProfileContainer/>}/>
                        <Route path={'/404'} component={() => <PageNotFound/>}/>
                    </BrowserRouter>
                </Container>
            </Provider>
        </div>
    )
}

export default App
