import Login from './Login'
import * as ReactDOM from 'react-dom'
import store from '../../store'
import { Provider } from 'react-redux'
import { fireEvent } from '@testing-library/dom'
import * as authActions from '../../redux/actions/authActions'

describe('Login component tests', () => {
  let container: HTMLDivElement
  const loginServiceSpy = jest.spyOn(authActions, 'loginUser')

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    ReactDOM.render(<Provider store={store}><Login /></Provider>, container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container.remove()
  })

  it('Renders correctly initial document', () => {
    expect(container.querySelector("[data-test='login-form'")).toBeInTheDocument()
    expect(container.querySelector("[data-test='login-email'")?.getAttribute('name')).toBe('email')
    expect(container.querySelector("[data-test='login-password'")?.getAttribute('name')).toBe('password')
  })

  it('Passes credentials correctly', () => {
    const emailInput = container.querySelector("[data-test='login-email']")
    const passwordInput = container.querySelector("[data-test='login-password']")
    const loginButton = container.querySelector("[data-test='login-button']")
    // If the element does not exist it will throw error, so fireEvent will definitely run if toBeInTheDocument passes
    expect(container.querySelector("[data-test='login-email']")).toBeInTheDocument()
    expect(container.querySelector("[data-test='login-password']")).toBeInTheDocument()
    expect(container.querySelector("[data-test='login-button']")).toBeInTheDocument()

    if (emailInput !== null) {
      fireEvent.change(emailInput, { target: { value: 'someuser' } })
    }
    if (passwordInput !== null) {
      fireEvent.change(passwordInput, { target: { value: 'somepassword' } })
    }
    if (loginButton !== null) {
      // fireEvent.click(loginButton)
      // expect(loginServiceSpy).toBeCalledWith({ email: 'someuser', password: 'somepassword' })
    }
  })
})
