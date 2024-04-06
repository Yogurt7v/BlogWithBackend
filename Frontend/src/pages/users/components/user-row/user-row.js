import { Icon } from "../../../../components/icon/icon";
import { useState } from "react";
import { PROP_TYPE } from "../../../../constants/prop-type";
import propTypes from "prop-types";
import styled from "styled-components";
import { request } from "../../../../utils";

const UserRowContainer = ({
  className,
  id,
  login,
  registeredAt,
  roles,
  roleId: userRoleId,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onRoleSave = (userId, newUserRoleId) => {
    request(`/users/${userId}`, "PATCH", { roleId: newUserRoleId }).then(() => {
      setInitialRoleId(newUserRoleId);
    });
  };
  const isSaveButtonDisabled = selectedRoleId === initialRoleId;

  return (
    <>
      <div className={className}>
        <div className="user-data">
          <div className="login-colomn">{login}</div>
          <div className="registered-at-colomn">{registeredAt}</div>
          <div className="role-colomn">
            <select value={selectedRoleId} onChange={onRoleChange}>
              {roles.map(({ id: roleId, name: roleName }) => (
                <option key={roleId} value={roleId}>
                  {roleName}
                </option>
              ))}
            </select>
            <div onClick={() => onRoleSave(id, selectedRoleId)}>
              <Icon
                id="fa-regular fa-floppy-disk"
                margin="0 10px 0 10px"
                size="20px"
                disabled={isSaveButtonDisabled}
              />
            </div>
          </div>
        </div>
        <div onClick={onUserRemove}>
          <Icon id="fa-regular fa-trash-can" size="20px" margin="0 0 0 10px" />
        </div>
      </div>
    </>
  );
};

export const UserRow = styled(UserRowContainer)`
  display: flex;

  & .user-data {
    display: flex;
    align-items: center;
    border: 1px solid #000;
    margin: 5px 0;
  }

  & .login-colomn {
    padding-left: 10px;
    display: flex;
    justify-content: flex-start;
    width: 172px;
  }

  & .registered-at-colomn {
    display: flex;
    justify-content: center;
    width: 213px;
  }

  & .role-colomn {
    width: 158px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  & select {
    padding: 0 5px;
    font-size: 15px;
  }
`;

UserRow.propTypes = {
  id : propTypes.string.isRequired,
  login: propTypes.string.isRequired,
  registeredAt: propTypes.string.isRequired,
  roleId: PROP_TYPE.ROLE_ID.isRequired,
  roles : propTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
  onUserRemove : propTypes.func.isRequired,
}
