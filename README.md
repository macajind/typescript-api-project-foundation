# Foundation of a TypeScript API project using Node.js and Express

## Installation

### 0) Clone

```bash
git clone git@github.com:macajind/typescript-api-project-foundation.git
```

### 1) Install

```bash
npm install
```

### 2) Start developing

```bash
npm watch # or npm watch-debug
```

## Configuration

- Change project name, version, licence etc. in the `package.json` file.

- Create `.env` file from the example with the specific configuration for your project.

- Install any other required libraries for your project using `npm` and don't forget about theirs TypeScript parts.

## Usage

Project uses traditional API architecture with two layers (*models* and *controllers*) and JSON format as output. It disposes with powerful, but lightweight implementation of basic annotations known from other frameworks and languages, that can really help you with your project development.

1. Place your controllers so mapping defined in your `.env` can find them. And inherit from `Controller` class to provide them with helpful features.

2. Use `@Inject` annotation in your classes on **properties** and **constructors** to automatically get instances your services by using design pattern **Dependency Injection**.

3. Use `@Route` annotation for easy mapping of controller methods to specific URLs by using standard [Express routing](https://expressjs.com/en/guide/routing.html) and combine it directly with input data validation through [Express validator](https://express-validator.github.io/docs/).