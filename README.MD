# Backend Project: Hexagonal Architecture

This project provides the backend services for a robust application. We've chosen the Hexagonal (or Ports & Adapters) Architecture because of its flexibility, scalability, and clear separation of concerns.

## Overview

The Hexagonal Architecture promotes the separation of concerns by isolating the core logic of the application from external concerns. This separation is achieved by defining clear contracts (ports) and using adapters to implement each contract.

Key Benefits:

- **Flexibility:** Easily adapt to changes in external technologies or platforms.
- **Testability:** Business logic can be tested in isolation from its external elements (like databases, frameworks, etc.).
- **Clean Code:** Clear separation between business logic and the technologies used to implement it.

## Project Structure

- **Application:** This layer contains the business logic.
- **Infrastructure:** The adapters needed to use external resources, such as databases, messaging, etc.
- **Domain:** The heart of the business logic, including entities and value objects.

## Technologies Used

- **Node.js** for runtime.
- **Express.js** for the API framework.
- **TypeScript** for static typing.
- **MongoDB** as the primary database

## Getting Started

1. **Setup the environment:** Install Node.js and MongoDB.
2. **Clone the repository:** `git clone https://github.com/pelsmi11/testRocketfy-backend.git`.
3. **Install dependencies:** Run `npm install` in the project directory.
4. **Start the server:** Use the command `npm run dev`.
