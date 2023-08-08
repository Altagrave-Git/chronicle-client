import './blog.scss'
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import BlogList from '../../components/bloglist/bloglist'
import BlogDetail from '../../components/blogdetail/blogdetail'
import { BlogAPI } from '../../api/api'

const BlogView = ({ admin, token, categories, setCategories }) => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [writePost, setWritePost] = useState(false);
  const [post, setPost] = useState({});
  const [apiCall, setApiCall] = useState(true);
  const [position, setPosition] = useState(0);

  const categoryLinks = [
    {
      id: null,
      name: 'All',
      slug: '',
      count: categories.reduce((acc, item) => acc + item.count, 0)
    },
    ...categories
  ]

  const handlePublish = () => {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('category', post.category);
    if (post.published) {
      formData.append('published', false);
    } else if (!post.published) {
      formData.append('published', true);
    }
    
    BlogAPI.updatePost(token, formData, category, slug)
      .then(() => setApiCall(true))
      .catch(error => console.log(error));
  }

  return (
    <main className='blog container'>
      <div className='blog-sidebar-container'>
        <nav className='blog-sidebar fixed'>
          <div className='blog-sidebar-nav'>
            { admin &&
              <div className='blog-sidebar-makepost-container'>
                { slug ?
                  <>
                  { post.published ?
                    <input type="button" value="Edit" className='blog-sidebar-unpublish' onClick={handlePublish} />
                    :
                    <input type="button" value="Publish" className='blog-sidebar-publish' onClick={handlePublish} />
                  }
                  </>
                :
                <input type="button" value="Post" className='blog-sidebar-makepost' onClick={
                  () => {
                    if (writePost) {
                      setWritePost(false);
                    } else {
                      setWritePost(true);
                    }
                  }}
                />
                }
              </div>
            }

            <div className='blog-sidebar-categories'>
              <h2 className='blog-sidebar-title'>Categories</h2>
              { categoryLinks && categoryLinks.length > 0 &&
                categoryLinks.map((item, index) => {
                  return (
                    <Link className='blog-sidebar-link' type="button" key={index} to={`/blog/${item.slug}`}>
                      ⁍ {item.name} ({item.count})
                    </Link>
                  )
                })
              }
              <select className='blog-sidebar-link tablet' onChange={e => navigate(`/blog/${e.target.value}`)}>
                { categoryLinks && categoryLinks.length > 0 &&
                  categoryLinks.map((item, index) => {
                    return (
                      <option className='blog-sidebar-link tablet' type="button" key={index} value={item.slug}>
                        ⁍ {item.name} ({item.count})
                      </option>
                    )
                  })
                }
              </select>
            </div>
          </div>
        </nav>
      </div>
      <section className='blog-main'>
        { slug && slug.length > 0 ?
          <BlogDetail slug={slug} category={category} categories={categories} admin={admin} token={token} post={post} setPost={setPost} apiCall={apiCall} setApiCall={setApiCall} />
          :
          <BlogList admin={admin} token={token} categories={categories} setCategories={setCategories} writePost={writePost} />
        }
      </section>
    </main>
  )
}

export default BlogView;