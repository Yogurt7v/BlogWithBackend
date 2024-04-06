import propTypes from "prop-types";
import styled from "styled-components";

const TableRowContainer = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const TableRow = styled(TableRowContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    paddinng: 0 10px;
  }

  & .login-colomn {
    width: 172px;
  }

  & .registered-at-colomn {
    width: 213px;
  }

  & .role-colomn {
    width: 158px;
  }
`;

TableRowContainer.propTypes = {
    children: propTypes.node.isRequired
}
