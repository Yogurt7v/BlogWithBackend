import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../components/icon/icon";
import { Comment } from "./comment/comment";
import { addCommentAsync } from "../../../../actions";
import { selectUserRole } from "../../../../selectors";
import { ROLE } from "../../../../constants/role";
import PropTypes from "prop-types";
import styled from "styled-components";
import { PROP_TYPE } from "../../../../constants/prop-type";

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);

  const onNewCommentAdded = ( postId, content) => {
    dispatch(addCommentAsync( postId, content));
    setNewComment("");
  };

  const isGuest = userRole === ROLE.GUEST;

  return (
    <>
      <div className={className}>
        {!isGuest && (
          <>
            <div className="new-comment">
              <textarea
                name="comment"
                value={newComment}
                placeholder="Your comment..."
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              />
              <div
                className="icon"
                onClick={() => onNewCommentAdded( postId, newComment)}
              >
                <Icon
                  id="fa-regular fa-paper-plane"
                  size="16px"
                  margin="0 0 0 10px"
                />
              </div>
            </div>
          </>
        )}
        <div className="comments">
          {comments.map(({ id, author, content, publishedAt }) => (
            <Comment
              key={id}
              postId={postId}
              id={id}
              author={author}
              content={content}
              publishedAt={publishedAt}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export const Comments = styled(CommentsContainer)`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 580px;

  & .new-comment {
    display: flex;
    width: 100%;
    margin: 20px 0 0 0;
  }

  & .icon {
    flex: top;
  }

  & textarea {
    width: 100%;
    resize: none;
    height: 120px;
    border-radius: 4px;
    border: 1px solid black;
    // box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.57);
    font-size: 16px;
    padding: 10px 0 0 10px;
  }
`;

Comments.propTypes = {
  comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
  postId: PropTypes.string.isRequired,
}
