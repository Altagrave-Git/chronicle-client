import { useState, useEffect } from "react";
import "./blogforms.scss"
import { BlogAPI } from "../../api/api";
import { ReactComponent as Accept } from "../../icons/check.svg";
import { ReactComponent as Cancel } from "../../icons/xmark.svg";
import { ReactComponent as Delete } from "../../icons/trash.svg";
import { useParams, useNavigate } from "react-router-dom";

const PostForm = ({categories, token, writePost=false, setWritePost, setEditMain, titleData='', categoryData={}, descriptionData='', slug, setApiCall, setRetrieveCategories}) => {
  const [category, setCategory] = useState(Object.keys(categoryData).length > 0 ? categoryData.id : 0);
  const [categorySlug, setCategorySlug] = useState(Object.keys(categoryData).length > 0 ? categoryData.slug : '');
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);
  const [image, setImage] = useState(null);
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    if (addCategory) {
      BlogAPI.createCategory(token, { name: newCategory })
        .then(data => {
          formData.append("category", data.id);
          BlogAPI.createPost(token, formData, data.slug)
            .then(data => {
              setRetrieveCategories(true);
              setWritePost(false);
              navigate(`/blog/${newCategory.toLowerCase().replace(" ", "-")}/${data.slug}`);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

    } else {
      formData.append("category", category)
      BlogAPI.createPost(token, formData, categorySlug)
        .then(data => {
          setWritePost(false);
          navigate(`/blog/${categorySlug}/${data.slug}`);
        })
        .catch(error => console.log(error));
    }
  }

  const handleEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (image != null) {
      formData.append("image", image);
    }

    if (addCategory) {
      BlogAPI.createCategory(token, { name: newCategory })
        .then(data => {
          console.log(data);
          formData.append("category", data.id);
          BlogAPI.updatePost(token, formData, data.slug, slug)
            .then(data => {
              setRetrieveCategories(true);
              setEditMain(false);
              setApiCall(true);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

    } else {
      formData.append("category", category)
      BlogAPI.updatePost(token, formData, categorySlug, slug)
        .then(data => {
          setEditMain(false);
          setApiCall(true);
        })
        .catch(error => console.log(error));
    }
  }

  const handleDelete = () => {
    BlogAPI.deletePost(token, categorySlug, slug)
      .then(data => {
        setRetrieveCategories(true);
        setDeleteModal(false);
        navigate('/blog');
      })
      .catch(error => console.log(error));
  }

  return (
    <>
    <form className="blogform" onSubmit={writePost ? handleSubmit : handleEdit}>
      <div className="blog-input-main" style={{margin: "0.5rem 1rem"}}>
        <input type="file" accept="image/*" name="image" className="blog-image-input" onChange={(e) => setImage(e.target.files[0])} />
        <input type="text" name="title" className="blog-input-text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea name="description" className="blog-input-text" cols="30" rows="5" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        { addCategory ?
          <input type="text" name="category" placeholder="Category" className="form-text" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
        :
          <select className="blog-input-select" name="category" defaultValue={Object.keys(categoryData).length > 0 ? `${category} ${categorySlug}` : null} onChange={e => {
            setCategory(e.target.value.split(" ")[0]);
            setCategorySlug(e.target.value.split(" ")[1]);
          }}>
            <option value={null}>--- category ---</option>
            { categories && categories.length > 0 &&
              categories.map((item, index) => {
                return <option key={index} value={`${item.id} ${item.slug}`}>{item.name}</option>
              })
            }
          </select>
        }
        <div style={{width: 'fit-content'}} className="form-row">
          <input type="radio" onClick={() => setAddCategory(false)} style={{marginRight: '1rem'}} name="category-type" id="cat-change" defaultChecked />
          <label htmlFor="cat-change">Existing Category</label>
        </div>
        <div style={{width: 'fit-content'}} className="form-row">
          <input type="radio" onClick={() => setAddCategory(true)} style={{marginRight: '1rem'}} name="category-type" id="cat-new" />
          <label htmlFor="cat-new">New Category</label>
        </div>
      </div>

      <div className="blog-input-save">
        { writePost ?
          <button type='button' className="blog-btn-cancel" onClick={() => setWritePost(false)}><Cancel /></button>
          :
          <button type='button' className="blog-btn-cancel" onClick={() => setEditMain(false)}><Cancel /></button>
        }
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

export default PostForm;