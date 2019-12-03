const chai = require('chai');
const Postflight = require('./postflight/');
const ModelSpec = require('./postflight/model-spec');

const expect = chai.expect;

describe('End to end tests', () => {
    const Widget = class {
        constructor(id, name, weight, packageSize) {
            this.id = id;
            this.name = name;
            this.weight = weight;
            this.packageSize = packageSize;
        }
    };

    const specMap = new Map();

    const widgetPropertyMap = new Map([
        ['id', 'id'],
        ['name', 'name'],
        ['weight', 'weight'],
        ['packageSize', 'package_size']
    ])

    const widgetSpec = new ModelSpec(widgetPropertyMap, Widget);

    specMap.set('widget', widgetSpec);

    it('should return a Widget', () => {
        const postflight = new Postflight(specMap);

        const rows =  [
            {
                id: 1,
                name: 'Factory widget',
                weight: 150,
                package_size: 5
            }
        ];

        const models = postflight.getSpec('widget').getModels(rows);
        const model = models[0];

        expect(model.id).to.equal(1);
        expect(model.name).to.equal('Factory widget');
        expect(model.weight).to.equal(150);
        expect(model.packageSize).to.equal(5);
        expect(model instanceof Widget).to.be.true;
    });

    it('should return an array of Widgets', () => {
        const postflight = new Postflight(specMap);

        const rows = [
            {
                id: 1,
                name: 'Factory widget',
                weight: 150,
                package_size: 5
            },
            {
                id: 2,
                name: 'Computer widget',
                weight: 10,
                package_size: 20
            },
            {
                id: 3,
                name: 'Car widget',
                weight: 4000,
                package_size: 1
            }
        ];

        const models = postflight.getSpec('widget').getModels(rows);

        expect(models[0].id).to.equal(1);
        expect(models[0].name).to.equal('Factory widget');
        expect(models[0].weight).to.equal(150);
        expect(models[0].packageSize).to.equal(5);
        expect(models[0] instanceof Widget).to.be.true;

        expect(models[1].id).to.equal(2);
        expect(models[1].name).to.equal('Computer widget');
        expect(models[1].weight).to.equal(10);
        expect(models[1].packageSize).to.equal(20);
        expect(models[1] instanceof Widget).to.be.true;

        expect(models[2].id).to.equal(3);
        expect(models[2].name).to.equal('Car widget');
        expect(models[2].weight).to.equal(4000);
        expect(models[2].packageSize).to.equal(1);
        expect(models[2] instanceof Widget).to.be.true;
    });

    it('should create business objects that have constructors with non-default arguments', () => {
        let WidgetNoDefaults = class {
            constructor(id, name, weight, packageSize) {
                this.id = id;
                this.name = name;
                this.weight = weight;
                this.packageSize = packageSize;
            }
        };

        

        const WidgetNoDefaultsPropertyMap = new Map([
            ['id', 'id'],
            ['name', 'name'],
            ['weight', 'weight'],
            ['packageSize', 'package_size']
        ])

        const WidgetNoDefaultsSpec = new ModelSpec(WidgetNoDefaultsPropertyMap, WidgetNoDefaults);

        const newSpecMap = new Map([
            ['WidgetNoDefaults', WidgetNoDefaultsSpec]
        ]);

        const postflight = new Postflight(newSpecMap);

        const rows = [
            {
                id: 1,
                name: 'Factory widget',
                weight: 150,
                package_size: 5
            },
            {
                id: 2,
                name: 'Computer widget',
                weight: 10,
                package_size: 20
            },
            {
                id: 3,
                name: 'Car widget',
                weight: 4000,
                package_size: 1
            }
        ];

        const models = postflight.getSpec('WidgetNoDefaults').getModels(rows);

        expect(models[0].id).to.equal(1);
        expect(models[0].name).to.equal('Factory widget');
        expect(models[0].weight).to.equal(150);
        expect(models[0].packageSize).to.equal(5);
        expect(models[0] instanceof WidgetNoDefaults).to.be.true;

        expect(models[1].id).to.equal(2);
        expect(models[1].name).to.equal('Computer widget');
        expect(models[1].weight).to.equal(10);
        expect(models[1].packageSize).to.equal(20);
        expect(models[1] instanceof WidgetNoDefaults).to.be.true;

        expect(models[2].id).to.equal(3);
        expect(models[2].name).to.equal('Car widget');
        expect(models[2].weight).to.equal(4000);
        expect(models[2].packageSize).to.equal(1);
        expect(models[2] instanceof WidgetNoDefaults).to.be.true;

    });
})