import { useState, useEffect } from 'react';
import ProjectCard from "../../components/projectcard/projectcard";
import ProjectDetail from "../../components/projectdetail/projectdetail";
import './portfolio.scss';
import FormButton from '../../components/formbutton/formbutton';
import FormModal from '../../forms/projectforms/formmodal';

const PortfolioView = ({ admin, token, portfolioData, activeIndex, setActiveIndex, setRetrievePortfolio }) => {
  const [projectDetail, setProjectDetail] = useState({});
  const [formModal, setFormModal] = useState();

  // Swipe event for project carousel
  useEffect(() => {
    const carousel = document.querySelector("div.portfolio");

    carousel.addEventListener("touchstart", function (e) {

    });

    carousel.addEventListener("touchend", function (e) {

    })
  }, [])

  // Rotate active index state backwards
  const handlePrev = () => {
    const height = document.querySelector(".active-container").clientHeight;
    const timing = { duration: 200, iterations: 1 }
    const cards = document.querySelectorAll(".project-card");
    let scaleS, scaleE;

    for (let card of cards) {
      if (card.className.includes(" prev-card")) {
        [scaleS, scaleE] = [0.8, 1];
      } else if (card.className.includes("active-card")) {
        [scaleS, scaleE] = [1, 0.8];
      } else {
        [scaleS, scaleE] = [0.8, 0.8];
      }

      let animation = [
        { transform: `translateY(-${height}px) scale(${scaleS})` },
        { transform: `translateY(0) scale(${scaleE})` }
      ]

      card.animate(animation, timing);
    }

    if (activeIndex === 0) {
      setActiveIndex(portfolioData.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
    window.scrollTo(0, 0);
  }

  // Rotate active index state forwards
  const handleNext = () => {
    const height = document.querySelector(".active-container").clientHeight;
    const timing = { duration: 200, iterations: 1 }
    const cards = document.querySelectorAll(".project-card");
    let scaleS, scaleE;

    for (let card of cards) {
      if (card.className.includes(" next-card")) {
        [scaleS, scaleE] = [0.8, 1];
      } else if (card.className.includes("active-card")) {
        [scaleS, scaleE] = [1, 0.8];
      } else {
        [scaleS, scaleE] = [0.8, 0.8];
      }

      let animation = [
        { transform: `translateY(${height}px) scale(${scaleS})` },
        { transform: `translateY(0) scale(${scaleE})` }
      ]

      card.animate(animation, timing);
    }

    if (activeIndex === portfolioData.length - 1) {
      setActiveIndex(0);
      setProjectDetail(portfolioData[0]);
    } else {
      setActiveIndex(activeIndex + 1);
      setProjectDetail(portfolioData[activeIndex + 1]);
    }
    window.scrollTo(0, 0);
  }

  // (Mobile) Switch to project details page
  const handleActive = () => {
    if (document.querySelector('section.active')) {
      document.querySelector('section.portfolio').classList.remove('active');
      document.querySelector('aside.portfolio').classList.add('active');
    } else if (document.querySelector('aside.active')) {
      document.querySelector('aside.portfolio').classList.remove('active');
      document.querySelector('section.portfolio').classList.add('active');
    }
    // scroll to top of page
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    setProjectDetail(portfolioData[activeIndex]);
  }, [activeIndex, portfolioData])

  useEffect(() => {
    if (portfolioData.length > 0) {
      const beforePrev = document.querySelector('.before-prev-container');
      const prev = document.querySelector('.prev-container');
      const active = document.querySelector('.active-container');
      const next = document.querySelector('.next-container');
      const afterNext = document.querySelector('.after-next-container');

      const beforePrevCard = document.querySelector('.before-prev-card');
      const prevCard = document.querySelector('.prev-card');
      const activeCard = document.querySelector('.active-card');
      const nextCard = document.querySelector('.next-card');
      const afterNextCard = document.querySelector('.after-next-card');
  
      beforePrev.appendChild(beforePrevCard);
      prev.appendChild(prevCard);
      active.appendChild(activeCard);
      next.appendChild(nextCard);
      afterNext.appendChild(afterNextCard);
    }
  }, [activeIndex, portfolioData])

  const toggleAdmin = () => {
    const adminNav = document.querySelector(".admin-nav");
    const adminButton = document.querySelector(".admin-button-container");

    if (adminNav.classList.contains("hidden")) {
      adminNav.className = "admin-nav";
      adminButton.className = "admin-button-container";
    } else {
      adminNav.className = "admin-nav hidden";
      adminButton.className = "admin-button-container show";
    }
  }

  return (
    <main>
      { admin && !formModal &&
      <>
        <div className="admin-button-container">
          <input type="button" value="" className="admin-button" onClick={() => toggleAdmin()} />
        </div>
        <div className="admin-nav">
          <div>
            <FormButton setFormModal={setFormModal} formType={"project"} portfolioData={portfolioData} />
          </div>
          <div className="admin-button-list">
            <FormButton setFormModal={setFormModal} formType={"section"} portfolioData={portfolioData} />
            <FormButton setFormModal={setFormModal} formType={"tech"} portfolioData={portfolioData} />
            <FormButton setFormModal={setFormModal} formType={"snippet"} portfolioData={portfolioData} />
            <FormButton setFormModal={setFormModal} formType={"image"} portfolioData={portfolioData} />
            <FormButton setFormModal={setFormModal} formType={"video"} portfolioData={portfolioData} />
          </div>
        </div>
      </>
      }
      <section className="portfolio fixed active">
        { formModal &&
        <FormModal formModal={formModal} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} token={token} setRetrievePortfolio={setRetrievePortfolio} />
        }
        <div className="portfolio">
          <div className='before-prev-container'></div>
          <div className="prev-container"></div>
          <div className="active-container"></div>
          <div className="next-container"></div>
          <div className="after-next-container"></div>
          {portfolioData &&
            portfolioData.map((project, index) => {
              if (index === activeIndex) {
                return <ProjectCard key={index} project={project} click={setProjectDetail} handleActive={handleActive} setFormModal={setFormModal} admin={admin} ordering="active-card" />
              } else if (index === activeIndex - 1 || activeIndex === 0 && index === portfolioData.length - 1) {
                return <ProjectCard key={index} project={project} click={handlePrev} ordering="prev-card" />
              } else if (index === activeIndex - 2 || activeIndex === 1 && index === portfolioData.length - 1 || activeIndex === 0 && index === portfolioData.length - 2) {
                return <ProjectCard key={index} project={project} click={handlePrev} ordering="before-prev-card" />
              } else if (index === activeIndex + 1 || activeIndex === portfolioData.length - 1 && index === 0) {
                return <ProjectCard key={index} project={project} click={handleNext} ordering="next-card" />
              } else if (index === activeIndex + 2 || activeIndex === portfolioData.length - 1 && index === 1 || activeIndex === portfolioData.length - 2 && index === 0) {
                return <ProjectCard key={index} project={project} click={handleNext} ordering="after-next-card" />
              } else {
                return <ProjectCard key={index} project={project} click={() => {return}} ordering='' />
              }
            })
          }
        </div>
      </section>
      <section className="portfolio placeholder"></section>
      <aside className="portfolio">
          <ProjectDetail project={projectDetail} handleActive={handleActive} admin={admin} setFormModal={setFormModal} />
      </aside>
    </main>
  )
}

export default PortfolioView;