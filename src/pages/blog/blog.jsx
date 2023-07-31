import './blog.scss'
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import BlogList from '../../components/bloglist/bloglist'
import BlogDetail from '../../components/blogdetail/blogdetail'

const BlogView = ({ admin, token, categories, setCategories }) => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [writePost, setWritePost] = useState(false);

  const categoryLinks = [
    {
      id: null,
      name: 'All',
      slug: '',
      count: categories.reduce((acc, item) => acc + item.count, 0)
    },
    ...categories
  ]

  return (
    <main className='blog container'>
      <div className='blog-sidebar-container'>
        <nav className='blog-sidebar fixed'>
          <div className='blog-sidebar-nav'>
            { admin &&
              <div className='blog-sidebar-makepost-container'>
                <input type="button" value="Post" className='blog-sidebar-makepost' onClick={
                  () => {
                    if (writePost) {
                      setWritePost(false);
                    } else {
                      setWritePost(true);
                    }
                  }}
                />
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
            </div>
          </div>
        </nav>
      </div>
      <section className='blog-main'>
        { slug && slug.length > 0 ?
          <BlogDetail slug={slug} category={category} categories={categories} admin={admin} token={token} />
          :
          <BlogList admin={admin} token={token} categories={categories} setCategories={setCategories} writePost={writePost} />
        }
      </section>
    </main>
  )
}

export default BlogView;