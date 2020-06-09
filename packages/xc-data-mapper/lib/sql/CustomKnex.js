const Knex = require('knex');

const opMapping = {
  eq: '=',
  lt: '<',
  gt: '>',
  le: '<=',
  ge: '>=',
  not: '!=',
  like: 'like'
}

/**
 * Converts a condition string to conditions array
 *
 * @param {String} str - Condition string
 * @returns {Array}
 */
function toArrayOfConditions(str) {
  if (!str) {
    return []
  }

  let nestedArrayConditions = [];

  let openIndex = str.indexOf('((');

  if (openIndex === -1) openIndex = str.indexOf('(~');

  let nextOpenIndex = openIndex;
  let closingIndex = str.indexOf('))');

  // if it's a simple query simply return array of conditions
  if (openIndex === -1) {
    if (str && str != "~not") nestedArrayConditions = str.split(/(?=~(?:or(?:not)?|and(?:not)?|not)\()/);
    return nestedArrayConditions || [];
  }


  // iterate until finding right closing
  while ((nextOpenIndex = str.substring(0, closingIndex).indexOf('((', nextOpenIndex + 1)) != -1) {
    closingIndex = str.indexOf('))', closingIndex + 1)
  }

  if (closingIndex === -1)
    throw new Error(`${str.substring(0, openIndex + 1).slice(-10)} : Closing bracket not found`)

  // getting operand starting index
  let operandStartIndex = str.lastIndexOf('~', openIndex);
  let operator = operandStartIndex != -1 ? str.substring(operandStartIndex + 1, openIndex) : '';
  let lhsOfNestedQuery = str.substring(0, openIndex);

  nestedArrayConditions.push(
    ...toArrayOfConditions(lhsOfNestedQuery),
    // calling recursively for nested query
    {operator, conditions: toArrayOfConditions(str.substring(openIndex + 1, closingIndex + 1))},
    // RHS of nested query(recursion)
    ...toArrayOfConditions(str.substring(closingIndex + 2))
  )
  return nestedArrayConditions;
}


const appendWhereCondition = function (conditions, knexRef, isHaving = false) {
  const camKey = isHaving ? 'Having' : 'Where';
  const key = isHaving ? 'having' : 'where';

  conditions.forEach(condition => {
    if (Array.isArray(condition)) {
      knexRef[key](function () {
        appendWhereCondition(condition, this);
      })
    } else if (typeof condition === 'object') {

      switch (condition.operator) {
        case 'or':
          knexRef[`or${camKey}`](function () {
            appendWhereCondition(condition.conditions, this);
          })
          break;
        case 'and':
          knexRef[`and${camKey}`](function () {
            appendWhereCondition(condition.conditions, this);
          })
          break;
        case 'andnot':
          knexRef[`and${camKey}Not`](function () {
            appendWhereCondition(condition.conditions, this);
          })
          break;
        case 'ornot':
          knexRef[`or${camKey}Not`](function () {
            appendWhereCondition(condition.conditions, this);
          })
          break;
        case 'not':
          knexRef[`${key}Not`](function () {
            appendWhereCondition(condition.conditions, this);
          })
          break;
        default:
          knexRef[`${key}`](function () {
            appendWhereCondition(condition.conditions, this);
          })
          break;
      }
    } else if (typeof condition === 'string') {
      let matches = condition.match(/^(?:~(\w+))?\((\w+),(\w+),(.+?)\)(?:~(?:or|and|not))?$/)

      if (!matches) throw new Error(`${condition} : not a valid syntax`)
      switch (matches[3]) {
        case 'in':
          switch ((matches[1] || '')) {
            case 'or':
              knexRef[`or${camKey}`](builder => builder[`${key}In`](matches[2], matches[4].split(',')));
              break;
            case 'and':
              knexRef[`${key}In`](matches[2], matches[4].split(','))
              break;
            case 'andnot':
              knexRef[`${key}NotIn`](matches[2], matches[4].split(','))
              break;
            case 'ornot':
              knexRef[`or${camKey}`](builder => builder[`${key}NotIn`](matches[2], matches[4].split(',')));
              break;
            case 'not':
              knexRef[`${key}NotIn`](matches[2], matches[4].split(','))
              break;
            case '':
              knexRef[`${key}In`](matches[2], matches[4].split(','))
              break;
            default:
              throw new Error(`${matches[1]} : Invalid operation.`)
              break;
          }
          break;
        case 'is':
          if (matches[4] != 'null') throw new Error(`${matches[4]} : not a valid value since 'is' & 'isnot' only supports value null`);
          switch ((matches[1] || '')) {
            case 'or':
              knexRef[`or${camKey}`](builder => builder[`${key}Null`](matches[2]));
              break;
            case 'and':
              knexRef[`${key}Null`](matches[2])
              break;
            case 'andnot':
              knexRef[`${key}NotNull`](matches[2])
              break;
            case 'ornot':
              knexRef[`or${camKey}`](builder => builder[`${key}NotNull`](matches[2]));
              break;
            case 'not':
              knexRef[`${key}NotNull`](matches[2])
              break;
            case '':
              knexRef[`${key}Null`](matches[2])
              break;
            default:
              throw new Error(`${matches[1]} : Invalid operation.`)
              break;
          }
          break;
        case 'isnot':
          if (matches[4] != 'null') throw new Error(`${matches[4]} : not a valid value since 'is' & 'isnot' only supports value null`);
          switch ((matches[1] || '')) {
            case 'or':
              knexRef[`or${camKey}`](builder => builder[`${key}NotNull`](matches[2]));
              break;
            case 'and':
              knexRef[`${key}NotNull`](matches[2])
              break;
            case 'andnot':
              knexRef[`${key}NotNull`](matches[2])
              break;
            case 'ornot':
              knexRef[`or${camKey}`](builder => builder[`${key}NotNull`](matches[2]));
              break;
            case 'not':
              knexRef[`${key}Null`](matches[2])
              break;
            case '':
              knexRef[`${key}NotNull`](matches[2])
              break;
            default:
              throw new Error(`${matches[1]} : Invalid operation.`)
              break;
          }
          break;
        case 'btw': {
          const range = matches[4].split(',');
          if (range.length !== 2) throw new Error(`${matches[4]} : not a valid value.${range.length > 2 ? ' Between accepts only 2 values' : ' Between requires 2 values'}`);
          switch ((matches[1] || '')) {
            case 'or':
              knexRef[`or${camKey}`](builder => builder[`${key}Between`](matches[2], range));
              break;
            case 'and':
              knexRef[`${key}Between`](matches[2], range)
              break;
            case 'andnot':
              knexRef[`${key}NotBetween`](matches[2], range)
              break;
            case 'ornot':
              knexRef[`or${camKey}`](builder => builder[`${key}NotBetween`](matches[2], range));
              break;
            case 'not':
              knexRef[`${key}NotBetween`](matches[2], range)
              break;
            case '':
              knexRef[`${key}Between`](matches[2], range)
              break;
            default:
              throw new Error(`${matches[1]} : Invalid operation.`)
              break;
          }
        }
          break;
        case 'nbtw': {
          const range = matches[4].split(',');
          if (range.length !== 2) throw new Error(`${matches[4]} : not a valid value.${range.length > 2 ? ' Between accepts only 2 values' : ' Between requires 2 values'}`);
          switch ((matches[1] || '')) {
            case 'or':
              knexRef[`or${camKey}`](builder => builder[`${key}NotBetween`](matches[2], range));
              break;
            case 'and':
              knexRef[`${key}NotBetween`](matches[2], range)
              break;
            case 'andnot':
              knexRef[`${key}Between`](matches[2], range)
              break;
            case 'ornot':
              knexRef[`or${camKey}`](builder => builder[`${key}Between`](matches[2], range));
              break;
            case 'not':
              knexRef[`${key}Between`](matches[2], range)
              break;
            case '':
              knexRef[`${key}NotBetween`](matches[2], range)
              break;
            default:
              throw new Error(`${matches[1]} : Invalid operation.`)
              break;
          }
        }
          break;
        default:

          if (!(matches[3] in opMapping)) throw new Error(`${matches[3]} : Invalid comparison operator`)
          switch ((matches[1] || '')) {
            case 'or':
              knexRef[`or${camKey}`](matches[2], opMapping[matches[3]], matches[4]);
              break;
            case 'and':
              knexRef[`and${camKey}`](matches[2], opMapping[matches[3]], matches[4])
              break;
            case 'andnot':
              knexRef[`and${camKey}Not`](matches[2], opMapping[matches[3]], matches[4])
              break;
            case 'ornot':
              knexRef[`or${camKey}Not`](matches[2], opMapping[matches[3]], matches[4])
              break;
            case 'not':
              knexRef[`${key}Not`](matches[2], opMapping[matches[3]], matches[4])
              break;
            case '':
              knexRef[`${key}`](matches[2], opMapping[matches[3]], matches[4])
              break;
            default:
              throw new Error(`${matches[1] || ''} Invalid operation.`)
              break;
          }
          break;
      }
    } else {
      throw new Error('appendWhereCondition : grammar error ' + conditions);
    }
  })
  return knexRef;
}


/**
 * Append xwhere to knex query builder
 */
Knex.QueryBuilder.extend('xwhere', function (conditionString) {
  const conditions = toArrayOfConditions(conditionString);
  return appendWhereCondition(conditions, this);
});

/**
 * Append xhaving to knex query builder
 */
Knex.QueryBuilder.extend('xhaving', function (conditionString) {
  const conditions = toArrayOfConditions(conditionString);
  return appendWhereCondition(conditions, this, true);
});


function CustomKnex(...args) {

  const knex = Knex(...args);

  const knexRaw = knex.raw;

  /**
   * Wrapper for knex.raw
   *
   * @param args1
   * @returns {Knex.Raw<any>}
   */
  knex.raw = function (...args) {
    return knexRaw.apply(knex, args);
  };

  /**
   * Returns database type
   *
   * @returns {*|string}
   */
  knex.clientType = function () {
    return args[0] && args[0].client
  };

  return knex;
}


module.exports = CustomKnex;