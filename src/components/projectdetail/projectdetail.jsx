import './projectdetail.scss'
import { ReactComponent as GithubLogo } from "../../icons/github.svg";
import { ReactComponent as SiteLogo } from "../../icons/website.svg";
import TechIcon from '../techicon/techicon';
import FormButton from '../formbutton/formbutton';

const ProjectDetail = ({ project, handleActive, admin, setFormModal }) => {
  const baseUrl = import.meta.env.VITE_CHRONICLE_URL;

  return (
  <>
    { project &&
      <div className="project-detail">
        <div className="btn-back" onClick={() => handleActive()}>
          <svg viewBox="6 5 10 15" fill="none"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M8 12L16 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 9L8.08704 11.913V11.913C8.03897 11.961 8.03897 12.039 8.08704 12.087V12.087L11 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          <div>Back</div>
        </div>
        <div className="project-detail__header">
          <div>
            <h2 className="project-detail__title">{project.name}</h2>
            <h3 className="project-detail__category">{project.category}</h3>
          </div>
          <div className="project-detail__links">
            { project.site &&
            <a href={project.site} target="_blank" className="project-detail__link website">
              <SiteLogo />
              <div>View Website</div>
            </a>
            }
            { project.repo &&
            <a href={project.repo} target="_blank" className="project-detail__link github">
              <GithubLogo />
              <div>Source Code</div>
            </a>
            }
          </div>
        </div>
        <div className="project-detail__body">
          <div className="project-detail__description">
            <p>{project.description}</p>
          </div>
          { project.tech &&
            <div className="project-detail__section">
              <h4>Technologies</h4>
              <div className="project-detail__tech">
                  {project.tech.map((tech, index) => {
                    return (
                      <div key={index} className="project-detail__tech-item">
                        <TechIcon tech={tech.tech} />
                        <span>{tech.tech}</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          }
          { project.videos &&
            project.videos.map((item, index) => {
              return (
                <div key={index}>
                  <h6 className="subtitle-2">{item.title}</h6>
                  <video width="280" height="210" controls>
                    <source src={baseUrl + item.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )
            })
          }
          <div className="project-detail__sections">
            {
              project.sections && project.sections.map((section, index) => {
                return (
                  <div key={index} className="project-detail__section">
                    <h4>{section.title}</h4>
                    {section.type === 'text' &&

                      <p>{section.description}</p>
                    }
                    { section.type === 'list' &&
                      <ul>
                        {section.description.split('\n').map((item, index) => {
                          return <li key={index}>{item}</li>
                        })}
                      </ul>
                    }
                    {section.snippets &&
                      section.snippets.map((snippet, index) => {
                        return <div key={index} dangerouslySetInnerHTML={{__html: snippet.highlighted}} />
                      })
                    }
                  </div>
                )
              })
            }     
          </div>
        </div>
      </div>
    }
  </>
  )
}

export default ProjectDetail;