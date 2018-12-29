import { expect } from 'chai';
import { describe, it } from 'mocha';
import { NomenPartClass } from 'parse-nomen';
import validateNodeName from './validateNodeName';
import { ValidationFault } from './ValidationFault';
describe('validation/validateNodeName', () => {
    const test = (name: any, index = 0, field = 'names', errorFields: string[] = []) => {
        describe(`when given ${JSON.stringify(name)} (index: ${index})`, () => {
            let result: ReadonlyArray<ValidationFault> = [];
            beforeEach(() => {
                result = validateNodeName(name, index, field);
            });
            it('should yield an array', () => {
                /* tslint:disable:no-unused-expression */
                expect(Array.isArray(result)).to.be.true;
                /* tslint:enable:no-unused-expression */
            });
            it(`should yield ${errorFields.length} error${errorFields.length === 1 ? '' : 's'}`, () => {
                expect(result.length).to.equal(errorFields.length);
            });
            if (errorFields.length) {
                it('should yield the expected error fields', () => {
                    const actual = result.map((fault) => fault.field);
                    expect(actual).to.deep.equal(errorFields);
                });
            }
        });
    };
    test(null, 0, 'names', ['names[0]']);
    test(null, 1, 'names', ['names[1]']);
    test(null, 0, 'foo', ['foo[0]']);
    test({}, 0, 'names', ['names[0]']);
    test([], 0, 'names', ['names[0]']);
    test([ {} ], 0, 'names', ['names[0][0].class', 'names[0][0].text']);
    test([ { class: {} } ], 0, 'names', ['names[0][0].class', 'names[0][0].text']);
    test([ { class: 'foo' } ], 0, 'names', ['names[0][0].class', 'names[0][0].text']);
    test([ { text: {} } ], 0, 'names', ['names[0][0].class', 'names[0][0].text']);
    test([ { text: 'foo' } ], 0, 'names', ['names[0][0].class']);
    test(
        [
            { class: NomenPartClass.SCIENTIFIC, text: 'Homo sapiens' },
            { class: NomenPartClass.CITATION, text: 'Linnaeus 1758' },
        ],
    );
    test(
        [
            { class: NomenPartClass.SCIENTIFIC, text: 'Homo sapiens' },
            { class: 'foo', text: 'Linnaeus 1758' },
        ],
        0,
        'names',
        ['names[0][1].class'],
    );
    test(
        [
            { class: NomenPartClass.SCIENTIFIC, text: 'Homo sapiens' },
            { class: NomenPartClass.CITATION, text: null },
        ],
        0,
        'names',
        ['names[0][1].text'],
    );
    test(
        [
            { class: NomenPartClass.VERNACULAR, text: 'humans' },
        ],
    );
    test(
        [
            { class: NomenPartClass.SCIENTIFIC, text: 'Odontochelys' },
            { class: NomenPartClass.OPERATOR, text: '+' },
            { class: NomenPartClass.SCIENTIFIC, text: 'Testudines' },
        ],
    );
    test(
        [
            { class: NomenPartClass.SCIENTIFIC, text: 'Pinaceae' },
            { class: NomenPartClass.RANK, text: 'fam.' },
        ],
    );
    test(
        [
            { class: NomenPartClass.SCIENTIFIC, text: 'Troglodytes' },
            { class: NomenPartClass.CITATION, text: 'Vieillot 1809' },
            { class: NomenPartClass.COMMENT, text: 'non' },
            { class: NomenPartClass.CITATION, text: 'St. Hilaire 1812' },
        ],
    );
});
