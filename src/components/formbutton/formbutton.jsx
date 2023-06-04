const FormButton = ({ setFormModal, formModal, formType }) => {

  const containerClass = `btn-container btn-container-${formType}`
  const buttonClass = `btn-add btn-add-${formType}`

  const activate = () => {
    setFormModal(formType);
  }

  return (
  <div className={containerClass}>
    <button className={buttonClass} onClick={() => activate()}>
      + {formType}
    </button>
  </div>
  )
}

export default FormButton;