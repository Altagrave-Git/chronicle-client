import AuthAPI from "../../api/api";
import { ReactComponent as EchoIcon } from '../../icons/echo.svg';
import './loginbutton.scss';

const LoginButton = () => {
  return (
    <button className="echo-login" onClick={() => AuthAPI.authorize()}>
      <EchoIcon />
      <span>Sign in with Echo</span>
    </button>
  )
}

export default LoginButton;