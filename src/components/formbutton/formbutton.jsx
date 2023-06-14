const FormButton = ({ setFormModal, formType, portfolioData }) => {

  const containerClass = `btn-container btn-container-${formType}`
  const buttonClass = `btn-add btn-add-${formType}`

  const activate = () => {
    setFormModal(formType);
  }

  return (
  <div className={containerClass}>
    { portfolioData.length > 0 || formType == "project" ?
    <button className={buttonClass} onClick={() => activate()}>
      + {formType}
    </button>
    :
    <button className={buttonClass} onClick={() => activate()} disabled>
      + {formType}
    </button>
    }
  </div>
  )
}

export default FormButton;