import Navbar from './Navbar'
import * as ReactDOM from 'react-dom'
import store from '../../store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Navbar component tests', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    ReactDOM.render(<Provider store={store}><Router><Navbar /></Router></Provider>, container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container.remove()
  })

  it('Renders correctly initial document', () => {
    expect(container.querySelector("[data-test='navbar'")).toBeInTheDocument()
  })

})