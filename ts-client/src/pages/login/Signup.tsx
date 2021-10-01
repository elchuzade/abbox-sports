import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signupUser } from '../../redux/actions/authActions'

import TextInput from '../../components/builtin/TextInput'
import styles from './styles.module.css'

interface Props { }

const Signup: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
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
    e.preventDefault()
    if (email && password && password2) {
      dispatch(signupUser({ email, password, password2 }))
    }
  }

  return (
    <div className='container'>
      <form className={styles.signup} onSubmit={onSubmit}>
        <h3 className='text-center'>Signup</h3>
        <div className='form-group'>
          <label>Email</label>
          <TextInput
            name='email'
            type='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            error={errors?.email}
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
          />
        </div>
        <div className='form-group'>
          <label>Confirm Password</label>
          <TextInput
            name='password2'
            type='password'
            onChange={e => setPassword2(e.target.value)}
            value={password2}
            error={errors?.password2}
          />
        </div>
        <div className='text-center pt-3'>
          <button type='submit' className={`btn btn-info ${styles['auth-button']}`}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup