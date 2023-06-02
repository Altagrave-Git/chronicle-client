import AuthAPI from "../../api/api";
import { ReactComponent as EchoIcon } from '../../icons/echo.svg';
import './loginbutton.scss';
import { useNavigate } from "react-router-dom";

const LoginButton = ({token}) => {
  const navigate = useNavigate();

  return (
    <>
    { token ?
    <button className="echo-logout" onClick={() => {AuthAPI.logout(token).then(navigate('/'))}}>
      <span>Sign out</span>
    </button>
    :
    <button className="echo-login" onClick={() => AuthAPI.authorize()}>
      <EchoIcon />
      <span>Sign in with Echo</span>
    </button>
    }
    </>
  )
}

export default LoginButton;