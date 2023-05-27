import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import HomeView from './pages/home/home';
import PortfolioView from './pages/portfolio/portfolio';
import BlogView from './pages/blog/blog';
import AboutView from './pages/about/about';
import { useState, useEffect } from 'react';
import { Octokit } from "@octokit/core";

const apiToken = import.meta.env.VITE_GITHUB_TOKEN;
const octokit = new Octokit({ auth: apiToken }, { userAgent: 'Altagrave-Git' });

const App = () => {
  const [gitData, setGitData] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    octokit.request('GET /users/Altagrave-Git/repos', {
      sort: 'pushed',
    })
      .then(({ data }) => {
        setGitData(data);
      })
      .catch(err => console.log(err));
  }, []);

  console.log(gitData);



  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView gitData={gitData} />} />
        <Route path="/portfolio" element={<PortfolioView gitData={gitData} />} />
        <Route path="/blog" element={<BlogView gitData={gitData} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
