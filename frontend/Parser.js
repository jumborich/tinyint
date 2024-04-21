/***
 * A Javascript implementation for the TinyInt Parser.
 * 
 * This Parser generates an Abstract Syntax Tree
 * 
 *  PRODUCTION RULES
 *  <Program>: <StatementList>
 *  <StatementList>: <forStatment>, <IfStatment>, <BlockStatment>, <FunctionDeclarationStatment>
 *  <IfStatment>: <If> <Predicate> <BlockStatement>
 *  <forStatement>: <for> <>  <BlockStatement>
 *  <FunctionDeclarationStatment>: <func> <Identifier> <(>  Arguments <)> <BlockStatement>
 *  <BlockStatement>: <{>, <StatementList>,  <}>
 */

const { Scanner } = require("./Scanner");

class TinyParser {
  parse(expr){ // Takes any expression as a string
    this.scanner   = new Scanner(expr)
    this.currToken = this.scanner.scan();

    return this.Program();
  }

  Program(){
    return {
      type: "Program",
      body: this.StatementList()
    }
  }

  StatementList(){
    const tinyStatementLists = []

    do {
      const statement = this.getStatements();
      statement && tinyStatementLists.push(statement)
    } while(this.currToken )

    return tinyStatementLists;
  }

  getStatements(){ //Handles all special forms
    switch(this.currToken && this.currToken.type){
      case "{": return this.BlockStatement()
      default: return this.currToken ? this.BinaryExpression() : null
    }
  }

  // Prod Rule: 'Expression' Operand 'Expression'
  /**
   *  ORDER OF PRECEDENCE MATTERS HERE 
   * Assignment (=) has lowest precedence and hence gets visited last
   * Identifiers are next on Precedence list
   * Primitive Math Operators are next on precedence list following PEMDAS (),^, *,/,+,- 
   * 
  */
  BinaryExpression(){
   const left = this.Expression();

   if(!this.currToken || !this.isPrimitiveOperator(this.currToken.type))
    return left;
  
   const operator = this.currToken.value;

   this.consume(this.currToken.type);

   const right = this.Expression()
    return {
      type: "BinaryExpression",
      operator,
      left,
      right
    }
  }

  Expression(){
    return this.AssignmentExpression();
  }

  // Prod Rule: 'Identifier' '=' 'Expression' 
  AssignmentExpression(){
    let left = this.Literal();

    if(!this.currToken || this.currToken.type !== '=') return left
  
    this.consume("=");

    let right = this.BinaryExpression()
    return {
      type: "AssignmentExpression",
      operator: "=",
      left,
      right
    }
  }
 
  isPrimitiveOperator(operator){
    return ['+', '-', '*', '/'].includes(operator)
  }

  // Prod Rule: '{' ExpressionList '}'
  BlockStatement(){
    this.consume('{');
    const body = [];

    while(this.currToken && this.currToken.type !== '}')
      body.push(this.getStatements())

    this.consume('}')
    
    return {
      type: "BlockStatement",
      body
    }
  }

  Literal(){
    switch(this.currToken && this.currToken.type){
      case "StringLiteral": return this.consume('StringLiteral')
      case "NumericLiteral": return this.consume('NumericLiteral')
      case "Identifier": return this.consume("Identifier")
      default: return this.consume(this.currToken.type)
    }
  }

  consume(tokenType){
    const currentToken = this.currToken;

    if(!currentToken) throw new Error(`End of Line Error. Expected ${tokenType}`)

    if(tokenType !== currentToken.type) throw new Error(`Unexpected Token Err. Expected ${tokenType}`)

    // Consume current token by moving to next char
    this.currToken = this.scanner.scan();
  
    return currentToken
  }
}

module.exports = { TinyParser };