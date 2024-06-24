# Duel Simulator

**Introduction:** This project is intended for the Yu-Gi-Oh! card game players. Its goal is to make possible the experience of dueling on your own, with real cards, against a machine.
Additionally, this software provides useful tools to help the player build, test and enjoy their physical decks.

## How to run the project

### `npm install`

Start by installing all the project dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Code architecture

The project follows the reference architecture patterns of clean code. Being aware of the SOLID principles, I decided to build its structure in this way:

### Components

The components are separated in individual folders containing the presentational file and the hook one.\
The presentational part of the component returns the JSX code used to build the visual structure using primarily [MUI](https://mui.com/) components.\
The hook file must be named useTheComponentName and provide all the logic used by the presentational component. Services execution, array sorts, math operations and more. It's all provided by the hook.

### Shared hooks

Some hooks are useful for more than one component, in that case they become shared hooks (src/shared/hooks). Those can be consumed by any component that need to use the data from the hook.\
The difference here is how the state is stored. As many components can consume the same hook, we may not want to create multiple instances of it as those will not share the same state. As a solution to this problema I decided to use [Jotai](https://jotai.org/) as the global state management tool, aiming to keep the same data available for all the components that use the same hook.

### Services

This project is powered by the [Yu-Gi-Oh! API](https://ygoprodeck.com/api-guide/).
The services are responsible for comunicating with the API and retrieving data. Also the services read the cardList json files that contain a list of card ids in case a specific card needs to be placed in field.

### Helpers

The helpers are simple and useful functions that don't rely on any state.\
As an example, the playSound function is a helper function that makes use of [HowlerJS](https://howlerjs.com/). Its goal is to reproduce sounds on the application when the user executes specific actions.

### Atoms

You can learn more about atoms in the [Jotai](https://jotai.org/) documentation. Atoms are implemented here being in charge of keeping the hooks state global.
