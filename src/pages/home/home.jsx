import React, { useState } from "react";
import './home.scss';
import GitStream from "../../components/gitstream/gitstream";
import Skills from "../../components/skills/skills";
import MessageForm from "../../forms/messageform";
import { ReactComponent as Linkedin } from '../../icons/linkedin.svg';
import { ReactComponent as Twitter } from '../../icons/twitter.svg';
import { ReactComponent as Github } from '../../icons/github.svg';
import { Link } from "react-router-dom";
import { useEffect, useCallback } from "react";

const HomeView = ({token, gitData}) => {

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

  return (
    <>
    <main className='home container'>

      <section className="bio fixed">
        <div className="bio-container">
          <div className="bio-top">
            <h1 className="title">Damon Turcotte</h1>
            <p>
              Self-taught <span className="job">web developer</span> deploying full-stack web applications out of Lethbridge, Alberta. I love developing custom software from the ground up.
            </p>
            <p>
              Everything here - <Link to="/portfolio" className="link-red">portfolio</Link> included - was built with custom code and is part of an integrated network of applications I'm working to expand.
            </p>
          </div>

          <div className="bio-middle">
            <div className="bio-spacer">

            </div>
            <div>
              <h4>1 - - - Skills</h4>
              <br/>
              <h4>2 - - - Activity</h4>
              <br/>
              <h4>3 - - - Contact</h4>
            </div>
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
        </div>
      </section>

      <section className="placeholder"></section>

      <aside className="home">
        <Skills />
        <GitStream gitData={gitData} />
      </aside>
    </main>

    <footer className="home-footer">
      <MessageForm />
    </footer>
  </>
  )
};

export default HomeView;