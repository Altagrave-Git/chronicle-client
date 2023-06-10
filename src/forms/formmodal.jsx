import './forms.scss';
import ProjectForm from './projectform';
import ImageForm from './imageform';
import TechForm from './techform';
import SectionForm from './sectionform';
import SnippetForm from './snippetform';

const FormModal = ({ formModal, setFormModal, portfolioData, activeIndex, token, project }) => {

  return (
  <div className="form-modal-container">
    <div className="form-modal">
      <div className="form-close-container">
        <input type="button" value="x" className="form-close" onClick={() => setFormModal(null)} />
      </div>

      { formModal == "project" &&
        <ProjectForm token={token} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} />
      }
      {
        formModal == "image" &&
        <ImageForm token={token} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} />
      }
      { formModal == "tech" &&
        <TechForm token={token} portfolioData={portfolioData} activeIndex={activeIndex} />
      }
      { formModal == "section" &&
        <SectionForm token={token} portfolioData={portfolioData} activeIndex={activeIndex} />
      }
      { formModal == "snippet" &&
        <SnippetForm token={token} portfolioData={portfolioData} activeIndex={activeIndex} />
      }
    </div>
  </div>
  )
}

export default FormModal;