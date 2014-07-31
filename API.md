<a name="module_OPL"></a>
###OPL
Object Path Language

**Members**

* [OPL](#module_OPL)
  * [OPL.explode(path)](#module_OPL.explode)
  * [OPL.get(obj, paths)](#module_OPL.get)
  * [OPL.segmentKeys(segment)](#module_OPL.segmentKeys)
  * [OPL.set(obj, pathValues)](#module_OPL.set)
  * [type: OPL~Range](#module_OPL..Range)
  * [type: OPL~QueryKey](#module_OPL..QueryKey)
  * [type: OPL~PathSegment](#module_OPL..PathSegment)
  * [type: OPL~QuerySegment](#module_OPL..QuerySegment)
  * [type: OPL~Query](#module_OPL..Query)
  * [type: OPL~Path](#module_OPL..Path)
  * [type: OPL~PathValue](#module_OPL..PathValue)
  * [class: OPL~Error](#module_OPL..Error)
    * [new OPL~Error(path, message)](#new_module_OPL..Error)

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
####OPL.get(obj, paths)
**Params**

- obj `Object` - The source object to pull values from  
- paths <code>[Array.&lt;Query&gt;](#module_OPL..Query)</code> - The object paths to look up  

**Returns**: [Array.&lt;PathValue&gt;](#module_OPL..PathValue)  
<a name="module_OPL.segmentKeys"></a>
####OPL.segmentKeys(segment)
**Params**

- segment <code>[module:OPL~Segment](module:OPL~Segment)</code>  

**Returns**: `Array.<Integer,String>`  
<a name="module_OPL.set"></a>
####OPL.set(obj, pathValues)
**Params**

- obj `Object`  
- pathValues <code>[Array.&lt;PathValue&gt;](#module_OPL..PathValue)</code>  

**Returns**: [Array.&lt;PathValue&gt;](#module_OPL..PathValue) - The array of [PathValue](#module_OPL..PathValue)'s
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
<a name="module_OPL..Error"></a>
####class: OPL~Error
**Extends**: `Error`  
**Members**

* [class: OPL~Error](#module_OPL..Error)
  * [new OPL~Error(path, message)](#new_module_OPL..Error)

<a name="new_module_OPL..Error"></a>
#####new OPL~Error(path, message)
**Params**

- path <code>[Path](#module_OPL..Path)</code>  
- message `String`  

**Extends**: `Error`  
**Scope**: inner class of [OPL](#module_OPL)  
