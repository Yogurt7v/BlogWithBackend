import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../specaial-panel/special-panel";
import { sanizeContent } from "./utils";
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { savePostAsync } from "../../../../actions";
import { useNavigate } from "react-router-dom";
import { PROP_TYPE } from "../../../../constants";

const PostFormContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(title);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  },[
    imageUrl,
    title,
  ])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSave = () => {
    const newContent = sanizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(id, {
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newContent,
      })
    ).then(({id}) => navigate(`/post/${id}`));
  };

  const onImageChange = ({target}) => {
    setImageUrlValue(target.value);
  }

  const onTitleChange = ({target}) => {
    setTitleValue(target.value);
  }


  return (
    <div className={className}>
      <Input
        value={imageUrlValue}
        placeholder="Путь к картинке"
        className="input"
        onChange={onImageChange}
      />
      <Input
        value={titleValue}
        placeholder="Заголовок"
        className="input"
        onChange={onTitleChange}
      />
      <SpecialPanel
        publishedAt={publishedAt}
        id={id}
        editButton={
          <div onClick={onSave}>
            <Icon
              id="fa-regular fa-floppy-disk"
              size="18px"
              margin="0 0 0 10px"
            />
          </div>
        }
      />
      <div
        className="post-text"
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {content}
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  & .input {
    width: 100%;
    border: 1px solid black;
  }

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

  & .panel-left {
    display: flex;
    align-items: center;
  }

  & .post-text {
    text-align: justify;
    white-space: pre-wrap;
    border-radius: 4px;
    min-height: 80px;
    border: 1px solid black;
    width: 100%;
  }
`;

PostForm.propTypes = {
  post: PROP_TYPE.POST.isRequired
}