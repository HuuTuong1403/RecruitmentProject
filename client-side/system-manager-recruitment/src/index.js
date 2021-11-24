import './index.css'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import App from './App'
import i18n from './common/lang/translation'
import React from 'react'
import reportWebVitals from './reportWebVitals'
import store from 'app/store'

render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
