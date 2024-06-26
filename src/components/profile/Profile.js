import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { updateUser } from '../../store/actions';
import classes from '../sign-up/form.module.scss';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    formState,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
      email: user.email,
      image: user.image,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    //Валидация на пустые значения и на неизмененные значения
    function validateData(obj) {
      for (const value in obj) {
        if (obj[value] === '' || !formState.dirtyFields[value]) {
          delete obj[value];
        }
      }
      return obj;
    }

    try {
      await dispatch(updateUser(validateData(data), token));
      setLoading(false);
      history.push('/');
      toast.success('You have successfully updated your profile!');
    } catch (error) {
      if (error.status === 422) {
        toast.error('Is already taken.');
      } else {
        toast.error('Something went wrong.');
      }
      setLoading(false);
      reset();
    }
  };

  if (loading) {
    return (
      <section className={classes['form']}>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                width: '100%',
                color: '#52c41a',
                fontSize: 48,
              }}
              spin
            />
          }
        />
      </section>
    );
  }

  const buttonClasses = Object.keys(formState.dirtyFields).length !== 0 ? null : classes['form__button_disabled'];

  return (
    <section className={classes['form']}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
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
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
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
          <label htmlFor="password">New password</label>
          <input
            type="password"
            id="password"
            value={watch('password', '')}
            placeholder="New password"
            {...register('password', {
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
            htmlFor="password"
            style={{
              visibility: errors.password ? 'visible' : 'hidden',
              color: '#F5222D',
            }}
          >
            {errors.password ? errors.password.message : 'text'}
          </label>
        </div>
        <div>
          <label htmlFor="image">Avatar image (url)</label>
          <input
            type="url"
            id="image"
            value={watch('image', '')}
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Enter valid url',
              },
            })}
            style={
              errors.image
                ? {
                    outline: 'none',
                    borderColor: '#F5222D',
                  }
                : null
            }
          />
          <label
            htmlFor="image"
            style={{
              visibility: errors.image ? 'visible' : 'hidden',
              color: '#F5222D',
            }}
          >
            {errors.image ? errors.image.message : 'text'}
          </label>
        </div>
        <button disabled={Object.keys(formState.dirtyFields).length === 0} type="submit" className={buttonClasses}>
          Save
        </button>
      </form>
    </section>
  );
};

export default Profile;
