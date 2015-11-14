/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = angular.module('app', []);

app.controller('MainCtrl', function() {
    var self = this;
    self.title = 'KawApp';
    self.index = 1;
    self.word = '';
    self.words = [];
    self.clear = function() {
        self.word = '';
    }
    self.add = function() {
        if (self.word != '') {
            self.words.push({id: self.index, value: self.word});
            self.index++;
            self.word = '';
        }
    }
    self.remove = function(id) {
        var words = [];
        for (var i in self.words) {
            var word = self.words[i];
            if (word.id != id) {
                words.push(word)
            }
        }
        self.words = words;
    }
});