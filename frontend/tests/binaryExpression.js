const assert = require("node:assert")

const test1 = (tinyParser) => {
    const expression = `
    @sub = 100 - 30
    `;
    const parsedExpr = tinyParser.parse(expression);
    const expected  = {
        "type": "Program",
        "body": [
            {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                  "type": "Identifier",
                  "value": "sub"
                },
                "right": {
                    "type": "BinaryExpression",
                    "operator": "-",
                    "left": {
                      "value": 100,
                      "type": "NumericLiteral"
                    },
                    "right": {
                      "value": 30,
                      "type": "NumericLiteral"
                    }
                }
            }
        ]
    }
    assert.deepStrictEqual(parsedExpr, expected)
}

module.exports = (tinyParser) => {
    test1(tinyParser);
}