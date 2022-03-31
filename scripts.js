const inputElement = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')
const tasksContainer = document.querySelector('.tasks-container')
const body = document.querySelector('#body')
const modeButton = document.querySelector('.mode-button')

const validateInput = () => inputElement.value.trim().length > 0

const changeMode = () => {
  if (body.classList.contains('lightMode')) {
    body.classList.remove('lightMode')
    return body.classList.add('darkMode')
  }
  if (body.classList.contains('darkMode')) {
    body.classList.remove('darkMode')
    return body.classList.add('lightMode')
  }
}

const handleAddTask = () => {
  const inputIsValid = validateInput()

  console.log(inputIsValid)

  if (!inputIsValid) {
    return inputElement.classList.add('error')
  }
  const taskItemContainer = document.createElement('div')
  taskItemContainer.classList.add('task-item')

  const taskContent = document.createElement('p')
  taskContent.innerText = inputElement.value
  taskContent.classList.add('task-content')

  taskContent.addEventListener('click', () => handleClick(taskContent))

  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add('fa-solid')
  deleteIcon.classList.add('fa-trash-can')
  deleteIcon.classList.add('delete-button')

  deleteIcon.addEventListener('click', () =>
    handleDeleteClick(taskItemContainer, taskContent)
  )

  taskItemContainer.appendChild(taskContent)
  taskItemContainer.appendChild(deleteIcon)

  tasksContainer.appendChild(taskItemContainer)

  inputElement.value = ''

  updateLocalStorage()
}

const handleClick = taskContent => {
  const tasks = tasksContainer.childNodes

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle('completed')
    }
  }
  updateLocalStorage()
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)

    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove()
    }
  }

  updateLocalStorage()
}

const handleInputChange = () => {
  const inputIsValid = validateInput()

  if (inputIsValid) {
    return inputElement.classList.remove('error')
  }
}

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes

  const localStorageTasks = [...tasks].map(task => {
    const content = task.firstChild
    const isCompleted = content.classList.contains('completed')

    return { description: content.innerText, isCompleted }
  })

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}

const refreshTasks = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

  if (!tasksFromLocalStorage) return

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p')
    taskContent.innerText = task.description
    taskContent.classList.add('task-content')

    if (task.isCompleted) {
      taskContent.classList.add('completed')
    }

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fa-solid')
    deleteIcon.classList.add('fa-trash-can')
    deleteIcon.classList.add('delete-button')

    deleteIcon.addEventListener('click', () =>
      handleDeleteClick(taskItemContainer, taskContent)
    )

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteIcon)

    tasksContainer.appendChild(taskItemContainer)
  }
}

refreshTasks()

addTaskButton.addEventListener('click', () => handleAddTask())
modeButton.addEventListener('click', () => changeMode())

inputElement.addEventListener('change', () => {
  handleInputChange()
})
