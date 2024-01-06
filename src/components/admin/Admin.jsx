import React from 'react'
import { AdminClass } from './AdminClass'
import { AdminProjects } from './AdminProjects'


export const Admin = () => {
  return (
    <div className='row gap-2 '>
      <div className="col shadow p-2">
         <AdminClass/>
      </div>
       <div className="col shadow p-2">
        <AdminProjects/>
       </div>
        
    </div>
  )
}
