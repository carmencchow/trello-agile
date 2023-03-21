import { getBoards } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const Workspace = () => {
  const dispatch = useDispatch();

  const boards = useSelector((state) => {
    console.log(state, 'state in app');
    return state.board
  });


  console.log(boards, 'boards global log in app.js');

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);


  return ( 
    <div> please return </div> 
    )
}

export default Workspace;