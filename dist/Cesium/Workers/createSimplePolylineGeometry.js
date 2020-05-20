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
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
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
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13","./Cartesian2-8c9f79ed","./Transforms-7a81c8c2","./RuntimeError-7c184ac0","./WebGLConstants-4c11ee5f","./ComponentDatatype-c2c50230","./GeometryAttribute-f9641809","./GeometryAttributes-1c7ce91d","./IndexDatatype-486e7786","./IntersectionTests-3bb891b7","./Plane-a6a20716","./ArcType-66bc286a","./EllipsoidRhumbLine-cddfa697","./EllipsoidGeodesic-4c7a7786","./PolylinePipeline-a7e2c020","./Color-06be9049"],function(S,e,I,R,O,o,r,M,U,N,F,t,a,H,l,i,W,Y){"use strict";function q(e,o,r,t,a,l,i){var n,s=W.PolylinePipeline.numberOfPoints(e,o,a),p=r.red,c=r.green,d=r.blue,y=r.alpha,f=t.red,u=t.green,h=t.blue,C=t.alpha;if(Y.Color.equals(r,t)){for(n=0;n<s;n++)l[i++]=Y.Color.floatToByte(p),l[i++]=Y.Color.floatToByte(c),l[i++]=Y.Color.floatToByte(d),l[i++]=Y.Color.floatToByte(y);return i}var T=(f-p)/s,g=(u-c)/s,m=(h-d)/s,v=(C-y)/s,P=i;for(n=0;n<s;n++)l[P++]=Y.Color.floatToByte(p+n*T),l[P++]=Y.Color.floatToByte(c+n*g),l[P++]=Y.Color.floatToByte(d+n*m),l[P++]=Y.Color.floatToByte(y+n*v);return P}function d(e){var o=(e=S.defaultValue(e,S.defaultValue.EMPTY_OBJECT)).positions,r=e.colors,t=S.defaultValue(e.colorsPerVertex,!1);this._positions=o,this._colors=r,this._colorsPerVertex=t,this._arcType=S.defaultValue(e.arcType,H.ArcType.GEODESIC),this._granularity=S.defaultValue(e.granularity,I.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=S.defaultValue(e.ellipsoid,R.Ellipsoid.WGS84),this._workerName="createSimplePolylineGeometry";var a=1+o.length*R.Cartesian3.packedLength;a+=S.defined(r)?1+r.length*Y.Color.packedLength:1,this.packedLength=a+R.Ellipsoid.packedLength+3}d.pack=function(e,o,r){var t;r=S.defaultValue(r,0);var a=e._positions,l=a.length;for(o[r++]=l,t=0;t<l;++t,r+=R.Cartesian3.packedLength)R.Cartesian3.pack(a[t],o,r);var i=e._colors;for(l=S.defined(i)?i.length:0,o[r++]=l,t=0;t<l;++t,r+=Y.Color.packedLength)Y.Color.pack(i[t],o,r);return R.Ellipsoid.pack(e._ellipsoid,o,r),r+=R.Ellipsoid.packedLength,o[r++]=e._colorsPerVertex?1:0,o[r++]=e._arcType,o[r]=e._granularity,o},d.unpack=function(e,o,r){var t;o=S.defaultValue(o,0);var a=e[o++],l=new Array(a);for(t=0;t<a;++t,o+=R.Cartesian3.packedLength)l[t]=R.Cartesian3.unpack(e,o);var i=0<(a=e[o++])?new Array(a):void 0;for(t=0;t<a;++t,o+=Y.Color.packedLength)i[t]=Y.Color.unpack(e,o);var n=R.Ellipsoid.unpack(e,o);o+=R.Ellipsoid.packedLength;var s=1===e[o++],p=e[o++],c=e[o];return S.defined(r)?(r._positions=l,r._colors=i,r._ellipsoid=n,r._colorsPerVertex=s,r._arcType=p,r._granularity=c,r):new d({positions:l,colors:i,ellipsoid:n,colorsPerVertex:s,arcType:p,granularity:c})};var z=new Array(2),J=new Array(2),j={positions:z,height:J,ellipsoid:void 0,minDistance:void 0,granularity:void 0};return d.createGeometry=function(e){var o,r,t,a,l,i=e._positions,n=e._colors,s=e._colorsPerVertex,p=e._arcType,c=e._granularity,d=e._ellipsoid,y=I.CesiumMath.chordLength(c,d.maximumRadius),f=S.defined(n)&&!s,u=i.length,h=0;if(p===H.ArcType.GEODESIC||p===H.ArcType.RHUMB){var C,T,g;g=p===H.ArcType.GEODESIC?(C=I.CesiumMath.chordLength(c,d.maximumRadius),T=W.PolylinePipeline.numberOfPoints,W.PolylinePipeline.generateArc):(C=c,T=W.PolylinePipeline.numberOfPointsRhumbLine,W.PolylinePipeline.generateRhumbArc);var m=W.PolylinePipeline.extractHeights(i,d),v=j;if(p===H.ArcType.GEODESIC?v.minDistance=y:v.granularity=c,v.ellipsoid=d,f){var P=0;for(o=0;o<u-1;o++)P+=T(i[o],i[o+1],C)+1;r=new Float64Array(3*P),a=new Uint8Array(4*P),v.positions=z,v.height=J;var _=0;for(o=0;o<u-1;++o){z[0]=i[o],z[1]=i[o+1],J[0]=m[o],J[1]=m[o+1];var b=g(v);if(S.defined(n)){var B=b.length/3;l=n[o];for(var A=0;A<B;++A)a[_++]=Y.Color.floatToByte(l.red),a[_++]=Y.Color.floatToByte(l.green),a[_++]=Y.Color.floatToByte(l.blue),a[_++]=Y.Color.floatToByte(l.alpha)}r.set(b,h),h+=b.length}}else if(v.positions=i,v.height=m,r=new Float64Array(g(v)),S.defined(n)){for(a=new Uint8Array(r.length/3*4),o=0;o<u-1;++o){h=q(i[o],i[o+1],n[o],n[o+1],y,a,h)}var E=n[u-1];a[h++]=Y.Color.floatToByte(E.red),a[h++]=Y.Color.floatToByte(E.green),a[h++]=Y.Color.floatToByte(E.blue),a[h++]=Y.Color.floatToByte(E.alpha)}}else{t=f?2*u-2:u,r=new Float64Array(3*t),a=S.defined(n)?new Uint8Array(4*t):void 0;var k=0,G=0;for(o=0;o<u;++o){var w=i[o];if(f&&0<o&&(R.Cartesian3.pack(w,r,k),k+=3,l=n[o-1],a[G++]=Y.Color.floatToByte(l.red),a[G++]=Y.Color.floatToByte(l.green),a[G++]=Y.Color.floatToByte(l.blue),a[G++]=Y.Color.floatToByte(l.alpha)),f&&o===u-1)break;R.Cartesian3.pack(w,r,k),k+=3,S.defined(n)&&(l=n[o],a[G++]=Y.Color.floatToByte(l.red),a[G++]=Y.Color.floatToByte(l.green),a[G++]=Y.Color.floatToByte(l.blue),a[G++]=Y.Color.floatToByte(l.alpha))}}var D=new N.GeometryAttributes;D.position=new U.GeometryAttribute({componentDatatype:M.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r}),S.defined(n)&&(D.color=new U.GeometryAttribute({componentDatatype:M.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:4,values:a,normalize:!0}));var L=2*((t=r.length/3)-1),V=F.IndexDatatype.createTypedArray(t,L),x=0;for(o=0;o<t-1;++o)V[x++]=o,V[x++]=o+1;return new U.Geometry({attributes:D,indices:V,primitiveType:U.PrimitiveType.LINES,boundingSphere:O.BoundingSphere.fromPoints(i)})},function(e,o){return S.defined(o)&&(e=d.unpack(e,o)),e._ellipsoid=R.Ellipsoid.clone(e._ellipsoid),d.createGeometry(e)}});
