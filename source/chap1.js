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
  print: (expList) => {
    return { ...StmType.print, expList }
  }
}

const ExpType = {
  id: { type: 'exp', kind: 'id' },
  num: { type: 'exp', kind: 'num' },
  op: { type: 'exp', kind: 'op' },
  eseq: { type: 'exp', kind: 'eseq' }
}

// 表达式
const Exp = {
  id: (id) => {
    return { ...ExpType.id, id }
  },
  num: (num) => {
    return { ...ExpType.num, num }
  },
  op: (left, oper, right) => {
    return { ...ExpType.op, left, oper, right }
  },
  eseq: (stm, exp) => {
    return { ...ExpType.eseq, stm, exp }
  }
}

const ExpListType = {
  pair: { type: 'expList', kind: 'pair' },
  last: { type: 'expList', kind: 'last' }
}

// 表达式列表
const ExpList = {
  pair: (head, tail) => {
    return { ...ExpListType.pair, head, tail }
  },
  last: (exp) => {
    return { ...ExpListType.last, exp }
  }
}

// a := 5 + 3; b := (print(a, a + 1), 10 * a); print(b)

let prog = Stm.compound(
  Stm.assign(
    Exp.id('a'),
    Exp.op(Exp.num(5), Binop.Plus, Exp.num(5))
  ),
  Stm.compound(
    Stm.assign(
      Exp.id('b'),
      Exp.eseq(
        Stm.print(ExpList.pair(Exp.id('a'), ExpList.last(Exp.op(Exp.id('a'), Binop.Minus, Exp.num(1))))),
        Exp.op(Exp.num(10), Binop.Times, Exp.id('a'))
      )
    ),
    Stm.print(
      ExpList.last(Exp.id('b'))
    )
  )
);


/**
 * 一个函数传入一个表达式 求表达式中print参数的最大值
 * 一个函数 传入一个表达式列表ExpList， 求这个表达式列表中print参数的最大值
 * 一个函数传入一个语句 stm 求这个stm中print的参数最大值
 */

const maxargs = (stm) => {
  if (stm.kind === "compound") {
    return Math.max(maxargs(stm.stm1), maxargs(stm.stm2));
  }
  if (stm.kind === "assign") {
    return max_exp_args(stm.exp);
  }
  if (stm.kind === "print") {
    return count_exp_list(stm.expList);
  }
}


const max_exp_args = (exp) => {
  if(exp.kind === 'op') {
    return Math.max(max_exp_args(exp.left), max_exp_args(exp.right));
  }
  if(exp.kind === 'eseq') {
    return Math.max(maxargs(exp.stm), max_exp_args(exp.exp));
  }
  return 0
}


const count_exp_list = (explist) => {
  if(explist.kind === 'pair') {
    return Math.max(max_exp_args(explist.head), (1 + count_exp_list(explist.tail)));
  }
  if(explist.kind === 'last') {
    return 1 + max_exp_args(explist.exp)
  }
}

console.log(`maxargs is ${maxargs(prog)}`);