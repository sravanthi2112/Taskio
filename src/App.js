
import TaskioHome from './components/TaskioHome';
import './App.css';
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector,useDispatch } from 'react-redux';
import {todoTheme} from "./action.js";
import { MdDarkMode } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { useState } from 'react';

const App = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)
  const [searchInputValue, setSearchInputValue ] = useState("")

  const handleTheme = () => {
    dispatch(todoTheme(theme))
  }

  return (
    <div className= "todo-app-background-container">
      <div className={theme ? "dark-header header" : "header"}>
        <h1 className={theme ? "dark-app-name app-name" : "app-name"}>Taskio </h1>
        <div className={theme ? "dark-search-container search-conatiner" : "search-conatiner"}>
                    <AiOutlineSearch className={ theme ? "dark-header-icon header-icon" : 'header-icon' }/>
                    <input onChange={(event) => setSearchInputValue(event.target.value)} className={theme ? "input-search-element dark-input-search-element" : "input-search-element"} type="search" placeholder="Search" />
        </div> 

        <div className="theme-container" onClick={handleTheme} >
            {theme ?  <FiSun className="light-icon" /> : <MdDarkMode className="dark-icon" />  } 
        </div>
      </div>
      <div className='task-content'> 
        <TaskioHome searchInputValue={searchInputValue} />
      </div>
    </div>
  );
}

export default App;
