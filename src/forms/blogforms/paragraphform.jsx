import { useState, useEffect } from "react";
import { BlogAPI } from "../../api/api";
import { useParams } from "react-router-dom";
import { ReactComponent as Accept } from "../../icons/check.svg";
import { ReactComponent as Cancel } from "../../icons/xmark.svg";
import { ReactComponent as Delete } from "../../icons/trash.svg";

const BlogParagraphForm = ({ post, token, order, setApiCall, edit=-1, setEdit, formType='', setFormType, text='', id=false }) => {
  const { category, slug } = useParams();
  const [textData, setTextData] = useState(text);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('type', 'paragraph');
    formData.append('order', order);
    formData.append('post', post.id);
    formData.append('text', textData);

    if (id) {
      formData.append('id', id);
      BlogAPI.updateContent(token, formData, category, slug, 'paragraph', id)
      .then(data => {
        console.log(data);
        setApiCall(true);
      })
    } else {
      BlogAPI.createContent(token, formData, category, slug, 'paragraph')
        .then(data => {
          console.log(data);
          setApiCall(true);
        })
        .catch(error => console.log(error));
    }
  }

  const handleDelete = async () => {
    BlogAPI.deleteContent(token, category, slug, 'paragraph', id)
      .then(data => {
        setApiCall(true);
      })
      .catch(error => console.log(error));
  }

  console.log(edit, formType);

  return (
    <>
    <div className=""></div>
    <form className="blogform" onSubmit={handleSubmit}>
      <div className="blog-input-main">
        <textarea className={'blog-input-text'} type="text" name="text" id="text" rows={5} value={textData} onChange={e => setTextData(e.target.value)} placeholder="Start writing..." />
      </div>

      <div className="blog-input-save">
        <button type='button' className="blog-btn-cancel" onClick={ formType && formType.length > 0 ? (e) => {
          e.preventDefault()
          setFormType('');
        }:(e) => {
          e.preventDefault();
          setEdit(-1);
          }}><Cancel /></button>
        <button type="button" className="blog-btn-delete" onClick={() => setDeleteModal(true)}><Delete /></button>
        <button type="submit" className="blog-btn-save"><Accept /></button>
      </div>
    </form>
    
    { deleteModal === true &&
      <div className="verify-delete-container">
        <div className="verify-delete">
          <h3>Are you sure you want to delete this?</h3>
          <div className="verify-delete-btns">
            <input type="button" className="verify-delete-yes" value="Yes" onClick={handleDelete} />
            <input type="button" className="verify-delete-no" value="No" onClick={() => setDeleteModal(false)} />
          </div>
        </div>
      </div>

    }
    </>
  )
}

export default BlogParagraphForm;