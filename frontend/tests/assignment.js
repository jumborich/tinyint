const assert = require("node:assert")

const testt1 = (tinyParser) => {
    const expression = `
    // Below expressions identifies the dev.
    @name = "Richmond Jumbo"
    @province = "Ontario"
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
                  "value": "name"
                },
                "right": {
                  "value": "Richmond Jumbo",
                  "type": "StringLiteral"
                }
            },
            {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                  "type": "Identifier",
                  "value": "province"
                },
                "right": {
                  "value": "Ontario",
                  "type": "StringLiteral"
                }
            }
        ]
    }
    assert.deepStrictEqual(parsedExpr, expected)
}

module.exports = (tinyParser) => {
  testt1(tinyParser);
}