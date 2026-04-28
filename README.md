# Todo List Web App

A simple, interactive todo list web application built with HTML, CSS, and JavaScript.

## Features

- Add new tasks
- Mark tasks as completed using checkboxes
- Delete tasks
- Persistent storage: tasks are saved locally and persist after page refresh
- Status display: shows total, completed, and remaining tasks
- Smooth animations: fade-in effects for new tasks, transitions for state changes, hover effects, and animated gradient background
- Navigation bar: styled header with app title and action buttons
- Clear completed tasks: remove all completed items at once
- Export/Import: save tasks to JSON file or load from file
- Light/Dark mode toggle: switch between themes
- Clean and responsive design

## How to Run

1. Clone or download the repository
2. Open the `index.html` file in a web browser, or
3. Run a local server (recommended for full functionality):
   - Using Python: `python -m http.server 8000`
   - Navigate to `http://localhost:8000` in your browser

## Files

- `index.html`: The main HTML structure
- `styles.css`: CSS styling for the app
- `script.js`: JavaScript for interactivity

## Usage

- Type a task in the input field and click "Add" or press Enter
- Check the checkbox next to a task to mark it as completed
- Click the "Delete" button to remove a task
- Use "Clear Completed" to remove all finished tasks
- Click "Export" to download your tasks as a JSON file
- Click "Import" to load tasks from a JSON file
- Toggle between "Light Mode" and "Dark Mode" for different themes

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)