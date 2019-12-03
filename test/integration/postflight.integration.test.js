import chai from 'chai';
import Postflight from '../../src/postflight';
import ModelSpec from '../../src/model-spec';
import { Widget } from '../fixtures/classes';

const expect = chai.expect;

describe('Postflight integration', () => {

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
        const [ factoryWidget, computerWidget, carWidget ] = models;

        expect(factoryWidget.id).to.equal(1);
        expect(factoryWidget.name).to.equal('Factory widget');
        expect(factoryWidget.weight).to.equal(150);
        expect(factoryWidget.packageSize).to.equal(5);
        expect(factoryWidget instanceof Widget).to.be.true;

        expect(computerWidget.id).to.equal(2);
        expect(computerWidget.name).to.equal('Computer widget');
        expect(computerWidget.weight).to.equal(10);
        expect(computerWidget.packageSize).to.equal(20);
        expect(computerWidget instanceof Widget).to.be.true;

        expect(carWidget.id).to.equal(3);
        expect(carWidget.name).to.equal('Car widget');
        expect(carWidget.weight).to.equal(4000);
        expect(carWidget.packageSize).to.equal(1);
        expect(carWidget instanceof Widget).to.be.true;
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
        const [ factoryWidget, computerWidget, carWidget ] = models;

        expect(factoryWidget.id).to.equal(1);
        expect(factoryWidget.name).to.equal('Factory widget');
        expect(factoryWidget.weight).to.equal(150);
        expect(factoryWidget.packageSize).to.equal(5);
        expect(factoryWidget instanceof WidgetNoDefaults).to.be.true;

        expect(computerWidget.id).to.equal(2);
        expect(computerWidget.name).to.equal('Computer widget');
        expect(computerWidget.weight).to.equal(10);
        expect(computerWidget.packageSize).to.equal(20);
        expect(computerWidget instanceof WidgetNoDefaults).to.be.true;

        expect(carWidget.id).to.equal(3);
        expect(carWidget.name).to.equal('Car widget');
        expect(carWidget.weight).to.equal(4000);
        expect(carWidget.packageSize).to.equal(1);
        expect(carWidget instanceof WidgetNoDefaults).to.be.true;

    });

    // TODO: Test invalid inputs
});