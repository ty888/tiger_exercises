/**
 * Stm ==> 语句 ==> 混合语句 赋值语句 和 打印语句
 * Exp ==> 表达式 ==> Id(变量名) Num（数字常量） Op( 操作符+ - * /) Eseq 逗号表达式
 * ExpList ==> 表达式列表 ==>  单个表达式  符合表达式
 */

const Binop = {
  Plus: 'Plus',
  Minus: 'Minus',
  Times: 'Times',
  Div: 'Div',
}

const StmType = {
  compound: { type: 'stm', kind: 'compound' },
  assign: { type: 'stm', kind: 'assign' },
  print: { type: 'stm', kind: 'print' }
}

// 语句
const Stm = {
  compound: (stm1, stm2) => {
    return { ...StmType.compound, stm1, stm2 }
  },
  assign: (id, exp) => {
    return { ...StmType.assign, id, exp }
  },
  print: (ExpList) => {
    return { ...StmType.assign, ExpList }
  }
}

const ExpType = {
  id: { type: 'exp', kind: 'id' },
  num: { type: 'exp', kind: 'Num' },
  op: { type: 'exp', kind: 'Op' },
  eseq: { type: 'exp', kind: 'Eseq' }
}

// 表达式
const Exp = {
  id: (id) => {
    return { ...StmType.id, id }
  },
  num: (num) => {
    return { ...StmType.num, num }
  },
  op: (left, oper, right) => {
    return { ...StmType.op, left, oper, right }
  },
  eseq: (stm, exp) => {
    return { ...StmType.eseq, stm, exp }
  }
}

const ExpListType = {
  pair: { type: 'expList', kind: 'pair' },
  last: { type: 'expList', kind: 'last' }
}

// 表达式列表
const ExpList = {
  pair: (head, tail) => {
    return { ...StmType.pair, head, tail }
  },
  last: (tail) => {
    return { ...StmType.last, tail }
  }
}

// a := 5 + 3; b := (print(a, a + 1), 10 * a); print(b)

let prog = Stm.compound(
  Stm.assign(
    'a',
    Exp.op(Exp.num(5), Binop.Plus, Exp.num(5))
  ),
  Stm.compound(
    Stm.assign(
      'b',
      Exp.eseq(
        Stm.print(ExpList.pair('a', ExpList.last(Exp.op(Exp.id('a'), Binop.Minus, Exp.num(1))))),
        Exp.op(Exp.num(10), Binop.Times, Exp.id('a'))
      )
    ),
    Stm.print(
      ExpList.last(Exp.id('b'))
    )
  )
);
