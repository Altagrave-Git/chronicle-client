import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import HomeView from './pages/home/home';
import PortfolioView from './pages/portfolio/portfolio';
import LoginView from './pages/login/login';
import { useState, useEffect } from 'react';
import { Octokit } from "@octokit/core";
import AuthAPI, { BlogAPI } from './api/api';
import { MailAPI, ContentAPI } from './api/api';
import UserPanel from './components/userpanel/userpanel';
import InboxView from './pages/inbox/inbox';
import BlogView from './pages/blog/blog';


const apiToken = import.meta.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: apiToken }, { userAgent: 'Altagrave-Git' });

const App = () => {
  const [gitData, setGitData] = useState([]);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState();
  const [portfolioData, setPortfolioData] = useState([]);
  const [newMail, setNewMail] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [retrieveCategories, setRetrieveCategories] = useState(true);
  const [retrievePortfolio, setRetrievePortfolio] = useState(true);

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
    if (retrievePortfolio) {
      ContentAPI.projects()
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
          setRetrievePortfolio(false);
        })
        .catch(error => console.log(error));
    }
  }, [retrievePortfolio]);

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
          head.innerHTML += `<link rel="prefetch" href="${url + project.image}" as="image" />`;
        }
      }
    }
  }, [portfolioData])

  useEffect(() => {
    if (retrieveCategories) {
      BlogAPI.getCategories()
        .then(data => {
          setCategories(data);
          setRetrieveCategories(false);
        })
        .catch(error => console.log(error));
    }
  }, [retrieveCategories])

  return (
    <BrowserRouter>
      <Header token={token} admin={admin} newMail={newMail} />
      <UserPanel user={user} />
      <Routes>
        <Route path="/" element={<HomeView token={token} gitData={gitData} setNewMail={setNewMail} admin={admin} portfolioData={portfolioData} setActiveIndex={setActiveIndex} />} />
        <Route path="/portfolio" element={<PortfolioView token={token} admin={admin} portfolioData={portfolioData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setRetrievePortfolio={setRetrievePortfolio} />} />
        <Route path="/blog" element={<BlogView admin={admin} token={token} categories={categories} setCategories={setCategories} setRetrieveCategories={setRetrieveCategories} />} />
        <Route path="/blog/:category" element={<BlogView admin={admin} token={token} categories={categories} setCategories={setCategories} setRetrieveCategories={setRetrieveCategories} />} />
        <Route path="/blog/:category/:slug" element={<BlogView admin={admin} token={token} categories={categories} setCategories={setCategories} setRetrieveCategories={setRetrieveCategories} />}/>
        <Route path="/inbox" element={<InboxView token={token} admin={admin} setNewMail={setNewMail} />} />
        <Route path="/login" element={<LoginView token={token} setUser={setUser} setAdmin={setAdmin} setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
