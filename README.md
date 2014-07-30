Object Path Language
====================

> 


Summary
-------


Installation
------------

~~~
% npm install opl
~~~


API
---

<a name="module_OPL"></a>
###OPL
Object Path Language

**Members**

* [OPL](#module_OPL)
  * [OPL.explode(path)](#module_OPL.explode)
  * [OPL.get(obj, ...path)](#module_OPL.get)
  * [OPL.segmentKeys(segment)](#module_OPL.segmentKeys)
  * [OPL.set(obj, pvs)](#module_OPL.set)
  * [type: OPL~Range](#module_OPL..Range)
  * [type: OPL~QueryKey](#module_OPL..QueryKey)
  * [type: OPL~PathSegment](#module_OPL..PathSegment)
  * [type: OPL~QuerySegment](#module_OPL..QuerySegment)
  * [type: OPL~Query](#module_OPL..Query)
  * [type: OPL~Path](#module_OPL..Path)
  * [type: OPL~PathValue](#module_OPL..PathValue)

<a name="module_OPL.explode"></a>
####OPL.explode(path)
Expand a path into all possible variations

**Params**

- path <code>[Query](#module_OPL..Query)</code>  

**Returns**: [Array.&lt;Path&gt;](#module_OPL..Path)  
**Example**  
OPL.explode([[1, 2], [3, 4], 5]);
//=> [
//      [1, 3, 5],
//      [2, 3, 5],
//      [1, 4, 5],
//      [2, 4, 5]
//   ]

<a name="module_OPL.get"></a>
####OPL.get(obj, ...path)
**Params**

- obj `Object` - The source object to pull values from  
- ...path <code>[Query](#module_OPL..Query)</code> - The object paths to look up  

**Returns**: [Array.&lt;PathValue&gt;](#module_OPL..PathValue)  
<a name="module_OPL.segmentKeys"></a>
####OPL.segmentKeys(segment)
**Params**

- segment <code>[module:OPL~Segment](module:OPL~Segment)</code>  

**Returns**: `Array.<Integer,String>`  
<a name="module_OPL.set"></a>
####OPL.set(obj, pvs)
**Params**

- obj `Object`  
- pvs <code>[Array.&lt;PathValue&gt;](#module_OPL..PathValue)</code>  

**Returns**: [Array.&lt;PathValue&gt;](#module_OPL..PathValue) - The array of [PathValue](#module_OPL..PathValue)
that were set on the obj  
<a name="module_OPL..Range"></a>
####type: OPL~Range
**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: `Object`  
<a name="module_OPL..QueryKey"></a>
####type: OPL~QueryKey
**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: `Integer` | `String` | [Range](#module_OPL..Range)  
<a name="module_OPL..PathSegment"></a>
####type: OPL~PathSegment
**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: `Integer` | `String`  
<a name="module_OPL..QuerySegment"></a>
####type: OPL~QuerySegment
**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: [QueryKey](#module_OPL..QueryKey) | [Array.&lt;QueryKey&gt;](#module_OPL..QueryKey)  
<a name="module_OPL..Query"></a>
####type: OPL~Query
**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: [Array.&lt;QuerySegment&gt;](#module_OPL..QuerySegment)  
<a name="module_OPL..Path"></a>
####type: OPL~Path
**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: [Array.&lt;PathSegment&gt;](#module_OPL..PathSegment)  
<a name="module_OPL..PathValue"></a>
####type: OPL~PathValue
**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: `Array.<module:OPL~Path, Mixed,Error>`  


Dependencies
------------

These are installed when **opl** is installed.

~~~
underscore: 1.x.x
~~~


### Development Dependencies ###

Installed when you run `npm install` in the package directory.

~~~
mocha:             1.x.x
should:            3.x.x
del:               *
gulp:              3.x.x
gulp-ejs:          0.x.x
gulp-jsdoc:        0.x.x
jsdoc-to-markdown: 0.x.x
~~~


Report an Issue
---------------

* [Bugs](http://github.com/jhamlet/opl/issues)
* Contact the author: <jerry@hamletink.com>


License
-------

> Copyright (c) 2014 Jerry Hamlet <jerry@hamletink.com>
> 
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation
> files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use,
> copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following
> conditions:
> 
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
> 
> The Software shall be used for Good, not Evil.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
> OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
> HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
> WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
> FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
> OTHER DEALINGS IN THE SOFTWARE.
