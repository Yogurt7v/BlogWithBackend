import styled from "styled-components";
import { Icon } from "../../../icon/icon";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../button/button";
import { ROLE } from "../../../../constants/role";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../actions";
import { checkAccess } from "../../../../utils";
import {
  selectUserRole,
  selectUserLogin,
} from "../../../../selectors";

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: black;
`;

const UserName = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: 700;
  font-size: 18px;
  margin-right: 10px;
`;

const Exitbtn = styled.div`
  cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <RightAligned>
        {roleId === ROLE.GUEST ? (
          <Button width={"100px"} onClick={() => nav("/login")}>
            <Link to="/login">Войти <i id="fa-solid fa-circle-chevron-right"></i></Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>
            <Exitbtn onClick={onLogout}>
              <Icon
                id="fa-solid fa-right-from-bracket"
                size="24px"
                margin="10px 0px 10px 0"
                color="red"
              />
            </Exitbtn>
          </>
        )}
      </RightAligned>
      <RightAligned>
        <div onClick={() => nav(-1)}>
          <Link>
            <Icon
              id="fa-solid fa-arrow-left"
              size="24px"
              margin="10px 15px 10px 0"
            />
          </Link>
        </div>
        {isAdmin && (
          <>
            <Link to="/post">
              <Icon
                id="fa-regular fa-file"
                size="24px"
                margin="10px 15px 10px 0"
              />
            </Link>
            <Link to="/users">
              <Icon
                id="fa-solid fa-users"
                size="24px"
                margin="10px 5px 10px 0"
              />
            </Link>
          </>
        )}
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
