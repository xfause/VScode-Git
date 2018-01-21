function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
}
// test sample
var obj = [{ "segs": [{ "line": "G1315/G1318", "dep": "7:55", "arriv": "21:50", "from": "�ɶ���", "to": "������" }, { "line": "G6225", "dep": "22:25", "arriv": "23:01", "from": "������", "to": "���ڱ�" }], "shifa": true, "travel_minutes": 906, "price": { "yzPrice": 159, "rzPrice": 250, "ywPrice": 250, "rwPrice": -2 }, "start": "7:55", "end": "23:01" }, { "segs": [{ "line": "G1315/G1318", "dep": "7:55", "arriv": "19:01", "from": "�ɶ���", "to": "��ɳ��" }, { "line": "G6027", "dep": "19:29", "arriv": "22:55", "from": "��ɳ��", "to": "���ڱ�" }], "shifa": true, "travel_minutes": 900, "price": { "yzPrice": 253, "rzPrice": 399, "ywPrice": 399, "rwPrice": -2 }, "start": "7:55", "end": "22:55" }, { "segs": [{ "line": "D2241/D2244", "dep": "6:45", "arriv": "16:32", "from": "�ɶ���", "to": "�人" }, { "line": "G1021", "dep": "16:58", "arriv": "22:02", "from": "�人", "to": "���ڱ�" }], "shifa": true, "travel_minutes": 917, "price": { "yzPrice": 292, "rzPrice": 462, "ywPrice": 462, "rwPrice": -2 }, "start": "6:45", "end": "22:02" }, { "segs": [{ "line": "G1315/G1318", "dep": "7:55", "arriv": "20:17", "from": "�ɶ���", "to": "������" }, { "line": "G9685", "dep": "21:57", "arriv": "23:58", "from": "������", "to": "���ڱ�" }], "shifa": true, "travel_minutes": 963, "price": { "yzPrice": 210, "rzPrice": 329, "ywPrice": 329, "rwPrice": -2 }, "start": "7:55", "end": "23:58" }, { "segs": [{ "line": "G1315/G1318", "dep": "7:55", "arriv": "21:50", "from": "�ɶ���", "to": "������" }, { "line": "G6141/G6144", "dep": "23:08", "arriv": "23:37", "from": "������", "to": "���ڱ�" }], "shifa": true, "travel_minutes": 942, "price": { "yzPrice": 159, "rzPrice": 250, "ywPrice": 250, "rwPrice": -2 }, "start": "7:55", "end": "23:37" }, { "segs": [{ "line": "D351/D354", "dep": "8:01", "arriv": "16:54", "from": "�ɶ���", "to": "����" }, { "line": "T95", "dep": "18:30", "arriv": "8:50", "from": "����", "to": "����" }], "shifa": true, "travel_minutes": 1489, "price": { "yzPrice": 304, "rzPrice": 509, "ywPrice": 666, "rwPrice": 428 }, "start": "8:01", "end": "8:50" }]

// show in form
function showData(DataJson) {
    document.getElementById("result").innerHTML = "";
    var obj = document.getElementById("result").innerHTML;
    obj += "<table class='result'><tbody><tr text-align:center;><th rowspan=2>路线</th><th rowspan=2>所需时间</th><th rowspan=2>出发时间</th><th rowspan=2>到达时间</th><th colspan=4>票价(<font color=\"#FF0000\"><b>参考</b></font>)</th><th rowspan=2>转车地点</th><th rowspan=2>详细路线</th></tr><tr><th>硬座</th><Th>软座</th><th>硬卧</th><th>软卧</th></tr>";
    for (var i = 0; i < DataJson.length; i++) {
        obj += "<tr text-align:center;><td> "+ (i+1) + "</td>";
        // obj += "<td>"+DataJson[i].travel_minutes+"</td>";
        var travel_hour = Math.floor(DataJson[i].travel_minutes/60);
        var travel_min = DataJson[i].travel_minutes%60;
        obj += "<td>"+travel_hour+"小时"+travel_min+"分钟</td>"
        obj += "<td>"+DataJson[i].start+"</td>";
        obj += "<td>"+DataJson[i].end+"</td>";
        obj += "<td>"+DataJson[i].price.yzPrice+"</td>";
        obj += "<td>"+DataJson[i].price.rzPrice+"</td>";
        obj += "<td>"+DataJson[i].price.ywPrice+"</td>";
        if (DataJson[i].price.rwPrice <= 0)
           obj += "<td>" + "无票" + "</td>";
        else
            obj += "<td>" + DataJson[i].price.rwPrice + "</td>";
        if (DataJson[i].segs.length>1){
            obj += "<td>"
            for (var j = 0; j < DataJson[i].segs.length-1; j++) {
                obj+=DataJson[i].segs[j].to+"<br>";
            }
            obj += "</td>";
        }
        else obj+="<td>"+"直达"+"</td>";
        obj+="<td style='text-align:left;'>";
        for (var j = 0; j < DataJson[i].segs.length; j++) {
           obj+=DataJson[i].segs[j].line +"("+DataJson[i].segs[j].from+"-"+DataJson[i].segs[j].to+")<br>";
        }
        obj+="</td></tr>"
        // sample 
        // document.getElementById("result").innerHTML = document.getElementById("result").innerHTML+��
    }
    document.getElementById("result").innerHTML = obj;
}
// 添加排序选项
function add_sort(){
    document.getElementById("sort").innerHTML = "";
    var obj = document.getElementById("sort").innerHTML;
    obj+="<select name='sort' onchange='change_sort(this)'><option value='' selected='selected'>改按旅程时间排列</option><option value='P'>改按车票价格排列</option><option value='D'>改按出发时间排列</option><option value='A'>改按到达时间排列</option></select>";
    document.getElementById("sort").innerHTML=obj
}
function showError(DataJson){
    
}
function change_sort(obj){
    if (obj.value=='P'){
        ajaxData('P');
    }
    else if (obj.value=='D'){
        ajaxData('D');
    }
    else if (obj,value=='A'){
        ajaxData('A');
    }
    else ajaxData('');
}
// load test
function loadTest() {
    showData(obj);
    change_div_search_pos();
    add_sort();
}

// 改变搜索条位置
function change_div_search_pos(){
    var obj = document.getElementById("css1");
    obj.setAttribute("href","second-page-style.css");
}
// 参数 sortby
function ajaxData(sortBy){
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 �����ִ�д���
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // document.getElementById("result").innerHTML=xmlhttp.responseText;
            var DataJson = xmlhttp.responseText;
            //showData(strToJson(DataJson)); //do show form
            if (DataJson.indexOf('库中没有此车站')!=-1){

            }
            else if (DataJson.indexOf('服务器太忙')!=-1){

            }
            else if (DataJson.indexOf('您不能同时执行')!=-1){

            }
            else showData(strToJson(DataJson));
            //return DataJson;
        }
    }
    var src = getSrc();
    var dest = getDest();
    // url http://localhost:8080/rest/trest?src=�ɶ�&dest=����&sortBy=
    var url = '/rest/trest?src=' + src + '&dest=' + dest +'&sortBy='+sortBy;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
// get json
function loadJson() {
    
    ajaxData('');
    //var DataJson = ajaxData();
    //showData(DataJson);
    change_div_search_pos();
    add_sort();
}
// GET src
function getSrc() {
    var src = document.getElementById("src").value;
    return src;
}
// GET dest
function getDest() {
    var dest = document.getElementById("dest").value;
    return dest;
}