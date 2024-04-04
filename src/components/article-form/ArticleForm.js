import { useForm } from 'react-hook-form';

import classes from '../../index.module.scss';

const ArticleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const buttonClasses = Object.keys(dirtyFields).length !== 0 ? null : classes['form__button_disabled'];

  return (
    <section className={classes['article-form']}>
      <h2>Create new article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={watch('title', '')}
            style={
              errors.title
                ? {
                    outline: 'none',
                    borderColor: '#F5222D',
                  }
                : null
            }
            {...register('title', {
              maxLength: {
                value: 110,
                message: 'Maximum of 110 characters.',
              },
              minLength: {
                value: 5,
                message: 'Minimum of 5 characters.',
              },
              required: 'Title field is require.',
            })}
          />
          <label
            htmlFor="title"
            style={{
              visibility: errors.title ? 'visible' : 'hidden',
              color: '#F5222D',
            }}
          >
            {errors.title ? errors.title.message : 'text'}
          </label>
        </div>
        <div>
          <label htmlFor="title">Short description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={watch('description', '')}
            style={
              errors.description
                ? {
                    outline: 'none',
                    borderColor: '#F5222D',
                  }
                : null
            }
            {...register('description', {
              required: 'Description field is require.',
              maxLength: {
                value: 250,
                message: 'Maximum of 250 characters.',
              },
              minLength: {
                value: 5,
                message: 'Minimum of 5 characters.',
              },
            })}
          />
          <label
            htmlFor="title"
            style={{
              visibility: errors.description ? 'visible' : 'hidden',
              color: '#F5222D',
            }}
          >
            {errors.description ? errors.description.message : 'text'}
          </label>
        </div>
        <div>
          <label htmlFor="title">Text</label>
          <textarea
            type="text"
            id="text"
            placeholder="Text"
            value={watch('text', '')}
            style={
              errors.text
                ? {
                    outline: 'none',
                    borderColor: '#F5222D',
                  }
                : null
            }
            {...register('text', {
              required: 'Text field is require.',
              minLength: {
                value: 10,
                message: 'Minimum of 10 characters.',
              },
            })}
          />
          <label
            htmlFor="title"
            style={{
              visibility: errors.text ? 'visible' : 'hidden',
              color: '#F5222D',
            }}
          >
            {errors.text ? errors.text.message : 'text'}
          </label>
        </div>
        <button type="submit" disabled={Object.keys(dirtyFields).length === 0} className={buttonClasses}>
          Send
        </button>
      </form>
    </section>
  );
};

export default ArticleForm;
