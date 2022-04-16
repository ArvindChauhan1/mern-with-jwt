import React, { useState, useEffect, useCallback } from 'react'
import { http } from '../remote'

const Homepage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const fetchData = useCallback(async () => {
    const resp = await http.get('/user/self')
    setName(resp.data !== undefined ? resp.data.name : "")
    setEmail(resp.data !== undefined ? resp.data.email : "")
  }, [setEmail, setName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='p-4 py-8 sm:p-14 md:p-28 text-base font-medium'>
      <div className='my-8 text-3xl text-indigo-800 font-bold tracking-wider'>
        Homepage
      </div>
      <div>
        <span className='text-gray-800'>Name :{" "}</span>
        <span>{name}</span>
      </div>
      <div>
        <span className='text-gray-800'>Email :{" "}</span>
        <span>{email}</span>
      </div>
    </div>
  )
}

export default Homepage