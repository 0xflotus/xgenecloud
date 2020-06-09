# Install & setup


# API Reference
Base class for models

**Kind**: global class  

* [BaseModelSql](#BaseModelSql)
    * [new BaseModelSql(args)](#new_BaseModelSql_new)
    * [.$db](#BaseModelSql+$db) ⇒ <code>Object</code>
    * [.transaction()](#BaseModelSql+transaction) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.commit(trx)](#BaseModelSql+commit) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.rollback(trx)](#BaseModelSql+rollback) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.isCompleted(trx)](#BaseModelSql+isCompleted) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.insert(data, [trx])](#BaseModelSql+insert) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> \| <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [.updateByPk(id, data, [trx])](#BaseModelSql+updateByPk) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.delByPk(id, [trx])](#BaseModelSql+delByPk) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.insertByFk(args, [trx])](#BaseModelSql+insertByFk) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> \| <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.updateByFk(args, [trx])](#BaseModelSql+updateByFk) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.update(args, [trx])](#BaseModelSql+update) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.delByFk(args, [trx])](#BaseModelSql+delByFk) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.del(args, [trx])](#BaseModelSql+del) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.insertb(data)](#BaseModelSql+insertb) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> \| <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [.updateb(data)](#BaseModelSql+updateb) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [.delb(ids)](#BaseModelSql+delb) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
    * [.readByPk(id)](#BaseModelSql+readByPk) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.readByFk(args)](#BaseModelSql+readByFk) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.exists(id)](#BaseModelSql+exists) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.existsByFk(id)](#BaseModelSql+existsByFk) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.raw(queryString, params)](#BaseModelSql+raw) ⇒ <code>Promise</code>
    * [.hasManyChildren(args)](#BaseModelSql+hasManyChildren) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.hasManyList(args)](#BaseModelSql+hasManyList) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.belongsTo(args)](#BaseModelSql+belongsTo) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.hasManyListGQL(args, ids)](#BaseModelSql+hasManyListGQL) ⇒ <code>Promise.&lt;Object.&lt;string, Array.&lt;Object&gt;&gt;&gt;</code>
    * [.hasManyListCount(args, ids)](#BaseModelSql+hasManyListCount) ⇒ <code>Promise.&lt;Object.&lt;string, Array.&lt;Object&gt;&gt;&gt;</code>
    * *[.beforeInsert(data, trx)](#BaseModelSql+beforeInsert)*
    * *[.afterInsert(response, trx)](#BaseModelSql+afterInsert)*
    * *[.errorInsert(err, data, trx)](#BaseModelSql+errorInsert)*
    * *[.beforeUpdate(data, trx)](#BaseModelSql+beforeUpdate)*
    * *[.afterUpdate(response, trx)](#BaseModelSql+afterUpdate)*
    * *[.errorUpdate(err, data, trx)](#BaseModelSql+errorUpdate)*
    * *[.beforeDelete(data, trx)](#BaseModelSql+beforeDelete)*
    * *[.afterDelete(response, trx)](#BaseModelSql+afterDelete)*
    * *[.errorDelete(err, data, trx)](#BaseModelSql+errorDelete)*
    * *[.beforeInsertb(data, trx)](#BaseModelSql+beforeInsertb)*
    * *[.afterInsertb(response, trx)](#BaseModelSql+afterInsertb)*
    * *[.errorInsertb(err, data, trx)](#BaseModelSql+errorInsertb)*
    * *[.beforeUpdateb(data, trx)](#BaseModelSql+beforeUpdateb)*
    * *[.afterUpdateb(response, trx)](#BaseModelSql+afterUpdateb)*
    * *[.errorUpdateb(err, data, trx)](#BaseModelSql+errorUpdateb)*
    * *[.beforeDeleteb(data, trx)](#BaseModelSql+beforeDeleteb)*
    * *[.afterDeleteb(response, trx)](#BaseModelSql+afterDeleteb)*
    * *[.errorDeleteb(err, data, trx)](#BaseModelSql+errorDeleteb)*

<a name="new_BaseModelSql_new"></a>

### new BaseModelSql(args)
**Returns**: [<code>BaseModelSql</code>](#BaseModelSql) - Returns [BaseModelSql](#BaseModelSql) reference.  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.knex | <code>Object</code> | Knex instance |
| args.tableName | <code>String</code> | table name |
| args.columns | <code>Array.&lt;Object&gt;</code> | columns |
| args.pks | <code>Array.&lt;Object&gt;</code> | primary keys |
| args.hasMany | <code>Array.&lt;Object&gt;</code> | has many relations |
| args.belongsTo | <code>Array.&lt;Object&gt;</code> | belongs to relations |
| args.hooks | <code>Object</code> | afterInsert, beforeInsert, errorInsert, afterUpdate, beforeUpdate, errorUpdate, afterDelete, beforeDelete, errorDelete |

<a name="BaseModelSql+$db"></a>

### baseModelSql.$db ⇒ <code>Object</code>
**Kind**: instance property of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Object</code> - knex instance attached to a table  
<a name="BaseModelSql+transaction"></a>

### baseModelSql.transaction() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns a transaction reference

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Transaction reference  
<a name="BaseModelSql+commit"></a>

### baseModelSql.commit(trx) ⇒ <code>Promise.&lt;void&gt;</code>
Commit transaction

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| trx | <code>Object</code> | Transaction reference |

<a name="BaseModelSql+rollback"></a>

### baseModelSql.rollback(trx) ⇒ <code>Promise.&lt;void&gt;</code>
Rollback transaction

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| trx | <code>Object</code> | Transaction reference |

<a name="BaseModelSql+isCompleted"></a>

### baseModelSql.isCompleted(trx) ⇒ <code>Promise.&lt;void&gt;</code>
Transaction completed

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| trx | <code>Object</code> | Transaction reference |

<a name="BaseModelSql+insert"></a>

### baseModelSql.insert(data, [trx]) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> \| <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Creates row in table

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | row data |
| [trx] | <code>Object</code> | <code></code> | knex transaction object |

<a name="BaseModelSql+updateByPk"></a>

### baseModelSql.updateByPk(id, data, [trx]) ⇒ <code>Promise.&lt;Number&gt;</code>
Update table row data by primary key

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - 1 for success, 0 for failure  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | primary key separated by ___ |
| data | <code>Object</code> |  | table row data |
| [trx] | <code>Object</code> | <code></code> | knex transaction object |

<a name="BaseModelSql+delByPk"></a>

### baseModelSql.delByPk(id, [trx]) ⇒ <code>Promise.&lt;Number&gt;</code>
Delete table row data by primary key

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - 1 for success, 0 for failure  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | primary key separated by ___ |
| [trx] | <code>Object</code> | <code></code> | knex transaction object |

<a name="BaseModelSql+insertByFk"></a>

### baseModelSql.insertByFk(args, [trx]) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> \| <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Creates row in this table under a certain parent

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Todo**

- [ ] should return inserted record


| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.data | <code>Object</code> | row data |
| args.parentId | <code>String</code> | parent table id |
| args.parentTableName | <code>String</code> | parent table name |
| [trx] | <code>Object</code> | knex transaction object |

<a name="BaseModelSql+updateByFk"></a>

### baseModelSql.updateByFk(args, [trx]) ⇒ <code>Promise.&lt;Number&gt;</code>
Update table row data by primary key and foreign key

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - 1 for success, 0 for failure  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.id | <code>String</code> | primary key separated by ___ |
| args.parentId | <code>String</code> | parent table id |
| args.parentTableName | <code>String</code> | parent table name |
| args.data | <code>Object</code> | table row data |
| [trx] | <code>Object</code> | knex transaction object |

<a name="BaseModelSql+update"></a>

### baseModelSql.update(args, [trx]) ⇒ <code>Promise.&lt;Number&gt;</code>
Update table row data by using  where clause

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - number of rows affected  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.where | <code>String</code> | update where clause |
| args.data | <code>Object</code> | table row data |
| [trx] | <code>Object</code> | knex transaction object |

<a name="BaseModelSql+delByFk"></a>

### baseModelSql.delByFk(args, [trx]) ⇒ <code>Promise.&lt;Number&gt;</code>
Delete table row data by primary key and foreign key

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - 1 for success, 0 for failure  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.id | <code>String</code> | primary key separated by ___ |
| args.parentId | <code>String</code> | parent table id |
| args.parentTableName | <code>String</code> | parent table name |
| [trx] | <code>Object</code> | knex transaction object |

<a name="BaseModelSql+del"></a>

### baseModelSql.del(args, [trx]) ⇒ <code>Promise.&lt;Number&gt;</code>
Delete table row data by where conditions

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Number&gt;</code> - number of deleted records  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.where | <code>String</code> | where clause for deleting |
| [trx] | <code>Object</code> | knex transaction object |

<a name="BaseModelSql+insertb"></a>

### baseModelSql.insertb(data) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> \| <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Creates multiple rows in table

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | row data |

<a name="BaseModelSql+updateb"></a>

### baseModelSql.updateb(data) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Update bulk - happens within a transaction

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - - 1 for success, 0 for failure  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | table rows to be updated |

<a name="BaseModelSql+delb"></a>

### baseModelSql.delb(ids) ⇒ <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code>
Bulk delete happens within a transaction

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Array.&lt;Number&gt;&gt;</code> - - 1 for success, 0 for failure  

| Param | Type | Description |
| --- | --- | --- |
| ids | <code>Array.&lt;Object&gt;</code> | rows to be deleted |

<a name="BaseModelSql+readByPk"></a>

### baseModelSql.readByPk(id) ⇒ <code>Promise.&lt;Object&gt;</code>
Reads table row data

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Table row data  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | primary key separated by ___ |

<a name="BaseModelSql+readByFk"></a>

### baseModelSql.readByFk(args) ⇒ <code>Promise.&lt;Object&gt;</code>
Reads table row data under a certain parent

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - returns row  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.id | <code>Object</code> | primary key separated by ___ |
| args.parentId | <code>String</code> | parent table id |
| args.parentTableName | <code>String</code> | parent table name |

<a name="BaseModelSql+exists"></a>

### baseModelSql.exists(id) ⇒ <code>Promise.&lt;boolean&gt;</code>
Table row exists

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - - true for exits and false for none  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | ___ separated primary key string |

<a name="BaseModelSql+existsByFk"></a>

### baseModelSql.existsByFk(id) ⇒ <code>Promise.&lt;boolean&gt;</code>
Table row exists

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - - true for exits and false for none  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | ___ separated primary key string |

<a name="BaseModelSql+raw"></a>

### baseModelSql.raw(queryString, params) ⇒ <code>Promise</code>
Runs raw query on database

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise</code> - - return raw data from database driver  

| Param | Type | Description |
| --- | --- | --- |
| queryString | <code>String</code> | query string |
| params | <code>Array.&lt;Object&gt;</code> | paramaterised values in an array for query |

<a name="BaseModelSql+hasManyChildren"></a>

### baseModelSql.hasManyChildren(args) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Gets child rows for a parent row in this table

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - return child rows  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| args | <code>Object</code> |  |  |
| args.child | <code>String</code> |  | child table name |
| args.parentId | <code>String</code> |  | pk |
| [args.fields] | <code>String</code> | <code>*</code> | commas separated column names of this table |
| [args.where] | <code>String</code> |  | where clause with conditions within () |
| [args.limit] | <code>String</code> |  | number of rows to be limited (has default,min,max values in config) |
| [args.offset] | <code>String</code> |  | offset from which to get the number of rows |
| [args.sort] | <code>String</code> |  | comma separated column names where each column name is columnName ascending and -columnName is columnName descending |

<a name="BaseModelSql+hasManyList"></a>

### baseModelSql.hasManyList(args) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Gets parent list along with children list

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| args | <code>Object</code> |  |  |
| args.childs | <code>String</code> |  | comma separated child table names |
| [args.fields] | <code>String</code> | <code>*</code> | commas separated column names of this table |
| [args.fields*] | <code>String</code> | <code>*</code> | commas separated column names of child table(* is a natural number 'i' where i is index of child table in comma separated list) |
| [args.where] | <code>String</code> |  | where clause with conditions within () |
| [args.where*] | <code>String</code> |  | where clause with conditions within ()(* is a natural number 'i' where i is index of child table in comma separated list) |
| [args.limit] | <code>String</code> |  | number of rows to be limited (has default,min,max values in config) |
| [args.limit*] | <code>String</code> |  | number of rows to be limited  of child table(* is a natural number 'i' where i is index of child table in comma separated list) |
| [args.offset] | <code>String</code> |  | offset from which to get the number of rows |
| [args.offset*] | <code>String</code> |  | offset from which to get the number of rows of child table(* is a natural number 'i' where i is index of child table in comma separated list) |
| [args.sort] | <code>String</code> |  | comma separated column names where each column name is columnName ascending and -columnName is columnName descending |
| [args.sort*] | <code>String</code> |  | comma separated column names where each column name is columnName ascending and -columnName is columnName descending(* is a natural number 'i' where i is index of child table in comma separated list) |

<a name="BaseModelSql+belongsTo"></a>

### baseModelSql.belongsTo(args) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Gets child list along with its parent

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| args | <code>Object</code> |  |  |
| args.parents | <code>String</code> |  | comma separated parent table names |
| [args.fields] | <code>String</code> | <code>*</code> | commas separated column names of this table |
| [args.fields*] | <code>String</code> | <code>*</code> | commas separated column names of parent table(* is a natural number 'i' where i is index of child table in comma separated list) |
| [args.where] | <code>String</code> |  | where clause with conditions within () |
| [args.limit] | <code>String</code> |  | number of rows to be limited (has default,min,max values in config) |
| [args.offset] | <code>String</code> |  | offset from which to get the number of rows |
| [args.sort] | <code>String</code> |  | comma separated column names where each column name is columnName ascending and -columnName is columnName descending |

<a name="BaseModelSql+hasManyListGQL"></a>

### baseModelSql.hasManyListGQL(args, ids) ⇒ <code>Promise.&lt;Object.&lt;string, Array.&lt;Object&gt;&gt;&gt;</code>
Returns key value paired grouped children list

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Object.&lt;string, Array.&lt;Object&gt;&gt;&gt;</code> - key will be parent pk and value will be child list  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.child | <code>String</code> | child table name |
| ids | <code>Array.&lt;String&gt;</code> | array of parent primary keys |
| [args.where] | <code>String</code> | where clause with conditions within () |
| [args.limit] | <code>String</code> | number of rows to be limited (has default,min,max values in config) |
| [args.offset] | <code>String</code> | offset from which to get the number of rows |
| [args.sort] | <code>String</code> | comma separated column names where each column name is columnName ascending and -columnName is columnName descending |

<a name="BaseModelSql+hasManyListCount"></a>

### baseModelSql.hasManyListCount(args, ids) ⇒ <code>Promise.&lt;Object.&lt;string, Array.&lt;Object&gt;&gt;&gt;</code>
Returns key value paired grouped children list

**Kind**: instance method of [<code>BaseModelSql</code>](#BaseModelSql)  
**Returns**: <code>Promise.&lt;Object.&lt;string, Array.&lt;Object&gt;&gt;&gt;</code> - key will be parent pk and value will be child list  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> |  |
| args.child | <code>String</code> | child table name |
| ids | <code>Array.&lt;String&gt;</code> | array of parent primary keys |
| [args.where] | <code>String</code> | where clause with conditions within () |
| [args.limit] | <code>String</code> | number of rows to be limited (has default,min,max values in config) |
| [args.offset] | <code>String</code> | offset from which to get the number of rows |
| [args.sort] | <code>String</code> | comma separated column names where each column name is columnName ascending and -columnName is columnName descending |

<a name="BaseModelSql+beforeInsert"></a>

### *baseModelSql.beforeInsert(data, trx)*
Before Insert is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | insert data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+afterInsert"></a>

### *baseModelSql.afterInsert(response, trx)*
After Insert is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | inserted data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+errorInsert"></a>

### *baseModelSql.errorInsert(err, data, trx)*
After Insert is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Exception reference |
| data | <code>Object</code> | insert data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+beforeUpdate"></a>

### *baseModelSql.beforeUpdate(data, trx)*
Before Update is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | update data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+afterUpdate"></a>

### *baseModelSql.afterUpdate(response, trx)*
After Update is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | updated data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+errorUpdate"></a>

### *baseModelSql.errorUpdate(err, data, trx)*
Error update is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Exception reference |
| data | <code>Object</code> | update data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+beforeDelete"></a>

### *baseModelSql.beforeDelete(data, trx)*
Before delete is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | delete data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+afterDelete"></a>

### *baseModelSql.afterDelete(response, trx)*
After Delete is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | Deleted data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+errorDelete"></a>

### *baseModelSql.errorDelete(err, data, trx)*
Error delete is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Exception reference |
| data | <code>Object</code> | delete data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+beforeInsertb"></a>

### *baseModelSql.beforeInsertb(data, trx)*
Before insert bulk  is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | insert data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+afterInsertb"></a>

### *baseModelSql.afterInsertb(response, trx)*
After insert bulk  is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Array.&lt;Object&gt;</code> | inserted data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+errorInsertb"></a>

### *baseModelSql.errorInsertb(err, data, trx)*
Error insert bulk is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Exception reference |
| data | <code>Object</code> | delete data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+beforeUpdateb"></a>

### *baseModelSql.beforeUpdateb(data, trx)*
Before update bulk  is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | update data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+afterUpdateb"></a>

### *baseModelSql.afterUpdateb(response, trx)*
After update bulk  is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Array.&lt;Object&gt;</code> | updated data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+errorUpdateb"></a>

### *baseModelSql.errorUpdateb(err, data, trx)*
Error update bulk is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Exception reference |
| data | <code>Array.&lt;Object&gt;</code> | delete data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+beforeDeleteb"></a>

### *baseModelSql.beforeDeleteb(data, trx)*
Before delete bulk  is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | delete data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+afterDeleteb"></a>

### *baseModelSql.afterDeleteb(response, trx)*
After delete bulk  is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Array.&lt;Object&gt;</code> | deleted data |
| trx | <code>Object</code> | knex transaction reference |

<a name="BaseModelSql+errorDeleteb"></a>

### *baseModelSql.errorDeleteb(err, data, trx)*
Error delete bulk is a hook which can be override in subclass

**Kind**: instance abstract method of [<code>BaseModelSql</code>](#BaseModelSql)  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | Exception reference |
| data | <code>Array.&lt;Object&gt;</code> | delete data |
| trx | <code>Object</code> | knex transaction reference |





