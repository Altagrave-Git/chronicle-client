import "./about.scss";
import hibernation1A from "../../images/hibernation-1a.png";
import hibernation2A from "../../images/hibernation-2a.png";
import hibernation3A from "../../images/hibernation-3a.png";
import hibernation4A from "../../images/hibernation-4a.png";
import { useState, useEffect } from "react";

const AboutView = ({bgslide, selfie}) => {
  // const [gameImage, setGameImage] = useState(0);

  // useEffect(() => {
  //   const images = document.querySelector(".game-images");
  //   images.style.transform = `translateX(-${gameImage * 25}%)`;
  // }, [gameImage])

  return (
    // <div className="about" style={{backgroundImage: bgslide}} >
    <div className="about">
      {/* <div id={"bgslide"}>
        <img src={bgslide} alt="background" />
        <img src={bgslide} alt="background" />
      </div> */}
      <div className="about-head">
        <img className="about-img" src={selfie} alt="about" />

        <h2>I'm Damon Turcotte.</h2>
      </div>

      <p>
        &nbsp;I'm a programmer, so it may not come as a huge surprise, but I'm a bit of a nerd. Hardcore gamer, anime connoisseur, pianist, tech junkie. Most of my interests have taken a back seat to writing code though, as I've been doing it for most of the day, every day, for... quite a while now.
      </p>

      <p>
        &nbsp;As a teen, I used to dabble in flash and actionscript, but my journey into code didn't really start until I came across Harvard's <a href="https://pll.harvard.edu/course/cs50-introduction-computer-science" target="_blank">CS50</a> programming course during the pandemic. Enrolling as an auditor, it wasn't long until my first project was complete. A game called <a href="https://scratch.mit.edu/projects/669990762" target="_blank">Hibernation</a>, developed using MIT's Scratch software.
      </p>

      {/* <div className="slider-component">
        <div className="image-slider-container">

          <div className="image-slider">
            <div className="game-images">
              <img className="game-thumbnail" src={hibernation1A} alt="game image 1" />
              <img className="game-thumbnail" src={hibernation2A} alt="game image 2" />
              <img className="game-thumbnail" src={hibernation3A} alt="game image 3" />
              <img className="game-thumbnail" src={hibernation4A} alt="game image 4" />
            </div>
          </div>
        </div>

        <div className="game-buttons-container">
          <div className="game-buttons">
            <input type="radio" name="hibernation" id="hib1" value={0} onClick={e => setGameImage(e.target.value)} defaultChecked />
            <input type="radio" name="hibernation" id="hib2" value={1} onClick={e => setGameImage(e.target.value)} />
            <input type="radio" name="hibernation" id="hib3" value={2} onClick={e => setGameImage(e.target.value)} />
            <input type="radio" name="hibernation" id="hib4" value={3} onClick={e => setGameImage(e.target.value)} />
          </div>
        </div>
      </div> */}

      <p>
        &nbsp;I'd forgotten how much I enjoyed doing this. That little taste of development re-ignited my passion for this kind of work, so I needed to learn the fundamentals.
      </p>

      <p>
        &nbsp;I spent the next couple of months learning the ins and outs of the Python programming language, with the guidance of the University of Michigan's <a href="https://www.si.umich.edu/people/charles-severance" target="_blank">Dr. Charles Severance</a>, and his course, <a href="https://online.umich.edu/series/python-for-everybody/" target="_blank">PY4E</a>. Writing regular expressions, running web scrapers, manipulating data, interacting with APIs, building SQL databases. It was cool, but the results were always plain text values in the terminal.
      </p>

      <p>
        &nbsp;I needed a front end, which <a href="https://www.udemy.com/user/coltsteele/" target="_blank">Colt Steele</a> did an excellent job providing with his famous <a href="https://www.udemy.com/course/the-web-developer-bootcamp/" target="_blank">Web Development Bootcamp</a>. Soon enough, using HTML, CSS and Javascript to make animations, render data from APIs and build interactive web pages were drilled into my memory, and made it possible to see the results of my code culminate visually. That alone made programming much, much more satisfying.
      </p>
      
      <p>
        There were still missing pieces though. I could make interactive websites, build and manipulate databases, communicate with third-party software, but I couldn't put these skills together very effectively. So, I had to move back to Python. Or more specifically, Django, with <a href="https://www.udemy.com/user/joseportilla/" target="_blank">Jose Portilla</a> and his course, <a href="https://www.udemy.com/course/django-and-python-full-stack-developer-masterclass/" target="_blank">Django and Python Masterclass</a>.
      </p>

      <p>
        &nbsp;Getting the hang of how to leverage Django's many built-in functionalities over the next couple of months helped to make everything come together in a much cleaner way. That filled in most of the missing pieces of the mental model necessary to begin constructing applications end-to-end. 
      </p>

      <h2>So I started building!</h2>

      <p className="about-footer">(One of the things I inevitably learned along the way was that the scope and scale of technologies, languages and libraries I didn't yet know was... gargantuan. More than one person can learn in a life-time. That certainly won't stop me from trying though 😅)</p>
    </div>
  )
}

export default AboutView;