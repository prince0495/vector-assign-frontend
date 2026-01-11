# Pipeline Automation

Completed the assignment for the pipeline automation

**Production URL:** https://vector-assign-frontend.vercel.app
**Repository URL for frontend:** https://github.com/prince0495/vector-assign-frontend
**Repository URL for backend:** https://github.com/prince0495/vector-assign-backend

---

## About the Project

This project is for assignment

---

## Features

Node Abstraction: Nodes are abstracted to bootstrap the creation of any other kind of nodes very faster with very minor tweeks. Every node is built on top of Base Node.\n
Styling: I have did styling in tailwindcss and also have used shadcn to bootstrap designing faster and reliable. Used Unified techniques so that nodes or their input fields are dynamically change as per requirement with minor tweeks.\n
Text Node Logic: In text input area, I have added function to let user define variables and use them in the input fields.\n
Backend Integration: In fastapi simple backend, I have used Kahn's Topological Sorting Algorithm to figure out the whether is it DAG or not. Also if it's DAG, I am successfully aranged a list in which defined the order of execution should be followed for the nodes to be executed.


---

## Tech Stack

### Frontend
- Framework / Library:
- Tech Stack: React, Zustand, reactflow

### Backend
- Language: Python
- Framework: Fastapi

## Running the Project Locally
npm install
npm start

Make sure you run the backend as well and define the backend url in the fetch call to be : http://localhost:8000/pipeline/parse
