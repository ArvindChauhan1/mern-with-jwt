import React, { useState, useEffect, useCallback } from 'react'
import { http } from '../remote'

const ProfilePage = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const fetchData = useCallback(async () => {
    const resp = await http.get('/user/self')
    setName(resp.data !== undefined ? resp.data.name : "")
    setEmail(resp.data !== undefined ? resp.data.email : "")
  }, [setEmail, setName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = async () => {
    if (!isEdit) {
      window.document.getElementById('name_input').focus()
      return
    }
    try {
      await http.post('/user/update', { name })
      alert('Profile Updated')
      fetchData()
    } catch (error) {
      alert('Something Went Wrong')
    }
  }

  return (
    <div className='p-4 py-8 sm:p-14 md:p-28 text-base font-medium'>
      <div className='my-8 text-3xl text-violet-800 font-bold tracking-wider'>
        Profile
      </div>
      <div className='my-4'>
        <span className='text-gray-800'>Email :{" "}</span>
        <span className={`ml-1 p-2 ${isEdit ? 'cursor-not-allowed' : ""}`}>{email}</span>
      </div>

      <div className='my-4'>
        <span className='text-gray-800'>Name :{" "}</span>
        <span><input id="name_input" disabled={!isEdit} value={name} onChange={({ target: { value } }) => setName(value)} type={'text'} className={`ml-1 text-base p-2 rounded-lg outline-1 focus:border-b-2 focus-within:shadow-lg font-medium focus:font-normal cursor-text ${isEdit ? "border-2 border-black font-normal" : ""}`} /></span>
      </div>

      <div>
        <button className='px-8 py-2 bg-indigo-700 text-base font-medium text-white rounded-lg hover:shadow-lg transition-shadow ease-in' onClick={() => {
          handleSubmit()
          setIsEdit(v => !v)
        }}>
          {!isEdit ? "Edit" : "Save"}
        </button>
        {isEdit ? <button className='ml-6 px-4 py-1 bg-red-600 text-sm font-medium text-white rounded-lg hover:shadow-lg transition-shadow ease-in' onClick={() => {
          fetchData()
          setIsEdit(false)
        }}>
          Cancel
        </button> : ""}
      </div>
    </div>
  )
}

export default ProfilePage