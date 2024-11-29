import TextareaAutosize from 'react-textarea-autosize';
import { MdClose } from "react-icons/md";
import { deleteTodo,todoStatus, todoEdit } from "../../action";
import './index.css'
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiCheck } from "react-icons/hi2";
import { IoIosCheckmarkCircle } from "react-icons/io";

const CompletedTask = (props) => {
    const dispatch = useDispatch()
    const {todo, editId, editfunction} = props     
    const inputNote = useRef(null)
    const inputdate = useRef(null)
    const smallInputNote = useRef(null)
    const smallInputdate = useRef(null)
    const {id, title, bgcolor, note, date} = todo
    const theme = useSelector((state) => state.theme)
    const [ editedTaskTitle ,setEditedTaskTile] = useState(title.trim())
    const [editedTaskNote, setEditedtaskNote] = useState(note.trim())
    const [editedTaskDate, setEditedTaskDate] = useState(date)
    const [backgroundcolor, setBackgroundcolor] = useState(bgcolor)

    
    let colorindex

    switch (bgcolor) {
        case "c1":
            colorindex = 0 
            break
        case "c2":
            colorindex = 1
            break
        case "c3":
            colorindex = 2
            break
        case "c4":
            colorindex = 3
            break
        case "c5":
            colorindex = 4
            break
        default:
            break;
    }

    const colors = {
        light : ["white", "red", "mint", "purple", "sand"],
        dark : ["darkwhite", "darkred", "darkmint", "darkpurple", "darksand"]
    }

    const themebackgroundcolor = `${theme ? colors.dark[colorindex] : colors.light[colorindex]  }`

    const handleDelete = () => (
        dispatch(deleteTodo(id))
    )

    const handleTodoStatus = () => (
        dispatch(todoStatus(id))
    )

    const handleEdit = (id) => {
        console.log(id, "todo item id")
        editfunction(id)
    }

    const titleok = (event) => {
        if (event.key === "Enter") {
            inputNote.current.focus()
        }
    }

    const smalltitleok = (event) => {
        if (event.key === "Enter") {
            smallInputNote.current.focus()
        }
    }

    const smallnoteok = (event) => {
        if (event.key === "Enter") {
            smallInputdate.current.focus()
        }
    }

    const noteok = (event) => {
        if (event.key === "Enter") {
            inputdate.current.focus()
        }
    }


    const handleSave = () => {
        
        if(editedTaskTitle.trim(" ") && editedTaskNote.trim(" ")){
            const editedTask = {
                title : editedTaskTitle,
                note : editedTaskNote,
                date : editedTaskDate,
                bgcolor: backgroundcolor,
            }
            console.log(editedTask, "edited before dispatch")
            dispatch(todoEdit({editedTask, id}))
            editfunction(null)
        }
    }

    const onClikedbackground = (color) => {
        setBackgroundcolor(color)
    }

    return(
        <li key = {id}  className= {`todoitem-container ${themebackgroundcolor} `}>
           <div className="large-screen-options">
                <div className="large-screen-task-item">
                    <div className="todo-title-container">
                        {editId === id? 
                            <>
                                <div>
                                    <input autoFocus className={theme ? "dark-search-bar search-bar" : "search-bar"} type="text" maxLength={30} value = {editedTaskTitle} placeholder="Add Task" onChange={(event) => setEditedTaskTile(event.target.value)} onKeyUp={titleok}/>
                                    <TextareaAutosize ref={inputNote} className={theme ? "dark-search-bar search-bar" : "search-bar"}  type="text" value = {editedTaskNote} placeholder="edit task description...." onChange={(event) => setEditedtaskNote(event.target.value)} onKeyUp={noteok}/>
                                    <input ref={inputdate} className={theme ? "dark-date-input-field search-bar" : "search-bar date-input-field"} type="date" value = {editedTaskDate} placeholder="date" onChange={(event) => setEditedTaskDate(event.target.value)}/>
                                </div>
                            </> 
                            : 
                            <div className="task-details-conatiner">
                                <h5 className={theme ? "dark-todo-title completed-todo" : "todo-title completed-todo" }>{title}</h5>
                                <p className={theme ? "dark-todo-description completed-todo" : "todo-description completed-todo" }>{note}</p>
                            </div>
                        }
                    </div>
                    <div className="large-screen-edit-date-delete-check-options">
                        <div className="title-date">
                            {editId !== id && <p className={theme ? "dark-date" : "date"}>{date}</p>}
                            <button onClick={handleTodoStatus} className="icons">
                                <IoIosCheckmarkCircle className = {theme ? "dark-checkbox-icon" : "icon"} />
                            </button>
                        </div>
                        <div className="date-container">
                            {editId===id ? <button onClick={handleSave} className={theme ? "dark-delete-button" : "delete-btn"}>Save</button> : <button onClick={() => handleEdit(id)} className={theme ? "dark-delete-button" : "delete-btn"}>Edit</button>}
                            <button className={theme ? "dark-delete-button" : "delete-btn"} onClick={handleDelete}>Delete </button>
                        </div>
                        {editId === id && 
                            <div className="edit-input-container-options">
                                {theme ? <>
                                    <div className={backgroundcolor === 'c1' ? "selected-color background-colors darkwhite" : "background-colors darkwhite"}  onClick={() => onClikedbackground('c1')}>  {backgroundcolor === 'c1' && <HiCheck /> } </div>
                                    <div className={backgroundcolor === 'c2' ? "selected-color background-colors darkred" : "background-colors darkred"}  onClick={() => onClikedbackground('c2')}> {backgroundcolor === 'c2' && <HiCheck />} </div>
                                    <div className={backgroundcolor === 'c3' ? "selected-color background-colors darkmint" : "background-colors darkmint"}  onClick={() => onClikedbackground('c3')}> {backgroundcolor === 'c3' && <HiCheck />}</div>
                                    <div className={backgroundcolor === 'c4' ? "selected-color background-colors darkpurple" : "background-colors darkpurple"}  onClick={() => onClikedbackground('c4')}> {backgroundcolor === 'c4' && <HiCheck />}</div>
                                    <div className={backgroundcolor === 'c5' ? "selected-color background-colors darksand" : "background-colors darksand"}  onClick={() => onClikedbackground('c5')}> {backgroundcolor === 'c5' && <HiCheck />}</div>
                                    </> : <>
                                    <div className={backgroundcolor === 'c1' ? "selected-color background-colors white" : "background-colors white"}  onClick={() => onClikedbackground('c1')}>  {backgroundcolor === 'c1' && <HiCheck /> } </div>
                                    <div className={backgroundcolor === 'c2' ? "selected-color background-colors red" : "background-colors red"}  onClick={() => onClikedbackground('c2')}> {backgroundcolor === 'c2' && <HiCheck />} </div>
                                    <div className={backgroundcolor === 'c3' ? "selected-color background-colors mint" : "background-colors mint"}  onClick={() => onClikedbackground('c3')}> {backgroundcolor === 'c3' && <HiCheck />}</div>
                                    <div className={backgroundcolor === 'c4' ? "selected-color background-colors purple" : "background-colors purple"}  onClick={() => onClikedbackground('c4')}> {backgroundcolor === 'c4' && <HiCheck />}</div>
                                    <div className={backgroundcolor === 'c5' ? "selected-color background-colors sand" : "background-colors sand"}  onClick={() => onClikedbackground('c5')}> {backgroundcolor === 'c5' && <HiCheck />}</div>
                                </> }    
                            </div>
                        }
                    </div>
                </div>
            </div>


            <div className="small-screen-options">
                <div className="todo-title-container">
                    {editId === id? <>
                    <div>
                        <input autoFocus className={theme ? "dark-search-bar search-bar" : "search-bar"} type="text" maxLength={30} value = {editedTaskTitle} placeholder="Add Task" onChange={(event) => setEditedTaskTile(event.target.value)} onKeyUp={smalltitleok}/>
                        <TextareaAutosize ref={inputNote} className={theme ? "dark-search-bar search-bar" : "search-bar"}  type="text" value = {editedTaskNote} placeholder="edit task description...." onChange={(event) => setEditedtaskNote(event.target.value)} onKeyUp={smallnoteok}/>
                        <input ref={inputdate} className={theme ? "dark-date-input-field search-bar" : "search-bar date-input-field"} type="date" value = {editedTaskDate} placeholder="date" onChange={(event) => setEditedTaskDate(event.target.value)}/>
                    </div>
                    </> 
                    : 
                    <div className="task-details-conatiner ">
                        <h5 className={theme ? "dark-todo-title completed-todo" : "todo-title completed-todo" }>{title}</h5>
                        <div className="title-date">
                                {editId !== id && <p className={theme ? "dark-date" : "date"}>{date}</p>}
                                <button onClick={handleTodoStatus} className="icons">
                                    <IoIosCheckmarkCircle className = {theme ? "dark-checkbox-icon" : "icon"} />
                                </button>
                        </div>
                    </div>
                    }
                </div>
                {editId !== id && <p className={theme ? "dark-todo-description completed-todo" : "todo-description completed-todo" }>{note}</p> }
                <div className="small-screen-colors-edit-save-conatiner">
                {editId === id && 
                                <div className="edit-input-container-options">
                                    {theme ? <>
                                    <div className={backgroundcolor === 'c1' ? "selected-color background-colors darkwhite" : "background-colors darkwhite"}  onClick={() => onClikedbackground('c1')}>  {backgroundcolor === 'c1' && <HiCheck className= {theme && "dark-tick"} /> } </div>
                                    <div className={backgroundcolor === 'c2' ? "selected-color background-colors darkred" : "background-colors darkred"}  onClick={() => onClikedbackground('c2')}> {backgroundcolor === 'c2' && <HiCheck className= {theme && "dark-tick"} />} </div>
                                    <div className={backgroundcolor === 'c3' ? "selected-color background-colors darkmint" : "background-colors darkmint"}  onClick={() => onClikedbackground('c3')}> {backgroundcolor === 'c3' && <HiCheck className= {theme && "dark-tick"} />}</div>
                                    <div className={backgroundcolor === 'c4' ? "selected-color background-colors darkpurple" : "background-colors darkpurple"}  onClick={() => onClikedbackground('c4')}> {backgroundcolor === 'c4' && <HiCheck className= {theme && "dark-tick"} />}</div>
                                    <div className={backgroundcolor === 'c5' ? "selected-color background-colors darksand" : "background-colors darksand"}  onClick={() => onClikedbackground('c5')}> {backgroundcolor === 'c5' && <HiCheck className= {theme && "dark-tick"} />}</div>
                                    </> : <>
                                    <div className={backgroundcolor === 'c1' ? "selected-color background-colors white" : "background-colors white"}  onClick={() => onClikedbackground('c1')}>  {backgroundcolor === 'c1' && <HiCheck /> } </div>
                                    <div className={backgroundcolor === 'c2' ? "selected-color background-colors red" : "background-colors red"}  onClick={() => onClikedbackground('c2')}> {backgroundcolor === 'c2' && <HiCheck />} </div>
                                    <div className={backgroundcolor === 'c3' ? "selected-color background-colors mint" : "background-colors mint"}  onClick={() => onClikedbackground('c3')}> {backgroundcolor === 'c3' && <HiCheck />}</div>
                                    <div className={backgroundcolor === 'c4' ? "selected-color background-colors purple" : "background-colors purple"}  onClick={() => onClikedbackground('c4')}> {backgroundcolor === 'c4' && <HiCheck />}</div>
                                    <div className={backgroundcolor === 'c5' ? "selected-color background-colors sand" : "background-colors sand"}  onClick={() => onClikedbackground('c5')}> {backgroundcolor === 'c5' && <HiCheck />}</div>
                                </> }    
                                </div>
                            }
                        {editId === id ? <button onClick={handleSave} className={theme ? "dark-icons" :"icons"}><MdOutlineDone /></button> : <button onClick={() => handleEdit(id)} className={theme ? "dark-icons" :"icons"}><CiEdit /> </button>}
                <button onClick={handleDelete} className={theme ? "dark-icons" :"icons"}><MdClose className = "small-screen-icons" /> </button>
            
                </div>
               
            </div>
        </li>
    )
}

export default CompletedTask

