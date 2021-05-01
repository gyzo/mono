# Mono

Nx + Angular + NestJS monorepository.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![Master](https://github.com/rfprod/mono/workflows/Master/badge.svg) ![PR validation](https://github.com/rfprod/mono/workflows/PR%20validation/badge.svg)

## Requirements

In order to run own copy of the project one must fulfill the following requirements.

### Operating system

- [Debian based Linux](https://en.wikipedia.org/wiki/List_of_Linux_distributions#Debian-based)
- [OSX](https://en.wikipedia.org/wiki/MacOS)
- ~~`Windows`~~ - poorly supported

### Core dependencies

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Preferred package manager

- [Yarn](https://www.npmjs.com/package/yarn) is a preferred package manager for dependencies installation in the project root.
- [npm](https://www.npmjs.com/) is a preferred package manager for dependencies installation in the `functions` folder.

## Package scripts reference

The project has lots of package scripts, check it in the `package.json` located in the project root, or use the following command (see terminal output for usage tips)

```
yarn workspace:help
```

## Committing changes to repo

Using [commitizen cli](https://github.com/commitizen/cz-cli) is mandatory.

Provided all dependencies are installed, and [commitizen cli is installed as a global dependency](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility), this command must be used.

```bash
git cz
```

## GitBook documentation

Is generated based on GitHub repo.

- [GitBook documentation](https://rfprod.gitbook.io/mono/)

## Firebase deployment

Applications as well as generated documentation, testing reports, and a custom changelog are deployed to Firebase.

### Webapps

- [Portfolio](https://rfprod.tk)

### Documentation

- [Mono Documentation](https://mono-documentation.web.app)
- [Mono Compodoc](https://mono-documentation.web.app/assets/compodoc/index.html)

#### Unit coverage

- [Documentation](https://mono-documentation.web.app/assets/coverage/apps/documentation/index.html)
- [API](https://mono-documentation.web.app/assets/coverage/apps/api/index.html)
  - [Backend Auth](https://mono-documentation.web.app/assets/coverage/libs/backend-auth/index.html)
  - [Backend Github](https://mono-documentation.web.app/assets/coverage/libs/backend-github/index.html)
  - [Backend gRPC](https://mono-documentation.web.app/assets/coverage/libs/backend-grpc/index.html)
  - [Backend Interfaces](https://mono-documentation.web.app/assets/coverage/libs/backend-interfaces/index.html)
  - [Backend Logger](https://mono-documentation.web.app/assets/coverage/libs/backend-logger/index.html)
  - [Backend Mailer](https://mono-documentation.web.app/assets/coverage/libs/backend-mailer/index.html)
  - [Backend Websocket](https://mono-documentation.web.app/assets/coverage/libs/backend-websocket/index.html)
- [Portfolio](https://mono-documentation.web.app/assets/coverage/apps/portfolio/index.html)
- [Client](https://mono-documentation.web.app/assets/coverage/apps/client/index.html)
  - [Client Chatbot](https://mono-documentation.web.app/assets/coverage/libs/client-chatbot/index.html)
  - [Client Chatbot Store](https://mono-documentation.web.app/assets/coverage/libs/client-chatbot-store/index.html)
  - [Client Components](https://mono-documentation.web.app/assets/coverage/libs/client-components/index.html)
  - [Client Core](https://mono-documentation.web.app/assets/coverage/libs/client-core/index.html)
  - [Client D3 Charts](https://mono-documentation.web.app/assets/coverage/libs/client-d3-charts/index.html)
  - [Client Diagnostics](https://mono-documentation.web.app/assets/coverage/libs/client-diagnostics/index.html)
  - [Client Material](https://mono-documentation.web.app/assets/coverage/libs/client-material/index.html)
  - [Client Portfolio](https://mono-documentation.web.app/assets/coverage/libs/client-portfolio/index.html)
  - [Client Services](https://mono-documentation.web.app/assets/coverage/libs/client-services/index.html)
  - [Client Interfaces](https://mono-documentation.web.app/assets/coverage/libs/client-interfaces/index.html)
  - [Client Sidebar](https://mono-documentation.web.app/assets/coverage/libs/client-sidebar/index.html)
  - [Client Store](https://mono-documentation.web.app/assets/coverage/libs/client-store/index.html)
  - [Client Translate](https://mono-documentation.web.app/assets/coverage/libs/client-translate/index.html)
  - [Client Unit Testing](https://mono-documentation.web.app/assets/coverage/libs/client-unit-testing/index.html)
  - [Client Util](https://mono-documentation.web.app/assets/coverage/libs/client-util/index.html)
- [Proto](https://mono-documentation.web.app/assets/coverage/libs/proto/index.html)

#### E2E report

- [Documentation E2E](https://mono-documentation.web.app/assets/cypress/documentation-e2e/mochawesome/mochawesome.html)
- [Client E2E](https://mono-documentation.web.app/assets/cypress/client-e2e/mochawesome/mochawesome.html)
- [Client Components E2E](https://mono-documentation.web.app/assets/cypress/client-components-e2e/mochawesome/mochawesome.html)
- [Client Diagnostics E2E](https://mono-documentation.web.app/assets/cypress/client-diagnostics-e2e/mochawesome/mochawesome.html)
- [Portfolio E2E](https://mono-documentation.web.app/assets/cypress/portfolio-e2e/mochawesome/mochawesome.html)

#### Changelog

- [Documentation](https://mono-documentation.web.app/assets/changelog/apps/documentation-CHANGELOG.html)
- [Documentation E2E](https://mono-documentation.web.app/assets/changelog/apps/documentation-e2e-CHANGELOG.html)
- [API](https://mono-documentation.web.app/assets/changelog/apps/api-CHANGELOG.html)
  - [Backend Auth](https://mono-documentation.web.app/assets/changelog/libs/backend-auth-CHANGELOG.html)
  - [Backend Github](https://mono-documentation.web.app/assets/changelog/libs/backend-github-CHANGELOG.html)
  - [Backend gRPC](https://mono-documentation.web.app/assets/changelog/libs/backend-grpc-CHANGELOG.html)
  - [Backend Interfaces](https://mono-documentation.web.app/assets/changelog/libs/backend-interfaces-CHANGELOG.html)
  - [Backend Logger](https://mono-documentation.web.app/assets/changelog/libs/backend-logger-CHANGELOG.html)
  - [Backend Mailer](https://mono-documentation.web.app/assets/changelog/libs/backend-interfaces-CHANGELOG.html)
  - [Backend Websocket](https://mono-documentation.web.app/assets/changelog/libs/backend-interfaces-CHANGELOG.html)
- [Portfolio](https://mono-documentation.web.app/assets/changelog/apps/portfolio-CHANGELOG.html)
- [Portfolio E2E](https://mono-documentation.web.app/assets/changelog/apps/portfolio-e2e-CHANGELOG.html)
- [Client](https://mono-documentation.web.app/assets/changelog/apps/client-CHANGELOG.html)
- [Client E2E](https://mono-documentation.web.app/assets/changelog/apps/client-e2e-CHANGELOG.html)
  - [Client Chatbot](https://mono-documentation.web.app/assets/changelog/libs/client-chatbot-CHANGELOG.html)
  - [Client Chatbot Store](https://mono-documentation.web.app/assets/changelog/libs/client-chatbot-store-CHANGELOG.html)
  - [Client Components](https://mono-documentation.web.app/assets/changelog/libs/client-components-CHANGELOG.html)
  - [Client Components E2E](https://mono-documentation.web.app/assets/changelog/libs/client-components-e2e-CHANGELOG.html)
  - [Client Core](https://mono-documentation.web.app/assets/changelog/libs/client-core-CHANGELOG.html)
  - [Client D3 Charts](https://mono-documentation.web.app/assets/changelog/libs/client-d3-charts-CHANGELOG.html)
  - [Client Diagnostics](https://mono-documentation.web.app/assets/changelog/libs/client-diagnostics-CHANGELOG.html)
  - [Client Diagnostics E2E](https://mono-documentation.web.app/assets/changelog/libs/client-diagnostics-e2e-CHANGELOG.html)
  - [Client Material](https://mono-documentation.web.app/assets/changelog/libs/client-material-CHANGELOG.html)
  - [Client Portfolio](https://mono-documentation.web.app/assets/changelog/libs/client-portfolio-CHANGELOG.html)
  - [Client Services](https://mono-documentation.web.app/assets/changelog/libs/client-services-CHANGELOG.html)
  - [Client Interfaces](https://mono-documentation.web.app/assets/changelog/libs/client-interfaces-CHANGELOG.html)
  - [Client Sidebar](https://mono-documentation.web.app/assets/changelog/libs/client-sidebar-CHANGELOG.html)
  - [Client Store](https://mono-documentation.web.app/assets/changelog/libs/client-store-CHANGELOG.html)
  - [Client Translate](https://mono-documentation.web.app/assets/changelog/libs/client-translate-CHANGELOG.html)
  - [Client Unit Testing](https://mono-documentation.web.app/assets/changelog/libs/client-unit-testing-CHANGELOG.html)
  - [Client Util](https://mono-documentation.web.app/assets/changelog/libs/client-util-CHANGELOG.html)
- [Proto](https://mono-documentation.web.app/assets/changelog/libs/proto-CHANGELOG.html)

## General Tooling

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Angular CLI power-ups for modern development.**

### Quick Start & Documentation

- [Nx Documentation](https://nx.dev)
- [30-minute video showing all Nx features](https://nx.dev/getting-started/what-is-nx)
- [Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, .etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

| Application type                       | Command                  |
| -------------------------------------- | ------------------------ |
| [Angular](https://angular.io)          | `ng add @nrwl/angular`   |
| [React](https://reactjs.org)           | `ng add @nrwl/react`     |
| Web (no framework frontends)           | `ng add @nrwl/web`       |
| [Nest](https://nestjs.com)             | `ng add @nrwl/nest`      |
| [Express](https://expressjs.com)       | `ng add @nrwl/express`   |
| [Node](https://nodejs.org)             | `ng add @nrwl/node`      |
| [Storybook](https://storybook.js.org/) | `ng add @nrwl/storybook` |

### Generating an application

To generate an application run:

```bash
ng g @nrwl/angular:app my-app
```

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generating a library

To generate a library run:

```bash
ng g @nrwl/angular:lib my-lib
```

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications.

It can be imported from `@mono/mylib`.

### Running a development server

To start a dev server run:

```bash
ng serve my-app
```

Navigate to http://localhost:4200/.

The app will automatically reload if you change any of the source files.

### Code scaffolding

To generate a new component run:

```bash
ng g component my-component --project=my-app
```

### Building applications

To build the project run:

```bash
ng build my-app
```

The build artifacts will be stored in the `dist/` directory.

Use the `--prod` flag for a production build.

### Unit testing with [Jest](https://jestjs.io)

To execute the unit tests run:

```bash
ng test my-app
```

To execute the unit tests affected by a change run:

```bash
npm run affected:test
```

### End-to-end testing with [Cypress](https://www.cypress.io)

To execute the end-to-end tests run:

```bash
ng e2e my-app
```

To execute the end-to-end tests affected by a change run:

```bash
npm run affected:e2e
```

### Understanding your workspace

To see a diagram of the dependencies of your projects run:

```bash
npm run dep-graph
```

### Generating a storybook for a feature or ui library

```bash
npx nx g @nrwl/angular:storybook-configuration project-name
```

### Tools help

```
ng run tools:help
```

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Technologies Reference

### Workspace

- [Nrwl Nx](https://nx.dev)

### Client

- [Angular](https://angular.io)
- [Angular CLI](https://cli.angular.io/)
- [Angular Material](https://material.angular.io/)
- [Apollo Angular](https://github.com/apollographql/apollo-angular)
- [Material Design Guidelines](https://material.io)
- [NGXS](https://www.ngxs.io/)

### Server

- [NestJS](https://nestjs.com/)
- [Firebase JS Reference](https://firebase.google.com/docs/reference/js/)
- [Express GraphQL Server](https://graphql.org/graphql-js/running-an-express-graphql-server/)
- [Angular Firebase: Apollo Server](https://angularfirebase.com/lessons/graphql-apollo-2-tutorial-node/#Apollo-Server)
- [GRPC](https://grpc.io/)

### Testing

- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)

### Documentation

- [Compodoc](https://compodoc.github.io/compodoc/)

### CI

- [GitHub Actions](https://github.com/features/actions)
