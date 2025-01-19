[.] ### Live link: [https://suyash-chat-box.vercel.app/](#https://suyash-chat-box.vercel.app/)

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [Components](#components)
- [Utilities](#utilities)
- [Tailwind CSS](#tailwind-css)
- [License](#license)

## Getting Started

To get started with the project, follow the instructions below:

- Step 1 - Clone the repository:

`git clone https://github.com/your-username/my-v0-project.git`

- Step 2 - Navigate to the project directory:
  cd chat_box

## Prerequisites

- Before running the project, make sure you have the following installed:

- Node.js (version 16 or later) npm (version 8 or later) or Yarn (optional)

## Installation

To install the project dependencies, run one of the following commands:

With npm:

`npm install`

With yarn:

`yarn install`

## Available Scripts After

- installing the dependencies, you can run the following scripts:

`npm run dev / yarn dev` Starts the development server at http://localhost:3000. This will watch for any changes and hot-reload the project.

`npm run build / yarn build` Builds the project for production. It prepares the optimized production build for deployment.

`npm run start / yarn start` Starts the production server after building the project with npm run build.

`npm run lint / yarn lint` Runs ESLint to check for code quality issues in your project.

## Dependencies

- Here are the main dependencies used in the project:

@hookform/resolvers: Library for handling form validation and schema resolvers in React Hook Form. @radix-ui/react-\*: A set of unstyled, accessible UI components that provide building blocks for modern web applications. Components such as Accordion, Dialog, Checkbox, Tooltip, etc., are used for creating complex UI interactions. axios: A promise-based HTTP client used for making API requests. clsx: A utility for conditionally combining class names. embla-carousel-react: A responsive carousel library. react-hook-form: A powerful library for managing form state and validation in React. lucide-react: A collection of simple, customizable icons for React applications. tailwindcss: Utility-first CSS framework for building custom designs. sonner: Toast notifications library for React. date-fns: A utility library for working with dates. react-markdown: A component for rendering markdown as React components. next-themes: A library for handling theme switching (e.g., light and dark mode). openai: OpenAI API library for integrating AI features.

## Project

- Structure Here is an overview of the important folders and files in this project: /public # Public files like images, favicon, etc. /images # Folder for static images /src /components # Reusable React components /pages # Next.js pages (URL routes) /styles # Tailwind CSS configuration and styles /utils # Helper functions and utility files /hooks # Custom hooks like form handling /types # TypeScript types used throughout the project /package.json # Project metadata and dependencies /tsconfig.json # TypeScript configuration /tailwind.config.js # Tailwind CSS configuration

## Components

The project makes use of various UI components for creating rich user interfaces, including:

- Form Components: Powered by react-hook-form, these components handle form submissions, validations, and interactions. UI Components: Leveraging @radix-ui/react-\* libraries for dialogs, popovers, switches, and more, these components are used to build interactive and accessible UI elements.

## Utilities

- API Calls: Axios is used to handle API calls, managing request lifecycle, and processing responses. LocalStorage Utilities: Functions like setLocalStorage, getLocalStorage, and removeLocalStorage are used to interact with the browser’s local storage for persisting user data.

## Tailwind CSS

- Tailwind CSS is used for styling the application. The project comes with the utility-first CSS framework configured with custom themes and animations for building custom user interfaces.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

For further questions or assistance, feel free to reach out via email [suyashmishra143143@gmail.com].
