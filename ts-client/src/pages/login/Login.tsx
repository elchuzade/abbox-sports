import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../redux/actions/authActions'

import TextInput from '../../components/builtin/TextInput'
import styles from './styles.module.css'

interface Props { }

const Login: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<any>(null)

  const auth = useSelector((state: State) => state.auth)
  const responseRedux = useSelector((state: State) => state.response)

  useEffect(() => {
    setErrors(responseRedux.errors)
  }, [responseRedux.errors])

  useEffect(() => {
    if (auth.isAuthenticated) {
      window.location.href = '/'
    }
  }, [auth])

  const onSubmit = (e: any) => {
    e?.preventDefault()
    console.log('clicking')
    if (email && password) {
      dispatch(loginUser({ email, password }))
    }
  }

  return (
    <div className='container'>
      <form data-test='login-form' className={styles.login} onSubmit={onSubmit}>
        <h3 className='text-center'>Login</h3>
        <div className='form-group'>
          <label>Email</label>
          <TextInput
            name='email'
            type='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            error={errors?.email}
            dataTest='login-email'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <TextInput
            name='password'
            type='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
            error={errors?.password}
            dataTest='login-password'
          />
        </div>
        <div className='text-center pt-3'>
          <button data-test='login-button' type='submit' className={`btn btn-info ${styles['auth-button']}`}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login
