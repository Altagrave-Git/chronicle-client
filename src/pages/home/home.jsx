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
import selfie from "../../images/selfie.jpg"

const HomeView = ({token, gitData, setNewMail, admin, portfolioData, setActiveIndex}) => {
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

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
    navigate("/portfolio");
  }

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

          {/* <div className="bio-middle">
            <div className="bio-spacer">

            </div>
            <div className="bio-navigator">
              <h4>1 - - - Skills</h4>
              <h4>2 - - - Activity</h4>
              <h4>3 - - - Contact</h4>
            </div>
          </div> */}
    
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
      </aside>
    </main>

    <footer className="home-footer">
      <MessageForm token={token} setNewMail={setNewMail} admin={admin} />
    </footer>
  </>
  )
};

export default HomeView;