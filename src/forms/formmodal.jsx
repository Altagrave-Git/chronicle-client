import './forms.scss';
import ProjectForm from './projectform';

const FormModal = ({ formModal, setFormModal }) => {
  return (
  <div className="form-modal-container">
    <div className="form-modal">
      <div className="form-close-container">
        <input type="button" value="x" className="form-close" onClick={() => setFormModal(null)} />
      </div>

      { formModal == "project" &&
        <ProjectForm />
      }
    </div>
  </div>
  )
}

export default FormModal;