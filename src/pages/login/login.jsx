import './login.scss';
import { useEffect } from 'react';
import LoginButton from '../../components/loginbutton/loginbutton';
import { ReactComponent as EchoIcon } from '../../icons/echo.svg';
import AuthAPI from '../../api/api';
import { useNavigate } from 'react-router-dom';

const LoginView = ({ token, setUser, setAdmin }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      AuthAPI.login(code)
        .then((data) => {
          setUser({data});
          setAdmin(data.is_superuser);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        }
      );
    }
  }, [window.location.search]);

  return (
    <main>
      <div className="login-redirect">
        { new URLSearchParams(window.location.search).get('code') ?
        <>
        <EchoIcon />
        <h1>Retrieving user data...</h1>
        </>
        :
        <>
        <LoginButton token={token} />
        </>
        }
      </div>
    </main>
  );
}

export default LoginView;