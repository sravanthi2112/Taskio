import { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, saveLocastoragedata } from "../../action"
import TextareaAutosize from 'react-textarea-autosize';
import PendingTasks from '../PendingTasks'
import CompletedTask from "../CompletedTask"
import { AiOutlineBulb } from "react-icons/ai";
import { HiCheck } from "react-icons/hi2";
import './index.css'
import {v4 as uuidv4} from 'uuid'

const TaskioHome =  props => {
    const {searchInputValue} = props
    const dispatch = useDispatch()
    const [todoTitle, setTodoTile] = useState("")
    const [todoNote, setTodoNote] = useState("")
    const [todoDate, setTodoDate] = useState("")
    let todos = useSelector((state) => state.todos )
    const theme = useSelector((state) => state.theme)
    const [clickedinputelement, setClickedinputelement] = useState(false)
    const inputNote = useRef(null)
    const inputdate = useRef(null)

    const [backgroundcolor, setBackgroundcolor] = useState("c1")
    const [filtercolor, setFiltercolor] = useState([])
    const [todofromDate, setTodofromDate] = useState("")
    const [todotoDate, setTodotoDate] = useState("")
    const [filteredDates, setFilteredDates] = useState(todos)
    const [editId, setEditId] = useState('')
    const [clickedApplyFilter, setClickedApplyFilter] = useState(false)
    let storeddata
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => { setIsHovered(true); };
    const handleMouseLeave = () => { setIsHovered(false); };
    let selectedcolors = []

    if(searchInputValue.trim("")){
        const searchfilterlist = todos.filter((eachtodo) => 
            (eachtodo.note.includes(searchInputValue) || eachtodo.title.includes(searchInputValue))
        )
        todos = searchfilterlist
        console.log(searchfilterlist, todos ,  "searched list")
    }

    if (filtercolor.length > 0){
        const unique = [...new Set(filtercolor)]
        console.log(unique, "unique")
        const filterslist = todos.filter((eachtodo) => unique.includes(eachtodo.bgcolor) )
        todos = filterslist
    }
    
    useEffect(() => {
        const previousdata = JSON.parse(localStorage.getItem("todolist"))
        if ( previousdata != null) {
            storeddata = previousdata.todos
            dispatch(saveLocastoragedata(storeddata))
        }
    }, [])

    const editfunction = id => {
        console.log(id, "perviousstate id")
        console.log(id, "clicked edit id")
        setEditId(id)
    }

    if (clickedApplyFilter) {
        const dateGivenTasks = todos.filter((todo) =>todo.date !== "")
        console.log(todofromDate, todotoDate)
        let filteredbyDates
        if (todofromDate.trim() && todotoDate.trim()){
            filteredbyDates = dateGivenTasks.filter((todo) =>  (todofromDate <= todo.date) && (todo.date <= todotoDate))
            console.log(filteredDates, "both")
        } else if (todotoDate.trim()){
            filteredbyDates = dateGivenTasks.filter(todo => todo.date <= todotoDate)
            console.log(filteredbyDates, "to date")
        }else if (todofromDate.trim()){
            filteredbyDates = dateGivenTasks.filter(todo => todo.date >= todofromDate)
            console.log(filteredbyDates, "from date")
        }
        todos = filteredbyDates 
        
        setClickedApplyFilter(false)
        
        console.log(todos, "out")
    }
    
    
    const onClickapplyfilter = () => {
        setClickedApplyFilter(true)
    }

    const onClickSendTodo = () => {
        setTodoTile("")
        setTodoNote("")
        setTodoDate("")
        setBackgroundcolor("c1")
        if(todoTitle.trim(" ") || todoNote.trim(" ")){
            console.log("checking title", todoTitle, todoNote, todoDate, backgroundcolor)
            const newTodo = {
                id: uuidv4(),
                title : todoTitle,
                note : todoNote,
                date : todoDate,
                bgcolor: backgroundcolor,
                iscompleted: false
            }
            dispatch(addTodo(newTodo))
            
            localStorage.setItem("todolist", JSON.stringify({todos: [...todos,newTodo] }) )
        }
        setClickedinputelement(false)
    }

    const onblurInputContainer = () => {
        console.log(clickedinputelement, "before  clicked outside")
        setClickedinputelement(false)
        console.log(clickedinputelement, "after clicked outside")
    }

    const onfocusInputContainer = () => {
        console.log(clickedinputelement, "before incontainer")
        setClickedinputelement(true)
        console.log(clickedinputelement, "after incontainer")
    }

    const titleok = (event) => {
        if (event.key === "Enter") {
            inputNote.current.focus()
        }
    }

    const noteok = (event) => {
        if (event.key === "Enter") {
            inputdate.current.focus()
        }
    }

    const onClikedbackground = (colorid) => {
        setBackgroundcolor(colorid)
    }

    const onClikedflitercolor = (colorid) => {
        
        let checklist 
        let colorfilter
        if (filtercolor.includes(colorid)){
            colorfilter = filtercolor.filter(color => color !== colorid)
            checklist = todos.filter(todo => todo.bgcolor === colorid)
            console.log("check list", checklist)
            setFiltercolor(colorfilter)
            todos = checklist

        }

        if (!filtercolor.includes(colorid)){
            setFiltercolor([...filtercolor, colorid])
        }
        console.log(filtercolor.includes(colorid), "check cseletced")
        console.log(filtercolor, "filter colors list")
    }

    const completedtodos = todos.filter((eachtodo) => eachtodo.iscompleted === true)
    const pendingTodos = todos.filter((eachtodo) => eachtodo.iscompleted === false)
    
    
    todos.sort((a, b) => {
        const dateA = new Date(a.date || "9999-12-31");
        const dateB = new Date(b.date || "9999-12-31");
    
        return dateA - dateB; 
    });
    
    const inputFiledClassNames = `${clickedinputelement ? 'input-active-container' : 'large-input-conatiner'} ${theme && 'dark-input-active-container' }`

    return(
        <div className={theme ?  "todo-dark-content-container todo-app-content-container" : "todo-app-content-container" } >
            <div className="empty-view-conatiner">
                <div className={inputFiledClassNames}>
                    <div>
                        <input className={theme ? "dark-search-bar search-bar" : "search-bar"} type="text" maxLength={30} value = {todoTitle} placeholder="Add Task" onChange={(event) => setTodoTile(event.target.value)} onKeyUp={titleok} onClick={onfocusInputContainer}/>
                        {clickedinputelement &&<TextareaAutosize rows="1" ref={inputNote} className={theme ? "dark-search-bar search-bar" : "search-bar"}  type="text" value = {todoNote} placeholder="Describe in detail...." onChange={(event) => setTodoNote(event.target.value)} onKeyUp={noteok} />}
                        {clickedinputelement && <input ref={inputdate} className={theme ? "dark-date-input-field search-bar" : "search-bar date-input-field"} type="date" value = {todoDate} placeholder="date" onChange={(event) => setTodoDate(event.target.value)}/>}
                    </div>
                    {clickedinputelement &&  <div className="input-container-options">
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
                        <button onClick={() => onClickSendTodo() } className={theme ?  "dark-always-show-add-task-btn" : "always-show-add-task-btn"}>Add Task</button>
                    </div>}
                </div>
            </div> 
            <div className="todos-container">
            <div className="tooltip-container" onMouseLeave={handleMouseLeave}> 
                    <button className={theme ? "dark-delete-button" : "delete-btn"}  onMouseEnter={handleMouseEnter} >Filters</button>
                    {isHovered && ( <div className="tooltip-popup "> 
                        <h4>Based on Colors</h4>
                        <div className="toolcolor-container">
                            {theme ? <>
                            <div className={filtercolor.includes('c1') ? "selected-color background-colors darkwhite" : "background-colors darkwhite"}  onClick={() => onClikedflitercolor('c1')}>  {filtercolor.includes('c1') && <HiCheck className= {theme && "dark-tick"} /> } </div>
                            <div className={filtercolor.includes('c2') ? "selected-color background-colors darkred" : "background-colors darkred"}  onClick={() => onClikedflitercolor('c2')}> {filtercolor.includes('c2') && <HiCheck className= {theme && "dark-tick"} />} </div>
                            <div className={filtercolor.includes('c3') ? "selected-color background-colors darkmint" : "background-colors darkmint"}  onClick={() => onClikedflitercolor('c3')}> {filtercolor.includes('c3') && <HiCheck className= {theme && "dark-tick"} />}</div>
                            <div className={filtercolor.includes('c4') ? "selected-color background-colors darkpurple" : "background-colors darkpurple"}  onClick={() => onClikedflitercolor('c4')}> {filtercolor.includes('c4') && <HiCheck className= {theme && "dark-tick"} />}</div>
                            <div className={filtercolor.includes('c5') ? "selected-color background-colors darksand" : "background-colors darksand"}  onClick={() => onClikedflitercolor('c5')}> {filtercolor.includes('c5') && <HiCheck className= {theme && "dark-tick"} />}</div>
                            </> : <>
                            <div className={filtercolor === 'c1' ? "selected-color background-colors white" : "background-colors white"}  onClick={() => onClikedflitercolor('c1')}>  {filtercolor === 'c1' && <HiCheck /> } </div>
                            <div className={filtercolor === 'c2' ? "selected-color background-colors red" : "background-colors red"}  onClick={() => onClikedflitercolor('c2')}> {filtercolor === 'c2' && <HiCheck />} </div>
                            <div className={filtercolor === 'c3' ? "selected-color background-colors mint" : "background-colors mint"}  onClick={() => onClikedflitercolor('c3')}> {filtercolor === 'c3' && <HiCheck />}</div>
                            <div className={filtercolor === 'c4' ? "selected-color background-colors purple" : "background-colors purple"}  onClick={() => onClikedflitercolor('c4')}> {filtercolor === 'c4' && <HiCheck />}</div>
                            <div className={filtercolor === 'c5' ? "selected-color background-colors sand" : "background-colors sand"}  onClick={() => onClikedflitercolor('c5')}> {filtercolor === 'c5' && <HiCheck />}</div>
                            
                            </> }
                        </div>
                        <h4>Based on date</h4>
                        <div className="toolcolor-container">
                            <div  className="toolkit-date-container mr-3">
                                <label htmlFor="fromdate">From date : </label><br/>
                                <input id="fromdate" type="date"  onChange={(event) => setTodofromDate(event.target.value)} /> <br/>
                            </div>
                            <div className=" toolkit-date-container ml-3"> 
                                <label htmlFor="todate">To date : </label><br/>
                                <input id="todate" type="date"  onChange={(event) => setTodotoDate(event.target.value)} />
                            </div>
                            <button onClick={onClickapplyfilter} className={theme ? "dark-delete-button apply-filter-btn largescren-applybtn" : "delete-btn apply-filter-btn largescren-applybtn"} >Apply filter</button>
                        </div>
                            <button onClick={onClickapplyfilter} className={theme ? "dark-delete-button apply-filter-btn smallscreen-applybtn" : "delete-btn apply-filter-btn smallscreen-applybtn"} >Apply filter</button>
                        </div> )} 
                </div>
            </div>
                {todos.length  === 0 ? <div className="empty-view-conatiner" onClick={onClickSendTodo}>
                    <AiOutlineBulb className="bulb-img"/>
                    <h2 className={theme ? "dark-emtyview-heading" :"emptyview-heading"}>Tasks Appear here </h2>
                    <p className={theme ? " dark-emtyview-heading" : "emptyview-heading"} >Your Task list is empty</p>
                </div> :
            <div onClick={onClickSendTodo}>
                
                {pendingTodos.length > 0 && 
                <div className="todos-container ">
                    <ul className="list-group mt4">
                    
                        {pendingTodos.map((todo) => (
                            <PendingTasks key={todo.id} todo = {todo} editId = {editId} editfunction = {editfunction}/>
                        ))}
                    </ul>
                </div>
                }
            
                {completedtodos.length >= 1 && 
                <>  
                    <div className="todos-container">
                        <ul className="list-group mt-4">
                            {completedtodos.map((todo) => (
                                <CompletedTask key={todo.id} todo = {todo} editId = {editId} editfunction = {editfunction} />
                            ))}
                        </ul>
                    </div> 
                </>
                }
            </div>}
        </div>
    )
}

export default TaskioHome