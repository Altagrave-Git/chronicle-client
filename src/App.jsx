import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import HomeView from './pages/home/home';
import PortfolioView from './pages/portfolio/portfolio';
import BlogView from './pages/blog/blog';
import LoginView from './pages/login/login';
import { useState, useEffect } from 'react';
import { Octokit } from "@octokit/core";
import AuthAPI from './api/api';
import UserPanel from './components/userpanel/userpanel';

const apiToken = import.meta.env.VITE_GITHUB_TOKEN;
const octokit = new Octokit({ auth: apiToken }, { userAgent: 'Altagrave-Git' });

const App = () => {
  const [gitData, setGitData] = useState([]);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState();

  // NOTE: Octokit + Vite requires isomorphic fetch
  useEffect(() => {
    octokit.request('GET /users/Altagrave-Git/repos', {
      sort: 'pushed',
    })
      .then(({ data }) => {
        setGitData(data);
      })
      .catch(err => console.log(err));
  }, []);

  // Set user details if logged in
  // get token from user.access_token
  useEffect(() => {
    AuthAPI.check()
      .then((data) => {
        if (data.username && !user.username) {
          setUser(data);
          setAdmin(data.is_superuser);
          setToken(data.access_token);
        }
      })
      .catch(error => console.log(error));
  }, [user]);

  return (
    <BrowserRouter>
      <Header />
      <UserPanel user={user} />
      <Routes>
        <Route path="/" element={<HomeView gitData={gitData} />} />
        <Route path="/portfolio" element={<PortfolioView admin={admin} />} />
        <Route path="/blog" element={<BlogView />} />
        <Route path="/login" element={<LoginView token={token} setUser={setUser} setAdmin={setAdmin} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
