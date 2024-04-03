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
            {errors.email ? errors.email.message : 'text'}
          </label>
        </div>
        <button type="submit" className={buttonClasses}>
          Send
        </button>
      </form>
    </section>
  );
};

export default ArticleForm;
