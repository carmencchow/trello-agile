import React, { useEffect } from 'react'
import axios from 'axios'
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/thunks/fetchList";

const Archived = ({ id }) => {
    const dispatch = useDispatch();


    const onDragEnd = (result, lists) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destinationList = lists.find(
      (list) => list.id === destination.droppableId
    );
    const item = sourceList.items.splice(source.index, 1)[0];
    destinationList.items.splice(destination.index, 0, item);

    axios
      .put(`/api/board/${id}/lists`, { lists })
      .then((res) => {
      })
      .catch((err) => console.log(err));
  };


  const getArchived = async () => {
    console.log('Fetching archived cards')
    const res = await axios.get(`http://localhost:5000/api/board/archived/${id}`)
    console.log(res.data, res)
    return res.data;
  }

    useEffect(() => {
    dispatch(fetchData({ id }));
  }, [dispatch, id]);


  return (
    <div>
      
      <button onClick={getArchived} className="archived">
        Archived Cards
      </button>
  
    </div>
  )
}

export default Archived