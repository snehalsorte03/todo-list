document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const statusDiv = document.getElementById('status');

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    loadTasks();
    updateStatus();

    const clearCompletedBtn = document.getElementById('clear-completed');
    const exportBtn = document.getElementById('export');
    const importBtn = document.getElementById('import');
    const themeToggleBtn = document.getElementById('theme-toggle');

    clearCompletedBtn.addEventListener('click', () => {
        const completedLis = todoList.querySelectorAll('li.completed');
        completedLis.forEach(li => li.remove());
        saveTasks();
    });

    exportBtn.addEventListener('click', () => {
        const tasks = JSON.parse(localStorage.getItem('todos')) || [];
        const dataStr = JSON.stringify(tasks, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'todo-list.json';
        link.click();
        URL.revokeObjectURL(url);
    });

    importBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const tasks = JSON.parse(e.target.result);
                        localStorage.setItem('todos', JSON.stringify(tasks));
                        todoList.innerHTML = '';
                        loadTasks();
                    } catch (err) {
                        alert('Invalid JSON file');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    });

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span>${todoText}</span>
            <button class="delete-btn">Delete</button>
        `;

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', function() {
            li.classList.toggle('completed');
            saveTasks();
        });

        todoList.appendChild(li);
        saveTasks();
        todoInput.value = '';
    }

    function saveTasks() {
        const tasks = [];
        const lis = todoList.querySelectorAll('li');
        lis.forEach(li => {
            const text = li.querySelector('span').textContent;
            const completed = li.classList.contains('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('todos', JSON.stringify(tasks));
        updateStatus();
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('todos')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span>
                <button class="delete-btn">Delete</button>
            `;
            if (task.completed) {
                li.classList.add('completed');
            }
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                li.remove();
                saveTasks();
            });
            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', function() {
                li.classList.toggle('completed');
                saveTasks();
            });
            todoList.appendChild(li);
        });
    }

    function updateStatus() {
        const total = todoList.children.length;
        const completed = todoList.querySelectorAll('li.completed').length;
        const remaining = total - completed;
        statusDiv.textContent = `Total: ${total}, Completed: ${completed}, Remaining: ${remaining}`;
    }
});