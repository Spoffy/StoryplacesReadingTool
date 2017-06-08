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
import {BaseCollection} from "./BaseCollection";
import {BaseCondition} from "../models/conditions/BaseCondition";
import {TypeFactory} from "../factories/TypeFactory";
import {ComparisonCondition} from "../models/conditions/ComparisonCondition";
import {inject} from "aurelia-framework";
import {CheckCondition} from "../models/conditions/CheckCondition";
import {LocationCondition} from "../models/conditions/LocationCondition";
import {LogicalCondition} from "../models/conditions/LogicalCondition";
import {TimePassedCondition} from "../models/conditions/TimePassedCondition";
import {TimeRangeCondition} from "../models/conditions/TimeRangeCondition";
import {TrueCondition} from "../models/conditions/boolean/TrueCondition";
import {FalseCondition} from "../models/conditions/boolean/FalseCondition";
import {OtherCondition} from "../models/conditions/OtherCondition";

@inject(
    TypeFactory.withMapping({
        'comparison': ComparisonCondition,
        'check': CheckCondition,
        'location': LocationCondition,
        'logical': LogicalCondition,
        'timepassed': TimePassedCondition,
        'timerange': TimeRangeCondition,
        'true' : TrueCondition,
        'false': FalseCondition,
        'other': OtherCondition
    })
)
export class ConditionCollection extends BaseCollection<BaseCondition> {

    constructor(private conditionFactory: (any?) => BaseCondition, data?: any[]) {
        super();

        if (data && Array.isArray(data)) {
            this.saveMany(data);
        }
    }

    protected itemFromObject(item: any): BaseCondition {
        if (item instanceof BaseCondition) {
            return item as BaseCondition;
        }

        return this.conditionFactory(item);
    }
}
