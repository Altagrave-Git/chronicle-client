import { useState, useEffect } from "react";
import { BlogAPI } from "../../api/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactComponent as Accept } from "../../icons/check.svg";
import { ReactComponent as Cancel } from "../../icons/xmark.svg";

const BlogRelatedForm = ({token, setAddRelated}) => {
  const { category, slug } = useParams();
  const [related, setRelated] = useState([]);
  const [unrelated, setUnrelated] = useState([]);
  const [getPosts, setGetPosts] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const serverUrl = import.meta.env.VITE_CHRONICLE_URL;

  useEffect(() => {
    BlogAPI.getRelated(category, slug)
      .then(data => {
        setRelated(data.related);
        setUnrelated(data.unrelated);
        setGetPosts(false);
      })
      .catch(error => console.log(error));
  }, [getPosts])

  const connectPost = id => {
    BlogAPI.addRelated(token, category, slug, id)
      .then(data => setGetPosts(true))
      .catch(error => console.log(error));
  }

  const disconnectPost = id => {
    BlogAPI.removeRelated(token, category, slug, id)
      .then(data => setGetPosts(true))
      .catch(error => console.log(error));
  }

  return (
    <form className="blogform related">
      <div>
        { related && related.length > 0 &&
          related.map((item, index) => {
            return (
              <div className="blog-detail-related-card-container" key={index}>
                <div className='blog-detail-related-card'>
                  <div className='blog-detail-related-card-image'>
                    <img src={serverUrl + item.image} alt={`related post ${index}`} />
                  </div>

                  <div className='blog-detail-related-card-info'>
                    <p className='blog-detail-related-card-meta'>{item.category_name} | {item.pub_date}</p>
                    <div className='blog-detail-related-card-text'>
                      <h5 className='blog-detail-related-card-title'>{item.title}</h5>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className="blog-input-save">
                  <button type='button' className="blog-btn-cancel" onClick={() => disconnectPost(item.id)}><Cancel /></button>
                </div>
              </div>
            )
          })
        }
        { unrelated && unrelated.length > 0 &&
          unrelated.map((item, index) => {
            return (
              <div className="blog-detail-related-card-container" key={index}>
                <div className='blog-detail-related-card'>
                  <div className='blog-detail-related-card-image'>
                    <img src={serverUrl + item.image} alt={`related post ${index}`} />
                  </div>

                  <div className='blog-detail-related-card-info'>
                    <p className='blog-detail-related-card-meta'>{item.category_name} | {item.pub_date}</p>
                    <div className='blog-detail-related-card-text'>
                      <h5 className='blog-detail-related-card-title'>{item.title}</h5>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className="blog-input-save">
                  <button type="button" className="blog-btn-save"><Accept onClick={() => connectPost(item.id)} /></button>
                </div>
              </div>
            )
          })
        }
      </div>
    </form>
  )
}

export default BlogRelatedForm;