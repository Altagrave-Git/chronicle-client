import { useState, useEffect } from 'react';
import ProjectCard from "../../components/projectcard/projectcard";
import ProjectDetail from "../../components/projectdetail/projectdetail";
import './portfolio.scss';
import FormButton from '../../components/formbutton/formbutton';
import FormModal from '../../forms/formmodal';

const PortfolioView = ({ admin, token }) => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [projectDetail, setProjectDetail] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [formModal, setFormModal] = useState();

  // Retrieve and set project data from Chronicle API
  useEffect(() => {
    fetch(import.meta.env.VITE_CHRONICLE_URL + '/projects/')
      .then(response => response.json())
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
        console.log(data)
      })
      .catch(error => console.log(error));
  }, []);

  // Rotate active index state backwards
  const handlePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(portfolioData.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
    window.scrollTo(0, 0);
  }

  // Rotate active index state forwards
  const handleNext = () => {
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

  return (
    <main>
      { admin && !formModal &&
      <div className="admin-nav">
        <div>
          <FormButton setFormModal={setFormModal} formType={"project"} />
        </div>
        <div>
          <FormButton setFormModal={setFormModal} formType={"image"} />
          <FormButton setFormModal={setFormModal} formType={"tech"} />
          <FormButton setFormModal={setFormModal} formType={"section"} />
        </div>
      </div>
      }
      <section className="portfolio fixed active">
        { formModal &&
        <FormModal formModal={formModal} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} token={token} />
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