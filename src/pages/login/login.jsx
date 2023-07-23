import './login.scss';
import { useEffect } from 'react';
import { ReactComponent as EchoIcon } from '../../icons/echo.svg';
import AuthAPI from '../../api/api';
import { useNavigate } from 'react-router-dom';

const LoginView = ({ token, setUser, setAdmin, setToken }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      AuthAPI.login(code)
        .then((data) => {
          setUser({data});
          setAdmin(data.is_superuser);
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (token) {

        AuthAPI.logout(token)
          .then(() => {
            setAdmin(false);
            setUser({});
            setToken();
            navigate("/")
          }
            );
      } else {
        navigate("/");
      }
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
        <h1>Logging out...</h1>
        </>
        }
      </div>
    </main>
  );
}

export default LoginView;