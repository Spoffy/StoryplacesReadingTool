import {MapControlInterface} from "../../../src/resources/mapping/interfaces/MapControlInterface";
import {MapLayerInterface} from "../../../src/resources/mapping/interfaces/MapLayerInterface";
import {LocationInformation} from "../../../src/resources/gps/LocationInformation";
import {BindingEngine, Container} from "aurelia-framework";
import {MapMapLayer} from "../../../src/resources/map/layers/MapMapLayer";
import {LocationManager, LocationSource} from "../../../src/resources/gps/LocationManager";
import {CurrentMapLocation} from "../../../src/resources/map/CurrentMapLocation";
import {CurrentLocationMarker} from "../../../src/resources/map/markers/CurrentLocationMarker";
import {RecenterControl} from "../../../src/resources/map/controls/RecenterControl";
import {MapManager} from "../../../src/resources/map/MapManager";


/*******************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) $today.year
 University of Southampton
 Charlie Hargood, cah07r.ecs.soton.ac.uk
 Kevin Puplett, k.e.puplett.soton.ac.uk
 David Pepper, d.pepper.soton.ac.uk

 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * The name of the University of Southampton nor the name of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE ABOVE COPYRIGHT HOLDERS BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


describe("MapManager", () => {


    describe("method attach", () => {
        it("attaches the mapcore to the passed map element", () => {
            spyOn(mapCore, 'attachTo');

            mapManager.attach(element);

            expect(mapCore.attachTo).toHaveBeenCalledWith(element);
        });

        it("attaches the base layer to mapcore", () => {
            spyOn(mapCore, 'addItem');

            mapManager.attach(element);

            expect(mapCore.addItem).toHaveBeenCalledWith(baseLayer);
        });

        it("attaches the current location marker to mapcore", () => {
            spyOn(mapCore, 'addItem');

            mapManager.attach(element);

            expect(mapCore.addItem).toHaveBeenCalledWith(currentLocationMarker);
        });

        it("attaches the recenter control to mapcore and immediately disables it", (done) => {
            spyOn(mapCore, 'addControl').and.callThrough();
            spyOn(recenterControl, 'disable');

            mapManager.attach(element);

            expect(mapCore.addControl).toHaveBeenCalledWith(recenterControl);
            window.setTimeout(() => {
                expect(recenterControl.disable).toHaveBeenCalled();
                done();
            }, 1);
        });

        it("adds the event listeners to mapCore", () => {
            spyOn(mapCore, 'addEvent');

            mapManager.attach(element);

            expect(mapCore.addEvent).toHaveBeenCalledWith('moveend', jasmine.any(Function));
            expect(mapCore.addEvent).toHaveBeenCalledWith('move', jasmine.any(Function));
            expect(mapCore.addEvent).toHaveBeenCalledWith('dblclick', jasmine.any(Function));
            expect(mapCore.addEvent).toHaveBeenCalledWith('dragstart', jasmine.any(Function));
            expect(mapCore.addEvent).toHaveBeenCalledWith('zoomstart', jasmine.any(Function));
            expect(mapCore.addEvent).toHaveBeenCalledWith('recenter-control-click', jasmine.any(Function));
        });

        it("will recenter the map to the current location in GPS mode", () => {
            userLocation.source = LocationSource.GPS;
            userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};

            spyOn(mapCore, 'panTo');

            mapManager.attach(element);

            expect(mapCore.panTo).toHaveBeenCalledWith({lat: 123, lng: 456});
        });

        it("will recenter the map to the current location in Map mode", () => {
            userLocation.source = LocationSource.Map;
            userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};

            spyOn(mapCore, 'panTo');

            mapManager.attach(element);

            expect(mapCore.panTo).toHaveBeenCalledWith({lat: 123, lng: 456});
        });

        it("will move the current location marker to the current location in GPS mode", (done) => {
            userLocation.source = LocationSource.GPS;
            userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};

            mapManager.attach(element);

            window.setTimeout(() => {
                expect(currentLocationMarker.location.latitude).toEqual(123);
                expect(currentLocationMarker.location.longitude).toEqual(456);
                expect(currentLocationMarker.location.heading).toBeUndefined();
                expect(currentLocationMarker.location.accuracy).toBeUndefined();
                done();
            }, 1);
        });

        it("will move the current location marker to the current location in Map mode", (done) => {
            userLocation.source = LocationSource.Map;
            userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};

            mapManager.attach(element);

            window.setTimeout(() => {
                expect(currentLocationMarker.location.latitude).toEqual(123);
                expect(currentLocationMarker.location.longitude).toEqual(456);
                expect(currentLocationMarker.location.heading).toBeUndefined();
                expect(currentLocationMarker.location.accuracy).toBeUndefined();
                done();
            }, 1);
        });
    });

    describe("method detach", () => {
        it("detaches from mapcore", () => {
            spyOn(mapCore, 'detach');

            mapManager.detach();

            expect(mapCore.detach).toHaveBeenCalled()
        });

        it("detaches the base layer from mapcore", () => {
            spyOn(mapCore, 'removeItem');

            mapManager.detach();

            expect(mapCore.removeItem).toHaveBeenCalledWith(baseLayer);
        });

        it("attaches the current location marker to mapcore", () => {
            spyOn(mapCore, 'removeItem');

            mapManager.detach();

            expect(mapCore.removeItem).toHaveBeenCalledWith(currentLocationMarker);
        });

        it("detaches the recenter control from mapcore", () => {
            spyOn(mapCore, 'removeControl');

            mapManager.detach();

            expect(mapCore.removeControl).toHaveBeenCalledWith(recenterControl);

        });

        it("removes the event listeners from mapCore", () => {
            spyOn(mapCore, 'removeEvent');

            mapManager.detach();

            expect(mapCore.removeEvent).toHaveBeenCalledWith('moveend');
            expect(mapCore.removeEvent).toHaveBeenCalledWith('move');
            expect(mapCore.removeEvent).toHaveBeenCalledWith('dblclick');
            expect(mapCore.removeEvent).toHaveBeenCalledWith('dragstart');
            expect(mapCore.removeEvent).toHaveBeenCalledWith('zoomstart');
            expect(mapCore.removeEvent).toHaveBeenCalledWith('recenter-control-click');
        });
    });

    describe("map", () => {
        describe("when the user location (from location manager) changes", () => {
            describe("in GPS mode", () => {

                beforeEach(() => {
                    userLocation.source = LocationSource.GPS;
                    mapManager.attach(element);
                });

                it("will update the location of the current location marker while tracking the users location", (done) => {
                    clickRecenterControl();

                    userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};

                    window.setTimeout(() => {
                        expect(currentLocationMarker.location.latitude).toEqual(123);
                        expect(currentLocationMarker.location.longitude).toEqual(456);
                        expect(currentLocationMarker.location.heading).toBeUndefined();
                        expect(currentLocationMarker.location.accuracy).toBeUndefined();
                        done();
                    }, 1);
                });

                it("will update the location of the current location marker while the map is not in user tracking mode (ie being dragged)", (done) => {
                    dragMap(); // This will stop the current user's location being tracked

                    userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};

                    window.setTimeout(() => {
                        expect(currentLocationMarker.location.latitude).toEqual(123);
                        expect(currentLocationMarker.location.longitude).toEqual(456);
                        expect(currentLocationMarker.location.heading).toBeUndefined();
                        expect(currentLocationMarker.location.accuracy).toBeUndefined();
                        done();
                    }, 1);
                });

                it("will recenter the map while tracking the users location", (done) => {
                    clickRecenterControl();

                    spyOn(mapCore, 'panTo');
                    userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};

                    window.setTimeout(() => {
                        expect(mapCore.panTo).toHaveBeenCalledWith({lat: 123, lng: 456});
                        done();
                    }, 1);
                });

                it("will not recenter the map while not tracking the users location (ie map dragged)", (done) => {
                    dragMap();

                    spyOn(mapCore, 'panTo');
                    userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};

                    window.setTimeout(() => {
                        expect(mapCore.panTo).not.toHaveBeenCalled();
                        done();
                    }, 1);
                });
            });

            describe("in Map mode", () => {
                beforeEach(() => {
                    userLocation.source = LocationSource.Map;
                    mapManager.attach(element);
                });

                it("will update the location of the current location marker", (done) => {
                    userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};

                    window.setTimeout(() => {
                        expect(currentLocationMarker.location.latitude).toEqual(123);
                        expect(currentLocationMarker.location.longitude).toEqual(456);
                        expect(currentLocationMarker.location.heading).toBeUndefined();
                        expect(currentLocationMarker.location.accuracy).toBeUndefined();
                        done();
                    }, 1);
                });
            });
        });

        describe("when dragged", () => {
            let eventPayload = {
                target: {
                    getCenter: function () {
                        return {lat: 123, lng: 456}
                    }
                }
            };

            it("will update the map location object when the dragging ends", (done) => {
                userLocation.source = LocationSource.Map;
                mapManager.attach(element);

                moveMapEnd(eventPayload);

                window.setTimeout(() => {
                    expect(mapLocation.location.latitude).toEqual(123);
                    expect(mapLocation.location.longitude).toEqual(456);
                    expect(mapLocation.location.heading).toBeUndefined();
                    expect(mapLocation.location.accuracy).toBeUndefined();
                    done();
                }, 1);
            });

            it("will update the current location marker while being dragged", (done) => {
                userLocation.source = LocationSource.Map;
                mapManager.attach(element);

                moveMap(eventPayload);

                window.setTimeout(() => {
                    expect(currentLocationMarker.location.latitude).toEqual(123);
                    expect(currentLocationMarker.location.longitude).toEqual(456);
                    expect(currentLocationMarker.location.heading).toBeUndefined();
                    expect(currentLocationMarker.location.accuracy).toBeUndefined();
                    done();
                }, 1);
            });
        });

        describe("when the recenter control is clicked", () => {
            beforeEach(() => {
                userLocation.source = LocationSource.GPS;
                mapManager.attach(element);
            });

            it("will recenter the map", (done) => {
                dragMap();

                userLocation.location = {latitude: 123, longitude: 456, heading: undefined, accuracy: undefined};
                spyOn(mapCore, 'panTo');

                clickRecenterControl();

                window.setTimeout(() => {
                    expect(mapCore.panTo).toHaveBeenCalledWith({lat: 123, lng: 456});
                    done();
                }, 1);
            });

            it("will disable the recenter control", (done) => {
                dragMap();

                spyOn(recenterControl, 'disable');

                clickRecenterControl();

                window.setTimeout(() => {
                    expect(recenterControl.disable).toHaveBeenCalled();
                    done();
                }, 1);
            });
        });

        describe("when moved", () => {
            describe("in GPS mode will enable the recenter control", () => {
                beforeEach(() => {
                    userLocation.source = LocationSource.GPS;
                    mapManager.attach(element);
                    clickRecenterControl();
                });

                it("(drag)", (done) => {
                    spyOn(recenterControl, 'enable');
                    dragMap();

                    window.setTimeout(() => {
                        expect(recenterControl.enable).toHaveBeenCalled();
                        done();
                    }, 1);
                });

                it("(zoom)", (done) => {
                    spyOn(recenterControl, 'enable');
                    zoomMap();

                    window.setTimeout(() => {
                        expect(recenterControl.enable).toHaveBeenCalled();
                        done();
                    }, 1);
                });

                it("(double click)", (done) => {
                    spyOn(recenterControl, 'enable');
                    doubleClickMap();

                    window.setTimeout(() => {
                        expect(recenterControl.enable).toHaveBeenCalled();
                        done();
                    }, 1);
                });
            });

            describe("in Map mode will not enable the recenter control", () => {
                beforeEach(() => {
                    userLocation.source = LocationSource.Map;
                    mapManager.attach(element);
                    clickRecenterControl();
                });

                it("(drag)", (done) => {
                    spyOn(recenterControl, 'enable');
                    dragMap();

                    window.setTimeout(() => {
                        expect(recenterControl.enable).not.toHaveBeenCalled();
                        done();
                    }, 1);
                });

                it("(zoom)", (done) => {
                    spyOn(recenterControl, 'enable');
                    zoomMap();

                    window.setTimeout(() => {
                        expect(recenterControl.enable).not.toHaveBeenCalled();
                        done();
                    }, 1);
                });

                it("(double click)", (done) => {
                    spyOn(recenterControl, 'enable');
                    doubleClickMap();

                    window.setTimeout(() => {
                        expect(recenterControl.enable).not.toHaveBeenCalled();
                        done();
                    }, 1);
                });
            });
        });
    });

    /*
     * Setup, mocks and helpers below here
     */

    let container = new Container().makeGlobal();
    let bindingEngine = resolve(BindingEngine);
    let mapCore: MockMapCore;
    let baseLayer: MapMapLayer;
    let userLocation: LocationManager;
    let mapLocation: CurrentMapLocation;
    let currentLocationMarker: CurrentLocationMarker;
    let recenterControl: RecenterControl;
    let mapManager: MapManager;
    let element: HTMLElement;


    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    function clickRecenterControl() {
        mapCore.fireEvent('recenter-control-click');
    }

    function dragMap() {
        mapCore.fireEvent('dragstart');
    }

    function zoomMap() {
        mapCore.fireEvent('zoomstart');
    }

    function doubleClickMap() {
        mapCore.fireEvent('dblclick');
    }

    function moveMap(event) {
        mapCore.fireEvent('move', event);
    }

    function moveMapEnd(event) {
        mapCore.fireEvent('moveend', event);
    }

    class MockRecenterControl implements MapControlInterface {
        leafletControl: L.Control;

        disable() {
        }

        enable() {
        }
    }

    class MockMapLayer implements MapLayerInterface {
        leafletLayer: L.Layer;

        destroy() {
        }
    }

    class MockCurrentLocationMarker implements MapLayerInterface {
        leafletLayer: L.Layer;

        destroy() {
        }

        location: LocationInformation = {longitude: 0, latitude: 0, heading: 0, accuracy: 0};
    }

    class MockMapCore {
        events: Map<string, Function> = new Map<string, Function>();

        addEvent(event: string, callback: Function): Promise<null> {
            this.events.set(event, callback);
            return Promise.resolve()
        }

        removeEvent(event: string): Promise<null> {
            return Promise.resolve();
        }

        addItem(item: MapLayerInterface): Promise<null> {
            return Promise.resolve()
        }

        removeItem(item: MapLayerInterface): Promise<null> {
            return Promise.resolve()
        }

        addControl(control: MapControlInterface): Promise<null> {
            return Promise.resolve()
        }

        removeControl(control: MapControlInterface): Promise<null> {
            return Promise.resolve()
        }

        attachTo(element: HTMLElement): Promise<null> {
            return Promise.resolve()
        }

        detach(): Promise<null> {
            return Promise.resolve()
        }

        panTo(location: LocationInformation) {
        }

        fireEvent(event: string, payload?: any) {
            this.events.get(event)(payload);
        }
    }

    class MockLocationManager {
        location: LocationInformation = {latitude: 1, longitude: 1, heading: 0, accuracy: 0};
        source: LocationSource = LocationSource.GPS;
    }

    class MockLocation {
        location: LocationInformation = {latitude: 1, longitude: 1, heading: 0, accuracy: 0};
    }

    beforeEach(() => {
        mapCore = new MockMapCore() as any;
        baseLayer = new MockMapLayer() as MapMapLayer;
        userLocation = new MockLocationManager() as LocationManager;
        mapLocation = new MockLocation() as CurrentMapLocation;
        currentLocationMarker = new MockCurrentLocationMarker() as CurrentLocationMarker;
        recenterControl = new MockRecenterControl() as RecenterControl;
        mapManager = new MapManager(bindingEngine, mapCore as any, baseLayer, userLocation, mapLocation, currentLocationMarker, recenterControl);
        element = document.createElement("div");
    });

});