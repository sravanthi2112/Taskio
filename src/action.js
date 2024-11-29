
export function addTodo (todo) {
    console.log(todo, "actionjs")
    return {type : "ADD_TODO", payload: todo}
}

export function deleteTodo (id) {
    return {type : "DELETE_TODO", payload : id}
}

export function todoStatus (todo) {
    return {type : "TODO_STATUS", payload : todo}
}

export function todoEdit(editTitleWithId) {
    console.log(editTitleWithId, "editTitleWithId")
    return {type : "TODO_EDIT", payload: editTitleWithId}
}

export function todoTheme (theme) {
    return {type : "TODO_THEME", payload : theme}
}

export function saveLocastoragedata (tasklist) {
    return {type : "SAVE_LOCALSTORAGE_DATA", payload : tasklist}
}
