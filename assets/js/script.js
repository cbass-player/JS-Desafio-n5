// Definición de tareas base
const tasks = [
    {id: 1, task: "Pagar cuentas del mes", status: false},
    {id: 2, task: "Hacer compra de supermercado", status: false},
    {id: 3, task: "Sacar a pasear al perro", status: false}
];

// Definición de variables necesarias
const addValue = document.getElementById("input");
const addButton = document.getElementById("button");
const total = document.getElementById("total");
const done = document.getElementById("done");
const detailedTask = document.querySelector(".detail");

// Función de agregar tarea
const addTask = () => {
    const taskName = addValue.value.trim() // trimp elimina los espacio vacíos sobrantes
    
    // Validación de tarea vacía
    if(!taskName) {
        alert("Escribe una tarea")
        return //Este return detiene el código para que no siga corriendo. 
    };

    // Rescatar la última tarea ingresada, pensando en obtener el ID
    const lastTask = tasks[tasks.length-1];

    // Creación de la nueva tarea. Operador ternario: Chequea el valor de ID. Si existe el último, le suma 1 para obtener el ID de la nueva tarea, sino lo comienza en 1.
    const newTask = {
        id:lastTask? lastTask.id + 1 : 1,
        task: taskName,
        status: false
    };
    tasks.push(newTask); //Se carga al final del array la nueva actividad
    renderTask(newTask); // Se renderiza
    document.getElementById("input").value = "" // se limpia el input
};

// Ingreso de nueva tarea con el evento click
addButton.addEventListener("click", addTask);

// Función de renderizar tarea
const renderTask = () => {
    let html = "";
    let completedTasks = 0;
    html = `
    <table>
        <tr>
            <th class="text-table">ID</th>
            <th class="text-table">Tarea</th>
            <th class="text-table">Finalizada?</th>
            <th class="text-table">Eliminar?</th>
        </tr>
    `
    tasks.forEach((task) => {
        html += `
        <tr>
            <td><span>${task.id}</span></td>
            <td><span>${task.task}</span></td>
            <td><input type="checkbox" ${task.status? "checked" : ""} onclick="changeStatus(${task.id})"></td>
            <td><button onclick = "deleteTask(${task.id})">Eliminar</button></td>
        </tr>
        `
        // Verificación de si la actividad está terminada y se aumenta el contador asociado
        if(task.status) {
            completedTasks++
        }
    });

    html += `
    </table>
    `

    detailedTask.innerHTML = html;
    total.innerHTML = tasks.length;
    done.innerHTML = completedTasks;
};

renderTask()

// Función de cambio de estatus
function changeStatus(id) {
    const taskId = tasks.findIndex((ele) => ele.id == id)

    // Agregar condiciones por si está en True o en False
    if(!tasks[taskId].status) {
        tasks[taskId].status = true
        console.log(tasks[taskId])
    }
    else {
        tasks[taskId].status = false
        console.log(tasks[taskId])
    }

    // Renderizar luego de modificar
    renderTask(tasks[taskId])
};

// Función que elimina una tarea
function deleteTask(id) {
    const taskId = tasks.findIndex((ele) => ele.id == id)
    tasks.splice(taskId, 1)
    console.log(tasks)

    // Renderizar luego de eliminar
    renderTask(tasks[taskId])
};
