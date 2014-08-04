<a name="module_OPL"></a>
###OPL
Object Path Language

**Members**

* [OPL](#module_OPL)
  * [OPL.del(graph, ...path)](#module_OPL.del)
  * [OPL.errorToValue()](#module_OPL.errorToValue)
  * [OPL.explode(path)](#module_OPL.explode)
  * [OPL.get(graph, ...path)](#module_OPL.get)
  * [OPL.isRange(obj)](#module_OPL.isRange)
  * [OPL.rangeContains(rng, idx)](#module_OPL.rangeContains)
  * [OPL.relative(from, to)](#module_OPL.relative)
  * [OPL.segmentContains(segment, key)](#module_OPL.segmentContains)
  * [OPL.segmentKeys(segment)](#module_OPL.segmentKeys)
  * [OPL.set(graph, ...pathValue)](#module_OPL.set)
  * [type: OPL~Range](#module_OPL..Range)
  * [type: OPL~PathSegment](#module_OPL..PathSegment)
  * [type: OPL~QueryKey](#module_OPL..QueryKey)
  * [type: OPL~QuerySegment](#module_OPL..QuerySegment)
  * [type: OPL~Query](#module_OPL..Query)
  * [type: OPL~Path](#module_OPL..Path)
  * [type: OPL~PathValue](#module_OPL..PathValue)

<a name="module_OPL.del"></a>
####OPL.del(graph, ...path)
**Params**

- graph `graphect`  
- ...path <code>[Path](#module_OPL..Path)</code>  

**Returns**: [Array.&lt;PathValue&gt;](#module_OPL..PathValue)  
<a name="module_OPL.errorToValue"></a>
####OPL.errorToValue()
**Params**

-  `Error`  

**Returns**: `Object`  
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
####OPL.get(graph, ...path)
**Params**

- graph `graphect` - The source graphect to pull values from  
- ...path <code>[Query](#module_OPL..Query)</code> - The graphect paths to look up  

**Returns**: [Array.&lt;PathValue&gt;](#module_OPL..PathValue)  
<a name="module_OPL.isRange"></a>
####OPL.isRange(obj)
**Params**

- obj `Object`  

**Returns**: `Boolean`  
<a name="module_OPL.rangeContains"></a>
####OPL.rangeContains(rng, idx)
**Params**

- rng <code>[Range](#module_OPL..Range)</code>  
- idx `Integer`  

**Returns**: `Boolean`  
<a name="module_OPL.relative"></a>
####OPL.relative(from, to)
**Params**

- from <code>[Path](#module_OPL..Path)</code>  
- to <code>[Path](#module_OPL..Path)</code>  

**Returns**: [Path](#module_OPL..Path)  
<a name="module_OPL.segmentContains"></a>
####OPL.segmentContains(segment, key)
**Params**

- segment <code>[QuerySegment](#module_OPL..QuerySegment)</code>  
- key <code>[QueryKey](#module_OPL..QueryKey)</code>  

**Returns**: `Boolean`  
<a name="module_OPL.segmentKeys"></a>
####OPL.segmentKeys(segment)
**Params**

- segment <code>[QuerySegment](#module_OPL..QuerySegment)</code>  

**Returns**: `Array.<Integer,String>`  
<a name="module_OPL.set"></a>
####OPL.set(graph, ...pathValue)
**Params**

- graph `graphect`  
- ...pathValue <code>[PathValue](#module_OPL..PathValue)</code>  

**Returns**: [Array.&lt;PathValue&gt;](#module_OPL..PathValue) - The array of [PathValue](#module_OPL..PathValue)'s
that were set on the graph  
<a name="module_OPL..Range"></a>
####type: OPL~Range
An object that can be expanded into a series of indices

**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: `Object`  
<a name="module_OPL..PathSegment"></a>
####type: OPL~PathSegment
The smallest part of a concrete path

**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: `Integer` | `String`  
<a name="module_OPL..QueryKey"></a>
####type: OPL~QueryKey
The smallest part of a complex query

**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: [PathSegment](#module_OPL..PathSegment) | [Range](#module_OPL..Range)  
<a name="module_OPL..QuerySegment"></a>
####type: OPL~QuerySegment
A query segment can contain one or more query keys

**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: [QueryKey](#module_OPL..QueryKey) | [Array.&lt;QueryKey&gt;](#module_OPL..QueryKey)  
<a name="module_OPL..Query"></a>
####type: OPL~Query
A complex path query that can be expanded to get multiple concrete paths

**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: [Array.&lt;QuerySegment&gt;](#module_OPL..QuerySegment)  
<a name="module_OPL..Path"></a>
####type: OPL~Path
A concrete path. i.e: One that can not be expanded further.

**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: [Array.&lt;PathSegment&gt;](#module_OPL..PathSegment)  
<a name="module_OPL..PathValue"></a>
####type: OPL~PathValue
**Scope**: inner typedef of [OPL](#module_OPL)  
**Type**: `Object`  
