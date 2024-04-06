import styled from "styled-components";
import { H2 , Icon} from "../../../../components";
import { SpecialPanel } from "../specaial-panel/special-panel";
import { useNavigate } from "react-router-dom";
import { PROP_TYPE } from "../../../../constants";


const PostContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <img src={imageUrl} alt={title}></img>
      <H2>{title}</H2>
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        editButton={
          <div onClick={() => navigate(`/post/${id}/edit`)}>
            <Icon
              id="fa-regular fa-pen-to-square"
              size="16px"
              margin="0 10px 0 0px"
            />
          </div>
        }
      />
      <div className="post-text">{content}</div>
    </div>
  );
};

export const PostContent = styled(PostContainer)`
  & img {
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.57);
  }
  & h2 {
    margin: 0 auto 20px;
  }

  & .published-at {
    display: flex;
    float left;
  }

  & .panel-icons{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;

  }

  & .post-text {
    text-align: justify;
  }
`;


PostContent.propTypes = {
  post: PROP_TYPE.POST
}