String.prototype.format = function (e) { var t = this; if (arguments.length > 0) if (arguments.length == 1 && typeof e == "object") { for (var n in e) if (e[n] != undefined) { var r = new RegExp("({" + n + "})", "g"); t = t.replace(r, e[n]) } } else for (var i = 0; i < arguments.length; i++) if (arguments[i] != undefined) { var r = new RegExp("({)" + i + "(})", "g"); t = t.replace(r, arguments[i]) } return t };
String.prototype.subStrEx = function (e) { return this.length + 3 > e ? this.substr(0, e) + "..." : this };
function isUndefined(e) { return "undefined" == typeof e };
var JSON1={};
JSON1.request=function(url,success,error){if(url.indexOf("&callback=?")<0){if(url.indexOf("?")>0){url+="&callback=?"}else{url+="?callback=?"}}$.ajax({async:true,url:url,type:"get",dataType:"jsonp",jsonp:"callback",success:function(result){if(typeof(success)=='function'){success(typeof(result)=='string'?eval(result):result)}},error:function(){if(typeof(error)=='function'){error()}}})};
JSON1.jsonp=function(url,funcCallback){window.parseLocation=function(results){var response=$.parseJSON(results);document.body.removeChild(document.getElementById('getJsonP'));delete window.parseLocation;if(funcCallback){funcCallback(response)}};function getJsonP(url){url=url+'&callback=parseLocation';var script=document.createElement('script');script.id='getJsonP';script.src=url;script.async=true;document.body.appendChild(script)}if(XMLHttpRequest){var xhr=new XMLHttpRequest();if('withCredentials'in xhr){var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.status==200){var response=$.parseJSON(xhr.responseText);if(funcCallback){funcCallback(response)}}else if(xhr.status==0||xhr.status==400){getJsonP(url)}else{}}};xhr.open('GET',url,true);xhr.send()}else if(XDomainRequest){var xdr=new XDomainRequest();xdr.onerror=function(err){};xdr.onload=function(){var response=JSON.parse(xdr.responseText);if(funcCallback){funcCallback(response)}};xdr.open('GET',url);xdr.send()}else{getJsonP(url)}}};
JSON1.requestPost=function(url,data,success,error){$.ajax({async:true,url:url,data:data,type:"POST",dataType:"json",success:function(result){if(typeof(success)=='function'){success(typeof(result)=='string'?eval(result):result)}},error:function(){if(typeof(error)=='function'){error()}}})};

CustomerInfo = {};
CustomerInfo.TimeZone = moment().utcOffset() / 60;

