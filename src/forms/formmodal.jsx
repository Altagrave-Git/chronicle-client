import './forms.scss';
import ProjectForm from './projectform';
import ImageForm from './imageform';

const FormModal = ({ formModal, setFormModal, portfolioData, activeIndex, token }) => {

  return (
  <div className="form-modal-container">
    <div className="form-modal">
      <div className="form-close-container">
        <input type="button" value="x" className="form-close" onClick={() => setFormModal(null)} />
      </div>

      { formModal == "project" &&
        <ProjectForm token={token} setFormModal={setFormModal} />
      }
      {
        formModal == 'image' &&
        <ImageForm token={token} setFormModal={setFormModal} portfolioData={portfolioData} activeIndex={activeIndex} />
      }
    </div>
  </div>
  )
}

export default FormModal;