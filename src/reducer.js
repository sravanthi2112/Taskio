
const intnialState = {
    todos : [],
    theme : false,
    userslist:[]
}


const todoReducer = (state=intnialState,action) => {

    switch (action.type) {
        case "SAVE_LOCALSTORAGE_DATA":
          //const {tasklist} = action.payload
          console.log(action.payload , "user")
          return{
            ...state, todos : action.payload
          }

        case "ADD_TODO":
          const addtodotolist = [...state.todos, action.payload]
          return {
            ...state,
            todos: addtodotolist
          };
        
        case "DELETE_TODO":
          const updatedlist = state.todos.filter((todo) => todo.id !== action.payload)
          localStorage.setItem("todolist",JSON.stringify({todos: updatedlist}))
          return {
            ...state,
            todos: state.todos.filter((todo) => todo.id !== action.payload),
          };

        case "TODO_STATUS":
            const statusupdatedlist = state.todos.map((todo) => todo.id === action.payload ? {...todo, iscompleted : !todo.iscompleted} : todo )
            localStorage.setItem("todolist", JSON.stringify({todos : statusupdatedlist}))
            return { 
                ...state,
                todos: state.todos.map((todo) =>
                  todo.id === action.payload
                    ? { ...todo, iscompleted : !todo.iscompleted }
                    : todo
                ),
              };

        case "TODO_EDIT" : 
              const {editedTask, id} = action.payload
              console.log(editedTask, action.payload, "insied reducer.js")
              const editedtodoupdated = state.todos.map((todo) => todo.id === id ? {...todo, title: editedTask.title ,note : editedTask.note, date: editedTask.date, bgcolor: editedTask.bgcolor } : todo )
              localStorage.setItem("todolist", JSON.stringify({todos : editedtodoupdated}))
              return {
                ...state, 
                todos : state.todos.map((todo) =>
                    todo.id === id 
                    ?{...todo, title: editedTask.title ,note : editedTask.note, date: editedTask.date, bgcolor: editedTask.bgcolor } : todo
                )
              }

        case "TODO_THEME" :
            const theme = action.payload
            localStorage.setItem("theme", JSON.stringify(theme))
            return {...state, theme:!theme}
        case "ADD_NEW_USER" :
            const newUserDetails = [...state.userslist, action.payload]
            return {
              ...state, 
              userslist : newUserDetails
            }  
        default:
          return state;
        }

        
}

export default todoReducer


