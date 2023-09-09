import React from "react";
import './home.scss';
import GitStream from "../../components/gitstream/gitstream";
import Skills from "../../components/skills/skills";
import MessageForm from "../../forms/projectforms/messageform";
import { ReactComponent as Linkedin } from '../../icons/linkedin.svg';
import { ReactComponent as Twitter } from '../../icons/twitter.svg';
import { ReactComponent as Github } from '../../icons/github.svg';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import resume from "../../images/DamonTurcotteCV.pdf";
import ProjectCard from "../../components/projectcard/projectcard";
import { useNavigate } from "react-router-dom";
import selfie from "../../images/selfie.jpg";
import { BlogAPI } from "../../api/api";

const HomeView = ({token, gitData, setNewMail, admin, portfolioData, setActiveIndex}) => {
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const serverUrl = import.meta.env.VITE_CHRONICLE_URL;

  useEffect(() => {

    const messageUI = () => {
      const footer = document.querySelector("footer");
      const main = document.querySelector("main");
      const bio = document.querySelector(".bio.fixed");

      if (window.scrollY > footer.offsetTop - window.innerHeight && window.innerWidth >= 992) {
        bio.style.position = "absolute";
        bio.style.top = `${main.clientHeight - bio.clientHeight}px`;
      } else {
        bio.removeAttribute("style");
      }
    }

    window.addEventListener('scroll', messageUI);
    window.addEventListener('resize', messageUI);

    return () => {
      window.removeEventListener('scroll', messageUI);
      window.removeEventListener('resize', messageUI);
    }
  }, [])

  useEffect(() => {
    const projectList = [];
    for (let project of portfolioData) {
      if (projectList.includes(project)) {
        break;
      } else {
        projectList.push(project);
      }
    }
    setProjects(projectList);
  }, [portfolioData])

  const click = (key) => {
    setActiveIndex(key);
    window.scrollTo(0, 0);
    navigate("/portfolio");
  }

  useEffect(() => {
    BlogAPI.getRecent()
      .then(data => setPosts(data))
      .catch(error => console.log(error));
  }, [])

  return (
    <>
    <main className='home container'>

      <section className="bio fixed">
        <div className="bio-container">
          <div className="bio-top">
            <div className="bio-img">
              <img src={selfie} alt="Damon Turcotte" />
            </div>

            <h2 className="bio-title">I'm Damon Turcotte<span>,</span></h2>
            <h2 className="bio-title-2">Web Developer<span>.</span></h2>
            <p>
              I'm a full stack web developer in Lethbridge, Alberta. I design and build client and server side web applications, and configure the cloud servers they live on.
            </p>
            <p>
              Check out the rest of the site to see what I do!
            </p>
          </div>
    
          <div className="bio-bottom">
            <div className="bio-contact">
              {/* <a href="tel:18254374025">1-825-437-4025</a>
              <a href="mailto:damon.j.turcotte@gmail.com">damon.j.turcotte@gmail.com</a> */}
            </div>
            <div className="bio-links">
              <div>
                <a className="social-link" href="https://github.com/Altagrave-Git">
                  <Github />
                </a>
                <a className="social-link" href="https://www.linkedin.com/in/damon-turcotte-457b1a269">
                  <Linkedin />
                </a>
                <a className="social-link" href="https://twitter.com/damon_turcotte">
                  <Twitter />
                </a>
              </div>
              <a href={resume} target="_blank"><input type="button" value="Resume" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="placeholder"></section>

      <aside className="home">
        {/* <div className="home-about">
          <h3 className="subtitle-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
            &nbsp;About
          </h3>

          <div className="home-about-card">
            <h4>Background</h4>
            <p>
              So here's a placeholder paragraph that is supposed to contain content that describes a little bit about myself, my background and the services that I offer.
            </p>
          </div>
        </div> */}

        {/* <div className="home-about">
          <h3 className="subtitle-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"/></svg>
            &nbsp;Services
          </h3>
        </div> */}

        <h3 className="subtitle-2">
        <svg xmlns="http://www.w3.org/2000/svg" id="skills-title-icon" viewBox="0 0 512 512"><path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
          &nbsp;Skills & Tech
        </h3>
        <Skills />

        { projects && projects.length > 0 &&
          <div className="home-card-container">
            <h3 className="subtitle-2">
              <svg viewBox="0 -3 19 19"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -3283.000000)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M129.204085,3126.419 C129.587463,3126.032 129.587463,3125.405 129.204085,3125.018 L129.191207,3125.005 C128.807829,3124.618 128.186697,3124.618 127.803319,3125.005 L124.287534,3128.553 C123.904155,3128.94 123.904155,3129.568 124.287534,3129.955 L127.803319,3133.503 C128.186697,3133.89 128.807829,3133.89 129.191207,3133.503 L129.204085,3133.49 C129.587463,3133.103 129.587463,3132.476 129.204085,3132.089 L127.090057,3129.955 C126.706679,3129.568 126.706679,3128.94 127.090057,3128.553 L129.204085,3126.419 Z M142.712466,3128.553 L139.196681,3125.005 C138.814294,3124.618 138.192171,3124.618 137.808793,3125.005 L137.795915,3125.018 C137.412537,3125.405 137.412537,3126.032 137.795915,3126.419 L139.910934,3128.553 C140.294312,3128.94 140.294312,3129.568 139.910934,3129.955 L137.795915,3132.089 C137.412537,3132.476 137.412537,3133.103 137.795915,3133.49 L137.808793,3133.503 C138.192171,3133.89 138.814294,3133.89 139.196681,3133.503 L142.712466,3129.955 C143.095845,3129.568 143.095845,3128.94 142.712466,3128.553 L142.712466,3128.553 Z M136.809359,3124.40817 L131.74698,3135.23866 C131.582981,3135.57915 131.295245,3136 130.924037,3136 L130.904396,3136 C130.182602,3136 129.712209,3135.0197 130.031369,3134.3588 L135.064287,3123.63077 C135.228287,3123.29128 135.836165,3123.02511 135.836165,3123.02511 L135.836165,3123 C136.818198,3123 137.127538,3123.74728 136.809359,3124.40817 L136.809359,3124.40817 Z"> </path> </g> </g> </g> </g></svg>  
              &nbsp;Projects
            </h3>
            {projects.map((project, index) => {
              return (
                <ProjectCard key={index} project={project} page={"home"} click={() => click(index)} />
              )
            })}
          </div>
        }

        <GitStream gitData={gitData} />

        { posts && posts.length > 0 &&
          <div className="home-posts-container">
            <h3 className="subtitle-2">
              <svg className="home-title-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M96 96c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H80c-44.2 0-80-35.8-80-80V128c0-17.7 14.3-32 32-32s32 14.3 32 32V400c0 8.8 7.2 16 16 16s16-7.2 16-16V96zm64 24v80c0 13.3 10.7 24 24 24H296c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24H184c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z"/></svg>
              &nbsp;Latest Posts
            </h3>
            { 
              posts.map((item, index) => {
                return (
                  <div className="home-post" key={index} onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/blog/${item.category_slug}/${item.slug}`);
                  }}>
                    <div className="home-post-image">
                      <img src={serverUrl + item.image} alt="blog article thumbnail" />
                    </div>

                    <div className="home-post-info">
                      <h4 className="home-card-title">{item.title}</h4>
                      <h5 className="home-card-category">{item.category_name} | {item.pub_date}</h5>
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
      </aside>
    </main>
    
    <footer className="home-footer">
      <h2>Contact</h2>
      <MessageForm token={token} setNewMail={setNewMail} admin={admin} />
      <p style={{color: "#777", textAlign: "center", fontSize: "1rem"}}>© 2023 Damon Turcotte</p>
    </footer>
  </>
  )
};

export default HomeView;