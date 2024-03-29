import './forms.scss';
import { useState, useEffect } from 'react';
import { ContentAPI } from '../../api/api';

const SectionForm = ({token, portfolioData, activeIndex, setFormModal, setRetrievePortfolio}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('text');
  const [order, setOrder] = useState(0);
  const [mode, setMode] = useState(0);
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    const sections = portfolioData[activeIndex].sections;
    if (mode > 0) {
      setTitle(sections[mode - 1].title);
      setDescription(sections[mode - 1].description);
      setType(sections[mode - 1].type);
      try {
        setOrder(sections[mode - 1].order)
      } catch {
        setOrder(0);
      }
      document.querySelector(`#section-type-${sections[mode - 1].type}`).click();
    } else {
      setTitle('');
      setDescription('');
      setType('text');
      setOrder(0);
      document.querySelector('#section-type-text').click();
    }
  }, [mode])

  // switch between new section and section to edit
  const switchModeLeft = () => {
    const sections = portfolioData[activeIndex].sections;
    if (mode > 0) {
      setMode(mode - 1);
    } else {
      setMode(sections.length);
    }
  }

  const switchModeRight = () => {
    const sections = portfolioData[activeIndex].sections;
    if (sections.length > mode) {
      setMode(mode + 1);
    } else {
      setMode(0);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = portfolioData[activeIndex].id;
    const form = {
      project: id,
      title: title,
      description: description,
      type: type,
    }
    if (order > 0) {
      form["order"] = order;
    }

    ContentAPI.section(token, id, form)
      .then(res => {
        setFormModal(null);
        setRetrievePortfolio(true);
      })
      .catch(error => console.log(error));
  }

  const handleEdit = async (e) => {
    e.preventDefault();

    const pid = portfolioData[activeIndex].id;
    const sid = portfolioData[activeIndex].sections[mode - 1].id;

    const form = {
      project: pid,
      title: title,
      description: description,
      type: type,
    }
    if (order > 0) {
      form["order"] = order;
    }

    ContentAPI.editSection(token, pid, sid, form)
      .then(res => {
        setFormModal(null);
        setRetrievePortfolio(true);
      })
      .catch(error => console.log(error));
  }

  const handleDelete = () => {
    if (verify) {
      const pid = portfolioData[activeIndex].id;
      const sid = portfolioData[activeIndex].sections[mode - 1].id;

      ContentAPI.deleteSection(token, pid, sid)
      .then(() => location.reload())
      .catch(error => console.log(error));
    } else {
      setVerify(true);
    }
  }

  return (
    <form onSubmit={ mode == 0 ? handleSubmit : handleEdit }>
      <div className="form-title-container">
        <input type="button" id="form-left" onClick={() => switchModeLeft()} />
        { mode ?
        <h1 className="title-2">Edit Section</h1>
        :
        <h1 className="title-2">Add Section</h1>
        }
        <input type="button" id="form-right" onClick={() => switchModeRight()} />
      </div>
      <input type="text" name="title" className="form-text" placeholder="Section title" value={title} onChange={e => setTitle(e.target.value)} autoComplete="false" />
      <textarea name="description" className="form-text" placeholder="Section content"  cols="30" rows="8" required={false} value={description} onChange={e => setDescription(e.target.value)} />
      <div className="inline-form-text">
        <label htmlFor="order">Order:</label>
        <input className="form-text" type="number" name="order" id="order" value={order} onChange={e => setOrder(e.target.value)} />
      </div>

      <div className="section-type-container">
        <div className="section-type">
          <label htmlFor="section-type-text">Text</label>
          <input type="radio" name="type" id="section-type-text" className="section-type-btn" value={"text"} onClick={e => setType(e.target.value)} defaultChecked />
        </div>
        <div className="section-type">
          <label htmlFor="section-type-list">List</label>
          <input type="radio" name="type" id="section-type-list" className="section-type-btn" value={"list"} onClick={e => setType(e.target.value)} />
        </div>
        <div className="section-type">
          <label htmlFor="section-type-table">Table</label>
          <input type="radio" name="type" id="section-type-table" className="section-type-btn" value={"table"} onClick={e => setType(e.target.value)} />
        </div>
        <div className="section-type">
          <label htmlFor="section-type-other">Other</label>
          <input type="radio" name="type" id="section-type-other" className="section-type-btn" value={"other"} onClick={e => setType(e.target.value)} />
        </div>
      </div>
      <div className="submit-container">
        { mode > 0 &&
          <input type="button" className="form-submit" id="delete" value="Delete" onClick={() => handleDelete()} />
        }
        { title.length && description.length && type.length ?
          <button type="submit" className="form-submit">Save</button>
          :
          <button type="submit" className="form-submit" disabled>Save</button>
        }
      </div>
      { verify &&
      <div className="verify-delete-container">
        <div className="verify-delete">
          <h3>Are you sure you want to delete this section?</h3>
          <div className="verify-delete-btns">
            <input type="button" className="verify-delete-yes" value="Yes" onClick={() => handleDelete()} />
            <input type="button" className="verify-delete-no" value="No" onClick={() => setVerify(false)} />
          </div>
        </div>
      </div>
      }
    </form>
  )
}

export default SectionForm;