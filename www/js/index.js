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

   
document.addEventListener("offline",this.onOffline, false);
// document.addEventListener('online',this.onOnline,false);
// document.addEventListener('click',this.onclick,false);
document.addEventListener('deviceready', onDeviceReady, false);

function getListData(){
    cordova.plugin.http.setServerTrustMode('nocheck', function() {//ignore ssl
        // alert('success!');        
    }, function() {
        alert('error :(');
    });
    var JSONobj;
    var url = 'https://www.hms.gov.taipei/api/BigData/project';
    cordova.plugin.http.sendRequest(url, {method: 'get'}, function(response) {                  
        $("#hList").empty();
        JSONobj=JSON.parse(response.data);
        var okHouses=0;
        var notOkHouse=0;
        var houseHolds=0;
        var noHouseHolds=0;
        var livePeople=0;
        for(var i in JSONobj){  
            // alert(JSONobj[i]["name"]);
            if(JSONobj[i]["progress"]=="已完工"){
                okHouses++;
                livePeople+=parseInt(JSONobj[i]["persons"]);
                houseHolds+=parseInt(JSONobj[i]["houseHolds"]);
                $("#hList").append(
                    "<li class=\"listnum\">"+
                        "<div class=\"ui-block-a\" width=\"20%\">"+
                            "<img src=\"img/house_color.png\" height=\"25\""+
                        "</div>"+    
                        "<a href='detailPage.html?num="+i+"'>"+ JSONobj[i]["name"]+"</a>"+
                    "</li>");
            }
            else{
                notOkHouse++;
                noHouseHolds+=parseInt(JSONobj[i]["houseHolds"]);
                $("#hList").append(
                    "<li class=\"listnum\">"+
                        "<div class=\"ui-block-a\" width=\"20%\">"+
                            "<img src=\"img/house_nocolor.png\" height=\"25\""+
                        "</div>"+    
                        "<a href='detailPage.html?num="+i+"'>"+ JSONobj[i]["name"]+"</a>"+
                    "</li>");           
            }
        }
        $("#totalHouse").append(okHouses+notOkHouse);
        $("#okHouse").append(okHouses);
        $("#totalHousehold").append(houseHolds+noHouseHolds);
        $("#okHousehold").append(houseHolds);
        $("#livePeople").append(livePeople);
        $("#okHouseRate").append((okHouses/(okHouses+notOkHouse)).toFixed(4)*100+"%"); 
        $("#targetRate").append(houseHolds/500+"%");
    }, function(response) {//error
        alert(JSON.stringify(response.status));
        //prints Permission denied
        alert(JSON.stringify(response.error));
        // alert(JSON.stringify(response));
    });
    $("#hList").listview("refresh");
    return JSONobj;
}
function onOnline(){  
    getListData();
}
function onOffline(){
    alert("沒有網路...\n必須連接網路才能取得最新資料");
}
function onDeviceReady() {
    getListData();

}


