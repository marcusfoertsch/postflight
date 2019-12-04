[![CircleCI](https://circleci.com/gh/marcusfoertsch/postflight/tree/master.svg?style=svg)](https://circleci.com/gh/marcusfoertsch/postflight/tree/master) [![Generic badge](https://img.shields.io/badge/style-Airbnb-green.svg)](https://shields.io/) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

# Postflight

Postflight is a node package for mapping database columns to business model properties. It can also instantiate business objects. 

# Install

```bash
$ npm install postflight
```

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
    name: 'Widget',
    modelClass: Widget, // optional
    propertyMap,
};

const Postflight = require('postflight');
const postflight = new Postflight();
postflight.addSpec(widgetSpecConfig);
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

const models = postflight.getSpec('Widget').getModels(rows);

```

# Tests

### Unit and integration tests

```bash
$ npm install
$ npm test
```

### End-to-end tests

These tests depend on bash scripting.

```bash
$ npm install
$ npm run test-e2e
```

# API

## Postflight

The postflight module returns the class Postflight. An instance of Postflight holds a Map object called specMap. Keys are strings, and values are objects of the ModelSpec class.

### constructor(specMap {Map<string, string>})

Create a Postflight instance using an optional Map object for mapping model properties to database columns. Keys are model property names, and values are database column names.

### addSpec(specConfig {Object})

Add a model mapping to the Postflight object. The argument is a config object:

```javascript
{
    name,
    propertyMap,
    modelClass // optional
}
```

`name` is a string which will be the key the mapping is retrieved by.
`propertyMap` is a Map object, with keys for model property names and values for database column names.
`modelClass` is an optional property to instantiate model objects as an instance of a class.

### getSpec(modelName {string}) {ModelSpec}

Get the ModelSpec with a key matching `modelName`.

## ModelSpec

The ModelSpec class maps model object property names to database column names using a Map object, and creates objects based on this mapping.

### constructor(propertyMap {Map<string, string>}, modelClass {class})

Create a ModelSpec object using a Map object where keys represent model property names, and values represent the matching database column name. It also takes an optional `modelClass` argument, which is the business object class for instantiation.

### getModels(rows {Array\<Object\>}) {Array\<Object\>}

Gets Model objects from an array of database objects. The database objects have property names matching the database column names, where the property's value is equal to the value of the database column.

# Up next

## Automatically generate mappings

* Inspect database to generate model property to database column name mappings
* Column name prefixes
* Built-in naming conventions
* Provide custom naming convention