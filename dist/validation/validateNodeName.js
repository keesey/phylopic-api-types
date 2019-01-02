"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_nomen_1 = require("parse-nomen");
const NOMEN_PART_CLASSES = [
    parse_nomen_1.NomenPartClass.CITATION,
    parse_nomen_1.NomenPartClass.COMMENT,
    parse_nomen_1.NomenPartClass.OPERATOR,
    parse_nomen_1.NomenPartClass.RANK,
    parse_nomen_1.NomenPartClass.SCIENTIFIC,
    parse_nomen_1.NomenPartClass.VERNACULAR,
];
exports.validateNodeName = (name, index, field = 'names') => {
    const faults = [];
    if (!Array.isArray(name)) {
        faults.push({
            field: `${field}[${index}]`,
            message: 'Node name is not an array.',
        });
    }
    else if (!name.length) {
        faults.push({
            field: `${field}[${index}]`,
            message: 'Node name is empty.',
        });
    }
    else {
        name.forEach((part, partIndex) => {
            if (!part || typeof part !== 'object') {
                faults.push({
                    field: `${field}[${index}][${partIndex}]`,
                    message: 'Node name part is not an object.',
                });
            }
            if (NOMEN_PART_CLASSES.indexOf(part.class) < 0) {
                faults.push({
                    field: `${field}[${index}][${partIndex}].class`,
                    message: `Invalid node name class: "${part.class}".`,
                });
            }
            if (!part.text || typeof part.text !== 'string' || part.text !== part.text.trim()) {
                faults.push({
                    field: `${field}[${index}][${partIndex}].text`,
                    message: `Invalid node name text: "${part.text}".`,
                });
            }
        });
    }
    return faults;
};
exports.default = exports.validateNodeName;
