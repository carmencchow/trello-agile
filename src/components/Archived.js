import React from 'react'
import axios from 'axios'

const Archived = () => {

  const fetchArchived = async () => {
    console.log('Fetching archived cards')
    const res = await axios.get('https://localhost:5000/api/board/?isArchived=false');
    console.log(res.data)
    return res.data;
  }

  return (
    <div>
      <button onClick={fetchArchived} className="show-archived">
        Include Archived Cards
      </button>
    </div>
  )
}

export default Archived