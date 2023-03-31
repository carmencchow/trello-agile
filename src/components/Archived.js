import React from 'react'
import axios from 'axios'

const Archived = ({ id }) => {

  const getUnArchived = async () => {
    console.log('Fetching archived cards')
    const res = await axios.get('http://localhost:5000/api/board/641b29f7949aa1ed20103ab9?isArchived=false');
    // const res = await axios.get(`http://localhost:5000/api/board/${id}?isArchived=false`);
    console.log(res.data, res)
    return res.data;
  }

  return (
    <div>
      <button onClick={getUnArchived} className="archived">
        Archived Cards
      </button>
    </div>
  )
}

export default Archived