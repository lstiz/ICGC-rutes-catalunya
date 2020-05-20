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
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13","./Cartesian2-8c9f79ed","./Transforms-7a81c8c2","./RuntimeError-7c184ac0","./WebGLConstants-4c11ee5f","./ComponentDatatype-c2c50230","./GeometryAttribute-f9641809","./GeometryAttributes-1c7ce91d","./IndexDatatype-486e7786","./createTaskProcessorWorker","./GeometryOffsetAttribute-9ecab91f","./VertexFormat-e1477d0a","./BoxGeometry-ccced19d","./CylinderGeometryLibrary-3c55f845","./CylinderGeometry-0df2229f","./EllipsoidGeometry-232477be","./Color-06be9049"],function(D,e,t,P,q,n,r,a,i,o,W,d,s,c,_,f,N,Y,S){"use strict";function T(e){this.offset=e.offset,this.count=e.count,this.color=e.color,this.batchIds=e.batchIds}var l=new P.Cartesian3,u=q.Matrix4.packedLength+P.Cartesian3.packedLength,h=q.Matrix4.packedLength+2,p=q.Matrix4.packedLength+P.Cartesian3.packedLength,b=P.Cartesian3.packedLength+1,y={modelMatrix:new q.Matrix4,boundingVolume:new q.BoundingSphere};function j(e,t){var n=t*u,r=P.Cartesian3.unpack(e,n,l);n+=P.Cartesian3.packedLength;var a=q.Matrix4.unpack(e,n,y.modelMatrix);q.Matrix4.multiplyByScale(a,r,a);var i=y.boundingVolume;return P.Cartesian3.clone(P.Cartesian3.ZERO,i.center),i.radius=Math.sqrt(3),y}function z(e,t){var n=t*h,r=e[n++],a=e[n++],i=P.Cartesian3.fromElements(r,r,a,l),o=q.Matrix4.unpack(e,n,y.modelMatrix);q.Matrix4.multiplyByScale(o,i,o);var d=y.boundingVolume;return P.Cartesian3.clone(P.Cartesian3.ZERO,d.center),d.radius=Math.sqrt(2),y}function H(e,t){var n=t*p,r=P.Cartesian3.unpack(e,n,l);n+=P.Cartesian3.packedLength;var a=q.Matrix4.unpack(e,n,y.modelMatrix);q.Matrix4.multiplyByScale(a,r,a);var i=y.boundingVolume;return P.Cartesian3.clone(P.Cartesian3.ZERO,i.center),i.radius=1,y}function J(e,t){var n=t*b,r=e[n++],a=P.Cartesian3.unpack(e,n,l),i=q.Matrix4.fromTranslation(a,y.modelMatrix);q.Matrix4.multiplyByUniformScale(i,r,i);var o=y.boundingVolume;return P.Cartesian3.clone(P.Cartesian3.ZERO,o.center),o.radius=1,y}var V=new P.Cartesian3;function K(e,t,n,r,a){if(D.defined(t)){for(var i=n.length,o=r.attributes.position.values,d=r.indices,s=e.positions,c=e.vertexBatchIds,f=e.indices,l=e.batchIds,u=e.batchTableColors,h=e.batchedIndices,p=e.indexOffsets,b=e.indexCounts,y=e.boundingVolumes,x=e.modelMatrix,g=e.center,v=e.positionOffset,C=e.batchIdIndex,m=e.indexOffset,I=e.batchedIndicesOffset,k=0;k<i;++k){var M=a(t,k),B=M.modelMatrix;q.Matrix4.multiply(x,B,B);for(var w=n[k],A=o.length,O=0;O<A;O+=3){var L=P.Cartesian3.unpack(o,O,V);q.Matrix4.multiplyByPoint(B,L,L),P.Cartesian3.subtract(L,g,L),P.Cartesian3.pack(L,s,3*v+O),c[C++]=w}for(var E=d.length,U=0;U<E;++U)f[m+U]=d[U]+v;var G=k+I;h[G]=new T({offset:m,count:E,color:S.Color.fromRgba(u[w]),batchIds:[w]}),l[G]=w,p[G]=m,b[G]=E,y[G]=q.BoundingSphere.transform(M.boundingVolume,B),v+=A/3,m+=E}e.positionOffset=v,e.batchIdIndex=C,e.indexOffset=m,e.batchedIndicesOffset+=i}}var Q=new P.Cartesian3,X=new q.Matrix4;function $(e,t,n){var r=n.length,a=2+r*q.BoundingSphere.packedLength+1+function(e){for(var t=e.length,n=0,r=0;r<t;++r)n+=S.Color.packedLength+3+e[r].batchIds.length;return n}(t),i=new Float64Array(a),o=0;i[o++]=e,i[o++]=r;for(var d=0;d<r;++d)q.BoundingSphere.pack(n[d],i,o),o+=q.BoundingSphere.packedLength;var s=t.length;i[o++]=s;for(var c=0;c<s;++c){var f=t[c];S.Color.pack(f.color,i,o),o+=S.Color.packedLength,i[o++]=f.offset,i[o++]=f.count;var l=f.batchIds,u=l.length;i[o++]=u;for(var h=0;h<u;++h)i[o++]=l[h]}return i}return d(function(e,t){var n=D.defined(e.boxes)?new Float32Array(e.boxes):void 0,r=D.defined(e.boxBatchIds)?new Uint16Array(e.boxBatchIds):void 0,a=D.defined(e.cylinders)?new Float32Array(e.cylinders):void 0,i=D.defined(e.cylinderBatchIds)?new Uint16Array(e.cylinderBatchIds):void 0,o=D.defined(e.ellipsoids)?new Float32Array(e.ellipsoids):void 0,d=D.defined(e.ellipsoidBatchIds)?new Uint16Array(e.ellipsoidBatchIds):void 0,s=D.defined(e.spheres)?new Float32Array(e.spheres):void 0,c=D.defined(e.sphereBatchIds)?new Uint16Array(e.sphereBatchIds):void 0,f=D.defined(n)?r.length:0,l=D.defined(a)?i.length:0,u=D.defined(o)?d.length:0,h=D.defined(s)?c.length:0,p=_.BoxGeometry.getUnitBox(),b=N.CylinderGeometry.getUnitCylinder(),y=Y.EllipsoidGeometry.getUnitEllipsoid(),x=p.attributes.position.values,g=b.attributes.position.values,v=y.attributes.position.values,C=x.length*f;C+=g.length*l,C+=v.length*(u+h);var m=p.indices,I=b.indices,k=y.indices,M=m.length*f;M+=I.length*l,M+=k.length*(u+h);var B,w,A,O=new Float32Array(C),L=new Uint16Array(C/3),E=W.IndexDatatype.createTypedArray(C/3,M),U=f+l+u+h,G=new Uint16Array(U),S=new Array(U),T=new Uint32Array(U),V=new Uint32Array(U),F=new Array(U);B=e.packedBuffer,w=new Float64Array(B),A=0,P.Cartesian3.unpack(w,A,Q),A+=P.Cartesian3.packedLength,q.Matrix4.unpack(w,A,X);var R={batchTableColors:new Uint32Array(e.batchTableColors),positions:O,vertexBatchIds:L,indices:E,batchIds:G,batchedIndices:S,indexOffsets:T,indexCounts:V,boundingVolumes:F,positionOffset:0,batchIdIndex:0,indexOffset:0,batchedIndicesOffset:0,modelMatrix:X,center:Q};K(R,n,r,p,j),K(R,a,i,b,z),K(R,o,d,y,H),K(R,s,c,y,J);var Z=$(E.BYTES_PER_ELEMENT,S,F);return t.push(O.buffer,L.buffer,E.buffer),t.push(G.buffer,T.buffer,V.buffer),t.push(Z.buffer),{positions:O.buffer,vertexBatchIds:L.buffer,indices:E.buffer,indexOffsets:T.buffer,indexCounts:V.buffer,batchIds:G.buffer,packedBuffer:Z.buffer}})});
