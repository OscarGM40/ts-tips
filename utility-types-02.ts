// https://www.youtube.com/watch?v=vwiOBPV3IJI
// las peerDependencies son un tanto confusas ya que no interactuamos con ellas como si lo hacemos con las dependencies o las devDependencies. Se suelen usar al desarrollar alguna libreria. La idea de estas dependencies es que el usuario que esté instalando esta libreria ( tambien llamado host) de igual manera tiene que instalar las dependencias que dicha libreria necesita (o sea, ya deberia de tenerlas). Suelen darse también en librerias que actuan como un plugin, y este tipo de decisiones (el que la libreria tenga las dependencias o pase al host) son decisiones de los equipos de desarrollo (cuales tenemos nosotros?)
// Fijate que las peerDependencies no se van a instalar con un npm install, es cosa del host esto. Por ejemplo, la libreria react-dom tiene como peerDependency a react, pero no como dependency porque sería muy intrusivo si la instalará él, digamos que está esperando que ya el host lo tenga. Estas declaraciones se dan mucho en sub-librerias de frameworks (por ejemplo Angular puede pedir typescript por motivos obvios)


interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

class TodoService {
  tasks: Task[] = [];
  idIndex: number = 0;
  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(data: Omit<Task, "id" | "createdAt">) {
    const newTask = {
      id: this.idIndex++,
      createdAt: new Date(),
      ...data,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, changes: Partial<Omit<Task, "id" | "createdAt">>) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        ...changes,
      };
    }
    return this.tasks[taskIndex] ?? "no existe una tarea con ese indice";
  }

  find(attrs: Readonly<Partial<Task>>){
    return this.tasks.filter(() => attrs);
  }

  

}

(() => {
  const service = new TodoService();
  console.log(service.getTasks());
  
  const newTask = {
    title: "nueva tarea",
    completed: false,
  };
  
  service.addTask(newTask);
  console.log(service.getTasks());

  service.updateTask(0, {
    title: 'changed title',
    completed: true
  });

  console.log(service.getTasks());
})();
