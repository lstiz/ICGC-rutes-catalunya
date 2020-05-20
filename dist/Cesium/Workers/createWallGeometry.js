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
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13","./Cartesian2-8c9f79ed","./Transforms-7a81c8c2","./RuntimeError-7c184ac0","./WebGLConstants-4c11ee5f","./ComponentDatatype-c2c50230","./GeometryAttribute-f9641809","./GeometryAttributes-1c7ce91d","./IndexDatatype-486e7786","./IntersectionTests-3bb891b7","./Plane-a6a20716","./VertexFormat-e1477d0a","./EllipsoidTangentPlane-7f2f6dd6","./EllipsoidRhumbLine-cddfa697","./PolygonPipeline-c12287cd","./EllipsoidGeodesic-4c7a7786","./PolylinePipeline-a7e2c020","./WallGeometryLibrary-2ad7809f"],function(Z,e,j,K,Q,t,a,X,$,ee,te,i,n,p,r,o,s,m,l,ae){"use strict";var ie=new K.Cartesian3,ne=new K.Cartesian3,re=new K.Cartesian3,oe=new K.Cartesian3,se=new K.Cartesian3,me=new K.Cartesian3,le=new K.Cartesian3,de=new K.Cartesian3;function u(e){var t=(e=Z.defaultValue(e,Z.defaultValue.EMPTY_OBJECT)).positions,a=e.maximumHeights,i=e.minimumHeights,n=Z.defaultValue(e.vertexFormat,p.VertexFormat.DEFAULT),r=Z.defaultValue(e.granularity,j.CesiumMath.RADIANS_PER_DEGREE),o=Z.defaultValue(e.ellipsoid,K.Ellipsoid.WGS84);this._positions=t,this._minimumHeights=i,this._maximumHeights=a,this._vertexFormat=p.VertexFormat.clone(n),this._granularity=r,this._ellipsoid=K.Ellipsoid.clone(o),this._workerName="createWallGeometry";var s=1+t.length*K.Cartesian3.packedLength+2;Z.defined(i)&&(s+=i.length),Z.defined(a)&&(s+=a.length),this.packedLength=s+K.Ellipsoid.packedLength+p.VertexFormat.packedLength+1}u.pack=function(e,t,a){var i;a=Z.defaultValue(a,0);var n=e._positions,r=n.length;for(t[a++]=r,i=0;i<r;++i,a+=K.Cartesian3.packedLength)K.Cartesian3.pack(n[i],t,a);var o=e._minimumHeights;if(r=Z.defined(o)?o.length:0,t[a++]=r,Z.defined(o))for(i=0;i<r;++i)t[a++]=o[i];var s=e._maximumHeights;if(r=Z.defined(s)?s.length:0,t[a++]=r,Z.defined(s))for(i=0;i<r;++i)t[a++]=s[i];return K.Ellipsoid.pack(e._ellipsoid,t,a),a+=K.Ellipsoid.packedLength,p.VertexFormat.pack(e._vertexFormat,t,a),t[a+=p.VertexFormat.packedLength]=e._granularity,t};var c=K.Ellipsoid.clone(K.Ellipsoid.UNIT_SPHERE),y=new p.VertexFormat,f={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:c,vertexFormat:y,granularity:void 0};return u.unpack=function(e,t,a){var i;t=Z.defaultValue(t,0);var n,r,o=e[t++],s=new Array(o);for(i=0;i<o;++i,t+=K.Cartesian3.packedLength)s[i]=K.Cartesian3.unpack(e,t);if(0<(o=e[t++]))for(n=new Array(o),i=0;i<o;++i)n[i]=e[t++];if(0<(o=e[t++]))for(r=new Array(o),i=0;i<o;++i)r[i]=e[t++];var m=K.Ellipsoid.unpack(e,t,c);t+=K.Ellipsoid.packedLength;var l=p.VertexFormat.unpack(e,t,y),d=e[t+=p.VertexFormat.packedLength];return Z.defined(a)?(a._positions=s,a._minimumHeights=n,a._maximumHeights=r,a._ellipsoid=K.Ellipsoid.clone(m,a._ellipsoid),a._vertexFormat=p.VertexFormat.clone(l,a._vertexFormat),a._granularity=d,a):(f.positions=s,f.minimumHeights=n,f.maximumHeights=r,f.granularity=d,new u(f))},u.fromConstantHeights=function(e){var t,a,i=(e=Z.defaultValue(e,Z.defaultValue.EMPTY_OBJECT)).positions,n=e.minimumHeight,r=e.maximumHeight,o=Z.defined(n),s=Z.defined(r);if(o||s){var m=i.length;t=o?new Array(m):void 0,a=s?new Array(m):void 0;for(var l=0;l<m;++l)o&&(t[l]=n),s&&(a[l]=r)}return new u({positions:i,maximumHeights:a,minimumHeights:t,ellipsoid:e.ellipsoid,vertexFormat:e.vertexFormat})},u.createGeometry=function(e){var t=e._positions,a=e._minimumHeights,i=e._maximumHeights,n=e._vertexFormat,r=e._granularity,o=e._ellipsoid,s=ae.WallGeometryLibrary.computePositions(o,t,i,a,r,!0);if(Z.defined(s)){var m,l=s.bottomPositions,d=s.topPositions,p=s.numCorners,u=d.length,c=2*u,y=n.position?new Float64Array(c):void 0,f=n.normal?new Float32Array(c):void 0,g=n.tangent?new Float32Array(c):void 0,h=n.bitangent?new Float32Array(c):void 0,v=n.st?new Float32Array(c/3*2):void 0,C=0,A=0,x=0,b=0,_=0,E=de,w=le,F=me,L=!0,k=0,G=1/((u/=3)-t.length+1);for(m=0;m<u;++m){var P=3*m,H=K.Cartesian3.fromArray(d,P,ie),V=K.Cartesian3.fromArray(l,P,ne);if(n.position&&(y[C++]=V.x,y[C++]=V.y,y[C++]=V.z,y[C++]=H.x,y[C++]=H.y,y[C++]=H.z),n.st&&(v[_++]=k,v[_++]=0,v[_++]=k,v[_++]=1),n.normal||n.tangent||n.bitangent){var T,D=K.Cartesian3.clone(K.Cartesian3.ZERO,se),z=o.scaleToGeodeticSurface(K.Cartesian3.fromArray(d,P,ne),ne);if(m+1<u&&(T=o.scaleToGeodeticSurface(K.Cartesian3.fromArray(d,3+P,re),re),D=K.Cartesian3.fromArray(d,3+P,se)),L){var O=K.Cartesian3.subtract(D,H,oe),S=K.Cartesian3.subtract(z,H,ie);E=K.Cartesian3.normalize(K.Cartesian3.cross(S,O,E),E),L=!1}K.Cartesian3.equalsEpsilon(T,z,j.CesiumMath.EPSILON10)?L=!0:(k+=G,n.tangent&&(w=K.Cartesian3.normalize(K.Cartesian3.subtract(T,z,w),w)),n.bitangent&&(F=K.Cartesian3.normalize(K.Cartesian3.cross(E,w,F),F))),n.normal&&(f[A++]=E.x,f[A++]=E.y,f[A++]=E.z,f[A++]=E.x,f[A++]=E.y,f[A++]=E.z),n.tangent&&(g[b++]=w.x,g[b++]=w.y,g[b++]=w.z,g[b++]=w.x,g[b++]=w.y,g[b++]=w.z),n.bitangent&&(h[x++]=F.x,h[x++]=F.y,h[x++]=F.z,h[x++]=F.x,h[x++]=F.y,h[x++]=F.z)}}var I=new ee.GeometryAttributes;n.position&&(I.position=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:y})),n.normal&&(I.normal=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:f})),n.tangent&&(I.tangent=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:g})),n.bitangent&&(I.bitangent=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:h})),n.st&&(I.st=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:v}));var R=c/3;c-=6*(p+1);var M=te.IndexDatatype.createTypedArray(R,c),N=0;for(m=0;m<R-2;m+=2){var W=m,B=m+2,U=K.Cartesian3.fromArray(y,3*W,ie),q=K.Cartesian3.fromArray(y,3*B,ne);if(!K.Cartesian3.equalsEpsilon(U,q,j.CesiumMath.EPSILON10)){var J=m+1,Y=m+3;M[N++]=J,M[N++]=W,M[N++]=Y,M[N++]=Y,M[N++]=W,M[N++]=B}}return new $.Geometry({attributes:I,indices:M,primitiveType:$.PrimitiveType.TRIANGLES,boundingSphere:new Q.BoundingSphere.fromVertices(y)})}},function(e,t){return Z.defined(t)&&(e=u.unpack(e,t)),e._ellipsoid=K.Ellipsoid.clone(e._ellipsoid),u.createGeometry(e)}});
