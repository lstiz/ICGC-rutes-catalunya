// @flow

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

L.Control.Elevation = L.Control.extend({
	options: {
		position: "topright",
		theme: "lime-theme leaflet-control",
		width: 600,
		height: 175,
		margins: {
			top: 10,
			right: 20,
			bottom: 30,
			left: 60
		},
		useHeightIndicator: true,
		interpolation: "linear",
		hoverNumber: {
			decimalsX: 3,
			decimalsY: 0,
			formatter: undefined
		},
		xTicks: undefined,
		yTicks: undefined,
		collapsed: false,
		yAxisMin: undefined,
		yAxisMax: undefined,
		scope:"Leaflet",
		forceAxisBounds: false,
		controlButton: {
			iconCssClass: "elevation-toggle-icon",
			title: "Elevation"
		},
		imperial: false
	},
	__mileFactor: 0.621371,
	__footFactor: 3.28084,

	onRemove: function(map) {

		this._container = null;

	},

	addCesium:function(viewer) {
        this._map = viewer;
		this.options.scope = "Cesium";
	 const opts = this.options;
		const margin = opts.margins;
		opts.xTicks = opts.xTicks || Math.round(this._width() / 75);
		opts.yTicks = opts.yTicks || Math.round(this._height() / 30);
		opts.hoverNumber.formatter = opts.hoverNumber.formatter || this._formatter;

		
		const x = this._x = d3.scale.linear()
			.range([0, this._width()]);

		const y = this._y = d3.scale.linear()
			.range([this._height(), 0]);

		const area = this._area = d3.svg.area()
			.interpolate(opts.interpolation)
			.x((d) => {

				const xDiagCoord = x(d.dist);
				d.xDiagCoord = xDiagCoord;
				return xDiagCoord;

			})
			.y0(this._height())
			.y1((d) => {

				return y(d.altitude);

			});

        const container = this._container = L.DomUtil.create("div", "elevation");
        

        console.info("container",container);

		L.DomUtil.addClass(container, opts.theme); //append theme to control

		this._initToggle();

		const cont = d3.select(container);
		cont.attr("width", opts.width);
		const svg = cont.append("svg");
		svg.attr("width", opts.width)
			.attr("class", "background")
			.attr("height", opts.height)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		let line = d3.svg.line();
		line = line
			.x((d) => {

				return d3.mouse(svg.select("g"))[0];

			})
			.y(function(d) {

				return this._height();

			});

		const g = d3.select(this._container).select("svg").select("g");

		this._areapath = g.append("path")
			.attr("class", "area");

		const background = this._background = g.append("rect")
			.attr("width", this._width())
			.attr("height", this._height())
			.style("fill", "none")
			.style("stroke", "none")
			.style("pointer-events", "all");

		if (L.Browser.touch) {

			background.on("touchmove.drag", this._dragHandler.bind(this))
				.on("touchstart.drag", this._dragStartHandler.bind(this))
				.on("touchstart.focus", this._mousemoveHandler.bind(this));
			L.DomEvent.on(this._container, "touchend", this._dragEndHandler, this);

		} else {

			background.on("mousemove.focus", this._mousemoveHandler.bind(this))
				.on("mouseout.focus", this._mouseoutHandler.bind(this))
				.on("mousedown.drag", this._dragStartHandler.bind(this))
				.on("mousemove.drag", this._dragHandler.bind(this));
			L.DomEvent.on(this._container, "mouseup", this._dragEndHandler, this);

		}

		this._xaxisgraphicnode = g.append("g");
		this._yaxisgraphicnode = g.append("g");
		this._appendXaxis(this._xaxisgraphicnode);
		this._appendYaxis(this._yaxisgraphicnode);

		const focusG = this._focusG = g.append("g");
		this._mousefocus = focusG.append("svg:line")
			.attr("class", "mouse-focus-line")
			.attr("x2", "0")
			.attr("y2", "0")
			.attr("x1", "0")
			.attr("y1", "0");
		this._focuslabelX = focusG.append("svg:text")
			.style("pointer-events", "none")
			.attr("class", "mouse-focus-label-x");
		this._focuslabelY = focusG.append("svg:text")
			.style("pointer-events", "none")
			.attr("class", "mouse-focus-label-y");

		if (this._data) {

			this._applyData();

		}


		$("#elevation-div").append(container);
		return container;


	},


	onAdd: function(map) {

		this._map = map;


		const opts = this.options;
		const margin = opts.margins;
		opts.xTicks = opts.xTicks || Math.round(this._width() / 75);
		opts.yTicks = opts.yTicks || Math.round(this._height() / 30);
		opts.hoverNumber.formatter = opts.hoverNumber.formatter || this._formatter;

		const x = this._x = d3.scale.linear()
			.range([0, this._width()]);

		const y = this._y = d3.scale.linear()
			.range([this._height(), 0]);

		const area = this._area = d3.svg.area()
			.interpolate(opts.interpolation)
			.x((d) => {

				const xDiagCoord = x(d.dist);
				d.xDiagCoord = xDiagCoord;
				return xDiagCoord;

			})
			.y0(this._height())
			.y1((d) => {

				return y(d.altitude);

			});

		const container = this._container = L.DomUtil.create("div", "elevation");
		L.DomUtil.addClass(container, opts.theme); //append theme to control

		this._initToggle();

		const cont = d3.select(container);
		cont.attr("width", opts.width);
		const svg = cont.append("svg");
		svg.attr("width", opts.width)
			.attr("class", "background")
			.attr("height", opts.height)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		let line = d3.svg.line();
		line = line
			.x((d) => {

				return d3.mouse(svg.select("g"))[0];

			})
			.y(function(d) {

				return this._height();

			});

		const g = d3.select(this._container).select("svg").select("g");

		this._areapath = g.append("path")
			.attr("class", "area");

		const background = this._background = g.append("rect")
			.attr("width", this._width())
			.attr("height", this._height())
			.style("fill", "none")
			.style("stroke", "none")
			.style("pointer-events", "all");

		if (L.Browser.touch) {

			background.on("touchmove.drag", this._dragHandler.bind(this))
				.on("touchstart.drag", this._dragStartHandler.bind(this))
				.on("touchstart.focus", this._mousemoveHandler.bind(this));
			L.DomEvent.on(this._container, "touchend", this._dragEndHandler, this);

		} else {

			background.on("mousemove.focus", this._mousemoveHandler.bind(this))
				.on("mouseout.focus", this._mouseoutHandler.bind(this))
				.on("mousedown.drag", this._dragStartHandler.bind(this))
				.on("mousemove.drag", this._dragHandler.bind(this));
			L.DomEvent.on(this._container, "mouseup", this._dragEndHandler, this);

		}

		this._xaxisgraphicnode = g.append("g");
		this._yaxisgraphicnode = g.append("g");
		this._appendXaxis(this._xaxisgraphicnode);
		this._appendYaxis(this._yaxisgraphicnode);

		const focusG = this._focusG = g.append("g");
		this._mousefocus = focusG.append("svg:line")
			.attr("class", "mouse-focus-line")
			.attr("x2", "0")
			.attr("y2", "0")
			.attr("x1", "0")
			.attr("y1", "0");
		this._focuslabelX = focusG.append("svg:text")
			.style("pointer-events", "none")
			.attr("class", "mouse-focus-label-x");
		this._focuslabelY = focusG.append("svg:text")
			.style("pointer-events", "none")
			.attr("class", "mouse-focus-label-y");

		if (this._data) {

			this._applyData();

		}

		return container;

	},

	_dragHandler: function() {

		//we don´t want map events to occur here
		d3.event.preventDefault();
		d3.event.stopPropagation();

		this._gotDragged = true;

		this._drawDragRectangle();

	},

	/*
     * Draws the currently dragged rectabgle over the chart.
     */
	_drawDragRectangle: function() {

		if (!this._dragStartCoords) {

			return;

		}

		const dragEndCoords = this._dragCurrentCoords = d3.mouse(this._background.node());

		const x1 = Math.min(this._dragStartCoords[0], dragEndCoords[0]),
			x2 = Math.max(this._dragStartCoords[0], dragEndCoords[0]);

		if (!this._dragRectangle && !this._dragRectangleG) {

			const g = d3.select(this._container).select("svg").select("g");

			this._dragRectangleG = g.append("g");

			this._dragRectangle = this._dragRectangleG.append("rect")
				.attr("width", x2 - x1)
				.attr("height", this._height())
				.attr("x", x1)
				.attr("class", "mouse-drag")
				.style("pointer-events", "none");

		} else {

			this._dragRectangle.attr("width", x2 - x1)
				.attr("x", x1);

		}

	},

	/*
     * Removes the drag rectangle and zoms back to the total extent of the data.
     */
	_resetDrag: function() {

		if (this._dragRectangleG) {

			this._dragRectangleG.remove();
			this._dragRectangleG = null;
			this._dragRectangle = null;

			this._hidePositionMarker();

			this._map.fitBounds(this._fullExtent);

		}

	},

	/*
     * Handles end of dragg operations. Zooms the map to the selected items extent.
     */
	_dragEndHandler: function() {

		if (!this._dragStartCoords || !this._gotDragged) {

			this._dragStartCoords = null;
			this._gotDragged = false;
			this._resetDrag();
			return;

		}

		this._hidePositionMarker();

		const item1 = this._findItemForX(this._dragStartCoords[0]),
			item2 = this._findItemForX(this._dragCurrentCoords[0]);

		this._fitSection(item1, item2);

		this._dragStartCoords = null;
		this._gotDragged = false;

	},

	_dragStartHandler: function() {

		d3.event.preventDefault();
		d3.event.stopPropagation();

		this._gotDragged = false;

		this._dragStartCoords = d3.mouse(this._background.node());

	},

	/*
     * Finds a data entry for a given x-coordinate of the diagram
     */
	_findItemForX: function(x) {

		const bisect = d3.bisector((d) => {

			return d.dist;

		}).left;
		const xinvert = this._x.invert(x);
		return bisect(this._data, xinvert);

	},

	/*
     * Finds an item with the smallest delta in distance to the given latlng coords
     */
	_findItemForLatLng: function(latlng) {

		let result = null,
			d = Infinity;
		this._data.forEach((item) => {

			const dist = latlng.distanceTo(item.latlng);
			if (dist < d) {

				d = dist;
				result = item;

			}

		});
		return result;

	},

	/** Make the map fit the route section between given indexes. */
	_fitSection: function(index1, index2) {

		const start = Math.min(index1, index2),
			end = Math.max(index1, index2);

		const ext = this._calculateFullExtent(this._data.slice(start, end));

		this._map.fitBounds(ext);

	},

	_initToggle: function() {

		/* inspired by L.Control.Layers */

		const container = this._container;

		//Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute("aria-haspopup", true);

		if (!L.Browser.touch) {

			L.DomEvent
				.disableClickPropagation(container);
			//.disableScrollPropagation(container);

		} else {

			L.DomEvent.on(container, "click", L.DomEvent.stopPropagation);

		}

		if (this.options.collapsed) {

			this._collapse();

			if (!L.Browser.android) {

				L.DomEvent
					.on(container, "mouseover", this._expand, this)
					.on(container, "mouseout", this._collapse, this);

			}
			const link = this._button = L.DomUtil.create("a", `elevation-toggle ${this.options.controlButton
				.iconCssClass}`, container);
			link.href = "#";
			link.title = this.options.controlButton.title;

			if (L.Browser.touch) {

				L.DomEvent
					.on(link, "click", L.DomEvent.stop)
					.on(link, "click", this._expand, this);

			} else {

				L.DomEvent.on(link, "focus", this._expand, this);

			}

			//	this._map.on("click", this._collapse, this);
			// TODO keyboard accessibility

		}

	},

	_expand: function() {

		this._container.className = this._container.className.replace(" elevation-collapsed", "");

	},

	_collapse: function() {

		L.DomUtil.addClass(this._container, "elevation-collapsed");

	},

	_width: function() {

		const opts = this.options;
		return opts.width - opts.margins.left - opts.margins.right;

	},

	_height: function() {

		const opts = this.options;
		return opts.height - opts.margins.top - opts.margins.bottom;

	},

	/*
     * Fromatting funciton using the given decimals and seperator
     */
	_formatter: function(num, dec, sep) {

		let res;
		if (dec === 0) {

			res = `${Math.round(num)}`;

		} else {

			res = `${L.Util.formatNum(num, dec)}`;

		}
		const numbers = res.split(".");
		if (numbers[1]) {

			let d = dec - numbers[1].length;
			for (; d > 0; d--) {

				numbers[1] += "0";

			}
			res = numbers.join(sep || ".");

		}
		return res;

	},

	_appendYaxis: function(y) {

		const opts = this.options;

		if (opts.imperial) {

			y.attr("class", "y axis")
				.call(d3.svg.axis()
					.scale(this._y)
					.ticks(this.options.yTicks)
					.orient("left"))
				.append("text")
				.attr("x", -37)
				.attr("y", 3)
				.style("text-anchor", "end")
				.text("ft");

		} else {

			y.attr("class", "y axis")
				.call(d3.svg.axis()
					.scale(this._y)
					.ticks(this.options.yTicks)
					.orient("left"))
				.append("text")
				.attr("x", -45)
				.attr("y", 3)
				.style("text-anchor", "end")
				.text("m");

		}

	},

	_appendXaxis: function(x) {

		const opts = this.options;

		if (opts.imperial) {

			x.attr("class", "x axis")
				.attr("transform", `translate(0,${this._height()})`)
				.call(d3.svg.axis()
					.scale(this._x)
					.ticks(this.options.xTicks)
					.orient("bottom"))
				.append("text")
				.attr("x", this._width() + 10)
				.attr("y", 15)
				.style("text-anchor", "end")
				.text("mi");

		} else {

			x.attr("class", "x axis")
				.attr("transform", `translate(0,${this._height()})`)
				.call(d3.svg.axis()
					.scale(this._x)
					.ticks(this.options.xTicks)
					.orient("bottom"))
				.append("text")
				.attr("x", this._width() + 20)
				.attr("y", 15)
				.style("text-anchor", "end")
				.text("km");

		}

	},

	_updateAxis: function() {

		this._xaxisgraphicnode.selectAll("g").remove();
		this._xaxisgraphicnode.selectAll("path").remove();
		this._xaxisgraphicnode.selectAll("text").remove();
		this._yaxisgraphicnode.selectAll("g").remove();
		this._yaxisgraphicnode.selectAll("path").remove();
		this._yaxisgraphicnode.selectAll("text").remove();
		this._appendXaxis(this._xaxisgraphicnode);
		this._appendYaxis(this._yaxisgraphicnode);

	},

	_mouseoutHandler: function() {

		console.info("_mouseoutHandler");

		// this._hidePositionMarker();

	},

	/*
     * Hides the position-/heigth indication marker drawn onto the map
     */
	_hidePositionMarker: function() {

		if (this._marker) {

			this._map.removeLayer(this._marker);
			this._marker = null;

		}
		if (this._mouseHeightFocus) {

			this._mouseHeightFocus.style("visibility", "hidden");
			this._mouseHeightFocusLabel.style("visibility", "hidden");

		}
		if (this._pointG) {

			this._pointG.style("visibility", "hidden");

		}
		this._focusG.style("visibility", "hidden");

	},

	/*
     * Handles the moueseover the chart and displays distance and altitude level
     */
	_mousemoveHandler: function(d, i, ctx) {


		const _scope = this.options.scope;

		if (!this._data || this._data.length === 0) {

			return;

		}
		const coords = d3.mouse(this._background.node());
		const opts = this.options;

		const item = this._data[this._findItemForX(coords[0])],
			alt = item.altitude,
			dist = item.dist,
			ll = item.latlng,
			numY = opts.hoverNumber.formatter(alt, opts.hoverNumber.decimalsY),
			numX = opts.hoverNumber.formatter(dist, opts.hoverNumber.decimalsX);

		this._showDiagramIndicator(item, coords[0]);


		if (_scope == "Leaflet") {

			const layerpoint = this._map.latLngToLayerPoint(ll);

			//if we use a height indicator we create one with SVG
			//otherwise we show a marker
			if (opts.useHeightIndicator) {

				if (!this._mouseHeightFocus) {

					const heightG = d3.select(".leaflet-overlay-pane svg")
						.append("g");
					this._mouseHeightFocus = heightG.append("svg:line")
						.attr("class", `${opts.theme} height-focus line`)
						.attr("x2", 0)
						.attr("y2", 0)
						.attr("x1", 0)
						.attr("y1", 0);

					const pointG = this._pointG = heightG.append("g");
					pointG.append("svg:circle")
						.attr("r", 6)
						.attr("cx", 0)
						.attr("cy", 0)
						.attr("class", `${opts.theme} height-focus circle-lower`);

					this._mouseHeightFocusLabel = heightG.append("svg:text")
						.attr("class", `${opts.theme} height-focus-label`)
						.style("pointer-events", "none");

				}

				const normalizedAlt = this._height() / this._maxElevation * alt;
				const normalizedY = layerpoint.y - normalizedAlt;
				this._mouseHeightFocus.attr("x1", layerpoint.x)
					.attr("x2", layerpoint.x)
					.attr("y1", layerpoint.y)
					.attr("y2", normalizedY)
					.style("visibility", "visible");

				this._pointG.attr("transform", `translate(${layerpoint.x},${layerpoint.y})`)
					.style("visibility", "visible");

				if (opts.imperial) {

					this._mouseHeightFocusLabel.attr("x", layerpoint.x)
						.attr("y", normalizedY)
						.text(`${numY} ft`)
						.style("visibility", "visible");

				} else {

					this._mouseHeightFocusLabel.attr("x", layerpoint.x)
						.attr("y", normalizedY)
						.text(`${numY} m`)
						.style("visibility", "visible");

				}

			} else if (!this._marker) {

				this._marker = new L.circleMarker(ll, {fillColor: "red", color: "red"}).addTo(this._map);

			} else {

				this._marker.setLatLng(ll);

			}

		}

		if (_scope == "Cesium") {


			const _enti = viewer.entities.getById("tmp_point");
			if (_enti) {

				viewer.entities.remove(_enti);

			}

			/*
    viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(ll.lng, ll.lat),
		id:'tmp_point',
        point : {
            show : true, // default
            color : Cesium.Color.SKYBLUE, // default: WHITE
            pixelSize : 10, // default: 1
            outlineColor : Cesium.Color.YELLOW, // default: BLACK
            outlineWidth : 3 // default: 0
        }
    });

	*/

			/*
		   var pinBuilder = new Cesium.PinBuilder();
			viewer.entities.add({
				name : 'alt',
				id:'tmp_point',
				position : Cesium.Cartesian3.fromDegrees(ll.lng, ll.lat),

				billboard : {
					image : pinBuilder.fromText(alt.toFixed(0), Cesium.Color.GREEN, 40).toDataURL(),
					 heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM
				}
			});

		*/

			viewer.entities.add({
				position : Cesium.Cartesian3.fromDegrees(ll.lng, ll.lat),
				heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
				id:"tmp_point",
				/*
						label :{
							text : alt.toFixed(0)+' m',
							font : '16px sans-serif',
							horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
							pixelOffset : new Cesium.Cartesian2(0, 0),
							fillColor : Cesium.Color.LIME,
							outlineColor : Cesium.Color.BLACK,
							outlineWidth : 3,
							style : Cesium.LabelStyle.FILL_AND_OUTLINE,
							pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5)
						},
					*/
				billboard : {
					image : "/cesium/img/whiteShapes.png",
							  imageSubRegion : new Cesium.BoundingRectangle(61, 23, 18, 18),
					color : Cesium.Color.RED,
					heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
				}

			});


		}


	},

	/*
     * Parsing of GeoJSON data lines and their elevation in z-coordinate
     */
	_addGeoJSONData: function(coords) {

		const opts = this.options;


		if (coords) {

			const data = this._data || [];
			let dist = this._dist || 0;
			let ele = this._maxElevation || 0;
			for (let i = 0; i < coords.length; i++) {

				const s = new L.LatLng(coords[i][1], coords[i][0]);
				const e = new L.LatLng(coords[i ? i - 1 : 0][1], coords[i ? i - 1 : 0][0]);
				const newdist = opts.imperial ? s.distanceTo(e) * this.__mileFactor : s.distanceTo(e);
				dist = dist + Math.round(newdist / 1000 * 100000) / 100000;
				ele = ele < coords[i][2] ? coords[i][2] : ele;
				data.push({
					dist: dist,
					altitude: opts.imperial ? coords[i][2] * this.__footFactor : coords[i][2],
					x: coords[i][0],
					y: coords[i][1],
					latlng: s
				});
				//console.info(data);

			}
			this._dist = dist;
			this._data = data;
			ele = opts.imperial ? ele * this.__footFactor : ele;
			this._maxElevation = ele;

		}

	},

	/*
     * Parsing function for GPX data as used by https://github.com/mpetazzoni/leaflet-gpx
     */
	_addGPXdata: function(coords) {

		const opts = this.options;
		if (coords) {

			const data = this._data || [];
			let dist = this._dist || 0;
			let ele = this._maxElevation || 0;
			for (let i = 0; i < coords.length; i++) {

				const s = coords[i];
				const e = coords[i ? i - 1 : 0];
				const newdist = opts.imperial ? s.distanceTo(e) * this.__mileFactor : s.distanceTo(e);
				dist = dist + Math.round(newdist / 1000 * 100000) / 100000;
				ele = ele < s.meta.ele ? s.meta.ele : ele;
				data.push({
					dist: dist,
					altitude: opts.imperial ? s.meta.ele * this.__footFactor : s.meta.ele,
					x: s.lng,
					y: s.lat,
					latlng: s
				});

			}
			this._dist = dist;
			this._data = data;
			ele = opts.imperial ? ele * this.__footFactor : ele;
			this._maxElevation = ele;

		}

	},

	_addDataCesium1:function(coords) {

		const opts = this.options;


		if (coords) {

			const data = this._data || [];
			let dist = this._dist || 0;
			let ele = this._maxElevation || 0;
			for (let i = 0; i < coords.length; i++) {

				const s = new L.LatLng((coords[i].latitude * (180.0 / Math.PI)), (coords[i].longitude * (180.0 / Math.PI)));
				const e = new L.LatLng(coords[i ? i - 1 : 0].latitude * (180.0 / Math.PI), coords[i ? i - 1 : 0].longitude * (180.0 / Math.PI));
				const newdist = opts.imperial ? s.distanceTo(e) * this.__mileFactor : s.distanceTo(e);
				dist = dist + Math.round(newdist / 1000 * 100000) / 100000;
				ele = ele < coords[i].height ? coords[i].height : ele;
				data.push({
					dist: dist,
					altitude: opts.imperial ? coords[i].height * this.__footFactor : coords[i].height,
					x: (coords[i].longitude * (180.0 / Math.PI)),
					y: (coords[i].latitude * (180.0 / Math.PI)),
					latlng: s
				});
				//console.info(data);

			}
			this._dist = dist;
			this._data = data;
			ele = opts.imperial ? ele * this.__footFactor : ele;
			this._maxElevation = ele;

		}


	},

	_addData: function(d) {
        console.info(d);
		const geom = d && d.geometry && d.geometry;
		let i;

		if (geom) {

			switch (geom.type) {

			case "LineString":
				this._addGeoJSONData(geom.coordinates);
				break;

			case "MultiLineString":
				for (i = 0; i < geom.coordinates.length; i++) {

					this._addGeoJSONData(geom.coordinates[i]);

				}
				break;

			default:
				throw new Error("Invalid GeoJSON object.");

			}

		}

		const feat = d && d.type === "FeatureCollection";
		if (feat) {
console.info(feat);
			for (i = 0; i < d.features.length; i++) {

				this._addData(d.features[i]);

			}

		}

		if (d && d._latlngs) {

			this._addGPXdata(d._latlngs);

		}

	},

	/*
     * Calculates the full extent of the data array
     */
	_calculateFullExtent: function(data) {

		if (!data || data.length < 1) {

			throw new Error("no data in parameters");

		}

		const ext = new L.latLngBounds(data[0].latlng, data[0].latlng);

		data.forEach((item) => {

			ext.extend(item.latlng);

		});

		return ext;

	},

	/*
     * Add data to the diagram either from GPX or GeoJSON and
     * update the axis domain and data
     */
	addData: function(d, layer) {


		this._addData(d);
		if (this._container) {

			this._applyData();

		}
		if (layer === null && d.on) {

			layer = d;

		}
		if (layer) {

			layer.on("mousemove", this._handleLayerMouseOver.bind(this));

		}


	},


	addDataCesium: function(d) {

		try {

            this._addData(d);
            
            console.info("this.containes",this._container );
			if (this._container) {

				this._applyData();

			}
			$("#elevation-div").show();

		} catch (Err) {

            console.info("error",Err)
			Error("Invalid GeoJSON object.");

		}
		/*
        if (layer === null && d.on) {
            layer = d;
        }
        if (layer) {
            layer.on("mousemove", this._handleLayerMouseOver.bind(this));
        }
		*/

	},

	/*
     * Handles mouseover events of the data layers on the map.
     */
	_handleLayerMouseOver: function(evt) {

		if (!this._data || this._data.length === 0) {

			return;

		}
		const latlng = evt.latlng;
		const item = this._findItemForLatLng(latlng);
		if (item) {

			const x = item.xDiagCoord;
			this._showDiagramIndicator(item, x);

		}

	},

	_showDiagramIndicator: function(item, xCoordinate) {

		const opts = this.options;
		this._focusG.style("visibility", "visible");
		this._mousefocus.attr("x1", xCoordinate)
			.attr("y1", 0)
			.attr("x2", xCoordinate)
			.attr("y2", this._height())
			.classed("hidden", false);

		const alt = item.altitude,
			dist = item.dist,
			ll = item.latlng,
			numY = opts.hoverNumber.formatter(alt, opts.hoverNumber.decimalsY),
			numX = opts.hoverNumber.formatter(dist, opts.hoverNumber.decimalsX);

		if (opts.imperial) {

			this._focuslabelX.attr("x", xCoordinate)
				.text(`${numY} ft`);
			this._focuslabelY.attr("y", this._height() - 5)
				.attr("x", xCoordinate)
				.text(`${numX} mi`);

		} else {

			this._focuslabelX.attr("x", xCoordinate)
				.text(`${numY} m`);
			this._focuslabelY.attr("y", this._height() - 5)
				.attr("x", xCoordinate)
				.text(`${numX} km`);

		}

	},

	_applyData: function() {

        console.info(this._data);
		const xdomain = d3.extent(this._data, (d) => {

			return d.dist;

		});
		const ydomain = d3.extent(this._data, (d) => {

			return d.altitude;

		});
		const opts = this.options;

		if (opts.yAxisMin !== undefined && (opts.yAxisMin < ydomain[0] || opts.forceAxisBounds)) {

			ydomain[0] = opts.yAxisMin;

		}
		if (opts.yAxisMax !== undefined && (opts.yAxisMax > ydomain[1] || opts.forceAxisBounds)) {

			ydomain[1] = opts.yAxisMax;

		}

        console.info(this._x);
        
		this._x.domain(xdomain);
		this._y.domain(ydomain);
		this._areapath.datum(this._data)
			.attr("d", this._area);
		this._updateAxis();

		this._fullExtent = this._calculateFullExtent(this._data);

	},

	/*
     * Reset data
     */
	_clearData: function() {

		this._data = null;
		this._dist = null;
		this._maxElevation = null;

		if (this._marker && this._marker._map) {

			this._marker._map.removeLayer(this._marker);
			this._marker = null;

		}

	},

	/*
     * Reset data and display
     */
	clear: function() {

		this._clearData();

		if (!this._areapath) {

			return;

		}

		// workaround for 'Error: Problem parsing d=""' in Webkit when empty data
		// https://groups.google.com/d/msg/d3-js/7rFxpXKXFhI/HzIO_NPeDuMJ
		//this._areapath.datum(this._data).attr("d", this._area);
		this._areapath.attr("d", "M0 0");

		this._x.domain([0, 1]);
		this._y.domain([0, 1]);
		this._updateAxis();

	},
	hide: function() {

		this._container.style.display = "none";

	},
	show: function() {

		this._container.style.display = "block";

	}

});

L.control.elevation = function(options) {

	return new L.Control.Elevation(options);

};
