import React from 'react'
import './linkcard.css'

function LinkCard({_id,title,slug,target,views, createdAt}) {
  const shorturl = `${process.env.REACT_APP_API_URL}/${slug}`

  return(
    <div className='card'>
        <h3 className='title'>
          <span className='key'>
            Title:
            </span> 
            {title || "Untitle"}
            </h3>
    <p>
      <span className='key'>
        Target URL:
        </span> 
        <a href={target} 
        target='_blank' 
        className='target'>
          {target.substring(0,40) } {target.length>40 ? "..." : null } 
          </a>
      </p>
        <p>
          <span 
          className='key'>
            Slug:
            </span>
            <a href={shorturl} 
            target='_blank'>
              {shorturl}
              </a>
              </p>

        <p className='views'>{views}</p>
        <p className='timestamp'>{createdAt}</p>
    </div>
  )
}

export default LinkCard