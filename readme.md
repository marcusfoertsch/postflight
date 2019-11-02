# Postflight

Postflight is a node package for mapping database columns to business model properties. It can also instantiate business objects. 

# Install

```bash
$ npm install postflight
```

# Usage

## Add a model mapping
```javascript
const widgetPropertyMap = new Map([
    ['_id', 'id'],
    ['_name', 'name'],
    ['_weight', 'weight'],
    ['_packageSize', 'package_size']
]);

const widgetSpecConfig = {
    name: 'Widget',
    propertyMap: widgetPropertyMap,
    modelClass: Widget // optional
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

Unit and integration tests use the Mocha framework with Chai assertion library.

```bash
$ npm install
$ npm test
```

# API

## Postflight

The postflight module returns the class Postflight. An instance of Postflight holds a Map object called specMap. Keys are strings, and values are objects of the ModelSpec class.

### constructor(specMap {Map<string, string>})

Create a Postflight instance using an optional Map object for mapping model properties to database columns. Keys are model property names, and values are database column names.

### addSpec(specConfig {Object})

Add a model mapping to the Postflight object. The argument is an object with properties

```javascript
{
    name {string},
    propertyMap {Map<string, string>},
    modelClass {class} // optional
}
```

### getSpec(modelName {string}) {ModelSpec}

Get the ModelSpec with a key matching `modelName`.

## ModelSpec

The ModelSpec class maps model object property names to database column names using a Map object, and creates objects based on this mapping.

### constructor(propertyMap {Map<string, string>}, modelClass {class})

Create a ModelSpec object using a Map object where keys represent model property names, and values represent the matching database column name. It also takes an optional `modelClass` argument, which is the business object class for instantiation.

### getsModels(rows {Array\<Object\>}) {[Object]}

Gets Model objects from an array of database objects. The database objects have property names matching the database column names, where the property's value is equal to the value of the database column.