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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

   
// document.getElementById("clickMe").onclick = mapLocation;
document.addEventListener("offline",this.onOffline, false);
// document.addEventListener('online',this.onOnline,false);
// document.addEventListener('click',this.onclick,false);
document.addEventListener('deviceready', onDeviceReady, false);


// function onOnline(){ 
    
//     // mapLocation();
// }
function onOffline(){
    alert("沒有網路...\n必須連接網路才能取得最新資料");
}
function onDeviceReady() {
    
    // $('#map').click(function() {
    //     location.reload();
    // });
    // mapLocation();
    cordova.plugin.http.setServerTrustMode('nocheck', function() {//ignore ssl
        // alert('success!');        
    }, function() {
        alert('error :(');
    });
    var url = 'https://www.hms.gov.taipei/api/BigData/project';
    cordova.plugin.http.sendRequest(url, {method: 'get'}, function(response) { 
        var JSONobj =JSON.parse(response.data);
        let params  = new URLSearchParams(window.location.search);
        let i = parseInt(params.get("num")); 
        $("#data").append(
            "<p>住宅名稱:&emsp;"+JSONobj[i]["name"]+"</p>"+
            "<p>區域:&emsp;"+JSONobj[i]["distict"]+"</p>"+
            "<p>地址:&emsp;"+JSONobj[i]["address"]+"</p>"+
            "<p>規劃戶數:&emsp;"+JSONobj[i]["houseHolds"]+"</p>"+
            "<p>居住人口:&emsp;"+JSONobj[i]["persons"]+"</p>"+
            "<p>樓層數:&emsp;"+JSONobj[i]["floors"]+"</p>"+
            "<p>階段:&emsp;"+JSONobj[i]["progress"]+"</p>"
        );
        var map = L.map('map').setView([JSONobj[i]["lat"],JSONobj[i]["lng"]], 15);
        // $("#map").trigger( "create" );
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        var marker = L.marker([JSONobj[i]["lat"],JSONobj[i]["lng"]]).addTo(map);
        marker.bindPopup(JSONobj[i]["name"]).openPopup();
    }, function(response) {//error
        alert(JSON.stringify(response.status));
        //prints Permission denied
        alert(JSON.stringify(response.error));
        // alert(JSON.stringify(response));
    });
}


function mapLocation(){
    cordova.plugin.http.setServerTrustMode('nocheck', function() {//ignore ssl
        // alert('success!');        
    }, function() {
        alert('error :(');
    });
    var url = 'https://www.hms.gov.taipei/api/BigData/project';
    cordova.plugin.http.sendRequest(url, {method: 'get'}, function(response) { 
        var JSONobj =JSON.parse(response.data);
        let params  = new URLSearchParams(window.location.search);
        let i = parseInt(params.get("num")); 
        $("#data").append(
            "<p>住宅名稱:&emsp;"+JSONobj[i]["name"]+"</p>"+
            "<p>區域:&emsp;"+JSONobj[i]["distict"]+"</p>"+
            "<p>地址:&emsp;"+JSONobj[i]["address"]+"</p>"+
            "<p>規劃戶數:&emsp;"+JSONobj[i]["houseHolds"]+"</p>"+
            "<p>居住人口:&emsp;"+JSONobj[i]["persons"]+"</p>"+
            "<p>樓層數:&emsp;"+JSONobj[i]["floors"]+"</p>"+
            "<p>階段:&emsp;"+JSONobj[i]["progress"]+"</p>"
        );
        var map = L.map('map').setView([JSONobj[i]["lat"],JSONobj[i]["lng"]], 12);
        // $("#map").trigger( "create" );
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }, function(response) {//error
        alert(JSON.stringify(response.status));
        //prints Permission denied
        alert(JSON.stringify(response.error));
        // alert(JSON.stringify(response));
    });
}

