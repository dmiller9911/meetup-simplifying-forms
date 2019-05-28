# meetup-simplifying-forms

Meetup Date: 5-21-19

[Meetup Link](https://www.meetup.com/triangle-reactjs-developers/events/261057031/)

This repo is to demonstrate different ways to handle forms with React Hooks.

## Resource/Doc Links

Below are some helpful doc/resource links to reference

* [React Hooks](https://reactjs.org/docs/hooks-intro.html)
* [Formik](https://jaredpalmer.com/formik/) - Build forms in React, without tears.
* [Yup](https://github.com/jquense/yup) - Object schema validator
* [Ajv](https://github.com/epoberezkin/ajv) - JSON Schema validator for Node.js and browser.

## Examples

### [Basic Example](./src/Basic/Basic.tsx)

This example is to demonstrate using a vanilla approach to handling a signup form with react hooks. For the most part, the logic involved is not sharable. This is a good approach for getting started, but does not scale well and is pretty limited.

### [Custom Hook Example](./src/Hook/Hook.tsx)

This example demonstrates how to compose a custom hook to be used with any form. The example included does not cover all scenarios but is reusable and easy to add to. Additionally [yup](https://github.com/jquense/yup) was introduced to automate most of the handling of validation. Yup is a very good option, but it is not the only one. It is possible to hook up validation with something like [AJV/JSON Schema](https://github.com/epoberezkin/ajv) as well.

### [Formik Hooks](./src/Formik/FormikHooks.tsx)

This example demonstrates using Formik's new hook api (currently RC as of 5-21-19) to support more complex forms. Formik's hook api is very similar to the Custom hook example (this was on purpose), but handles many more scenarios. It also has baked in Yup schema validation support.

### [Formik Elements](./src/Formik/FormikElements.tsx)

This example demonstrates using Formik's new hook api (currently RC as of 5-21-19) and React Components to implement forms with a largely hands off approach. This is a batteries approach. It is a good solution for most basic and complex form.