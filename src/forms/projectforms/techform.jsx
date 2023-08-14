import './forms.scss';
import { useEffect, useState } from 'react';
import { ContentAPI } from '../../api/api';

const TechForm = ({ token, portfolioData, activeIndex, setFormModal, setRetrievePortfolio }) => {
  const [projectTech, setProjectTech] = useState({used: [], unused: []});
  const [techIter, setTechIter] = useState(0);
  const [newTech, setNewTech] = useState('');

  const url = import.meta.env.VITE_CHRONICLE_URL + "/projects/" + portfolioData[activeIndex].id + "/tech/";

  useEffect(() => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      const [used, unused] = [[],[]];
      data.used.forEach((item, index) => {
        used.push(item.tech);
      });
      data.unused.forEach((item, index) => {
        unused.push(item.tech);
      });
      setProjectTech({used: used, unused: unused});
    })
    .catch(err => console.log(err));
  }, []);

  const handleNewTech = (e) => {
    e.preventDefault();
    let techObject = projectTech;
    techObject.used.push(newTech);
    setProjectTech(techObject);
    setNewTech('');
  }

  const handleToUsed = (e) => {
    e.preventDefault();
    let techObject = {used: projectTech.used.slice(), unused: projectTech.unused.slice()};
    const selected = document.querySelector("#unused").selectedOptions;
    for (let item of selected) {
      let start = techObject.unused.indexOf(item.id);
      techObject.unused.splice(start, 1);
      techObject.used.push(item.id);
    }
    setProjectTech(techObject);
    setTechIter(techIter + 1);
  }

  const handleToUnused = (e) => {
    e.preventDefault();
    let techObject = {used: projectTech.used.slice(), unused: projectTech.unused.slice()};
    const selected = document.querySelector("#used").selectedOptions;
    for (let item of selected) {
      let start = techObject.used.indexOf(item.id);
      techObject.used.splice(start, 1);
      techObject.unused.push(item.id);
    }
    setProjectTech(techObject);
    setTechIter(techIter + 1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = portfolioData[activeIndex].id;
    const tech = []
    for (let element of document.querySelector("#used").children) {
      tech.push(element.id);
    }

    ContentAPI.tech(token, id, {tech: tech})
      .then(data => {
        setFormModal(null);
        setRetrievePortfolio(true);
      })
      .catch(error => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title-2">Technologies</h1>
      <div className="tech-options">
        <div className="tech-unused-container">
          <label htmlFor="unused">Unused:</label>
          <div>
            <select name="unused" id="unused" multiple>
            { projectTech.unused.length > 0 &&
            projectTech.unused.map((item, index) => {
              return <option key={index} id={item}>{item}</option>
            })
            }
            </select>
            <button onClick={e => handleToUsed(e)}>+</button>
          </div>
        </div>
        <div className="tech-used-container">
          <label htmlFor="used">Used:</label>
          <div>
            <select name="used" id="used" multiple>
            { projectTech.used.length > 0 &&
            projectTech.used.map((item, index) => {
              return <option key={index} id={item}>{item}</option>
            })
            }
            </select>
            <button onClick={e => handleToUnused(e)}>-</button>
          </div>
        </div>
      </div>
      <div className="custom-tech">
        <input type="text" className="form-text" id="custom" placeholder={"Add new technology"} value={newTech} onChange={e => setNewTech(e.target.value)} />
        <button onClick={e => handleNewTech(e)}>+</button>
      </div>
      <button type="submit" className="form-submit">Save</button>
    </form>
  )
}

export default TechForm;