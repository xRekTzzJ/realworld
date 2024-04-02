import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import classes from '../../index.module.scss';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const [agree, setAgree] = useState(false);
  const buttonClasses = agree ? null : classes['sign-up__button_disabled'];
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className={classes['sign-up']}>
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['sign-up__input-container']}>
          <label htmlFor="username" className={classes['sign-up__placeholder']}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={watch('username', '')}
            placeholder="Username"
            {...register('username', {
              required: 'Username field is require.',
              minLength: {
                value: 3,
                message: 'Your username needs to be at least 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your username needs to be shortest 20 characters.',
              },
            })}
            style={
              errors.username
                ? {
                    outline: 'none',
                    borderColor: '#F5222D',
                  }
                : null
            }
          />
          <label
            htmlFor="username"
            style={{
              visibility: errors.username ? 'visible' : 'hidden',
              color: '#F5222D',
            }}
          >
            {errors.username ? errors.username.message : 'text'}
          </label>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            value={watch('email', '')}
            style={
              errors.email
                ? {
                    outline: 'none',
                    borderColor: '#F5222D',
                  }
                : null
            }
            {...register('email', {
              required: 'Email field is require.',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'Please enter valid email.',
              },
            })}
          />
          <label
            htmlFor="email"
            style={{
              visibility: errors.email ? 'visible' : 'hidden',
              color: '#F5222D',
            }}
          >
            {errors.email ? errors.email.message : 'text'}
          </label>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password field is require',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be shortest 40 characters.',
              },
            })}
            style={
              errors.password
                ? {
                    outline: 'none',
                    borderColor: '#F5222D',
                  }
                : null
            }
          />

          <label
            htmlFor="email"
            style={{
              visibility: errors.password ? 'visible' : 'hidden',
              color: '#F5222D',
            }}
          >
            {errors.password ? errors.password.message : 'text'}
          </label>
        </div>
        <div>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            placeholder="Password"
            style={
              errors.repeatPassword
                ? {
                    outline: 'none',
                    borderColor: '#F5222D',
                  }
                : null
            }
            {...register('repeatPassword', {
              required: 'Please repeat password.',
              validate: (i) => i === getValues('password'),
            })}
          />

          <label
            htmlFor="password"
            style={{
              visibility: errors.repeatPassword ? 'visible' : 'hidden',
              color: '#F5222D',
            }}
          >
            Passwords must match.
          </label>
        </div>
        <div className={classes['sign-up__agree']}>
          <input
            id="checkbox"
            type="checkbox"
            checked={agree}
            onChange={() => {
              setAgree((agree) => !agree);
            }}
          />
          <label
            htmlFor="checkbox"
            style={{
              color: '#F5222D',
            }}
          >
            I agree to the processing of my personal information
          </label>
        </div>
        <button disabled={!agree} type="submit" className={buttonClasses}>
          Create
        </button>
      </form>
      <span>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </span>
    </section>
  );
};

export default SignUp;
