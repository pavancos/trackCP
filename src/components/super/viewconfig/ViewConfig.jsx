import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { getViewStudents } from '../handlers'
import AddStudentToView from '../modals/AddStudentToView'
import { useAuth } from '../../../store/authContext'
import DeleteStudentFromView from '../modals/DeleteStudentFromView'

function ViewConfig () {
  const { viewName } = useParams()
  const [viewTitle, setViewTitle] = useState('')
  const [students, setStudents] = useState([])
  const [addNewStudents, setAddNewStudents] = useState(false)
  const [removeStudents, setRemoveStudents] = useState(false)
  const { authState } = useAuth()

  const refreshStudents = useCallback(() => {
    getViewStudents(viewName, authState.token).then(data => {
      console.log('data: ', data)
      setStudents(data.students)
    })
  })

  useEffect(() => {
    console.log('viewName', viewName)
    setViewTitle(viewName)
    refreshStudents()
  }, [viewName])
  return (
    <>
      <div className='flex flex-wrap gap-2 justify-between items-center px-3 my-2'>
        <h1 className='text-2xl font-semibold'>
          View Configuration: {viewTitle}
        </h1>
        <div className='flex flex-wrap gap-2'>
          <button onClick={() => setAddNewStudents(true)} className='btnNormal'>
            Add New Students
          </button>
          <button onClick={() => setRemoveStudents(true)} className='btnNormal'>
            Delete Students
          </button>
        </div>
      </div>
      {/* {
        students.length === 0 ? (
          <h1 className='text-2xl font-semibold'>
            No Students Found
          </h1>
        ) :
        students.map((student, index)=>{
          return (
            <div key={index} className='flex flex-wrap gap-2 justify-between items-center px-3 my-2'>
              <h1 className='text-2xl font-semibold'>
                {student.name} - {student.rollNo}
              </h1>
              <div className='flex flex-wrap gap-2'>
                <button className='btnNormal'>Edit</button>
                <button className='btnNormal'>Delete</button>
              </div>
            </div>
          )
        })
      } */}

      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Roll Number
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {students.length === 0 ? (
            <tr>
              <td colSpan='3' className='px-6 py-4 text-center font-semibold'>
                No Students Found
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap font-medium text-gray-900'>
                  {student.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-gray-700'>
                  {student.rollNo}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {addNewStudents && (
        <AddStudentToView
          setAddNewStudents={setAddNewStudents}
          viewName={viewName}
          refreshStudents={refreshStudents}
        />
      )}
      {removeStudents && (
        <DeleteStudentFromView
          setRemoveStudents={setRemoveStudents}
          viewName={viewName}
          refreshStudents={refreshStudents}
        />
      )}
    </>
  )
}

export default ViewConfig
