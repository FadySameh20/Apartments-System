# Apartments-System
A simple listing apartments website that allows users to see more details about each apartment.

## Technologies
  - **Docker**
  - **Database**: Postgres
  - **Backend**: Node.js + Typescript + Prisma (ORM)
  - **Frontend**: Next.js

## Features
  - List apartments with pagination (implemented in the backend) and the ability to search/filter using unit number, unit name or project.
  - View apartment details.
  - Create new apartments with the ability to uploading multiple images for the apartment.

## Setup Instructions
  1. Clone the repository.
  ```
  git clone https://github.com/FadySameh20/Apartments-System.git
  ```

  2. Navigate to the project's root directory.
  ```
  cd Apartments-System
  ```

  3. Run the docker containers
  ```
  docker compose up
  ```

## Notes & Assumptions
  - Implemented the backend and frontend in separate folders inside the same repository so that you can run it with a single "docker compose" command.
  **Ideally,** I would have separated them into two repositories and run each separately.
  
  - Environment variables are explicitly put inside the `docker-compose.yaml` file to make it easier for the reviewer to run the docker containers directly without having to manually add some environment variables.
  **Ideally,** I would have created a separate `.env` file and `.env.example` for both the backend and frontend. The `.env` will be contain all the needed environment variables. In addition, it will git ignored and referenced in the `docker-compose.yaml` file.

  - In the `entrypoint.sh` files used by the `Dockerfile`, I kept the commands that build and start the app (similar to what happens in production) while commented out the commands that runs the app in the development environment for faster development process (like hot reload).
  **Ideally,** I would have created separate Dockerfiles for each environment: `Dockerfile.dev` and `Dockerfile.prod`.

  - For uploading images when creating a new apartment, I intended to keep it simple by converting the uploaded images files from the frontend to a list of `base64` strings in the backend to be stored in the database.
  **Ideally,** this might not be the most efficient approach because `base64` strings are quite large and that it is better to either store the uploaded images as binary files using `BYTEA` datatype in Postgres (would have created a separated table for storing images) or what is even better and most effiecient is to store them on cloud (such as: AWS S3 Buckets). However, for the scope of the task, I kept it simple.

## Resources
  - [Postman](https://app.getpostman.com/join-team?invite_code=10b5f4f4336f4c32571e82e59842a124da777e48435e5d02cbe5491c6f13e22a&target_code=ff5c4cae191eff54e241a7b270269e0d) (for backend APIs documentation)
