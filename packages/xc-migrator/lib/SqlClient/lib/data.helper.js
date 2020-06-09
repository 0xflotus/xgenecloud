'use strict';
exports.findOrInsertObjectArrayByKey = (obj, key, array) => {

  let found = 0;
  let i = 0;

  for (i = 0; i < array.length; ++i) {
    if (key in array[i]) {
      if (obj[key] === array[i][key]) {
        found = 1;
        break;
      }
    }
  }

  if (!found) {
    array.push(obj)
  }

  return array[i];
};


exports.findObjectInArrayByKey = (key, value, objArray) => {

  for (let i = 0; i < objArray.length; ++i) {
    if (objArray[i][key] === value) {
      return objArray[i];
    }
  }

  return null;
};


exports.round = function (number, precision) {
  var factor = Math.pow(10, precision);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};


exports.numberRound = (number, precision) => {
  var factor = Math.pow(10, precision);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

exports.numberGetLength = (number) => {

  var n = number;

  if (number < 0) {
    n = n * -1;
  }

  return n.toString().length;
}

exports.numberGetFixed = (number) => {
  //console.log(number, typeof number);
  return parseInt(number.toFixed())
}

exports.getStepArraySimple = function (min, max, step) {

  var arr = []
  for (var i = min; i <= max; i = i + step) {
    arr.push(i)
  }

  return arr;

};

exports.getStepArray = (min, max, stddev) => {

  // console.log(' = = = = = = = ');
  //console.log('original numbers', min, max, stddev);

  min = this.numberGetFixed(min)
  max = this.numberGetFixed(max)
  stddev = this.numberGetFixed(stddev)

  // console.log('fixed numbers', min, max, stddev);

  let minMinusHalf = min - stddev / 2
  let maxMinusHalf = max + stddev / 2

  minMinusHalf = this.numberGetFixed(minMinusHalf)
  maxMinusHalf = this.numberGetFixed(maxMinusHalf)

  // console.log('fixed numbers + (min,max)', min, max, stddev, '(', minMinusHalf, ',', maxMinusHalf, ')');
  // console.log('numbers length', 'min', numberGetLength(min), 'max', numberGetLength(max), 'stddev', numberGetLength(stddev));

  let minLen = this.numberGetLength(minMinusHalf)
  let maxLen = this.numberGetLength(maxMinusHalf)
  let stddevLen = this.numberGetLength(stddev)
  //
  // console.log('- - - -');
  // console.log('Range', 'min', numberRound(minMinusHalf, -1));
  // console.log('Range', 'max', numberRound(maxMinusHalf, -1));
  // console.log('Range', 'stddev', numberRound(stddev, -1));

  if (minLen > 1)
    minMinusHalf = this.numberRound(minMinusHalf, -1)

  if (maxLen > 2)
    maxMinusHalf = this.numberRound(maxMinusHalf, -1)

  if (stddevLen !== 1)
    stddev = this.numberRound(stddev, -1)


  var arr = []
  for (var step = minMinusHalf; step < maxMinusHalf; step = step + stddev) {
    arr.push(step)
  }
  arr.push(maxMinusHalf)

  // console.log(arr);

  return arr;
}


exports.getMysqlSchemaQuery = function () {
  return '';
};

exports.getChartQuery = function () {
  return 'select ? as ??, count(*) as _count from ?? where ?? between ? and ? '
}

exports.getDataType = function (colType, typesArr) {
  // console.log(colType,typesArr);
  for (let i = 0; i < typesArr.length; ++i) {
    if (colType.indexOf(typesArr[i]) !== -1) {
      return 1;
    }
  }
  return 0;
}

exports.getColumnType = function (column) {

  const strTypes = ['varchar', 'text', 'char', 'tinytext', 'mediumtext', 'longtext', 'ntext', 'image',
    'blob', 'mediumblob', 'longblob',
    'binary', 'varbinary',
    'character', 'character varying',
    'nchar', 'nvarchar', 'clob',
    'nvarchar2', 'varchar2', 'raw', 'long raw', 'bfile', 'nclob'];
  const intTypes = ['bit',
    'integer', 'int', 'smallint', 'mediumint', 'bigint', 'tinyint', 'int2', 'int4', 'int8',
    'long',
    'serial', 'bigserial', 'smallserial',
    'bool', 'boolean', 'number'];
  const floatTypes = ['float', 'double', 'decimal', 'numeric',
    'real', 'double precision', 'real', 'money', 'smallmoney', 'dec'];
  const dateTypes = ['date', 'datetime', 'timestamp', 'time', 'year',
    'timestamp without time zone', 'timestamp with time zone', 'time without time zone', 'time with time zone',
    'datetime2', 'smalldatetime', 'datetimeoffset', 'interval year', 'interval day'];

  const rowIds = ['rowId', 'urowid'];

  //console.log(column);
  if (this.getDataType(column['data_type'], strTypes)) {
    return "string"
  } else if (this.getDataType(column['data_type'], intTypes)) {
    return "int"
  } else if (this.getDataType(column['data_type'], floatTypes)) {
    return "float"
  } else if (this.getDataType(column['data_type'], dateTypes)) {
    return "date"
  } else {
    return "string"
  }

}

exports.getType = function (colType, typesArr) {
  // for (let i = 0; i < typesArr.length; ++i) {
  //   // if (typesArr[i].indexOf(colType) !== -1) {
  //   //   return 1;
  //   // }
  //
  //   if (colType.indexOf(typesArr[i]) !== -1) {
  //     return 1;
  //   }
  // }
  return typesArr.includes(colType)
  //return 0;
}


