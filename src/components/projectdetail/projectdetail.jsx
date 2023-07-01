import './projectdetail.scss'
import { useEffect } from 'react';
import { ReactComponent as GithubLogo } from "../../icons/github.svg";
import { ReactComponent as SiteLogo } from "../../icons/website.svg";
import TechIcon from '../techicon/techicon';
import { useState } from 'react';
import ImageReel from '../imagereel/imagereel';

const ProjectDetail = ({ project, handleActive, admin, setFormModal }) => {
  const [viewImages, setViewImages] = useState(0);

  const baseUrl = import.meta.env.VITE_CHRONICLE_URL;

  useEffect(() => {
    if (project && project.id) {
      document.querySelector(".project-detail-background").style.backgroundImage = `url(${baseUrl + project.logo})`;
    }
  }, [project])

  return (
  <>
    { project && project.id &&
    <>
      <div className="project-detail-background-container">
        <div className="project-detail-background"></div>
      </div>
      <div className="project-detail">
        <div className="btn-back" onClick={() => handleActive()}>
          <svg viewBox="6 5 10 15" fill="none"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M8 12L16 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 9L8.08704 11.913V11.913C8.03897 11.961 8.03897 12.039 8.08704 12.087V12.087L11 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          <div>Back</div>
        </div>
        <div className="project-detail__header">
          <div className="project-detail__header-info">
            <h2 className="project-detail__title">{project.name}</h2>
            <h3 className="project-detail__category">{project.category}</h3>
          </div>
          <div className="project-detail__links">
            { project.site && project.site.split("/")[2] != "turcotte.tech" && project.site.split("/")[2] != "www.turcotte.tech" &&
            <a href={project.site} target="_blank" className="project-detail__link website">
              <SiteLogo />
              <div>View Website</div>
            </a>
            }
            { project.site && (project.site.split("/")[2] == "turcotte.tech" || project.site.split("/")[2] == "www.turcotte.tech") &&
            <a onClick={() => {
              let popUp = document.querySelector(".this-site-link");
              if (popUp.classList.contains("hide")) {
                popUp.className = "this-site-link";
                setTimeout(() => {popUp.classList.add("hide")}, 1000);
              }
            }} className="project-detail__link website">
              <SiteLogo />
              <div>View Website</div>
              <h6 className="this-site-link hide">ಠ_ಠ</h6>
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
            { project.description && project.description.split("\n").map((para, index) => {
              return <p key={index}>{para}</p>
            })}
          </div>
          { project.tech && project.tech.length > 0 &&
            <div className="project-detail__sectio">
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
          <div className="project-detail__sections">
            {
              project.sections && project.sections.map((section, index) => {
                return (
                  <div key={index} className="project-detail__section">
                    <h4>{section.title}</h4>
                    
                    {section.type === 'text' && section.description.split("\n").map((para, index) => {
                      return <p key={index}>{para}</p>
                    })
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
          { (project.videos || project.images) && (project.videos.length > 0 || project.images.length > 0) &&
            <div className="project-detail__section">
              <h4 className="project-detail__media-title">Media</h4>

              { project.images && project.images.length > 0 &&
              <div className="view-images-btn-container">
                <input className="view-images-btn" type="button" value="View Images" onClick={() => setViewImages(1)} />
              </div>
              }

              { viewImages === 1 &&
                <ImageReel images={project.images.map(image => image.image)} setViewImages={setViewImages} />
              }
              { project.videos && project.videos.length > 0 &&
                <div className="project-detail__videos">
                  <div className="videos-list">
                    {
                      project.videos.map((item, index) => {
                        return (
                          <div className="video-card" key={index}>
                            <video controls>
                              <source src={baseUrl + item.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>

                            <div className="video-info">
                              <h3 className="subtitle-2">{item.title}</h3>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
      </>
    }
  </>
  )
}

export default ProjectDetail;