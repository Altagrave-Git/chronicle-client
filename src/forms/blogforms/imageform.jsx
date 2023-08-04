import { useState, useEffect } from "react";
import { BlogAPI } from "../../api/api";
import { useParams } from "react-router-dom";
import { ReactComponent as Accept } from "../../icons/check.svg";
import { ReactComponent as Cancel } from "../../icons/xmark.svg";
import { ReactComponent as Delete } from "../../icons/trash.svg";
import defaultImage from "../../images/placeholder.png";

const BlogImageForm = ({ post, token, order, setApiCall, edit=-1, setEdit, formType='', setFormType, text='', id=false, aspect=0, wMax=800, currentImage=defaultImage }) => {
  const { category, slug } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [textData, setTextData] = useState(text);
  const [image, setImage] = useState(false);
  const [maxWidth, setMaxWidth] = useState(wMax);
  const [aspectRatio, setAspectRatio] = useState(aspect);

  useEffect(() => {

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('type', 'image');
    formData.append('order', order);
    formData.append('post', post.id);
    formData.append('text', textData);
    formData.append('aspect', aspectRatio);
    formData.append('max_width', maxWidth);

    if (image != null) {
      formData.append('image', image);
    }

    if (id) {
      formData.append('id', id);
      BlogAPI.updateContent(token, formData, category, slug, 'image', id)
        .then(() => setApiCall(true))
        .catch(error => console.log(error));

    } else {
      BlogAPI.createContent(token, formData, category, slug, 'image')
        .then(() => setApiCall(true))
        .catch(error => console.log(error));
    }
  }

  const handleDelete = async () => {
    BlogAPI.deleteContent(token, category, slug, 'image', id)
      .then(() => setApiCall(true))
      .catch(error => console.log(error));
  }

  console.log(edit, formType);

  return (
    <>
    <div className=""></div>
    <form className="blogform" onSubmit={handleSubmit}>
      <div className="blog-input-main">
        <input type="file" accept="image/*" name="image" className="blog-image-input" onChange={e => {
          setImage(e.target.files[0]);
          const [file] = e.target.files;
          if (file) {
            document.querySelector(".blog-input-image").src = URL.createObjectURL(file);
          }
        }} />

        <img src={currentImage} alt="image input preview" className="blog-input-image" />


        <textarea className={'blog-input-text'} type="text" name="text" id="text" rows={5} value={textData} onChange={e => setTextData(e.target.value)} placeholder="Image text... (optional)" />

        <div className="blogform-col">
          <label htmlFor="max_width">Max Width</label>
          <input type="number" name="max_width" id="max_width" value={maxWidth} onChange={e => setMaxWidth(e.target.value)} />
          <label htmlFor="aspect">Aspect Ratio</label>
          <select className="blog-input-select" name="aspect" id="aspect" value={aspectRatio} onChange={e => setAspectRatio(e.target.value)}>
            <option value={0} defaultValue={true}>--- Aspect Ratio(w:h) ---</option>
            <option value={2/1}>2:1</option>
            <option value={16/9}>16:9</option>
            <option value={4/3}>4:3</option>
            <option value={1}>1:1</option>
            <option value={0.75}>3:4</option>
            <option value={9/16}>9:16</option>
            <option value={0.5}>1:2</option>
          </select>
        </div>
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

export default BlogImageForm;