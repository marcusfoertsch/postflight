# Postflight

[![CircleCI](https://circleci.com/gh/marcusfoertsch/postflight/tree/master.svg?style=shield)](https://circleci.com/gh/marcusfoertsch/postflight/tree/master) [![codecov](https://codecov.io/gh/marcusfoertsch/postflight/branch/master/graph/badge.svg)](https://codecov.io/gh/marcusfoertsch/postflight) [![Generic badge](https://img.shields.io/badge/style-Airbnb-green.svg)](https://shields.io/) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) ![npm](https://img.shields.io/npm/v/postflight)

Postflight is a javascript library for turning an array of database objects into business objects.

# Usage

## Add a model mapping
```javascript
const propertyMap = new Map([
    ['id', 'id'],
    ['name', 'name'],
    ['weight', 'weight'],
    ['packageSize', 'package_size']
]);

const widgetSpecConfig = {
    modelClass: Widget, // optional
    propertyMap,
};

const postflight = require('postflight');
postflight.addSpec('Widget', widgetSpecConfig);
```

## Map database rows to models

```javascript
const rows =  [
    {
        id: 1,
        name: 'Factory widget',
        weight: 150,
        package_size: 5
    }
];

const model = postflight.getSpec('Widget').getModels(rows)[0];

console.log(model.id) // 1
console.log(model.name) // Factory widget
console.log(model.weight) // 150
console.log(model.packageSize) // 5
console.log(model instanceof Widget) // true
```
    

# Tests

These tests use bash scripting.

### Unit and integration tests

```bash
$ npm install
$ npm test
```

### End-to-end tests

Test using a local package installation.

```bash
$ npm install
$ npm run test-e2e
```

# API

## Postflight 

### addSpec(specConfig)

Add a model mapping to the Postflight object. The argument is a config object:

```javascript
{
    propertyMap,
    modelClass // optional
}
```

`propertyMap` is a Map object, with keys for model property names and values for database column names.
`modelClass` is an optional property to instantiate model objects as an instance of a class.

### getSpec(modelName)

Get the ModelSpec with a key matching `modelName`.

## ModelSpec

The ModelSpec class maps model object property names to database column names using a Map object, and creates objects based on this mapping.

### constructor(propertyMap, modelClass)

Create a ModelSpec object using a Map object where keys represent model property names, and values represent the matching database column name. It also takes an optional `modelClass` argument, which is the business object class for instantiation.

### getModels(rows)

Gets Model objects from an array of database objects. The database objects have property names matching the database column names, where the property's value is equal to the value of the database column.

# Install

```bash
$ npm install postflight
```

# Build

The package needs to be packed/published from the dist folder, after running the build script.

```bash
$ npm run build
$ cd dist
$ npm pack
```

# License

This package uses the MIT license.

# Up next

## Automatically generate mappings

* Inspect database to generate model property to database column name mappings
* Column name prefixes
* Built-in naming conventions
* Provide custom naming convention