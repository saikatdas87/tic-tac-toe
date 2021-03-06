[![MIT License][license-badge]][LICENSE]

# Tic-Tac-Toe

> Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid, with X always starting the game. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.

> Only a single concurrent game is supported here by purpose.

## Used Summary

* [Play Framework: 2.7.2](https://www.playframework.com/documentation/2.7.x/Home)
* [Angular: 8.x.x](https://angular.io/)
* [Angular CLI: 8.3.9](https://cli.angular.io/)
* [Scala 2.12.8](https://www.scala-lang.org/)
## How to use it?

### Prerequisites

* [Node.js](https://nodejs.org/) (version 10 or higher)
* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (recommend version 1.8 or higher)
* [scala](https://www.scala-lang.org/download/)

### Let's get started,

* Fork or clone this repository.

* Used any of the following [SBT](http://www.scala-sbt.org/) commands which will intern trigger frontend associated npm scripts.

```
    sbt clean           # Clean existing build artifacts

    sbt stage           # Build your application from your project’s source directory

    sbt run             # Run both backend and frontend builds in watch mode

    sbt dist            # Build both backend and frontend sources into a single distribution artifact

    sbt test            # Run both backend and frontend unit tests
```

* This seed is not using [scala play views](https://www.playframework.com/documentation/2.6.x/ScalaTemplates). All the views and frontend associated routes are served via [Angular](https://angular.io/) code base under `ui` directory.

## Complete Directory Layout

```
├── /app/                                 # The backend source (controllers, models, services)
│     └── /controllers/                   # Backend controllers
│           └── FrontendController.scala  # Asset controller wrapper serving frontend assets and artifacts
├── /conf/                                # Configurations files and other non-compiled resources (on classpath)
│     ├── application.conf                # Play application configuratiion file.
│     ├── logback.xml                     # Logging configuration
│     └── routes                          # Routes definition file
├── /logs/                                # Log directory
│     └── application.log                 # Application log file
├── /project/                             # Contains project build configuration and plugins
│     ├── FrontendCommands.scala          # Frontend build command mapping configuration
│     ├── FrontendRunHook.scala           # Forntend build PlayRunHook (trigger frontend serve on sbt run)
│     ├── build.properties                # Marker for sbt project
│     └── plugins.sbt                     # SBT plugins declaration
├── /public/                              # Frontend build artifacts will be copied to this directory
├── /target/                              # Play project build artifact directory
│     ├── /universal/                     # Application packaging
│     └── /web/                           # Compiled web assets
├── /test/                                # Contains unit tests of backend sources
├── /ui/                                  # React frontend source (based on Create React App)
│     ├── /e2e/                           # End to end tests folder
│     ├── /node_modules/                  # 3rd-party frontend libraries and utilities
│     ├── /src/                           # The frontend source code (modules, componensts, models, directives, services etc.) of the application
│     │     ├── karma.conf.js             # Karma configuration file
│     │     └── proxy.conf.json           # UI proxy configuration      
│     ├── .angular.json                   # Angular CLI configuration
│     ├── .editorconfig                   # Define and maintain consistent coding styles between different editors and IDEs
│     ├── .gitignore                      # Contains ui files to be ignored when pushing to git
│     ├── package.json                    # NPM package configuration.
│     ├── README.md                       # Contains all user guide details for the ui
│     ├── tsconfig.json                   # Contains typescript compiler options
│     └── tslint.json                     # Lint rules for the ui
├── .gitignore                            # Contains files to be ignored when pushing to git
├── build.sbt                             # Play application SBT configuration
├── LICENSE                               # License Agreement file
├── README.md                             # Application user guide
└── ui-build.sbt                          # SBT command hooks associated with frontend npm scripts 
```

## What is new in here?

### FrontendCommands.scala

* Frontend build command mapping configuration.

```
    ├── /project/
    │     ├── FrontendCommands.scala
```


### FrontendRunHook.scala

* PlayRunHook implementation to trigger ``npm run start`` on ``sbt run``.

```
    ├── /project/
    │     ├── FrontendRunHook.scala
```

### FrontendController.scala

* Asset controller wrapper serving frontend assets and artifacts.

```
    ├── /app/                                 
    │     └── /controllers/                   
    │           └── FrontendController.scala
```

### TicTacToeController.scala

* Controller wrapper serving game functionality.

```
    ├── /app/                                 
    │     └── /controllers/                   
    │           └── TicTacToeController.scala
```

### ui-build.sbt

* This file contains the build task hooks to trigger frontend npm scripts on sbt command execution.

### npm scripts

* New and modified npm scripts of [Angular CLI](https://cli.angular.io/) generated package.json.
* Check [UI README.md](./ui/README.md) to see all available frontend build tasks.

```
├── /ui/
│     ├── package.json
```

### proxy.conf.json

* Used to proxy play backend API when running the project on watch mode.

```
├── /ui/
│     ├── proxy.conf.json
```

## Routes

```
├── /conf/      
│     ├── routes
```

* The following route configuration map index.html to entry route (root). This should be placed as the initial route.

```
GET        /             controllers.FrontendController.index()
```


Example API route:

```
GET        /game/boards  controllers.TicTacToeController.getBoard()
```

* The following route is being used to serve frontend associated build artifacts (css, js) and static assets (images, etc.). This should be placed as the final route.

```
GET        /*file        controllers.FrontendController.assetOrDefault(file)
```

**Note: _On production build all the front end Angular build artifacts will be copied to the `public/ui` folder._**


## Used below seed as base of this project

* [Scala Play Angular Seed](https://github.com/yohangz/scala-play-angular-seed)


## License

This software is licensed under the MIT license

[license-badge]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license]: https://github.com/saikatdas87/tic-tac-toe/blob/master/LICENSE