Protocol = {
    MarkerIcon: [
        L.icon({
            iconUrl: 'resources/images/marker.svg',                       
            iconSize:     [60, 60], // size of the icon                        
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location                        
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: 'resources/images/marker2.svg',                       
            iconSize:     [60, 60], // size of the icon                        
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location                        
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        })
    ],
    PositionTypes: {
        "NONE": 0,
        "GPS": 1,
        "LBS": 2,
        "GPSLBS": 3,
        "IRIDIUM": 4,
        "COMPASS": 8,
        "GLONASS": 16,
        "WiFi": 32
    },
    DeviceStatus: {
        "Disable": 0,
        "Normal": 1,
        "Overdue": -1
    },
    PositionAlerts: {
        "None": 0,
        "Custom": 1,
        "SOS": 2,
        "ElectricCutoff": 4,
        "InGeoFance": 8,
        "OutGeoFance": 16,
        "HighSpeed": 32,
        "LowSpeed": 64,
        "Theft": 128,
        "Vibrate": 256,
        "LowPower": 512,
        "Moving": 1024,
        "Fire": 2048,
        "MedicalHelp": 4096,
        "Defence": 8192,
        "Destroy": 16384,
        "ACCON": 32768,
        "ACCOFF": 65536,
        "INPUT1": 131072,
        "INPUT2": 262144,
        "INPUT1_LOW": 524288,
        "INPUT2_LOW": 1048576,
        "HardBrake": 2097152,
        "LowTemp": 4194304,
        "HighTemp": 8388608
    },
    PositionStatus: {
        "NONE": 0,
        "ACC": 1,
        "Static": 2,
        "Power": 4,
        "Charging": 8,
        "BeProtected": 16,
        "ACC2": 32,
        "ForceSave": 2097152
    },
    EventClasses: {
        "PROTOCOL_DEFINED": 0,
        "ALERT": 1,
        "ACC": 2,
        "STATIC": 4,
        "COMMAND": 8,
        "POI": 16,
        "ACC2": 32,
        "GEOLOCK": 64,
        "ACC3": 128,
        "SERVICEINTERVAL": 256
    },
    EventCommandTypes: {
        "NONE": 0,
        "REQUEST": 1,
        "RESPONSE": 2
    },
    ProductFeatures : {
        "Static":256,
        "Holder":32768,
        "FuelSensor":2048,
        "Acc":128,
        "Direct":4,
        "Acc2":131072,
        "LatLng":1,
        "GpsSignal":64,
        "OBD":8192,
        "Battery":1024,
        "DrivingTime":65536,
        "RFIDCard":16384,
        "GsmSignal":32,
        "Mileage":16,
        "None":0,
        "TempSensor":4096,
        "Alt":2,
        "Speed":8,
        "Voltage":512
    },
    StatusNewEnum:{
        "Geolock" : 1,
        "Immobilise": 2,
    },
    Helper: {
        getSpeedValue: function (speedUnit, speed) {
            var ret = 0;
            switch (speedUnit) {
                case "KT":
                    ret = parseInt(speed  * 0.53995680345572);
                    break;
                case "KPH":
                    ret = parseInt(speed);
                    break;
                case "MPS":
                    ret = parseInt(speed * 0.277777778);
                    break;
                case "MPH":
                    ret = parseInt(speed * 0.621371192);
                    break;
                default:
                    break;
            }
            return ret;
        },
        getSpeedUnit: function (speedUnit) {
            var ret = "";
            switch (speedUnit) {
                case "KT":
                    ret = "kt";
                    break;
                case "KPH":
                    ret = "km/h";
                    break;
                case "MPS":
                    ret = "m/s";
                    break;
                case "MPH":
                    ret = "mile/h";
                    break;
                default:
                    break;
            }
            return ret;
        },
        getMileageValue: function (speedUnit, mileage) {
            var ret = 0;
            switch (speedUnit) {
                case "KT":
                    ret = parseInt(mileage * 0.53995680345572);
                    break;
                case "KPH":
                    ret = parseInt(mileage);
                    break;
                case "MPS":
                    ret = parseInt(mileage * 1000);
                    break;
                case "MPH":
                    ret = parseInt(mileage * 0.62137119223733);
                    break;
                default:
                    break;
            }
            return ret;
        },
        getMileageUnit: function (speedUnit) {
            var ret = "";
            switch (speedUnit) {
                case "KT":
                    ret = "mile";
                    break;
                case "KPH":
                    ret = "km";
                    break;
                case "MPS":
                    ret = "m";
                    break;
                case "MPH":
                    ret = "mile";
                    break;
                default:
                    break;
            }
            return ret;
        },
        getMileage: function(asset, mileage){
            var ret = 0;
            ret = (Protocol.Helper.getMileageValue(asset.Unit, mileage) + parseInt(asset.InitMileage) + parseInt(asset._FIELD_FLOAT7)) + '&nbsp;' + Protocol.Helper.getMileageUnit(asset.Unit);     
            return ret;
        },
        getEngineHours: function(asset, launchHours){
            var ret = 0;
            ret = TimeSpan(parseInt(launchHours)*1000 + parseInt(asset.InitAcconHours)*60*60*1000 + parseInt(asset._FIELD_FLOAT8)*1000).format("^hh:mm:ss");  
            return ret;
        },
        getDirectionCardinal: function(direction){
            var ret = "";
            direction = parseFloat(direction);
            switch (true){
                case (direction >= 338 || direction <= 22 ):
                    ret = LANGUAGE.COM_MSG19;
                    break;
                case (direction >= 23 && direction <= 75 ):
                    ret = LANGUAGE.COM_MSG20;
                    break;
                case (direction >= 76 && direction <= 112 ):
                    ret = LANGUAGE.COM_MSG21;
                    break;
                case (direction >= 113 && direction <= 157 ):
                    ret = LANGUAGE.COM_MSG22;
                    break;
                case (direction >= 158 && direction <= 202 ):
                    ret = LANGUAGE.COM_MSG23;
                    break;
                case (direction >= 203 && direction <= 247 ):
                    ret = LANGUAGE.COM_MSG24;
                    break;
                case (direction >= 248 && direction <= 292 ):
                    ret = LANGUAGE.COM_MSG25;
                    break;
                case (direction >= 293 && direction <= 337 ):
                    ret = LANGUAGE.COM_MSG26;
                    break;
                default: ret = LANGUAGE.COM_MSG27;
            }
            return ret;
        },
        getPositionType: function(type){
            var ret = "";
            switch (type){
                case 0: case 1:
                    ret = "GPS";
                    break;
                case 2:
                    ret = "LBS";
                    break;
                case 3:
                    ret = "GPSLBS";
                    break;
                    case 4:
                    ret = "IRIDIUM";
                    break;
                case 8:
                    ret = "COMPASS";
                    break;
                    case 16:
                    ret = "GLONASS";
                    break;
                case 32:
                    ret = "WiFi";
                    break;
            }
            return ret;
           
        },
        getDifferenceBTtwoDates: function(date1, date2){
            var ret = "";
            if (date1 && date2) {
                //var one_day=1000*60*60*24;

                // Convert both dates to milliseconds
                var date1_ms = moment(date1).valueOf();
                var date2_ms = moment(date2).valueOf();

                ret = date2_ms - date1_ms;
            }
            return ret;
        },
        getGeoImmobState: function(val){            
            var ret = {
                Geolock : false,
                Immobilise : false
            };
            if (val) {
                if ((parseInt(val) & 1) > 0) {        
                    ret.Geolock = true; 
                }
                if ((parseInt(val) & 2) > 0) {        
                    ret.Immobilise = true; 
                }
            }            
            return ret;
        },
        getAddressByGeocoder: function(latlng,replyFunc){
            /*var url = "http://map.quiktrak.co/reverse.php?format=json&lat={0}&lon={1}&zoom=18&addressdetails=1".format(latlng.lat, latlng.lng);
            JSON1.request(url, function(result){ replyFunc(result.display_name);});*/
            var coords = latlng.lat + ', ' + latlng.lng;
            $.ajax({
                   type: "GET",                    
                    url: "https://nominatim.sinopacific.com.ua/reverse.php?format=json&lat={0}&lon={1}&zoom=18&addressdetails=1".format(latlng.lat, latlng.lng),
               dataType: "json",
                  async: true, 
                  cache: false,
                success: function (result) {                     
                    if (result.display_name) {                        
                        replyFunc(result.display_name);
                    }else{
                        replyFunc(coords);
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){ 
                    $.ajax({
                           type: "GET",
                            url: "https://nominatim.openstreetmap.org/reverse?format=json&lat={0}&lon={1}&zoom=18&addressdetails=1".format(latlng.lat, latlng.lng),                
                       dataType: "json",
                          async: true, 
                          cache: false,
                        success: function (result) { 
                            if (result.display_name) {                        
                                replyFunc(result.display_name);
                            }else{
                                replyFunc(coords);
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown){                            
                            replyFunc(coords);
                        }
                    }); 
                }
            });
        },
        getLatLngByGeocoder: function(address,replyFunc){            
            var url = "https://nominatim.openstreetmap.org/search?q={0}&format=json&polygon=1&addressdetails=1".format(address);
                /*JSON1.request(url, function(result){                    
                    var res = new L.LatLng(result[0].lat, result[0].lon);
                    replyFunc(res);
                });*/
            var res = null;
            $.ajax({
                   type: "GET",
                    url: url,                
               dataType: "json",
                  async: true, 
                  cache: false,
                success: function (result) {                     
                    if (result.length > 0) {
                        if (result[0].lat && result[0].lon) { 
                            res = new L.LatLng(result[0].lat, result[0].lon);                       
                            replyFunc(res);
                        }else{
                            replyFunc(res);
                        }
                    }else{
                        replyFunc(res);
                    } 
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){ 
                    url = "https://nominatim.sinopacific.com.ua/?q={0}&format=json&polygon=1&addressdetails=1".format(address);
                            $.ajax({
                           type: "GET",
                            url: url,                
                       dataType: "json",
                          async: true, 
                          cache: false,
                        success: function (result) {                     
                            if (result.length > 0) {
                                if (result[0].lat && result[0].lon) { 
                                    res = new L.LatLng(result[0].lat, result[0].lon);                       
                                    replyFunc(res);
                                }else{
                                    replyFunc(res);
                                }
                            }else{
                                replyFunc(res);
                            }   
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown){ 
                            replyFunc(res);
                        }
                    });
                }
            });
        },    
        createMap: function(option){
            var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { name: 'osm', attribution: '' });            
            var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                maxZoom: 22,
                subdomains:['mt0','mt1','mt2','mt3']
            });           
            var googleSatelitte = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
            });  
         

            var map = L.map(option.target, { zoomControl: false, center: option.latLng, zoom: option.zoom, layers: [googleStreets] }); 
                        
            var layers = {
                "<span class='mapSwitcherWrapper googleSwitcherWrapper'><img class='layer-icon' src='resources/images/googleRoad.png' alt='' /> <p>Map</p></span>": googleStreets,
                "<span class='mapSwitcherWrapper satelliteSwitcherWrapper'><img class='layer-icon' src='resources/images/googleSatellite.png' alt='' />  <p>Satellite</p></span>": googleSatelitte,
                "<span class='mapSwitcherWrapper openstreetSwitcherWrapper'><img class='layer-icon' src='resources/images/openStreet.png' alt='' /> <p>OpenStreet</p></span>": osm,                 
            };
           
            
            L.control.layers(layers).addTo(map);         

            /*map.on('zoomend', function() {
               console.log(map.getZoom());
            });  */ 

            return map;
        },
        toDegreesMinutesAndSeconds: function (coordinate) {
            var absolute = Math.abs(coordinate);
            var degrees = Math.floor(absolute);
            var minutesNotTruncated = (absolute - degrees) * 60;
            var minutes = Math.floor(minutesNotTruncated);
            var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

            return degrees + " " + minutes + " " + seconds;
        },
        convertDMS: function (lat, lng) {
            var latitude = Protocol.Helper.toDegreesMinutesAndSeconds(lat);
            var latitudeCardinal = Math.sign(lat) >= 0 ? "N" : "S";

            var longitude = Protocol.Helper.toDegreesMinutesAndSeconds(lng);
            var longitudeCardinal = Math.sign(lng) >= 0 ? "E" : "W";

            return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
        },
        getAssetStateInfo: function(asset){
            /*
                state-0  -- gray
                state-1  -- green
                state-2  -- yellow
                state-3  -- red
            */
            var ret = {};
            if (asset) {
                
                var dateTimeSecond = 24* 600 * 60 * 1000;
                //console.log(asset.posInfo.positionTime);
                if(asset.posInfo.positionTime !== null) {
                    try{
                        dateTimeSecond = Math.abs(moment(moment(asset.posInfo.positionTime.toDate()).add(CustomerInfo.TimeZone, 'hours').toDate()).diff(moment(moment(moment().toDate()).add((moment().utcOffset()/60),'hours').toDate()), 'milliseconds'));  
                    }catch(error){
                        console.log(error);
                    }
                    
                }     
                /*if(asset.posInfo.positionTime !== null&&Math.abs(moment(moment(asset.posInfo.positionTime.toDate()).add(CustomerInfo.TimeZone, 'hours').toDate()).diff(moment(moment(moment().toDate()).add((moment().utcOffset()/60)).toDate()), 'milliseconds'),'hours') > 20 * 60 * 1000)
                {
                    asset.posInfo.speed=0;
                }*/
                if(asset.posInfo.positionTime !== null) {
                    try{
                        if(asset.posInfo.lat===0||asset.posInfo.lng===0||(asset.posInfo.positionTime !== null&&Math.abs(moment(moment(asset.posInfo.positionTime.toDate()).add(CustomerInfo.TimeZone).toDate(),'hours').diff(moment(moment(moment().toDate()).add((moment().utcOffset()/60)).toDate()), 'milliseconds'),'hours') > 40 * 60 * 1000))
                        {            
                            asset.posInfo.isRealTime="False";
                            asset.posInfo.isLocated="False";
                            asset.posInfo.speed=0;
                            asset.posInfo.status=0;
                        }
                    }catch(error){
                        console.log(error);
                    }                    
                } 

                ret.stats = true;
                if(asset.posInfo.positionTime === null) {
                    ret.stats = false;
                    
                }else{
                    if (asset.haveFeature("Speed")){                        
                        var speed = parseInt(asset.posInfo.speed);                    
                        if(asset.haveFeature("Acc") && (Protocol.PositionStatus.ACC & asset.posInfo.status) === 0 && speed <= 10)
                        {                            
                            asset.posInfo.speed = 0;
                        }
                        ret.speed = {};
                        ret.speed.value = Protocol.Helper.getSpeedValue(asset.Unit, asset.posInfo.speed) + ' ' + Protocol.Helper.getSpeedUnit(asset.Unit);
                    }
                    if(asset.haveFeature("TempSensor")){
                        ret.temperature = {};
                        if(typeof asset.posInfo.alt == "undefined"){
                            ret.temperature.value = LANGUAGE.COM_MSG11;
                        }else{
                            ret.temperature.value = asset.posInfo.alt + '&nbsp;°C'; 
                        }                   
                    }
                    if(asset.haveFeature("FuelSensor")){
                        ret.fuel = {};
                        if(typeof asset.posInfo.fuel == "undefined" || asset.posInfo.fuel == 0){
                            ret.fuel.value = LANGUAGE.COM_MSG11;
                        }else{
                            ret.fuel.value = parseInt(((parseFloat(asset.posInfo.fuel) - asset._FIELD_FLOAT2) / (asset._FIELD_FLOAT1 - asset._FIELD_FLOAT2)) * 100) + '&nbsp;%';                            
                        }                      
                    }
                    if(asset.haveFeature("Voltage")){
                        ret.voltage = {};
                        //console.log(asset.posInfo.alt);
                        if(typeof asset.posInfo.alt == "undefined"){
                            ret.voltage.value = LANGUAGE.COM_MSG11;
                        }else{                            
                            ret.voltage.value = (asset.posInfo.alt > 50? LANGUAGE.COM_MSG11 : ""+ Math.round(asset.posInfo.alt*10)/10 + '&nbsp;V');
                        }                         
                    } 
                    if(asset.haveFeature("Mileage")) {                    
                        ret.mileage = {};
                        ret.mileage.value = (Protocol.Helper.getMileageValue(asset.Unit, asset.posInfo.mileage) + parseInt(asset.InitMileage) + parseInt(asset._FIELD_FLOAT7)) + '&nbsp;' + Protocol.Helper.getMileageUnit(asset.Unit);     
                        
                        ret.engineHours = {};
                        if(asset.posInfo.Engine){                
                            asset.posInfo.launchHours = asset.posInfo.Engine;
                        }  
                        if (typeof (asset._FIELD_FLOAT8) == 'undefined') {
                            asset._FIELD_FLOAT8 = 0;
                        }
                        ret.engineHours.value = TimeSpan(parseInt(asset.posInfo.launchHours)*1000 + parseInt(asset.InitAcconHours)*60*60*1000 + parseInt(asset._FIELD_FLOAT8)*1000).format("^hh:mm:ss");  
                        //console.log(asset);
                    }
                    if(asset.haveFeature("Acc")){
                        ret.acc = {};
                        //if((Protocol.PositionStatus.ACC & asset.posInfo.status) > 0 && asset.posInfo.isLocated=="True"){ 
                        //if((Protocol.PositionStatus.ACC & this.posInfo.status) > 0)                
                        if((Protocol.PositionStatus.ACC & asset.posInfo.status) > 0){
                            ret.acc.value = 'ON';
                        }else{
                            ret.acc.value = 'OFF';            
                        }
                    }
                    if(asset.haveFeature("Acc2")){
                        ret.acc2 = {};
                        if((Protocol.PositionStatus.ACC2 & asset.posInfo.status) > 0){
                            ret.acc2.value = 'ON';
                        }else{
                            ret.acc2.value = 'OFF';            
                        }
                    }
                    if(asset.haveFeature("Battery")){
                        ret.battery = {};
                        if (asset.posInfo.Battery) {
                            ret.battery.value = parseInt(asset.posInfo.Battery) + '&nbsp;%';
                        }else{
                            ret.battery.value = LANGUAGE.COM_MSG11; // no data
                        }                  
                    }
                    if(asset.haveFeature("Alt")){
                        ret.altitude = {};
                        ret.altitude.value = asset.posInfo.alt + '&nbsp;ft';                   
                    }
                    /*if(asset.haveFeature("RFIDCard")){
                        ret.driver = {};
                        if(asset.posInfo.rfid !== null && asset.posInfo.rfid !== ""){
                            var hasFound = false;
                            for(var i= 0; i< ContactList.length; i++){
                                if(asset.posInfo.rfid == ContactList[i].Number){
                                    hasFound = true;
                                    ret.driver.value = ContactList[i].FirstName + " " + ContactList[i].SurName;                                                       
                                    break;
                                }
                            }
                            if(!hasFound){
                                ret.driver.value = asset.posInfo.rfid;                            
                            }                                   
                        }else{
                            ret.driver.value = LANGUAGE.COM_MSG11;
                        }       
                    }else if(asset.haveFeature("Driver")){
                        ret.driver = {};    
                        var name = '';              
                        if(asset.contactCode !== null && asset.contactCode !== ""){
                            for(var j = 0; j< ContactList.length; j++){
                                if(asset.contactCode == ContactList[j].Code){
                                    name += ContactList[j].FirstName + " " + ContactList[j].SurName;                     
                                    break;
                                }
                            }             
                        }
                        ret.driver.value = name; 
                    }              */      
                    
                    
                    ret.GPS = {};  
                    ret.GPS.state = 'state-1';
                    ret.GSM = {};
                    ret.GSM.state = 'state-1';  
                    if(asset.posInfo.lat===0||asset.posInfo.lng===0||dateTimeSecond > 40 * 60 * 1000){
                        ret.GPS.state = 'state-0';
                    } 
                    if(dateTimeSecond > 5 * 60 * 60 * 1000){
                        ret.GSM.state = 'state-0';
                    }                
                    ret.status = {};
                    if(parseInt(asset.posInfo.speed) > 0){
                        ret.status.value = LANGUAGE.ASSET_STATUS_MSG05;
                        ret.status.state = 'state-1';
                        ret.status.event = LANGUAGE.ASSET_STATUS_MSG20;
                        ret.status.eventTime = asset.posInfo.positionTime.format(window.COM_TIMEFORMAT);
                        ret.GSM.state = 'state-1';                    
                    }
                    else if(parseInt(asset.posInfo.speed) === 0){
                        if( asset.haveFeature("Acc") && (Protocol.PositionStatus.ACC & asset.posInfo.status) > 0){
                            ret.status.value = LANGUAGE.ASSET_STATUS_MSG18;
                            ret.status.state = 'state-2';
                            ret.status.eventTime = asset.posInfo.positionTime.format(window.COM_TIMEFORMAT);
                            ret.status.event = LANGUAGE.ASSET_STATUS_MSG19;
                            ret.GSM.state = 'state-1'; 
                        }else{
                            if (asset.posInfo.staticTime) {
                                //ret.status.value = LANGUAGE.ASSET_STATUS_MSG04+' <span class="stopped_time">('+asset.posInfo.staticTime.format(window.COM_TIMEFORMAT)+')</span>';

                                ret.stopped = {};
                                ret.stopped.time = asset.posInfo.staticTime.format(window.COM_TIMEFORMAT);                               

                                var dateDifference = Protocol.Helper.getDifferenceBTtwoDates(asset.posInfo.staticTime,moment());                                

                                ret.stopped.duration = moment.duration(dateDifference, "milliseconds").format('d[d] h[h] m[m]');

                                ret.status.value = LANGUAGE.ASSET_STATUS_MSG04+' <span class="stopped_time">('+ret.stopped.duration+')</span>';
                            }else{
                                ret.status.value = LANGUAGE.ASSET_STATUS_MSG04;
                            }
                            
                            ret.status.state = 'state-0';
                            ret.status.eventTime = asset.posInfo.positionTime.format(window.COM_TIMEFORMAT);
                            ret.status.event = LANGUAGE.ASSET_STATUS_MSG19;
                            ret.GSM.state = 'state-1';        
                        }
                                           
                    }

                    if(dateTimeSecond > 72 * 60 * 60 * 1000){
                        ret.GSM.state = 'state-3';               
                    }
                    else if(dateTimeSecond > 24 * 60 * 60 * 1000){
                        ret.GSM.state = 'state-2';                   
                    }
                    else if(dateTimeSecond > 12 * 60 * 60 * 1000){               
                        ret.GSM.state = 'state-0';  
                    }else{
                        ret.GSM.state = 'state-1';              
                    }

                    if(dateTimeSecond > 48 * 60 * 60 * 1000){                                        
                        ret.GPS.state = 'state-0';    
                    }
                    else if(asset.haveFeature("Acc") && (Protocol.PositionStatus.ACC & asset.posInfo.status) === 0 && asset.posInfo.speed === 0) {                
                        ret.GPS.state = 'state-1';
                    }
                    else if(asset.posInfo.speed > 0){               
                        ret.GPS.state = 'state-1';
                    }else if(asset.posInfo.speed === 0){
                        ret.GPS.state = 'state-1';
                    }

                    ret.geolock = {
                        value: false,
                        state: 'state-0',
                    };
                    ret.immob = {
                        value: false,
                        state: 'state-0',
                    };
                    if (asset.StatusNew) {                       
                        var geolockImmobSate = Protocol.Helper.getGeoImmobState(asset.StatusNew);
                        if (geolockImmobSate.Geolock) {
                            ret.geolock.value = geolockImmobSate.Geolock;
                            ret.geolock.state = 'state-1';
                        }
                        if (geolockImmobSate.Immobilise) {
                            ret.immob.value = geolockImmobSate.Immobilise;
                            ret.immob.state = 'state-3'; 
                        }
                    }                   
                    
                }  
            }
                
   
            return ret;
        }
    }
};

