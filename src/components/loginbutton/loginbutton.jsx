import AuthAPI from "../../api/api";
import { ReactComponent as EchoIcon } from '../../icons/echo.svg';
import './loginbutton.scss';
import { useNavigate, Link } from "react-router-dom";

const LoginButton = ({token}) => {
  const navigate = useNavigate();

  return (
    <>
    { token ?
    <Link className="echo-logout" to={"/login"}>
      <span>Sign out</span>
    </Link>
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