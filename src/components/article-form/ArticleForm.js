import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import classes from '../../index.module.scss';

const ArticleForm = ({ slug = undefined }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(slug);
    if (!slug) {
      setLoading(false);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      tagList: [{ value: '' }],
    },
    mode: 'onChange',
  });

  const onRemoveTag = (index) => {
    if (index > 0) {
      remove(index);
    } else {
      update(index, { value: '' });
    }
  };

  const onAddTag = (index, array) => {
    if (array.length === 6) {
      return;
    }
    const inputValue = getValues('tagList')[index].value;
    if (inputValue.length > 0) {
      append(
        { value: inputValue, isAdded: true },
        {
          focusIndex: 0,
        }
      );
      update(index, { value: '' });
    }
  };

  const onSubmit = (data) => {
    console.log({ ...data, tagList: data.tagList.map((i) => i.value.length && i.value.trim()).filter((i) => i) });
  };

  const { fields, remove, append, update } = useFieldArray({
    control,
    name: 'tagList',
  });

  const TagList = () => {
    return (
      <div className={classes['article-form__tag-list']}>
        <span>Tags (no more than 5)</span>
        {fields.map((field, index, array) => {
          return index === 0 && array.length === 6 ? null : (
            <div key={field.id}>
              <input {...register(`tagList.${index}.value`)} placeholder="Tag" />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onRemoveTag(index);
                  }}
                  style={{
                    color: '#F5222D',
                    borderColor: '#F5222D',
                  }}
                >
                  Delete
                </button>
              )}
              {!field.isAdded && array.length !== 6 ? (
                <button
                  type="button"
                  onClick={() => {
                    onAddTag(index, array);
                  }}
                  style={{
                    color: '#1890FF',
                    borderColor: '#1890FF',
                  }}
                >
                  Add tag
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <section className={classes['article-form']}>
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
        <TagList />
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default ArticleForm;
