# Hiring-Process-Management

A web-based application to streamline and manage the hiring process. It allows administrators to oversee the interview process, track applicant statuses, and analyze interview trends. This project uses **React** for the frontend, **Django** for the backend, and includes several powerful libraries for state management, testing, charts, notifications, and calendar scheduling.

## Features

- Admin login for secure access.
- Manage the hiring process, including interview scheduling, offer stage, and hiring date.
- Track and update applicant statuses.
- Visualize hiring trends with interactive charts.
- View statistics such as the number of applicants per job role and average time trends.
- Real-time notifications for admin actions.
- Calendar integration for scheduling interviews.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Django, Django REST-framework, CORS-Headers
- **State Management**: Redux

## Usage

- Admin Login: Access the admin panel to manage applicants.
- Tracking Applicants: View job roles, interview status, and scheduling information.
- Scheduling Interviews: Use the calendar to set interview dates.
- Analyzing Data: Utilize charts to track hiring trends, such as average time to hire and applicant numbers per job role.

## Frontend Libraries

The frontend of the application leverages several libraries:

- @reduxjs/toolkit: For state management across React components.
- @testing-library/react: For testing React components.
- chart.js & react-chartjs-2: To create interactive charts for data visualization.
- moment: For date manipulation (consider replacing with date-fns due to maintenance issues).
- react-big-calendar: For scheduling interviews with a calendar interface.
- react-icons: For easily adding icons.
- react-redux: For connecting Redux with React components.
- react-router-dom: For routing and navigation within the app.
- react-toastify: For displaying notifications.
- react-scripts: Scripts for building and running the app.

## Backend Setup

The backend is built using Django and includes:

- Django REST Framework: To build the API that connects to the frontend.
- cors-headers: To handle Cross-Origin Resource Sharing (CORS) for development.

## Hosted Web App

You can view the live version of the Hiring Process Management by visiting the following link:
[Hiring Process Management](http://13.232.38.6:3000/)
- username: admin@gmail.com
- password: admin123