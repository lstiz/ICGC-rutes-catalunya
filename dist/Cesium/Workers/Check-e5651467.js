// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./defined-2a4f2d00"],function(e,n){"use strict";function r(e){var t;this.name="DeveloperError",this.message=e;try{throw new Error}catch(e){t=e.stack}this.stack=t}n.defined(Object.create)&&((r.prototype=Object.create(Error.prototype)).constructor=r),r.prototype.toString=function(){var e=this.name+": "+this.message;return n.defined(this.stack)&&(e+="\n"+this.stack.toString()),e},r.throwInstantiationError=function(){throw new r("This function defines an interface and should not be called directly.")};var f={};function o(e,t,n){return"Expected "+n+" to be typeof "+t+", actual typeof was "+e}f.typeOf={},f.defined=function(e,t){if(!n.defined(t))throw new r(e+" is required, actual value was undefined")},f.typeOf.func=function(e,t){if("function"!=typeof t)throw new r(o(typeof t,"function",e))},f.typeOf.string=function(e,t){if("string"!=typeof t)throw new r(o(typeof t,"string",e))},f.typeOf.number=function(e,t){if("number"!=typeof t)throw new r(o(typeof t,"number",e))},f.typeOf.number.lessThan=function(e,t,n){if(f.typeOf.number(e,t),n<=t)throw new r("Expected "+e+" to be less than "+n+", actual value was "+t)},f.typeOf.number.lessThanOrEquals=function(e,t,n){if(f.typeOf.number(e,t),n<t)throw new r("Expected "+e+" to be less than or equal to "+n+", actual value was "+t)},f.typeOf.number.greaterThan=function(e,t,n){if(f.typeOf.number(e,t),t<=n)throw new r("Expected "+e+" to be greater than "+n+", actual value was "+t)},f.typeOf.number.greaterThanOrEquals=function(e,t,n){if(f.typeOf.number(e,t),t<n)throw new r("Expected "+e+" to be greater than or equal to"+n+", actual value was "+t)},f.typeOf.object=function(e,t){if("object"!=typeof t)throw new r(o(typeof t,"object",e))},f.typeOf.bool=function(e,t){if("boolean"!=typeof t)throw new r(o(typeof t,"boolean",e))},f.typeOf.number.equals=function(e,t,n,o){if(f.typeOf.number(e,n),f.typeOf.number(t,o),n!==o)throw new r(e+" must be equal to "+t+", the actual values are "+n+" and "+o)},e.Check=f,e.DeveloperError=r});
