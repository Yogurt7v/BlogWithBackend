import styled from "styled-components";

export const AuthFormError = styled.div`
  color: red;
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  animation: myAnim 1.5s ease 0s 1 normal forwards;

  @keyframes myAnim {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }

    % {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default AuthFormError