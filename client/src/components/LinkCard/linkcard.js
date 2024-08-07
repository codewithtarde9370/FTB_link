import React from 'react'
import './linkcard.css'
import Delete from './../LinkCard/delete.png'
import Edit from  './../LinkCard/edit.png'
import Copy from './../LinkCard/copy.png'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'

function LinkCard({_id,title,slug,target,views, createdAt,loadLinks}) {
  const shorturl = `${process.env.REACT_APP_API_URL}/${slug}`

  const deleteLink = async()=>{
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/link/${_id}`)
    console.log("Link deleted !!")
    toast.success(response.data.message)
    loadLinks();
  }

  return(
    <div className='card'>
   <div className='head-container'>
   <p className='title'>
          <span className='key'>
            </span> 
            {title || "Untitle"}
            </p>
  <div className='icons'>
  <img src={Edit} title='Edit Link Details' className='edit-btn icn'/>
    <img src={Delete} title='Delete Link' className='del-btn icn' onClick={deleteLink} />
    <img className='copy-btn icn'title='Copy Link' src={Copy}/>
  </div>
    
   </div>
        
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

        <p className='views'>{views} views</p>
        <p className='timestamp'>{new Date(createdAt).toLocaleString()}</p>
      <Toaster/>
    </div>
  )
}

export default LinkCard