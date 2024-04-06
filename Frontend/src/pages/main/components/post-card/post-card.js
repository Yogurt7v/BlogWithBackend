import PropTypes from "prop-types"; 
import { Link } from "react-router-dom";
import { Icon } from "../../../../components/icon/icon";
import styled from "styled-components";

const PostCardContainer = ({
  className,
  id,
  title,
  imageUrl,
  publishedAt,
  commentsCount,
}) => {
  return (
    <div className={className}>
      <Link to={`/post/${id}`}>
        <img src={imageUrl} alt={title} className="post-card-image"/>
        <div className="post-card-footer">
          <h4>{title}</h4>
          <div className="post-card-info">
            <div className="published-at">
              <Icon
                id="fa-regular fa-calendar"
                margin="0 10px 0 0px"
                size="18px"
                className="noPointer"
              />
              {publishedAt}
            </div>
            <div className="comments-count">
              <Icon
                id="fa-regular fa-comment"
                margin="0 10px 0 0px"
                size="18px"
                className="noPointer"
              />
              {commentsCount}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const PostCard = styled(PostCardContainer)`
    width: 280px;
    height: 330px;
    display: flex;
    flex-direction: column;
    align-items:;
    margin: 20px;
    border: 1px solid grey;
    position: relative;
    box-shadow: 0px 5px 10px 5px rgba(34, 60, 80, 0.2);

    & img{
        display: block;
        width: 100%;
        height: 200px;

    }

    &. noPointer{
        cursor: none;
    }

    & .post-card-footer{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-top: 1px solid grey;
    }

    & h4 {
        margin: 0px;
        padding: 10px;
        text-align: left;
    }

    & .post-card-info{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
    }


    & .published-at{
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 10px;
        left: 15px;
    }

    & .comments-count{
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 10px;
        right: 15px;
    }

`;


PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
};