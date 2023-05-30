import './login.scss';
import { useEffect } from 'react';
import LoginButton from '../../components/loginbutton/loginbutton';
import { ReactComponent as EchoIcon } from '../../icons/echo.svg';
import AuthAPI from '../../api/api';

const LoginView = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      AuthAPI.login(code)
        .then((data) => {
          console.log('Success:', data);
          // window.location.href = '/';
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
        <LoginButton />
        </>
        }
      </div>
    </main>
  );
}

export default LoginView;