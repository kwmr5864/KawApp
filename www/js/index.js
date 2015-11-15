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
    self.word = '';
    var storage = getStorage();
    self.index = getStorageIndex();
    self.words = getStorageWords();
    self.clear = function() {
        self.word = '';
    }
    self.add = function() {
        if (self.word != '') {
            self.words.push({id: self.index, value: self.word});
            self.index++;
            updateStorageWords();
            updateStorageIndex();
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
        updateStorageWords();
    }
    self.clear = function() {
        self.words = [];
        self.index = 1;
        storage = {};
        localStorage.clear();
    }
    self.upIndex = function(id) {
        for (var i in self.words) {
            var word = self.words[i];
            if (word.id == id && 0 < i) {
                self.words[i] = self.words[i - 1];
                self.words[i - 1] = word;
                updateStorageWords();
                break;
            }
        }
    }
    self.downIndex = function(id) {
        for (var i in self.words) {
            var word = self.words[i];
            if (word.id == id && i < self.words.length - 1) {
                self.words[i] = self.words[i - 0 + 1];
                self.words[i - 0 + 1] = word;
                updateStorageWords();
                break;
            }
        }
    }
    function getStorage() {
        var data = localStorage.getItem(self.title);
        return data != null ? JSON.parse(data) : {};
    }
    function updateStorage() {
        localStorage.setItem(self.title, JSON.stringify(storage, function(key, val) {
            if (key == '$$hashKey') {
               return undefined;
            }
            return val;
        }));
        storage = getStorage();
    }
    function getStorageIndex() {
        var index = storage['index'];
        return index != null ? index : 1;
    }
    function getStorageWords() {
        var words = storage['words'];
        return words != null ? words : [];
    }
    function updateStorageIndex() {
        storage['index'] = self.index;
        updateStorage();
    }
    function updateStorageWords() {
        storage['words'] = self.words;
        updateStorage();
    }
});