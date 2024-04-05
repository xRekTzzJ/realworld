import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import activeLike from '../../img/active-like.svg';
import like from '../../img/like.svg';
import classes from '../../index.module.scss';

const Rate = ({ auth, onLikeLoading, likeHandler, isFavorited, favortiedCount }) => {
  const rateClasses = auth
    ? classes['article-item__rate-container']
    : `${classes['article-item__rate-container']} ${classes['article-item__rate-container_disabled']}`;

  return onLikeLoading ? (
    <div className={rateClasses}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              color: 'red',
              fontSize: 20,
            }}
            spin
          />
        }
      />
    </div>
  ) : (
    <div className={rateClasses} onClick={likeHandler}>
      <img src={isFavorited ? activeLike : like} alt="Like button." />
      <span>{favortiedCount}</span>
    </div>
  );
};
export default Rate;
