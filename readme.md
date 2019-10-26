# Postflight

Postflight is a node package for mapping database columns to business model properties. It can also instantiate business objects. 

# Install

```
$ npm install postflight
```

# Usage

## Add a model mapping
```
const widgetPropertyMap = new Map([
    ['_id', 'id'],
    ['_name', 'name'],
    ['_weight', 'weight'],
    ['_packageSize', 'package_size']
]);

const widgetSpecConfig = {
    name: 'Widget',
    propertyMap: widgetPropertyMap,
    modelClass: Widget
};

const Postflight = require('postflight');
const postflight = new Postflight();
postflight.addSpec(widgetSpecConfig);
```

## Map database rows to models

```
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

## Add a model mapping without a business class

```

const widgetSpecConfig = {
    name: 'Widget',
    propertyMap: widgetPropertyMap
};

```

# API

The postflight module returns the class Postflight. An instance of Postflight keeps track of 