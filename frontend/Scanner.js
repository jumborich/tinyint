/***
 * A Javascript implementation for the TinyInt Scanner.
 * 
 * This tokenizes letters/Alphabets in Tinyint 
 */

 SKIPPABLE_CHARS = [
   '\n',  // Newline
   " ", // White space
   '//' // Comment Delimiter
]

 MATH_OPERATORS = [
   '+', '-', '/', '*'
 ]

class Scanner {
   constructor(expr){
      this.expr = expr //Expression
      this.cursor = 0; // Current Char pointer
   }
    
   scan(){
     if(this.isEndOfFile()) return;

     if(this.isSkippableChar(this.expr[this.cursor])) {
      this.cursor++;
      return this.scan();
     }

    // Math Operators 
    if(MATH_OPERATORS.includes(this.expr[this.cursor])) return this.handleMathOperator()

    // Identifier starting with @ symbol
    if(this.expr[this.cursor] === '@' && typeof this.lookahead() === 'string')
      return this.handelIdentifier()
   
    // Assignment op.
    if(this.expr[this.cursor] === '=') return this.handleAssignmentOperator();

    // Block {
    if(this.expr[this.cursor] === '{') return { type: '{' }

     // String: ""
     if(this.expr[this.cursor] === '"') return this.handleStringToken() 
     
     // Number: !NAN
     if(!isNaN(this.expr[this.cursor])) return this.handleNumericToken()

    throw new Error(`Token not yet implemented=> ${this.expr[this.cursor]}`)
   }

   isSkippableChar(char){ //Escapes whitespaces, newlines, comments, etc.
      if(char === '/' && this.lookahead() === '/') {
         while(this.expr[this.cursor] !== '\n') this.cursor++ // Skipping every text on this line
         return true;
      };

      return SKIPPABLE_CHARS.includes(char)
   }

   isEndOfFile(){
     return this.cursor >= this.expr.length
   }

   lookahead(){
      return this.expr[this.cursor + 1]
   }

   handleStringToken(tokenValue = ''){
     this.cursor++; //Moving cursor ahead to skip opening quote
  
     if(!this.expr[this.cursor]) throw new Error("Unexpected String Token")
        
     while(!this.isEndOfFile() && this.expr[this.cursor] !== '"')
      tokenValue += this.expr[this.cursor++]

     this.cursor++ // Skipping the closing quote 
     return { value: tokenValue, type: "StringLiteral"}
   }

   handleNumericToken(tokenValue = ''){
     if(!this.expr[this.cursor]) throw new Error("Unexpected Numeric Token");

     while(!this.isSkippableChar(this.expr[this.cursor]) && !isNaN(this.expr[this.cursor])) 
      tokenValue += this.expr[this.cursor++]

     return {
      value: Number(tokenValue),
      type: "NumericLiteral"
     }
   }

   handleMathOperator(){
      const token =  this.expr[this.cursor++];
      return {
         type: token,
         value: token
      }
   }

   handelIdentifier(){
      let token = '';

      this.cursor++ // Skipping the beginning @ symbol
      while(!this.isEndOfFile() && !this.isSkippableChar(this.expr[this.cursor]))
         token += this.expr[this.cursor++];

      return {
         type: "Identifier",
         value: token
      }
   }

   handleAssignmentOperator(){
      let token = this.expr[this.cursor++];
      return {
         type: token,
         value: token
      }
   }
}

module.exports = { Scanner }