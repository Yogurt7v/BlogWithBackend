import PropTypes from "prop-types"; 
import styled from "styled-components";

const IconContainer = ({ className, id , ...props}) => (
  <div className={className}>
    <i className={id}></i>
  </div>
);

export const Icon = styled(IconContainer)`
  margin: ${({ margin = "0" }) => margin};
  align-self: center;
  font-size: ${({ size = "24px" }) => size};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  color: ${({ disabled }) => (disabled ? "gray" : "black")};

  &:hover {
    cursor: pointer;
  }
`;

Icon.propTypes = {
  id: PropTypes.string.isRequired,
}