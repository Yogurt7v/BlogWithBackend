import { Icon } from "../../../../../components/icon/icon";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCommentAsync,
  openModal,
  CLOSE_MODAL,
} from "../../../../../actions";
import { ROLE } from "../../../../../constants/role";
import { selectUserRole } from "../../../../../selectors";
import PropTypes from "prop-types";
import styled from "styled-components";

const CommentContainer = ({
  className,
  postId,
  id,
  author,
  publishedAt,
  content,
}) => {
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить комментрарий?",
        onConform: () => {
          dispatch(removeCommentAsync( postId, id))
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

  return (
    <>
      <div className={className}>
        <div className="comment">
          <div className="information-panel">
            <div className="author">
              <div className="icon" onClick={() => {}}>
                <Icon
                  id="fa-regular fa-circle-user"
                  margin="0 10px 0 10px"
                  size="16px"
                  className="noPointer"
                />
              </div>
              {author}
            </div>
            <div className="published-at">
              {publishedAt}
              <div className="icon">
                <Icon
                  id="fa-regular fa-calendar"
                  margin="0 0 0 10px"
                  size="16px"
                  className="noPointer"
                />
              </div>
            </div>
          </div>
          <div className="comment-text">{content}</div>
        </div>
        {isAdminOrModerator &&<div className="icon" onClick={() => onCommentRemove(id)}>
          <Icon id="fa-solid fa-trash" margin="10px 0 0 10px" size="16px" />
        </div>}
      </div>
    </>
  );
};

export const Comment = styled(CommentContainer)`
  display: flex;

  justify-content: space-between;

  & .comment {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid black;
    width: 100%;
  }

  & .icon {
    float: right;
  }

  & .noPointer {
    pointer-events: none;
  }

  & .comment-text {
    text-align: justify;
    margin: 10px;
    font-size: 16px;
    line-height: 1.5;
  }

  & .information-panel {
    display: flex;
    justify-content: space-between;
  }
  & .author {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 14px;
  }

  & .published-at {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 12px;
  }
`;

Comment.propTypes ={
  postId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}