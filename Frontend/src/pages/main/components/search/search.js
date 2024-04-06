import { Icon } from "../../../../components/icon/icon";
import PropTypes from "prop-types";
import styled from "styled-components";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
  return (
    <div className={className}>
      <input
        value={searchPhrase}
        type="text"
        placeholder="Поиск по заголовкам..."
        onChange={onChange}
      />
      <Icon
        id="fa-solid fa-magnifying-glass"
        size="20px"
        margin="0 5px 0 10px"
        className="noPointer"
      />
    </div>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 300px;
  height: 35px;

  outline: none;
  position: relative;

  & input {
    width: 300px;
    height: 35px;
    padding-right: 38px;
    padding-left: 10px;
    font-size: 14px;
  }
  &::placeholder {
    color: grey;
  }

  & .noPointer {
    position: absolute;
    right: 10px;
    cursor: none;
  }
`;


Search.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};