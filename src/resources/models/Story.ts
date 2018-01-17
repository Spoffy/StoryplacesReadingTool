/*******************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) 2016
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
import {PageCollection} from "../collections/PageCollection";
import {PagesMapViewSettings} from "./PagesMapViewSettings";
import {StoryOptions} from "./StoryOptions";
import {Factory, inject} from "aurelia-framework";
import {BaseModel} from "./BaseModel";
import {TypeChecker} from "../utilities/TypeChecker";
import {LocationCollection} from "../collections/LocationCollection";
import {FunctionCollection} from "../collections/FunctionCollection";
import {ConditionCollection} from "../collections/ConditionCollection";
import {RoleCollection} from "../collections/RoleCollection";
import {StateCollection} from "../collections/StateCollection";

@inject(
    Factory.of(PageCollection),
    Factory.of(RoleCollection),
    Factory.of(PagesMapViewSettings),
    Factory.of(LocationCollection),
    Factory.of(FunctionCollection),
    Factory.of(ConditionCollection),
    Factory.of(StoryOptions),
    Factory.of(StateCollection),
    TypeChecker
)
export class Story extends BaseModel {

    private _author: string;
    private _name: string;
    private _description: string;
    private _pages: PageCollection;
    private _roles: RoleCollection;
    private _cachedMediaIds: Array<string>;
    private _conditions: ConditionCollection;
    private _functions: FunctionCollection;
    private _tags: Array<string>;
    private _pagesMapViewSettings: PagesMapViewSettings;
    private _audience: string;
    private _locations: LocationCollection;
    private _publishState: string;
    private _storyOptions: StoryOptions;
    private _globalStates: StateCollection;

    constructor(private roleCollectionFactory: (any?) => RoleCollection,
                private pageCollectionFactory: (any?) => PageCollection,
                private pagesMapViewSettingsFactory: (any?) => PagesMapViewSettings,
                private locationCollectionFactory: (any?) => LocationCollection,
                private functionCollectionFactory: (any?) => FunctionCollection,
                private conditionCollectionFactory: (any?) => ConditionCollection,
                private storyOptionsFactory: (any?) => StoryOptions,
                private stateCollectionFactory: (any?) => StateCollection,
                typeChecker: TypeChecker,
                data?: any) {
        super(typeChecker);
        this.fromObject(data);
    }

    public fromObject(data = {
        id: undefined,
        name: undefined,
        pages: undefined,
        roles: undefined,
        cachedMediaIds: undefined,
        conditions: undefined,
        pagesMapViewSettings: undefined,
        functions: undefined,
        tags: undefined,
        author: undefined,
        description: undefined,
        audience: undefined,
        locations: undefined,
        publishState: undefined,
        storyOptions: undefined,
        globalStates: undefined
    }) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.author = data.author;
        this.cachedMediaIds = data.cachedMediaIds;
        this.conditions = this.conditionCollectionFactory(data.conditions);
        this.description = data.description;
        this.functions = this.functionCollectionFactory(data.functions);
        this.pages = this.pageCollectionFactory(data.pages);
        this.pagesMapViewSettings = this.pagesMapViewSettingsFactory(data.pagesMapViewSettings);
        this.name = data.name;
        this.tags = data.tags;
        this.audience = data.audience;
        this.locations = this.locationCollectionFactory(data.locations);
        this.publishState = data.publishState;
        this.storyOptions = this.storyOptionsFactory(data.storyOptions);
        this.roles = this.roleCollectionFactory(data.roles);
        this.globalStates = this.stateCollectionFactory(data.globalStates);
    }

    public toJSON() {
        return {
            id: this.id,
            author: this.author,
            cachedMediaIds: this.cachedMediaIds,
            conditions: this.conditions,
            description: this.description,
            functions: this.functions,
            pages: this.pages,
            pagesMapViewSettings: this.pagesMapViewSettings,
            name: this.name,
            tags: this.tags,
            audience: this.audience,
            locations: this.locations,
            publishState: this.publishState,
            storyOptions: this.storyOptions,
            roles: this.roles,
            globalStates: this.globalStates
        }
    }

    get audience(): string {
        return this._audience;
    }

    set audience(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Audience", value);
        this._audience = value;
    }

    get publishState(): string {
        return this._publishState;
    }

    set publishState(value: string) {
        this.typeChecker.validateAsStringOrUndefined("PublishState", value);
        this._publishState = value;
    }

    get author(): string {
        return this._author;
    }

    set author(author: string) {
        this.typeChecker.validateAsStringOrUndefined('Author', author);
        this._author = author;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this.typeChecker.validateAsStringOrUndefined('Name', name);
        this._name = name;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this.typeChecker.validateAsStringOrUndefined('Description', description);
        this._description = description;
    }

    get pagesMapViewSettings(): PagesMapViewSettings {
        return this._pagesMapViewSettings;
    }

    set pagesMapViewSettings(pagesMapViewSettings) {
        this.typeChecker.validateAsObjectOrUndefined("PagesMapViewSettings", pagesMapViewSettings, "PagesMapViewSettings", PagesMapViewSettings);
        this._pagesMapViewSettings = pagesMapViewSettings
    }

    get storyOptions(): StoryOptions {
        return this._storyOptions;
    }

    set storyOptions(storyOptions) {
        this.typeChecker.validateAsObjectOrUndefined("StoryOptions", storyOptions, "StoryOptions", StoryOptions);
        this._storyOptions = storyOptions
    }

    get pages(): PageCollection {
        return this._pages;
    }

    set pages(pages: PageCollection) {
        this.typeChecker.validateAsObjectOrUndefined("Pages", pages, "PageCollection", PageCollection);
        this._pages = pages;
    }

    get tags(): Array<string> {
        return this._tags;
    }

    set tags(value: Array<string>) {
        this._tags = value;
    }

    get functions(): any {
        return this._functions;
    }

    set functions(value: any) {
        this.typeChecker.validateAsObjectOrUndefined("Functions", value, "FunctionCollection", FunctionCollection);
        this._functions = value;
    }

    get conditions(): any {
        return this._conditions;
    }

    set conditions(value: any) {
        this.typeChecker.validateAsObjectOrUndefined("Conditions", value, "ConditionCollection", ConditionCollection);
        this._conditions = value;
    }

    get cachedMediaIds(): Array<string> {
        return this._cachedMediaIds;
    }

    set cachedMediaIds(value: Array<string>) {
        this.typeChecker.isUndefinedOrArrayOf("CachedMediaIds", value, "string");
        this._cachedMediaIds = value;
    }

    get locations(): LocationCollection {
        return this._locations;
    }

    set locations(value: LocationCollection) {
        this.typeChecker.validateAsObjectOrUndefined("Locations", value, "LocationCollection", LocationCollection);
        this._locations = value;
    }

    get roles(): RoleCollection {
      return this._roles;
    }

    set roles(value: RoleCollection) {
        this.typeChecker.validateAsObjectOrUndefined("Roles", value, "RoleCollection", RoleCollection);
        this._roles = value;
    }

    get globalStates(): StateCollection {
      return this._globalStates;
    }

    set globalStates(value: StateCollection) {
      this.typeChecker.validateAsObjectOrUndefined("GlobalStates", value, "StateCollection", StateCollection);
      this._globalStates = value;
    }

}
