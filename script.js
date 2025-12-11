let tasksData = {}

let todo = document.querySelector("#todo")
let progress = document.querySelector("#progress")
let done = document.querySelector("#done")
let dragElement = null;
let columns = [todo, progress, done]

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"))

    console.log("data", data);

    for (const col in data) {

        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            const div = document.createElement("div")
            div.classList.add("task")
            div.setAttribute("draggable", "true")

            div.innerHTML = `<h2>${task.title}</h2>    
                <p>${task.desc}</p> 
                <button  class="btnDlt">Delete</button>`

            column.appendChild(div)
            div.addEventListener("drag", (e) => {
                dragElement = div;
            })
        })

        const tasks = column.querySelectorAll(".task")
        const count = column.querySelector(".right")
        count.innerText = tasks.length
        
    }

}
const tasks = document.querySelectorAll(".task")

tasks.forEach((task) => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    })
})

function addDragEventonColum(column) {
    column.addEventListener("dragenter", function (e) {
        e.preventDefault()
        column.classList.add("hover-over")
    })

    column.addEventListener("dragleave", function (e) {
        e.preventDefault()
        column.classList.remove("hover-over")
    })

    column.addEventListener("dragover", function (e) {
        e.preventDefault()
    })

    column.addEventListener("drop", function (e) {
        e.preventDefault()

        column.appendChild(dragElement)
        column.classList.remove("hover-over")

        // columns.forEach(cols => {
        //     const tasks = cols.querySelectorAll(".task")
        //     const count = cols.querySelector(".right")
        //     count.innerText = tasks.length
        // })

        columns.forEach(cols => {
            const tasks = cols.querySelectorAll(".task")
            const count = cols.querySelector(".right")

            tasksData[cols.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector("h2").innerText,
                    desc: t.querySelector("p").innerText
                }
            })

            localStorage.setItem("tasks", JSON.stringify(tasksData))

            count.innerText = tasks.length
        })

    })

}

addDragEventonColum(todo)
addDragEventonColum(progress)
addDragEventonColum(done)


const toggleModalButton = document.querySelector("#toggle_modal")
const modal = document.querySelector(".modal")
const bgModal = document.querySelector(".bg")
toggleModalButton.addEventListener("click", function () {
    modal.classList.toggle("active")
    bgModal.classList.toggle("active")
})
bgModal.addEventListener("click", function () {
    modal.classList.toggle("active")
})

let add_new_task = document.querySelector("#add_new_task")
add_new_task.addEventListener("click", function () {

    let taskTitle = document.querySelector(".task_title_input").value
    let taskDesc = document.querySelector(".task_description_textarea").value

    let div = document.createElement("div");
    div.classList.add("task")
    div.setAttribute("draggable", "true")
    div.innerHTML = `
        <h2>${taskTitle}</h2>    
        <p>${taskDesc}</p> 
        <button  class="btnDlt">Delete</button>`
    todo.appendChild(div)

    columns.forEach(cols => {
        const tasks = cols.querySelectorAll(".task")
        const count = cols.querySelector(".right")

        tasksData[cols.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })

        localStorage.setItem("tasks", JSON.stringify(tasksData))
        count.innerText = tasks.length
    })
    modal.classList.remove("active")

    div.addEventListener("drag", (e) => {
        e.preventDefault()
        dragElement = div;

    })

})
