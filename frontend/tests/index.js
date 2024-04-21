const { TinyParser } = require("../Parser");
const tinyParser =  new TinyParser();

const testSuites = [
    require("./literal"),
    require("./assignment"),
    require("./binaryExpression")
]

// const program =  `2 + 4
//  "My name is Richmond Jumbo"
//  // name is
//  67
//  @year = 2023
// `
// console.log(JSON.stringify({ parsedProgram: tinyParser.parse(program) }, null, 2))


testSuites.forEach(test => test(tinyParser))
console.log("All Test Cases Passed!")

