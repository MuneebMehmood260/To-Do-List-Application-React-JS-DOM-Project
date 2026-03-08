const TodoItem = ({ task, onDelete, onToggle, onEdit }) => {
    const [isEdit, setIsEdit] = React.useState(false);
    const [val, setVal] = React.useState(task.text);

    const save = () => {
        if (val.trim() != '') {
            onEdit(task.id, val);
            setIsEdit(false);
        }
    };

    const key = (e) => {
        if (e.key == 'Enter') {
            save();
        }
        if (e.key == 'Escape') {
            setIsEdit(false);
        }
    };

    return (
        <li className={isEdit ? '' : task.completed ? 'done' : ''}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            {isEdit ? (
                <div>
                    <input
                        type="text"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        onKeyPress={key}
                    />
                    <button onClick={save}>Save</button>
                    <button onClick={() => setIsEdit(false)}>Cancel</button>
                </div>
            ) : (
                <span>{task.text}</span>
            )}
            {!isEdit && (
                <>
                    <button onClick={() => setIsEdit(true)}>Edit</button>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
                </>
            )}
        </li>
    );
};

const TodoList = () => {
    const [tasks, setTasks] = React.useState([]);
    const [txt, setTxt] = React.useState('');
    const [f, setF] = React.useState('a');

    const add = (e) => {
        e.preventDefault();
        if (txt == '') {
            alert('write something');
            return;
        }
        let t = {
            id: Date.now(),
            text: txt,
            done: false
        };
        setTasks([...tasks, t]);
        setTxt('');
    };

    const del = (id) => {
        setTasks(tasks.filter(task => task.id != id));
    };

    const toggle = (id) => {
        let x = tasks.map(task => {
            if (task.id == id) {
                task.done = !task.done;
            }
            return task;
        });
        setTasks(x);
    };

    const edit = (id, nt) => {
        let x = tasks.map(task => {
            if (task.id == id) {
                task.text = nt;
            }
            return task;
        });
        setTasks(x);
    };

    let show = [];
    for (let i = 0; i < tasks.length; i++) {
        if (f == 'a') {
            show.push(tasks[i]);
        } else if (f == 'ac' && !tasks[i].done) {
            show.push(tasks[i]);
        } else if (f == 'c' && tasks[i].done) {
            show.push(tasks[i]);
        }
    }

    let total = tasks.length;
    let numDone = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done) {
            numDone++;
        }
    }
    let active = total - numDone;

    return (
        <div>
            <header>
                <h1>My To-Do List</h1>
            </header>

            <form onSubmit={add}>
                <input
                    type="text"
                    placeholder="Add task"
                    value={txt}
                    onChange={(e) => setTxt(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            <div>
                <p>Total: {total}</p>
                <p>Active: {active}</p>
                <p>Done: {numDone}</p>
            </div>

            <div>
                <button onClick={() => setF('a')}>All</button>
                <button onClick={() => setF('ac')}>Active</button>
                <button onClick={() => setF('c')}>Done</button>
            </div>

            {show.length > 0 ? (
                <ul>
                    {show.map((task) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            onDelete={del}
                            onToggle={toggle}
                            onEdit={edit}
                        />
                    ))}
                </ul>
            ) : (
                <p>No tasks</p>
            )}

            {numDone > 0 && (
                <button onClick={() => setTasks(tasks.filter(task => !task.done))}>Clear Done</button>
            )}
        </div>
    );
};

const r = ReactDOM.createRoot(document.getElementById('root'));
r.render(<TodoList />);
