import PostForm from '../../forms/blogforms/postform'
import { useState, useEffect } from 'react'
import { BlogAPI } from '../../api/api'
import { Link, useParams } from 'react-router-dom'

const BlogList = ({admin, token, categories, setCategories, writePost}) => {
  const { category='all' } = useParams();
  const [draft, setDraft] = useState([]);
  const [published, setPublished] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  useEffect(() => {
    BlogAPI.getPosts(category)
      .then(data => {
        const drafts = [];
        const pubs = [];
        data.forEach(item => {
          let catArray = item.category_name.split('-');
          catArray = catArray.map((word, index) => {
            let letters = [];
            for (let letter of word) {
              letters.push(letter);
            }
            letters[0] = letters[0].toUpperCase();
            return letters.join('');
          });
          item.category_caps = catArray.join(' ');

          if (item.published) {
            pubs.push(item);
          } else {
            drafts.push(item);
          }
        });
        setDraft(drafts);
        setPublished(pubs);
      })
      .catch((error) => {
        if (category != 'all') {
          navigate('/blog');
        } else {
          console.log(error);
        }
      })
  }, [category]);

  return (
    <>
      { admin && writePost == true &&
        <PostForm categories={categories} token={token} />
      }
      { admin && draft && draft.length > 0 &&
        draft.map((item, index) => {
          return (
            <Link key={index} to={baseUrl + `/blog/${item.category_name.replace(' ', '-')}/${item.slug}`}>
            <article className="blog-main-card">
              <div className='blog-main-thumbnail-container'>
                { item.image != null ?
                  <img className='blog-main-thumbnail' src={import.meta.env.VITE_CHRONICLE_URL + item.image} alt="blog entry thumbnail" />
                  :
                  <img className='blog-main-thumbnail' src={import.meta.env.VITE_DEFAULT_IMG} alt="default image" />
                }
              </div>
              <div className='blog-main-card-meta'>
                <p>Damon Turcotte | {item.category_caps} | {item.timestamp}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </article>
          </Link>
          )
        })
      }
      { published && published.length > 0 &&
        published.map((item, index) => {
          return (
            <Link key={index} to={baseUrl + `/blog/${item.category_name.replace(' ', '-')}/${item.slug}`}>
              <article className="blog-main-card">
                <div className='blog-main-thumbnail-container'>
                  { item.image != null ?
                    <img className='blog-main-thumbnail' src={import.meta.env.VITE_CHRONICLE_URL + item.image} alt="blog entry thumbnail" />
                    :
                    <img className='blog-main-thumbnail' src={import.meta.env.VITE_DEFAULT_IMG} alt="default image" />
                  }
                </div>
                <div className='blog-main-card-meta'>
                  <p>Damon Turcotte | {item.category_caps} | {item.timestamp}</p>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </article>
            </Link>
  
          )
        })
      }
    </>
  )
}

export default BlogList;