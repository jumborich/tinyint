const assert = require("node:assert")

const stringTest = (tinyParser) => {
    const expression = ` "Hello, welcome to TinyInt!"`;
    const parsedExpr = tinyParser.parse(expression);
    const expected  = {
      "type": "Program",
      "body": [
        {
          "value": "Hello, welcome to TinyInt!",
          "type": "StringLiteral"
        }
      ]
    }
    assert.deepStrictEqual(parsedExpr, expected)
}

const numberTest = (tinyParser) => {
    const expression = `39`;
    const parsedExpr = tinyParser.parse(expression);
    const expected  = {
      "type": "Program",
      "body": [
        {
          "value": 39,
          "type": "NumericLiteral"
        }
      ]
    }
    assert.deepStrictEqual(parsedExpr, expected)
}

module.exports = (tinyParser) => {
  stringTest(tinyParser);
  numberTest(tinyParser);
}