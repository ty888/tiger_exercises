/**
 * Stm ==> 语句 ==> 混合语句 赋值语句 和 打印语句
 * Exp ==> 表达式 ==> Id(变量名) Num（数字常量） Op( 操作符+ - * /) Eseq 逗号表达式
 * ExpList ==> 表达式列表 ==>  单个表达式  符合表达式
 */

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
  Id: (id) => {
    return { ...StmType.id, id }
  },
  Num: (num) => {
    return { ...StmType.num, num }
  },
  Op: (left, oper, right) => {
    return { ...StmType.op, left, oper, right }
  },
  Eseq: (stm, exp) => {
    return { ...StmType.eseq, stm, exp }
  }
}

const ExpListType = {
  pair: { type: 'expList', kind: 'pair' },
  last: { type: 'expList', kind: 'last' }
}

// 表达式列表
const ExpList = {
  Pair: (head, tail) => {
    return { ...StmType.pair, head, tail }
  },
  Last: (tail) => {
    return { ...StmType.last, tail }
  }
}