Protocol.Common = JClass({
    STATIC: {

    },
    constructor: function(arg) {
        this.initDeviceInfo(arg);
        this.posInfo = {};
    },
    initDeviceInfo: function (arg) {
        //console.log(arg);
        /*this.id = arg.ID;
        this.imei = arg.IMEI;
        this.protocolClass = arg.ProtocolClass;
        this.name = arg.Name;
        this.productCode = arg.ProductCode;
        this.customerCode = arg.CustomerCode;
        this.groupCode = arg.GroupCode;
        this.contactCode = arg.ContactCode;
        this.speedUnit = arg.SpeedUnit;
        this.beMonitored = arg.BeMonitored;
        this.initMileage = arg.InitMileage;
        this.initAccOnHours = arg.InitAccOnHours;
        this.state = arg.State;
        this.billCode=arg.BillCode;

        this._FIELD_FLOAT1 = arg._FIELD_FLOAT1;
        this._FIELD_FLOAT2 = arg._FIELD_FLOAT2;
        this._FIELD_FLOAT3 = arg._FIELD_FLOAT3;
        this.initDeviceInfoEx(arg);*/
                             
        this.Id = arg.Id;
        this.IMEI = arg.IMEI;
        this.Name = arg.Name;
        this.TagName = arg.TagName;
        this.Icon = arg.Icon;
        this.Unit = arg.Unit; 
        this.InitMileage = arg.InitMileage;
        this.InitAcconHours = arg.InitAcconHours;
        this.State = arg.State;
        this.ActivateDate = arg.ActivateDate;
        this.PRDTName = arg.PRDTName;
        this.PRDTFeatures = arg.PRDTFeatures;
        this.PRDTAlerts = arg.PRDTAlerts;
        this.Describe1 = arg.Describe1;
        this.Describe2 = arg.Describe2;
        this.Describe3 = arg.Describe3;
        this.Describe4 = arg.Describe4;
        this.Describe5 = arg.Describe5;
        this.Describe7 = arg.Describe7;
        this._FIELD_FLOAT1 = arg._FIELD_FLOAT1;
        this._FIELD_FLOAT2 = arg._FIELD_FLOAT2;
        this._FIELD_FLOAT7 = arg._FIELD_FLOAT7;
        this.AlarmOptions = arg.AlarmOptions;
        this._FIELD_FLOAT8 = arg._FIELD_FLOAT8;
        this.StatusNew = arg.StatusNew;    
        this._FIELD_INT2 = arg._FIELD_INT2;   
    
    },
    initDeviceInfoEx:function(){},
    initPosInfo: function (ary) {
        var posInfo = {};

        posInfo.assetID = ary[0];
        posInfo.imei = ary[1];
        posInfo.protocolClass = ary[2];
        posInfo.positionType = ary[3];
        posInfo.dataType = ary[4];
        if(ary[5] !== null) {

            posInfo.positionTime = moment(ary[5].split('.')[0]).add(CustomerInfo.TimeZone, 'hours');
        }
        else {
            posInfo.positionTime = null;
        }
        if(ary[6] !== null) {
            posInfo.sysTime = moment(ary[6].split('.')[0]).add(CustomerInfo.TimeZone, 'hours');
        }
        else {
            posInfo.sysTime = null;
        }
        if(ary[7] !== null) {
            posInfo.staticTime = moment(ary[7]).add(CustomerInfo.TimeZone, 'hours');
        }
        else {
            posInfo.staticTime = null;
        }
        posInfo.isRealTime = ary[8];
        posInfo.isLocated = ary[9];
        posInfo.satelliteSignal = ary[10];
        posInfo.gsmSignal = ary[11];
        posInfo.lat = ary[12];
        posInfo.lng = ary[13];
        posInfo.alt = ary[14];
        posInfo.direct = ary[15];
        posInfo.speed = ary[16];
        posInfo.mileage = ary[17];
        posInfo.launchHours = ary[18];
        posInfo.alerts = ary[19];
        posInfo.status = ary[20];
        posInfo.originalAlerts = ary[21];
        posInfo.originalStatus = ary[22];
        //posInfo.Status = ary[22];

        this.initPosInfoEx(ary, posInfo);
        this.posInfo = posInfo;
        
        return posInfo;
    },
    initPosInfoEx:function(){},
    initHisPosInfo: function (ary) {
        var posInfo = {};
        posInfo.assetID = ary[0];
        posInfo.positionType = ary[1];
        posInfo.dataType = ary[2];
        if(ary[3] !== null) {
            posInfo.positionTime = moment(ary[3].split('.')[0]).add(CustomerInfo.TimeZone, 'hours');
        }
        else {
            posInfo.positionTime = null;
        }
        if(ary[4] !== null) {
            posInfo.sysTime = moment(ary[4]).add(CustomerInfo.TimeZone, 'hours');
        }
        else {
            posInfo.sysTime = null;
        }
        if(ary[5] !== null) {
            posInfo.staticTime = moment(ary[5]).add(CustomerInfo.TimeZone, 'hours');
        }
        else {
            posInfo.staticTime = null;
        }
        posInfo.isRealTime = ary[6];
        posInfo.isLocated = ary[7];
        posInfo.satelliteSignal = ary[8];
        posInfo.gsmSignal = ary[9];
        posInfo.lat = ary[10];
        posInfo.lng = ary[11];
        posInfo.alt = ary[12];
        posInfo.direct = ary[13];
        posInfo.speed = ary[14];
        posInfo.mileage = ary[15];
        posInfo.launchHours = ary[16];
        posInfo.alerts = ary[17];
        posInfo.status = ary[18];
        posInfo.originalAlerts = ary[19];
        posInfo.originalStatus = ary[20];
        this.initHisPosInfoEx(ary, posInfo);
        return posInfo;
    },
    initHisPosInfoEx: function(){},
    initEventInfo: function(ary){
        var event = {};
        event.assetID = ary[0];
        event.eventClass = ary[1];
        event.eventType = ary[2];
        event.state = ary[3];
        event.otherCode = ary[4];
        event.otherCode2 = ary[5];
        event.contactCode = ary[6];
        event.beginTime = moment(ary[7]).add(CustomerInfo.TimeZone, 'hours');
        event.endTime = moment(ary[8]).add(CustomerInfo.TimeZone, 'hours');
        event.positionType = ary[9];
        event.lat = ary[10];
        event.lng = ary[11];
        event.alt = ary[12];
        event.alerts = ary[13];
        event.status = ary[14];
        this.initEventInfoEx(ary, event);
        return event;
    },
    initEventInfoEx: function(){},
    haveFeature: function(feature){        
        return (Protocol.ProductFeatures[feature] & this.PRDTFeatures) > 0;        
    }
});
Protocol.ClassManager = {
    array: {},
    add: function (name, clas) {
        Protocol.ClassManager.array[name] = clas;
    },
    get: function (name, arg) {
        var clasType = Protocol.ClassManager.array[name];
        var ret = null;
        if (isUndefined(clasType)) {
            ret = new Protocol.Common(arg);
        }
        else {
            ret = new clasType(arg);
        }
        return ret;
    }
};



/*
// EXAMPLE
var deviceInfo = {
    // GPS DEVICE INFO, you can change initDeviceInfo method base on api response
};

var posData = ["3C3E3B3A3F","0354188046604596","EELINK_OBD","0","2","2016-03-12T10:15:17","2016-03-12T10:17:23.767","2013-11-04T06:25:03","true","true","0","0","43.905781111111168","125.27960111111116","0.0","332","0.0","0.0","10","0","1","0","0","0.0","0.0",null,"0.0"];
var protocolClass = posData[2];

var posInfo = Protocol.ClassManager.get(protocolClass, deviceInfo);

posInfo.initPosInfo(posData); //  for init or update position data

if(posInfo.haveFeature("Speed")){
    // display speed in asset list

}
*/