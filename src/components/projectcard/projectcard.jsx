import './projectcard.scss'
import TechIcon from '../techicon/techicon';

const ProjectCard = ({ project, ordering, click, handleActive=() => {return}, page="portfolio" }) => {
  const { name, category, description, site, repo, image, images, tech, logo } = project;
  const baseUrl = import.meta.env.VITE_CHRONICLE_URL;
  const defaultImage = import.meta.env.VITE_DEFAULT_IMG;

  return (
    <>
    { project && project.id && page == "portfolio" ?
      <div onClick={ordering === 'active-card' ? () => {
        click(project);
        handleActive();
      } : () => click(project)} className={'project-card' + ' ' + ordering}>
        <div className="project-card__image">
          <img src={ image.length ?
              baseUrl + image
              :
              defaultImage
            } alt={"project image"} />
        </div>
        <div className="project-card__header">
          <h2 className="project-card__title">{name}</h2>
          <h3 className="project-card__category">{category}</h3>
        </div>
      </div>
      :
      <div onClick={click} className="home-card">
        <div className="home-card-main">
          <div className='home-card-img'>
              <img src={baseUrl + logo} alt="logo" />
          </div>

          <div className="home-card-header">
            <h2 className="home-card-title">{name}</h2>
            <h3 className="home-card-category">{category}</h3>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default ProjectCard;