import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import './App.css'
import store from './Publics/redux/store'
import Home from './Screens/Home'
import Detail from './Screens/Detail'
import Edit from '../src/Component/modal/editBook'
import Pinjam from './Screens/Pinjam'
import Register from './Screens/Register'
import { spring, AnimatedSwitch } from 'react-router-transition'

function mapStyles (styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  }
}

function bounce (val) {
  return spring(val, {
    stiffness: 400,
    damping: 40
  })
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 0.5
  },
  atLeave: {
    opacity: bounce(1),
    scale: bounce(0.8)
  },
  atActive: {
    opacity: bounce(1),
    scale: bounce(1)
  }
}

function App () {
  return (
    <Provider store={store}>
      <div>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className='route-wrapper'
        >
          <Route path={'/'} component={Home} exact />
          <Route path={'/book/:id_buku'} component={Detail} />
          {/* <Route path={'/login'} component={Login}/> */}
          <Route path={'/register'} component={Register} />
        </AnimatedSwitch>
        <Route exact path={'/book/edit/:id_buku'} component={Edit} />
        <Route exact path={'/list/'} component={Pinjam} />
      </div>
    </Provider>
  )
}

export default App
