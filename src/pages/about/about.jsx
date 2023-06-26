import "./about.scss";
import hibernation1A from "../../images/hibernation-1a.png";
import hibernation1B from "../../images/hibernation-1b.png";
import hibernation2A from "../../images/hibernation-2a.png";
import hibernation2B from "../../images/hibernation-2b.png";
import hibernation3A from "../../images/hibernation-3a.png";
import hibernation3B from "../../images/hibernation-3b.png";
import hibernation4A from "../../images/hibernation-4a.png";
import hibernation4B from "../../images/hibernation-4b.png";
import selfie from "../../images/self.jpg";
import { useState, useEffect } from "react";

const AboutView = () => {
  const [gameImage, setGameImage] = useState(0);

  useEffect(() => {
    const images = document.querySelector(".game-images");
    images.style.transform = `translateX(-${gameImage * 25}%)`;
  }, [gameImage])

  return (
    <div className="about">
      <img className="about-img" src={selfie} alt="about" />

      <h2>Hey, I'm Damon.</h2>

      <p>
        &nbsp;My journey into the world of tech started when I came across Harvard University's online programming course, <a href="https://pll.harvard.edu/course/cs50-introduction-computer-science" target="_blank">CS50x</a>. I'd been considering a career in tech for a while, the course sounded great, enrollment as an auditor was free and the world was on pause for a pandemic, so... it was time to dive in.
      </p>

      <p>
        &nbsp;Before I knew it, my first project was complete. Using MIT's Scratch software, I developed a game called <a href="https://scratch.mit.edu/projects/669990762" target="_blank">Hibernation</a>.
      </p>

      <div className="slider-component">
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
      </div>

      <p>
        &nbsp;That was fun, but it was time to get serious. I needed to learn the fundamentals.
      </p>

      <p>
        &nbsp;After some research, I'd decided to focus on Python, while using <a href="https://www.theodinproject.com/" target="_blank">The Odin Project</a> as a general curriculum guide. They don't offer a Python pathway, but I found their methodology and techniques very useful. Following their recommendations, I installed a Linux distribution - Fedora OS - booted it up, and got to work. 
      </p>

      <p>
        &nbsp;I spent the next couple of months learning the ins and outs of the Python programming language, with the guidance of the University of Michigan's <a href="https://www.si.umich.edu/people/charles-severance" target="_blank">Dr. Charles Severance</a>, and his course, <a href="https://online.umich.edu/series/python-for-everybody/" target="_blank">PY4E</a>.
      </p>

      <p>
        &nbsp;I was soon writing regular expressions, running web scrapers, interacting with APIs, configuring web sockets, building SQL databases. It was pretty cool, but the results were always plain text values in the terminal. This wouldn't do.
      </p>

      <p>
        &nbsp;I needed a front end, and <a href="https://www.udemy.com/user/coltsteele/" target="_blank">Colt Steele</a> did an incredible job providing it, with his famous <a href="https://www.udemy.com/course/the-web-developer-bootcamp/" target="_blank">Web Development Bootcamp</a>. Within a few months, I was using HTML, CSS and Javascript to make animations, render data from APIs and build interactive web pages.
      </p>
      
      <p>
        &nbsp;Once the front end modules of the bootcamp were complete, something was still missing. I could build websites, I could manipulate data, but I couldn't put these skills together, and the rest of the bootcamp was Node.js. It was time to move back to Python. Or, more specifically, Django, with <a href="https://www.udemy.com/user/joseportilla/" target="_blank">Jose Portilla</a> and his course, <a href="https://www.udemy.com/course/django-and-python-full-stack-developer-masterclass/" target="_blank">Django and Python Masterclass</a>.
      </p>

      <p>
        &nbsp;After another few months of work, everything was finally coming together. I had finally developed a mental model of how to build out applications, end-to-end - excluding IT operations, which would come later, during the headache of deployment - and was equipped with the tools necessary to build them, render them, and intregrate them into a system. I had finally made it.
      </p>

      <h2>I'm a Web Developer!</h2>

      <h3>
        And so I began developing Echo Social Network!
      </h3>

      <h3>
        (Yes, really. That's what I started with 😅)
      </h3>
    </div>
  )
}

export default AboutView;