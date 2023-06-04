import './projectcard.scss'
import FormButton from '../formbutton/formbutton';

const ProjectCard = ({ project, ordering, click, handleActive=null }) => {
  const { name, category, description, site, repo, images, apps } = project;
  const baseUrl = import.meta.env.VITE_CHRONICLE_URL;
  const defaultImage = import.meta.env.VITE_DEFAULT_IMG;

  return (
    <div onClick={ordering === 'active-card' ? () => {
      click(project);
      handleActive();
    } : () => click(project)} className={'project-card' + ' ' + ordering}>
      <div className="project-card__image">
        <img src={ images.length ?
            baseUrl + images[0].image
            :
            defaultImage
          } alt={"project image"} />
      </div>
      <div className="project-card__header">
        <h2 className="project-card__title">{name}</h2>
        <h3 className="project-card__category">{category}</h3>
      </div>
    </div>
  )
}

export default ProjectCard;