# Install & setup


# API Reference


## Classes

<dl>
<dt><a href="#BaseMiddlewareGql">BaseMiddlewareGql</a></dt>
<dd><p>Base class for middlewares</p>
</dd>
<dt><a href="#BaseResolver">BaseResolver</a></dt>
<dd><p>Base class for graphql resolver</p>
</dd>
<dt><a href="#BaseMiddleware">BaseMiddleware</a></dt>
<dd><p>BaseMiddleware used for REST APIs module</p>
</dd>
<dt><a href="#BaseRouter">BaseRouter</a></dt>
<dd><p>BaseClass for Router files in REST APIs</p>
</dd>
<dt><a href="#BaseService">BaseService</a></dt>
<dd><p>BaseClass for service files in REST APIs module</p>
</dd>
<dt><a href="#BaseComponent">BaseComponent</a></dt>
<dd><p>Base class for a component in server</p>
</dd>
<dt><a href="#Components">Components</a></dt>
<dd><p>Class to keep reference of all components in server</p>
</dd>
</dl>

<a name="BaseMiddlewareGql"></a>

## BaseMiddlewareGql
Base class for middlewares

**Kind**: global class  

* [BaseMiddlewareGql](#BaseMiddlewareGql)
    * [.default(req, res, next)](#BaseMiddlewareGql+default) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.isAllowed(roles, method, permissions, resolver)](#BaseMiddlewareGql+isAllowed) ⇒ <code>boolean</code>

<a name="BaseMiddlewareGql+default"></a>

### baseMiddlewareGql.default(req, res, next) ⇒ <code>Promise.&lt;void&gt;</code>
**Kind**: instance method of [<code>BaseMiddlewareGql</code>](#BaseMiddlewareGql)  

| Param |
| --- |
| req | 
| res | 
| next | 

<a name="BaseMiddlewareGql+isAllowed"></a>

### baseMiddlewareGql.isAllowed(roles, method, permissions, resolver) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>BaseMiddlewareGql</code>](#BaseMiddlewareGql)  

| Param | Type | Description |
| --- | --- | --- |
| roles | <code>Object</code> | Key value pair of role and true/false |
| method | <code>String</code> | query/mutation |
| permissions | <code>Object</code> | Refer permissions in *.policy.js |
| resolver | <code>function</code> | Resolver function |

<a name="BaseResolver"></a>

## BaseResolver
Base class for graphql resolver

**Kind**: global class  
<a name="BaseResolver+mw"></a>

### baseResolver.mw([Function[]], cbk) ⇒ <code>function</code>
**Kind**: instance method of [<code>BaseResolver</code>](#BaseResolver)  

| Param |
| --- |
| [Function[]] | 
| cbk | 

<a name="BaseMiddleware"></a>

## BaseMiddleware
BaseMiddleware used for REST APIs module

**Kind**: global class  

* [BaseMiddleware](#BaseMiddleware)
    * [new BaseMiddleware(app)](#new_BaseMiddleware_new)
    * [.default(req, res, next)](#BaseMiddleware+default) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.isAllowed(roles, method, permissions, url)](#BaseMiddleware+isAllowed) ⇒ <code>Promise.&lt;boolean&gt;</code>

<a name="new_BaseMiddleware_new"></a>

### new BaseMiddleware(app)

| Param | Type | Description |
| --- | --- | --- |
| app | <code>Object</code> | app context |

<a name="BaseMiddleware+default"></a>

### baseMiddleware.default(req, res, next) ⇒ <code>Promise.&lt;void&gt;</code>
Default middleware function that gets invoked

**Kind**: instance method of [<code>BaseMiddleware</code>](#BaseMiddleware)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | express req object |
| res | <code>Object</code> | express res object |
| next | <code>function</code> | express next function |

<a name="BaseMiddleware+isAllowed"></a>

### baseMiddleware.isAllowed(roles, method, permissions, url) ⇒ <code>Promise.&lt;boolean&gt;</code>
Determines if the method is allowed for a particular request,url and role

**Kind**: instance method of [<code>BaseMiddleware</code>](#BaseMiddleware)  

| Param | Type | Description |
| --- | --- | --- |
| roles | <code>Object</code> | key value pair with role and true/false |
| method | <code>String</code> | HTTP Method name |
| permissions | <code>Object</code> | refer to permission in *.policy.js |
| url | <code>String</code> | http url |

<a name="BaseRouter"></a>

## BaseRouter
BaseClass for Router files in REST APIs

**Kind**: global class  
<a name="new_BaseRouter_new"></a>

### new BaseRouter(app)

| Param | Type | Description |
| --- | --- | --- |
| app | <code>Object</code> | app context |

<a name="BaseService"></a>

## BaseService
BaseClass for service files in REST APIs module

**Kind**: global class  
<a name="BaseComponent"></a>

## BaseComponent
Base class for a component in server

**Kind**: global class  
<a name="BaseComponent+init"></a>

### baseComponent.init()
Initialisation method of component - mandatory to be implemented by the child class

**Kind**: instance method of [<code>BaseComponent</code>](#BaseComponent)  
<a name="Components"></a>

## Components
Class to keep reference of all components in server

**Kind**: global class  

* [Components](#Components)
    * [new Components(components, baseDir)](#new_Components_new)
    * [.init()](#Components+init) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_Components_new"></a>

### new Components(components, baseDir)

| Param | Type | Description |
| --- | --- | --- |
| components | <code>Object</code> | details of components |
| baseDir | <code>String</code> | base directory |

<a name="Components+init"></a>

### components.init() ⇒ <code>Promise.&lt;void&gt;</code>
Initialise all component of server

**Kind**: instance method of [<code>Components</code>](#Components)  




test




