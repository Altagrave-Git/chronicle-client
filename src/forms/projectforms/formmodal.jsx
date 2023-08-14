import './forms.scss';
import ProjectForm from './projectform';
import ImageForm from './imageform';
import VideoForm from './videoform';
import TechForm from './techform';
import SectionForm from './sectionform';
import SnippetForm from './snippetform';

const FormModal = ({ formModal, setFormModal, portfolioData, activeIndex, token, project, setRetrievePortfolio }) => {

  return (
  <div className="form-modal-container">
    <div className="form-modal">
      <div className="form-close-container">
        <input type="button" value="x" className="form-close" onClick={() => setFormModal(null)} />
      </div>

      { formModal == "project" &&
        <ProjectForm token={token} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} setRetrievePortfolio={setRetrievePortfolio} />
      }
      {
        formModal == "image" &&
        <ImageForm token={token} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} setRetrievePortfolio={setRetrievePortfolio} />
      }
      {
        formModal == "video" &&
        <VideoForm token={token} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} setRetrievePortfolio={setRetrievePortfolio} />
      }
      { formModal == "tech" &&
        <TechForm token={token} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} setRetrievePortfolio={setRetrievePortfolio} />
      }
      { formModal == "section" &&
        <SectionForm token={token} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} setRetrievePortfolio={setRetrievePortfolio} />
      }
      { formModal == "snippet" &&
        <SnippetForm token={token} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} setRetrievePortfolio={setRetrievePortfolio} />
      }
    </div>
  </div>
  )
}

export default FormModal;