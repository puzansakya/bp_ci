# Live
http://medium-puzan.herokuapp.com/

```
username: admin@gmail.com
password: password123
```

# Connection with heroku postgres
Heroku postgres requires following properties to be configured in driver
```
    ssl:true
    sslFacctory:org.postgresql.ssl.NonValidatingFactory
```

# Heroku commands
```
    heroku login
    heroku run bash
    git push heroku master
    git remote add heroku 'reponame.git'    
```

# Seeding
Seed file is available in 'server/documentation' folder.

# Puzanssr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## SSR
Following file are added or modified inorder to achieve server side rendering.
```
    - [modified]    app.module.ts 
    - [added]       app.server.module.ts 
    - [added]       main.server.ts 
    - [added]       tsconfig.server.json
    - [modified]    angular.json 
    - [added]       server.ts
    - [added]       webpack.server.config.ts (mode should be none and optimizer should be false)
```
