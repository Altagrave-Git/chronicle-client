import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import HomeView from './pages/home/home';
import PortfolioView from './pages/portfolio/portfolio';
import LoginView from './pages/login/login';
import { useState, useEffect } from 'react';
import { Octokit } from "@octokit/core";
import AuthAPI from './api/api';
import { MailAPI } from './api/api';
import UserPanel from './components/userpanel/userpanel';
import AboutView from './pages/about/about';
import InboxView from './pages/inbox/inbox';
import bgslide from "./images/bgslide.png";
import selfie from "./images/self.jpg";
import turcotte from "./images/turcotte.png";

const apiToken = import.meta.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: apiToken }, { userAgent: 'Altagrave-Git' });

const App = () => {
  const [gitData, setGitData] = useState([]);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState();
  const [portfolioData, setPortfolioData] = useState([]);
  const [newMail, setNewMail] = useState(false);

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
      .then(() => {
        if (token && admin) {
          MailAPI.check(token)
            .then(data => setNewMail(data))
            .catch(() => setNewMail(false));
        } else {
          setNewMail(false);
        } 
      })
      .catch(error => console.log(error));
  }, [user]);

  // Retrieve and set project data from Chronicle API
  useEffect(() => {
    const url = import.meta.env.VITE_CHRONICLE_URL;
    fetch(url + '/projects/')
      .then(response => response.json())
      .then(data => {
        if (data.length >= 5) {
          setPortfolioData(data);
        } else if (data.length) {
          const cloneData = [];
          const mult = Math.ceil(5 / data.length);
          for (let i = 0; mult > i; i++) {
            data.forEach(item => {
              cloneData.push(item);
            });
          }
          setPortfolioData(cloneData);
        }
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const head = document.querySelector("head");
    head.innerHTML += `<link rel="prefetch" href="${bgslide}" />`;
    head.innerHTML += `<link rel="prefetch" href="${selfie}" />`;
  }, [])

  useEffect(() => {
    if (portfolioData.length > 0) {
      const url = import.meta.env.VITE_CHRONICLE_URL;
      const head = document.querySelector("head");
      const list = [];
      for (let project of portfolioData) {
        if (list.includes(project.image)) {
          break;
        } else {
          list.push(project.image);
          head.innerHTML += `<link rel="prefetch" href="${url + project.image}" />`;
        }
      }
    }
  }, [portfolioData])

  return (
    <BrowserRouter>
      <Header token={token} admin={admin} newMail={newMail} />
      <UserPanel user={user} />
      <Routes>
        <Route path="/" element={<HomeView token={token} gitData={gitData} setNewMail={setNewMail} admin={admin} />} />
        <Route path="/portfolio" element={<PortfolioView token={token} admin={admin} portfolioData={portfolioData} />} />
        <Route path="/about" element={<AboutView bgslide={bgslide} selfie={selfie} />} />
        <Route path="/inbox" element={<InboxView token={token} admin={admin} setNewMail={setNewMail} />} />
        <Route path="/login" element={<LoginView token={token} setUser={setUser} setAdmin={setAdmin} setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
