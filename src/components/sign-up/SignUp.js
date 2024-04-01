import { useState } from 'react';
import { useForm } from 'react-hook-form';

import classes from '../../index.module.scss';

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [agree, setAgree] = useState(false);
  const buttonClasses = agree ? null : classes['sign-up__button_disabled'];
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const inputHandler = (e) => {
    if (e.target.id === 'username') {
      setUserName(e.target.value);
    }

    if (e.target.id === 'email') {
      setEmail(e.target.value);
    }

    if (e.target.id === 'password') {
      setPassword(e.target.value);
    }

    if (e.target.id === 'repeatPassword') {
      setRepeatPassword(e.target.value);
    }
  };

  const onSubmit = (data) => console.log(data);
  return (
    <section className={classes['sign-up']}>
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userName}
            onInput={inputHandler}
            placeholder="Username"
            {...register('username', { required: true, minLength: 2 })}
          />
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onInput={inputHandler}
            placeholder="Email address"
            {...register('email', { required: true, minLength: 2 })}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onInput={inputHandler}
            placeholder="Password"
            {...register('password', { required: true, minLength: 6 })}
            style={{
              borderColor: '#F5222D',
            }}
          />
          <label
            htmlFor="password"
            style={{
              color: '#F5222D',
            }}
          >
            Your password needs to be at least 6 characters.
          </label>
        </div>
        <div>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onInput={inputHandler}
            placeholder="Password"
            style={{
              borderColor: '#F5222D',
            }}
            {...register('repeatPassword', { required: true, minLength: 6 })}
          />
          <label
            htmlFor="password"
            style={{
              color: '#F5222D',
            }}
          >
            Passwords must match
          </label>
        </div>
        <div className={classes['sign-up__agree']}>
          <input
            id="checkbox"
            type="checkbox"
            {...register('agree', { required: true })}
            checked={agree}
            onChange={() => setAgree((agree) => !agree)}
          />
          <label htmlFor="checkbox">I agree to the processing of my personal information</label>
        </div>
        <button disabled={!agree} type="submit" className={buttonClasses}>
          Create
        </button>
      </form>
      <span>
        Already have an account? <span>Sign In.</span>
      </span>
    </section>
  );
};

export default SignUp;
