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
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./defineProperties-c6a70625"],function(e,A,t,V,n){"use strict";function b(e,t,n){this.x=A.defaultValue(e,0),this.y=A.defaultValue(t,0),this.z=A.defaultValue(n,0)}b.fromSpherical=function(e,t){A.defined(t)||(t=new b);var n=e.clock,a=e.cone,i=A.defaultValue(e.magnitude,1),r=i*Math.sin(a);return t.x=r*Math.cos(n),t.y=r*Math.sin(n),t.z=i*Math.cos(a),t},b.fromElements=function(e,t,n,a){return A.defined(a)?(a.x=e,a.y=t,a.z=n,a):new b(e,t,n)},b.fromCartesian4=b.clone=function(e,t){if(A.defined(e))return A.defined(t)?(t.x=e.x,t.y=e.y,t.z=e.z,t):new b(e.x,e.y,e.z)},b.packedLength=3,b.pack=function(e,t,n){return n=A.defaultValue(n,0),t[n++]=e.x,t[n++]=e.y,t[n]=e.z,t},b.unpack=function(e,t,n){return t=A.defaultValue(t,0),A.defined(n)||(n=new b),n.x=e[t++],n.y=e[t++],n.z=e[t],n},b.packArray=function(e,t){var n=e.length;A.defined(t)?t.length=3*n:t=new Array(3*n);for(var a=0;a<n;++a)b.pack(e[a],t,3*a);return t},b.unpackArray=function(e,t){var n=e.length;A.defined(t)?t.length=n/3:t=new Array(n/3);for(var a=0;a<n;a+=3){var i=a/3;t[i]=b.unpack(e,a,t[i])}return t},b.fromArray=b.unpack,b.maximumComponent=function(e){return Math.max(e.x,e.y,e.z)},b.minimumComponent=function(e){return Math.min(e.x,e.y,e.z)},b.minimumByComponent=function(e,t,n){return n.x=Math.min(e.x,t.x),n.y=Math.min(e.y,t.y),n.z=Math.min(e.z,t.z),n},b.maximumByComponent=function(e,t,n){return n.x=Math.max(e.x,t.x),n.y=Math.max(e.y,t.y),n.z=Math.max(e.z,t.z),n},b.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y+e.z*e.z},b.magnitude=function(e){return Math.sqrt(b.magnitudeSquared(e))};var a=new b;b.distance=function(e,t){return b.subtract(e,t,a),b.magnitude(a)},b.distanceSquared=function(e,t){return b.subtract(e,t,a),b.magnitudeSquared(a)},b.normalize=function(e,t){var n=b.magnitude(e);return t.x=e.x/n,t.y=e.y/n,t.z=e.z/n,t},b.dot=function(e,t){return e.x*t.x+e.y*t.y+e.z*t.z},b.multiplyComponents=function(e,t,n){return n.x=e.x*t.x,n.y=e.y*t.y,n.z=e.z*t.z,n},b.divideComponents=function(e,t,n){return n.x=e.x/t.x,n.y=e.y/t.y,n.z=e.z/t.z,n},b.add=function(e,t,n){return n.x=e.x+t.x,n.y=e.y+t.y,n.z=e.z+t.z,n},b.subtract=function(e,t,n){return n.x=e.x-t.x,n.y=e.y-t.y,n.z=e.z-t.z,n},b.multiplyByScalar=function(e,t,n){return n.x=e.x*t,n.y=e.y*t,n.z=e.z*t,n},b.divideByScalar=function(e,t,n){return n.x=e.x/t,n.y=e.y/t,n.z=e.z/t,n},b.negate=function(e,t){return t.x=-e.x,t.y=-e.y,t.z=-e.z,t},b.abs=function(e,t){return t.x=Math.abs(e.x),t.y=Math.abs(e.y),t.z=Math.abs(e.z),t};var i=new b;b.lerp=function(e,t,n,a){return b.multiplyByScalar(t,n,i),a=b.multiplyByScalar(e,1-n,a),b.add(i,a,a)};var r=new b,u=new b;b.angleBetween=function(e,t){b.normalize(e,r),b.normalize(t,u);var n=b.dot(r,u),a=b.magnitude(b.cross(r,u,r));return Math.atan2(a,n)};var o=new b;b.mostOrthogonalAxis=function(e,t){var n=b.normalize(e,o);return b.abs(n,n),t=n.x<=n.y?n.x<=n.z?b.clone(b.UNIT_X,t):b.clone(b.UNIT_Z,t):n.y<=n.z?b.clone(b.UNIT_Y,t):b.clone(b.UNIT_Z,t)},b.projectVector=function(e,t,n){var a=b.dot(e,t)/b.dot(t,t);return b.multiplyByScalar(t,a,n)},b.equals=function(e,t){return e===t||A.defined(e)&&A.defined(t)&&e.x===t.x&&e.y===t.y&&e.z===t.z},b.equalsArray=function(e,t,n){return e.x===t[n]&&e.y===t[n+1]&&e.z===t[n+2]},b.equalsEpsilon=function(e,t,n,a){return e===t||A.defined(e)&&A.defined(t)&&V.CesiumMath.equalsEpsilon(e.x,t.x,n,a)&&V.CesiumMath.equalsEpsilon(e.y,t.y,n,a)&&V.CesiumMath.equalsEpsilon(e.z,t.z,n,a)},b.cross=function(e,t,n){var a=e.x,i=e.y,r=e.z,u=t.x,o=t.y,d=t.z,s=i*d-r*o,h=r*u-a*d,l=a*o-i*u;return n.x=s,n.y=h,n.z=l,n},b.midpoint=function(e,t,n){return n.x=.5*(e.x+t.x),n.y=.5*(e.y+t.y),n.z=.5*(e.z+t.z),n},b.fromDegrees=function(e,t,n,a,i){return e=V.CesiumMath.toRadians(e),t=V.CesiumMath.toRadians(t),b.fromRadians(e,t,n,a,i)};var d=new b,s=new b,h=new b(40680631590769,40680631590769,40408299984661.445);b.fromRadians=function(e,t,n,a,i){n=A.defaultValue(n,0);var r=A.defined(a)?a.radiiSquared:h,u=Math.cos(t);d.x=u*Math.cos(e),d.y=u*Math.sin(e),d.z=Math.sin(t),d=b.normalize(d,d),b.multiplyComponents(r,d,s);var o=Math.sqrt(b.dot(d,s));return s=b.divideByScalar(s,o,s),d=b.multiplyByScalar(d,n,d),A.defined(i)||(i=new b),b.add(s,d,i)},b.fromDegreesArray=function(e,t,n){var a=e.length;A.defined(n)?n.length=a/2:n=new Array(a/2);for(var i=0;i<a;i+=2){var r=e[i],u=e[i+1],o=i/2;n[o]=b.fromDegrees(r,u,0,t,n[o])}return n},b.fromRadiansArray=function(e,t,n){var a=e.length;A.defined(n)?n.length=a/2:n=new Array(a/2);for(var i=0;i<a;i+=2){var r=e[i],u=e[i+1],o=i/2;n[o]=b.fromRadians(r,u,0,t,n[o])}return n},b.fromDegreesArrayHeights=function(e,t,n){var a=e.length;A.defined(n)?n.length=a/3:n=new Array(a/3);for(var i=0;i<a;i+=3){var r=e[i],u=e[i+1],o=e[i+2],d=i/3;n[d]=b.fromDegrees(r,u,o,t,n[d])}return n},b.fromRadiansArrayHeights=function(e,t,n){var a=e.length;A.defined(n)?n.length=a/3:n=new Array(a/3);for(var i=0;i<a;i+=3){var r=e[i],u=e[i+1],o=e[i+2],d=i/3;n[d]=b.fromRadians(r,u,o,t,n[d])}return n},b.ZERO=A.freezeObject(new b(0,0,0)),b.UNIT_X=A.freezeObject(new b(1,0,0)),b.UNIT_Y=A.freezeObject(new b(0,1,0)),b.UNIT_Z=A.freezeObject(new b(0,0,1)),b.prototype.clone=function(e){return b.clone(this,e)},b.prototype.equals=function(e){return b.equals(this,e)},b.prototype.equalsEpsilon=function(e,t,n){return b.equalsEpsilon(this,e,t,n)},b.prototype.toString=function(){return"("+this.x+", "+this.y+", "+this.z+")"};var I=new b,E=new b;function l(e,t,n,a,i){var r=e.x,u=e.y,o=e.z,d=t.x,s=t.y,h=t.z,l=r*r*d*d,f=u*u*s*s,c=o*o*h*h,m=l+f+c,y=Math.sqrt(1/m),p=b.multiplyByScalar(e,y,I);if(m<a)return isFinite(y)?b.clone(p,i):void 0;var g=n.x,x=n.y,M=n.z,w=E;w.x=p.x*g*2,w.y=p.y*x*2,w.z=p.z*M*2;var v,_,C,z,S,q,T,O=(1-y)*b.magnitude(e)/(.5*b.magnitude(w)),R=0;do{R=(v=l*(S=(_=1/(1+(O-=R)*g))*_)+f*(q=(C=1/(1+O*x))*C)+c*(T=(z=1/(1+O*M))*z)-1)/(-2*(l*(S*_)*g+f*(q*C)*x+c*(T*z)*M))}while(Math.abs(v)>V.CesiumMath.EPSILON12);return A.defined(i)?(i.x=r*_,i.y=u*C,i.z=o*z,i):new b(r*_,u*C,o*z)}function f(e,t,n){this.longitude=A.defaultValue(e,0),this.latitude=A.defaultValue(t,0),this.height=A.defaultValue(n,0)}f.fromRadians=function(e,t,n,a){return n=A.defaultValue(n,0),A.defined(a)?(a.longitude=e,a.latitude=t,a.height=n,a):new f(e,t,n)},f.fromDegrees=function(e,t,n,a){return e=V.CesiumMath.toRadians(e),t=V.CesiumMath.toRadians(t),f.fromRadians(e,t,n,a)};var c=new b,m=new b,y=new b,p=new b(1/6378137,1/6378137,1/6356752.314245179),g=new b(1/40680631590769,1/40680631590769,1/40408299984661.445),x=V.CesiumMath.EPSILON1;function M(e,t,n,a){t=A.defaultValue(t,0),n=A.defaultValue(n,0),a=A.defaultValue(a,0),e._radii=new b(t,n,a),e._radiiSquared=new b(t*t,n*n,a*a),e._radiiToTheFourth=new b(t*t*t*t,n*n*n*n,a*a*a*a),e._oneOverRadii=new b(0===t?0:1/t,0===n?0:1/n,0===a?0:1/a),e._oneOverRadiiSquared=new b(0===t?0:1/(t*t),0===n?0:1/(n*n),0===a?0:1/(a*a)),e._minimumRadius=Math.min(t,n,a),e._maximumRadius=Math.max(t,n,a),e._centerToleranceSquared=V.CesiumMath.EPSILON1,0!==e._radiiSquared.z&&(e._squaredXOverSquaredZ=e._radiiSquared.x/e._radiiSquared.z)}function w(e,t,n){this._radii=void 0,this._radiiSquared=void 0,this._radiiToTheFourth=void 0,this._oneOverRadii=void 0,this._oneOverRadiiSquared=void 0,this._minimumRadius=void 0,this._maximumRadius=void 0,this._centerToleranceSquared=void 0,this._squaredXOverSquaredZ=void 0,M(this,e,t,n)}f.fromCartesian=function(e,t,n){var a=A.defined(t)?t.oneOverRadii:p,i=A.defined(t)?t.oneOverRadiiSquared:g,r=l(e,a,i,A.defined(t)?t._centerToleranceSquared:x,m);if(A.defined(r)){var u=b.multiplyComponents(r,i,c);u=b.normalize(u,u);var o=b.subtract(e,r,y),d=Math.atan2(u.y,u.x),s=Math.asin(u.z),h=V.CesiumMath.sign(b.dot(o,e))*b.magnitude(o);return A.defined(n)?(n.longitude=d,n.latitude=s,n.height=h,n):new f(d,s,h)}},f.toCartesian=function(e,t,n){return b.fromRadians(e.longitude,e.latitude,e.height,t,n)},f.clone=function(e,t){if(A.defined(e))return A.defined(t)?(t.longitude=e.longitude,t.latitude=e.latitude,t.height=e.height,t):new f(e.longitude,e.latitude,e.height)},f.equals=function(e,t){return e===t||A.defined(e)&&A.defined(t)&&e.longitude===t.longitude&&e.latitude===t.latitude&&e.height===t.height},f.equalsEpsilon=function(e,t,n){return e===t||A.defined(e)&&A.defined(t)&&Math.abs(e.longitude-t.longitude)<=n&&Math.abs(e.latitude-t.latitude)<=n&&Math.abs(e.height-t.height)<=n},f.ZERO=A.freezeObject(new f(0,0,0)),f.prototype.clone=function(e){return f.clone(this,e)},f.prototype.equals=function(e){return f.equals(this,e)},f.prototype.equalsEpsilon=function(e,t){return f.equalsEpsilon(this,e,t)},f.prototype.toString=function(){return"("+this.longitude+", "+this.latitude+", "+this.height+")"},n.defineProperties(w.prototype,{radii:{get:function(){return this._radii}},radiiSquared:{get:function(){return this._radiiSquared}},radiiToTheFourth:{get:function(){return this._radiiToTheFourth}},oneOverRadii:{get:function(){return this._oneOverRadii}},oneOverRadiiSquared:{get:function(){return this._oneOverRadiiSquared}},minimumRadius:{get:function(){return this._minimumRadius}},maximumRadius:{get:function(){return this._maximumRadius}}}),w.clone=function(e,t){if(A.defined(e)){var n=e._radii;return A.defined(t)?(b.clone(n,t._radii),b.clone(e._radiiSquared,t._radiiSquared),b.clone(e._radiiToTheFourth,t._radiiToTheFourth),b.clone(e._oneOverRadii,t._oneOverRadii),b.clone(e._oneOverRadiiSquared,t._oneOverRadiiSquared),t._minimumRadius=e._minimumRadius,t._maximumRadius=e._maximumRadius,t._centerToleranceSquared=e._centerToleranceSquared,t):new w(n.x,n.y,n.z)}},w.fromCartesian3=function(e,t){return A.defined(t)||(t=new w),A.defined(e)&&M(t,e.x,e.y,e.z),t},w.WGS84=A.freezeObject(new w(6378137,6378137,6356752.314245179)),w.UNIT_SPHERE=A.freezeObject(new w(1,1,1)),w.MOON=A.freezeObject(new w(V.CesiumMath.LUNAR_RADIUS,V.CesiumMath.LUNAR_RADIUS,V.CesiumMath.LUNAR_RADIUS)),w.prototype.clone=function(e){return w.clone(this,e)},w.packedLength=b.packedLength,w.pack=function(e,t,n){return n=A.defaultValue(n,0),b.pack(e._radii,t,n),t},w.unpack=function(e,t,n){t=A.defaultValue(t,0);var a=b.unpack(e,t);return w.fromCartesian3(a,n)},w.prototype.geocentricSurfaceNormal=b.normalize,w.prototype.geodeticSurfaceNormalCartographic=function(e,t){var n=e.longitude,a=e.latitude,i=Math.cos(a),r=i*Math.cos(n),u=i*Math.sin(n),o=Math.sin(a);return A.defined(t)||(t=new b),t.x=r,t.y=u,t.z=o,b.normalize(t,t)},w.prototype.geodeticSurfaceNormal=function(e,t){return A.defined(t)||(t=new b),t=b.multiplyComponents(e,this._oneOverRadiiSquared,t),b.normalize(t,t)};var v=new b,_=new b;w.prototype.cartographicToCartesian=function(e,t){var n=v,a=_;this.geodeticSurfaceNormalCartographic(e,n),b.multiplyComponents(this._radiiSquared,n,a);var i=Math.sqrt(b.dot(n,a));return b.divideByScalar(a,i,a),b.multiplyByScalar(n,e.height,n),A.defined(t)||(t=new b),b.add(a,n,t)},w.prototype.cartographicArrayToCartesianArray=function(e,t){var n=e.length;A.defined(t)?t.length=n:t=new Array(n);for(var a=0;a<n;a++)t[a]=this.cartographicToCartesian(e[a],t[a]);return t};var C=new b,z=new b,S=new b;function q(e,t,n,a){this.west=A.defaultValue(e,0),this.south=A.defaultValue(t,0),this.east=A.defaultValue(n,0),this.north=A.defaultValue(a,0)}w.prototype.cartesianToCartographic=function(e,t){var n=this.scaleToGeodeticSurface(e,z);if(A.defined(n)){var a=this.geodeticSurfaceNormal(n,C),i=b.subtract(e,n,S),r=Math.atan2(a.y,a.x),u=Math.asin(a.z),o=V.CesiumMath.sign(b.dot(i,e))*b.magnitude(i);return A.defined(t)?(t.longitude=r,t.latitude=u,t.height=o,t):new f(r,u,o)}},w.prototype.cartesianArrayToCartographicArray=function(e,t){var n=e.length;A.defined(t)?t.length=n:t=new Array(n);for(var a=0;a<n;++a)t[a]=this.cartesianToCartographic(e[a],t[a]);return t},w.prototype.scaleToGeodeticSurface=function(e,t){return l(e,this._oneOverRadii,this._oneOverRadiiSquared,this._centerToleranceSquared,t)},w.prototype.scaleToGeocentricSurface=function(e,t){A.defined(t)||(t=new b);var n=e.x,a=e.y,i=e.z,r=this._oneOverRadiiSquared,u=1/Math.sqrt(n*n*r.x+a*a*r.y+i*i*r.z);return b.multiplyByScalar(e,u,t)},w.prototype.transformPositionToScaledSpace=function(e,t){return A.defined(t)||(t=new b),b.multiplyComponents(e,this._oneOverRadii,t)},w.prototype.transformPositionFromScaledSpace=function(e,t){return A.defined(t)||(t=new b),b.multiplyComponents(e,this._radii,t)},w.prototype.equals=function(e){return this===e||A.defined(e)&&b.equals(this._radii,e._radii)},w.prototype.toString=function(){return this._radii.toString()},w.prototype.getSurfaceNormalIntersectionWithZAxis=function(e,t,n){t=A.defaultValue(t,0);var a=this._squaredXOverSquaredZ;if(A.defined(n)||(n=new b),n.x=0,n.y=0,n.z=e.z*(1-a),!(Math.abs(n.z)>=this._radii.z-t))return n},n.defineProperties(q.prototype,{width:{get:function(){return q.computeWidth(this)}},height:{get:function(){return q.computeHeight(this)}}}),q.packedLength=4,q.pack=function(e,t,n){return n=A.defaultValue(n,0),t[n++]=e.west,t[n++]=e.south,t[n++]=e.east,t[n]=e.north,t},q.unpack=function(e,t,n){return t=A.defaultValue(t,0),A.defined(n)||(n=new q),n.west=e[t++],n.south=e[t++],n.east=e[t++],n.north=e[t],n},q.computeWidth=function(e){var t=e.east,n=e.west;return t<n&&(t+=V.CesiumMath.TWO_PI),t-n},q.computeHeight=function(e){return e.north-e.south},q.fromDegrees=function(e,t,n,a,i){return e=V.CesiumMath.toRadians(A.defaultValue(e,0)),t=V.CesiumMath.toRadians(A.defaultValue(t,0)),n=V.CesiumMath.toRadians(A.defaultValue(n,0)),a=V.CesiumMath.toRadians(A.defaultValue(a,0)),A.defined(i)?(i.west=e,i.south=t,i.east=n,i.north=a,i):new q(e,t,n,a)},q.fromRadians=function(e,t,n,a,i){return A.defined(i)?(i.west=A.defaultValue(e,0),i.south=A.defaultValue(t,0),i.east=A.defaultValue(n,0),i.north=A.defaultValue(a,0),i):new q(e,t,n,a)},q.fromCartographicArray=function(e,t){for(var n=Number.MAX_VALUE,a=-Number.MAX_VALUE,i=Number.MAX_VALUE,r=-Number.MAX_VALUE,u=Number.MAX_VALUE,o=-Number.MAX_VALUE,d=0,s=e.length;d<s;d++){var h=e[d];n=Math.min(n,h.longitude),a=Math.max(a,h.longitude),u=Math.min(u,h.latitude),o=Math.max(o,h.latitude);var l=0<=h.longitude?h.longitude:h.longitude+V.CesiumMath.TWO_PI;i=Math.min(i,l),r=Math.max(r,l)}return r-i<a-n&&(n=i,(a=r)>V.CesiumMath.PI&&(a-=V.CesiumMath.TWO_PI),n>V.CesiumMath.PI&&(n-=V.CesiumMath.TWO_PI)),A.defined(t)?(t.west=n,t.south=u,t.east=a,t.north=o,t):new q(n,u,a,o)},q.fromCartesianArray=function(e,t,n){t=A.defaultValue(t,w.WGS84);for(var a=Number.MAX_VALUE,i=-Number.MAX_VALUE,r=Number.MAX_VALUE,u=-Number.MAX_VALUE,o=Number.MAX_VALUE,d=-Number.MAX_VALUE,s=0,h=e.length;s<h;s++){var l=t.cartesianToCartographic(e[s]);a=Math.min(a,l.longitude),i=Math.max(i,l.longitude),o=Math.min(o,l.latitude),d=Math.max(d,l.latitude);var f=0<=l.longitude?l.longitude:l.longitude+V.CesiumMath.TWO_PI;r=Math.min(r,f),u=Math.max(u,f)}return u-r<i-a&&(a=r,(i=u)>V.CesiumMath.PI&&(i-=V.CesiumMath.TWO_PI),a>V.CesiumMath.PI&&(a-=V.CesiumMath.TWO_PI)),A.defined(n)?(n.west=a,n.south=o,n.east=i,n.north=d,n):new q(a,o,i,d)},q.clone=function(e,t){if(A.defined(e))return A.defined(t)?(t.west=e.west,t.south=e.south,t.east=e.east,t.north=e.north,t):new q(e.west,e.south,e.east,e.north)},q.equalsEpsilon=function(e,t,n){return e===t||A.defined(e)&&A.defined(t)&&Math.abs(e.west-t.west)<=n&&Math.abs(e.south-t.south)<=n&&Math.abs(e.east-t.east)<=n&&Math.abs(e.north-t.north)<=n},q.prototype.clone=function(e){return q.clone(this,e)},q.prototype.equals=function(e){return q.equals(this,e)},q.equals=function(e,t){return e===t||A.defined(e)&&A.defined(t)&&e.west===t.west&&e.south===t.south&&e.east===t.east&&e.north===t.north},q.prototype.equalsEpsilon=function(e,t){return q.equalsEpsilon(this,e,t)},q.validate=function(e){},q.southwest=function(e,t){return A.defined(t)?(t.longitude=e.west,t.latitude=e.south,t.height=0,t):new f(e.west,e.south)},q.northwest=function(e,t){return A.defined(t)?(t.longitude=e.west,t.latitude=e.north,t.height=0,t):new f(e.west,e.north)},q.northeast=function(e,t){return A.defined(t)?(t.longitude=e.east,t.latitude=e.north,t.height=0,t):new f(e.east,e.north)},q.southeast=function(e,t){return A.defined(t)?(t.longitude=e.east,t.latitude=e.south,t.height=0,t):new f(e.east,e.south)},q.center=function(e,t){var n=e.east,a=e.west;n<a&&(n+=V.CesiumMath.TWO_PI);var i=V.CesiumMath.negativePiToPi(.5*(a+n)),r=.5*(e.south+e.north);return A.defined(t)?(t.longitude=i,t.latitude=r,t.height=0,t):new f(i,r)},q.intersection=function(e,t,n){var a=e.east,i=e.west,r=t.east,u=t.west;a<i&&0<r?a+=V.CesiumMath.TWO_PI:r<u&&0<a&&(r+=V.CesiumMath.TWO_PI),a<i&&u<0?u+=V.CesiumMath.TWO_PI:r<u&&i<0&&(i+=V.CesiumMath.TWO_PI);var o=V.CesiumMath.negativePiToPi(Math.max(i,u)),d=V.CesiumMath.negativePiToPi(Math.min(a,r));if(!((e.west<e.east||t.west<t.east)&&d<=o)){var s=Math.max(e.south,t.south),h=Math.min(e.north,t.north);if(!(h<=s))return A.defined(n)?(n.west=o,n.south=s,n.east=d,n.north=h,n):new q(o,s,d,h)}},q.simpleIntersection=function(e,t,n){var a=Math.max(e.west,t.west),i=Math.max(e.south,t.south),r=Math.min(e.east,t.east),u=Math.min(e.north,t.north);if(!(u<=i||r<=a))return A.defined(n)?(n.west=a,n.south=i,n.east=r,n.north=u,n):new q(a,i,r,u)},q.union=function(e,t,n){A.defined(n)||(n=new q);var a=e.east,i=e.west,r=t.east,u=t.west;a<i&&0<r?a+=V.CesiumMath.TWO_PI:r<u&&0<a&&(r+=V.CesiumMath.TWO_PI),a<i&&u<0?u+=V.CesiumMath.TWO_PI:r<u&&i<0&&(i+=V.CesiumMath.TWO_PI);var o=V.CesiumMath.convertLongitudeRange(Math.min(i,u)),d=V.CesiumMath.convertLongitudeRange(Math.max(a,r));return n.west=o,n.south=Math.min(e.south,t.south),n.east=d,n.north=Math.max(e.north,t.north),n},q.expand=function(e,t,n){return A.defined(n)||(n=new q),n.west=Math.min(e.west,t.longitude),n.south=Math.min(e.south,t.latitude),n.east=Math.max(e.east,t.longitude),n.north=Math.max(e.north,t.latitude),n},q.contains=function(e,t){var n=t.longitude,a=t.latitude,i=e.west,r=e.east;return r<i&&(r+=V.CesiumMath.TWO_PI,n<0&&(n+=V.CesiumMath.TWO_PI)),(i<n||V.CesiumMath.equalsEpsilon(n,i,V.CesiumMath.EPSILON14))&&(n<r||V.CesiumMath.equalsEpsilon(n,r,V.CesiumMath.EPSILON14))&&a>=e.south&&a<=e.north};var T=new f;function O(e,t){this.x=A.defaultValue(e,0),this.y=A.defaultValue(t,0)}q.subsample=function(e,t,n,a){t=A.defaultValue(t,w.WGS84),n=A.defaultValue(n,0),A.defined(a)||(a=[]);var i=0,r=e.north,u=e.south,o=e.east,d=e.west,s=T;s.height=n,s.longitude=d,s.latitude=r,a[i]=t.cartographicToCartesian(s,a[i]),i++,s.longitude=o,a[i]=t.cartographicToCartesian(s,a[i]),i++,s.latitude=u,a[i]=t.cartographicToCartesian(s,a[i]),i++,s.longitude=d,a[i]=t.cartographicToCartesian(s,a[i]),i++,s.latitude=r<0?r:0<u?u:0;for(var h=1;h<8;++h)s.longitude=-Math.PI+h*V.CesiumMath.PI_OVER_TWO,q.contains(e,s)&&(a[i]=t.cartographicToCartesian(s,a[i]),i++);return 0===s.latitude&&(s.longitude=d,a[i]=t.cartographicToCartesian(s,a[i]),i++,s.longitude=o,a[i]=t.cartographicToCartesian(s,a[i]),i++),a.length=i,a},q.MAX_VALUE=A.freezeObject(new q(-Math.PI,-V.CesiumMath.PI_OVER_TWO,Math.PI,V.CesiumMath.PI_OVER_TWO)),O.fromElements=function(e,t,n){return A.defined(n)?(n.x=e,n.y=t,n):new O(e,t)},O.fromCartesian3=O.clone=function(e,t){if(A.defined(e))return A.defined(t)?(t.x=e.x,t.y=e.y,t):new O(e.x,e.y)},O.fromCartesian4=O.clone,O.packedLength=2,O.pack=function(e,t,n){return n=A.defaultValue(n,0),t[n++]=e.x,t[n]=e.y,t},O.unpack=function(e,t,n){return t=A.defaultValue(t,0),A.defined(n)||(n=new O),n.x=e[t++],n.y=e[t],n},O.packArray=function(e,t){var n=e.length;A.defined(t)?t.length=2*n:t=new Array(2*n);for(var a=0;a<n;++a)O.pack(e[a],t,2*a);return t},O.unpackArray=function(e,t){var n=e.length;A.defined(t)?t.length=n/2:t=new Array(n/2);for(var a=0;a<n;a+=2){var i=a/2;t[i]=O.unpack(e,a,t[i])}return t},O.fromArray=O.unpack,O.maximumComponent=function(e){return Math.max(e.x,e.y)},O.minimumComponent=function(e){return Math.min(e.x,e.y)},O.minimumByComponent=function(e,t,n){return n.x=Math.min(e.x,t.x),n.y=Math.min(e.y,t.y),n},O.maximumByComponent=function(e,t,n){return n.x=Math.max(e.x,t.x),n.y=Math.max(e.y,t.y),n},O.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y},O.magnitude=function(e){return Math.sqrt(O.magnitudeSquared(e))};var R=new O;O.distance=function(e,t){return O.subtract(e,t,R),O.magnitude(R)},O.distanceSquared=function(e,t){return O.subtract(e,t,R),O.magnitudeSquared(R)},O.normalize=function(e,t){var n=O.magnitude(e);return t.x=e.x/n,t.y=e.y/n,t},O.dot=function(e,t){return e.x*t.x+e.y*t.y},O.multiplyComponents=function(e,t,n){return n.x=e.x*t.x,n.y=e.y*t.y,n},O.divideComponents=function(e,t,n){return n.x=e.x/t.x,n.y=e.y/t.y,n},O.add=function(e,t,n){return n.x=e.x+t.x,n.y=e.y+t.y,n},O.subtract=function(e,t,n){return n.x=e.x-t.x,n.y=e.y-t.y,n},O.multiplyByScalar=function(e,t,n){return n.x=e.x*t,n.y=e.y*t,n},O.divideByScalar=function(e,t,n){return n.x=e.x/t,n.y=e.y/t,n},O.negate=function(e,t){return t.x=-e.x,t.y=-e.y,t},O.abs=function(e,t){return t.x=Math.abs(e.x),t.y=Math.abs(e.y),t};var P=new O;O.lerp=function(e,t,n,a){return O.multiplyByScalar(t,n,P),a=O.multiplyByScalar(e,1-n,a),O.add(P,a,a)};var N=new O,U=new O;O.angleBetween=function(e,t){return O.normalize(e,N),O.normalize(t,U),V.CesiumMath.acosClamped(O.dot(N,U))};var L=new O;O.mostOrthogonalAxis=function(e,t){var n=O.normalize(e,L);return O.abs(n,n),t=n.x<=n.y?O.clone(O.UNIT_X,t):O.clone(O.UNIT_Y,t)},O.equals=function(e,t){return e===t||A.defined(e)&&A.defined(t)&&e.x===t.x&&e.y===t.y},O.equalsArray=function(e,t,n){return e.x===t[n]&&e.y===t[n+1]},O.equalsEpsilon=function(e,t,n,a){return e===t||A.defined(e)&&A.defined(t)&&V.CesiumMath.equalsEpsilon(e.x,t.x,n,a)&&V.CesiumMath.equalsEpsilon(e.y,t.y,n,a)},O.ZERO=A.freezeObject(new O(0,0)),O.UNIT_X=A.freezeObject(new O(1,0)),O.UNIT_Y=A.freezeObject(new O(0,1)),O.prototype.clone=function(e){return O.clone(this,e)},O.prototype.equals=function(e){return O.equals(this,e)},O.prototype.equalsEpsilon=function(e,t,n){return O.equalsEpsilon(this,e,t,n)},O.prototype.toString=function(){return"("+this.x+", "+this.y+")"},e.Cartesian2=O,e.Cartesian3=b,e.Cartographic=f,e.Ellipsoid=w,e.Rectangle=q});
