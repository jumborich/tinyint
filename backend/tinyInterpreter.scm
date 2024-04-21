; Definition of the tinyinterpreter module 
; as a switch case anaylysis on expression types
#|
 This interpreter will take two arguments. 
  1. The current tiny expression to evaluate
  2. The environment context where the expression has bindings
|#

(define (tinyint expr env)
(cond ((self-evaluating? expr) exp)
      ((if? expr) (evaluate-if expr env))
      ((variable? expr) (lookup-variable-value expr env))
      ((assignment? expr) (evaluate-assignment expr env))
      (else (error "Unknown Tiny Expression" expr))
)
)

; This procedure helps with type-tag identification for a given expression
(define (has-tag-type? expr tag)
    (if (not (pair? expr)) #f
        (equal? tag (car expr))
    )
)

; Self-evaluating expressions would be strings and numbers only
(define (self-evaluating? expr)
    (cond ((string? expr) #t)
        ((number? expr) #t)
        (else #f)
    )
)

; if expressions would begin with a type-tag of 'if
; prod rule: <if> <predicate> <consequent> <alternate>
(define (if? expr) (has-tag-type? expr 'if))

(define (if-predicate expr) (cadr expr))
(define (if-consequent expr) (caddr expr))
(define (if-alternate expr) 
 (if (null? (cdddr expr)) #f
  (cadddr expr)
 )
)

; Variables in the AST would be identified as symbols
(define (variable? expr) (symbol? expr))

; Assignment predicate procedure will help to identify if a given expression is an assignment
(define (assignment? expr) (has-tag-type? expr 'set))

;Below procedures will help in selecting various parts of an assignment expression
;Prod rule: <Identifier> < = > <Expression>
(define (assignment-left-hand expr) (cadr expr))
(define (assignment-righ-hand expr) (caddr expr))


; --------------- Below procedures are yet to be implemented -----------------------

(define (evaluate-if expr env) 'To be implemented)

(define (lookup-variable-value expr env) 'To be implemented)

(define (evaluate-assignment expr env) 'To be implemented)