import React from "react";
import './home.scss';
import GitStream from "../../components/gitstream/gitstream";
import Skills from "../../components/skills/skills";
import AuthAPI from "../../api/api";
import { ReactComponent as Linkedin } from '../../icons/linkedin.svg';
import { ReactComponent as Twitter } from '../../icons/twitter.svg';
import { ReactComponent as Github } from '../../icons/github.svg';

const HomeView = ({token, gitData}) => {

  return (
    <main className='home container'>

      <section className="bio fixed">
        <div className="bio-top">
          <h1 className="title">Damon Turcotte</h1>
          <h2 className="job">Web Developer</h2>
          <p>
            I am a self-taught developer with a broad range of technical skills, ranging from UI design and scripting to database management and server configuration. I specialize in functional programming, because I like to have clear, readable and fully customizable code.
          </p>
        </div>


        <div className="bio-bottom">
          <div className="bio-contact">
            <a href="tel:18254374025">1-825-437-4025</a>
            <a href="mailto:damon.j.turcotte@gmail.com">damon.j.turcotte@gmail.com</a>
          </div>
          <div className="bio-links">
          <a className="social-link" href="https://github.com/Altagrave-Git">
              <Github />
            </a>
            <a className="social-link" href="https://www.linkedin.com/in/damon-turcotte-457b1a269">
              <Linkedin />
            </a>
            <a className="social-link" href="#">
              <Twitter />
            </a>
          </div>
        </div>
      </section>

      <section className="placeholder"></section>

      <aside className="home">
        <Skills />
        <GitStream gitData={gitData} />
      </aside>

    </main>
  )
};

export default HomeView;