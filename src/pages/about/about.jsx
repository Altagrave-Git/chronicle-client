import "./about.scss";
import hibernation1A from "../../images/hibernation-1a.png";
import hibernation2A from "../../images/hibernation-2a.png";
import hibernation3A from "../../images/hibernation-3a.png";
import hibernation4A from "../../images/hibernation-4a.png";
import { useState, useEffect } from "react";

const AboutView = ({bgslide, selfie}) => {
  const [gameImage, setGameImage] = useState(0);

  useEffect(() => {
    const images = document.querySelector(".game-images");
    images.style.transform = `translateX(-${gameImage * 25}%)`;
  }, [gameImage])

  return (
    <div className="about" style={{backgroundImage: bgslide}} >
      <div id={"bgslide"}>
        <img src={bgslide} alt="background" />
        <img src={bgslide} alt="background" />
      </div>
      <img className="about-img" src={selfie} alt="about" />

      <h2>Hey, I'm Damon.</h2>

      <p>
        &nbsp;My journey into the world of tech started when I came across Harvard University's <a href="https://pll.harvard.edu/course/cs50-introduction-computer-science" target="_blank">CS50x</a> programming course. I'd been considering a career in tech for a while, the course sounded great, enrollment as an auditor was free and the world was on pause for a pandemic, so it was time to dive in.
      </p>

      <p>
        &nbsp;Before long, my first project was complete. I developed a game called <a href="https://scratch.mit.edu/projects/669990762" target="_blank">Hibernation</a>, using MIT's Scratch software.
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
        &nbsp;I spent the next couple of months learning the ins and outs of the Python programming language, with the guidance of the University of Michigan's <a href="https://www.si.umich.edu/people/charles-severance" target="_blank">Dr. Charles Severance</a>, and his course, <a href="https://online.umich.edu/series/python-for-everybody/" target="_blank">PY4E</a>. Writing regular expressions, running web scrapers, manipulating data, interacting with APIs, building SQL databases. It was cool, but the results were always plain text values in the terminal.
      </p>

      <p>
        &nbsp;I needed a front end, which <a href="https://www.udemy.com/user/coltsteele/" target="_blank">Colt Steele</a> did an excellent job providing with his famous <a href="https://www.udemy.com/course/the-web-developer-bootcamp/" target="_blank">Web Development Bootcamp</a>. Soon enough, using HTML, CSS and Javascript to make animations, render data from APIs and build interactive web pages became second nature, and made it possible to see the results of my code culminate visually. That made programming a whole lot more satisfying.
      </p>
      
      <p>
        Something was still missing though. I could build websites, I could manipulate data, but I couldn't put these skills together effectively. It was time to move back to Python. Or more specifically, Django, with <a href="https://www.udemy.com/user/joseportilla/" target="_blank">Jose Portilla</a> and his course, <a href="https://www.udemy.com/course/django-and-python-full-stack-developer-masterclass/" target="_blank">Django and Python Masterclass</a>.
      </p>

      <p>
        &nbsp;With that, everything was finally coming together. Learning all about Django's many functionalities filled in the missing pieces of the mental model necessary for building applications end-to-end - excluding IT operations, which would come later during the initial headache of deployment.
      </p>

      <h2>And so I started building!</h2>
    </div>
  )
}

export default AboutView;