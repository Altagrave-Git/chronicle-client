import AuthAPI from "../../api/api";
import './userpanel.scss';

const UserPanel = ({user}) => {
  return (
    <>
    { user.username &&
      <div className="user-panel">
        <img className="user-panel__avatar" src={user.avatar} alt="avatar" />
        <span className="user-panel__username">{user.username}</span>
      </div>
    }
    </>
  )
}

export default UserPanel;