/*jshint node:true*/

var Dotfuse = {
    IP_Table : [
        58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4,
        62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8,
        57, 49, 41, 33, 25, 17,  9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
        61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7
    ], 
    IPR_Table :  [
        40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31,
        38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29,
        36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27,
        34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41,  9, 49, 17, 57, 25
    ], 
    PC1_Table :  [
        57, 49, 41, 33, 25, 17,  9,  1, 58, 50, 42, 34, 26, 18,
        10,  2, 59, 51, 43, 35, 27, 19, 11,  3, 60, 52, 44, 36,
        63, 55, 47, 39, 31, 23, 15,  7, 62, 54, 46, 38, 30, 22,
        14,  6, 61, 53, 45, 37, 29, 21, 13,  5, 28, 20, 12,  4
    ], 
    PC2_Table : [
        14, 17, 11, 24,  1,  5,  3, 28, 15,  6, 21, 10,
        23, 19, 12,  4, 26,  8, 16,  7, 27, 20, 13,  2,
        41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48,
        44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32
    ], 
    LOOP_Table : [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],
    E_Table :  [
        32,  1,  2,  3,  4,  5,  4,  5,  6,  7,  8,  9,
         8,  9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17,
        16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25,
        24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32,  1
    ],
    P_Table : [    16, 7, 20, 21, 29, 12, 28, 17, 1,  15, 23, 26, 5,  18, 31, 10,
                     2,  8, 24, 14, 32, 27, 3,  9,  19, 13, 30, 6,  22, 11, 4,  25 ], 
    S_Box : [
        // S1 
        [[14,  4, 13,  1,  2, 15, 11,  8,  3, 10,  6, 12,  5,  9,  0,  7],
         [ 0, 15,  7,  4, 14,  2, 13,  1, 10,  6, 12, 11,  9,  5,  3,  8],
         [ 4,  1, 14,  8, 13,  6,  2, 11, 15, 12,  9,  7,  3, 10,  5,  0],
         [15, 12,  8,  2,  4,  9,  1,  7,  5, 11,  3, 14, 10,  0,  6, 13]],
        // S2 
        [[15,  1,  8, 14,  6, 11,  3,  4,  9,  7,  2, 13, 12,  0,  5, 10],
         [ 3, 13,  4,  7, 15,  2,  8, 14, 12,  0,  1, 10,  6,  9, 11,  5],
         [ 0, 14,  7, 11, 10,  4, 13,  1,  5,  8, 12,  6,  9,  3,  2, 15],
         [13,  8, 10,  1,  3, 15,  4,  2, 11,  6,  7, 12,  0,  5, 14,  9]],
        // S3 
        [[10,  0,  9, 14,  6,  3, 15,  5,  1, 13, 12,  7, 11,  4,  2,  8],
         [13,  7,  0,  9,  3,  4,  6, 10,  2,  8,  5, 14, 12, 11, 15,  1],
         [13,  6,  4,  9,  8, 15,  3,  0, 11,  1,  2, 12,  5, 10, 14,  7],
         [ 1, 10, 13,  0,  6,  9,  8,  7,  4, 15, 14,  3, 11,  5,  2, 12]],
        // S4 
        [[ 7, 13, 14,  3,  0,  6,  9, 10,  1,  2,  8,  5, 11, 12,  4, 15],
         [13,  8, 11,  5,  6, 15,  0,  3,  4,  7,  2, 12,  1, 10, 14,  9],
         [10,  6,  9,  0, 12, 11,  7, 13, 15,  1,  3, 14,  5,  2,  8,  4],
         [ 3, 15,  0,  6, 10,  1, 13,  8,  9,  4,  5, 11, 12,  7,  2, 14]],
        // S5 
        [[ 2, 12,  4,  1,  7, 10, 11,  6,  8,  5,  3, 15, 13,  0, 14,  9],
         [14, 11,  2, 12,  4,  7, 13,  1,  5,  0, 15, 10,  3,  9,  8,  6],
         [ 4,  2,  1, 11, 10, 13,  7,  8, 15,  9, 12,  5,  6,  3,  0, 14],
         [11,  8, 12,  7,  1, 14,  2, 13,  6, 15,  0,  9, 10,  4,  5,  3]],
        // S6 
        [[12,  1, 10, 15,  9,  2,  6,  8,  0, 13,  3,  4, 14,  7,  5, 11],
         [10, 15,  4,  2,  7, 12,  9,  5,  6,  1, 13, 14,  0, 11,  3,  8],
         [ 9, 14, 15,  5,  2,  8, 12,  3,  7,  0,  4, 10,  1, 13, 11,  6],
         [ 4,  3,  2, 12,  9,  5, 15, 10, 11, 14,  1,  7,  6,  0,  8, 13]],
        // S7 
        [[ 4, 11,  2, 14, 15,  0,  8, 13,  3, 12,  9,  7,  5, 10,  6,  1],
         [13,  0, 11,  7,  4,  9,  1, 10, 14,  3,  5, 12,  2, 15,  8,  6],
         [ 1,  4, 11, 13, 12,  3,  7, 14, 10, 15,  6,  8,  0,  5,  9,  2],
         [ 6, 11, 13,  8,  1,  4, 10,  7,  9,  5,  0, 15, 14,  2,  3, 12]],
        // S8 
        [[13,  2,  8,  4,  6, 15, 11,  1, 10,  9,  3, 14,  5,  0, 12,  7],
         [ 1, 15, 13,  8, 10,  3,  7,  4, 12,  5,  6, 11,  0, 14,  9,  2],
         [ 7, 11,  4,  1,  9, 12, 14,  2,  0,  6, 10, 13, 15,  3,  5,  8],
         [ 2,  1, 14,  7,  4, 10,  8, 13, 15, 12,  9,  0,  3,  5,  6, 11]]
    ],
    Oct2Bin : ["0000","0001","0010","0011","0100","0101","0110","0111",
               "1000","1001","1010","1011","1100","1101","1110","1111" ],
    subKeys : new Array(16),
    key : "",
    text : ""
};
Dotfuse.integerToBytes=function(r,n) {
  var h=0;  
  for (var i=24; i>=0; i-=8) {
  	h = (n>>i)&0xff; 
  	r.push(h);
  }
  return r;
}

Dotfuse.newHash =function(password){
	var nr = 1345345333;
	var add = 7;
	var nr2 = 0x12345671;
	var tmp;
	for (i = 0; i < password.length; ++i) {
		if ((password.charAt(i) == ' ') || (password.charAt(i) == '\t')) {
			continue; // skip spaces
		}

		tmp = (0xff & password.charAt(i).charCodeAt());
		nr ^= ((((nr & 63) + add) * tmp) + (nr << 8));
		nr2 += ((nr2 << 8) ^ nr);
		add += tmp;
	}

	var result = [0,0];
	result[0] = nr & 0x7fffffff;
	result[1] = nr2 & 0x7fffffff;
	return result;
}
Dotfuse.makeK = function(password){
	var hash = this.newHash(password);
	var bytes = [0,0,0,0,0,0,0,0];
	var r = [];
	this.integerToBytes(r,hash[0]);
	this.integerToBytes(r,hash[1]);
	return this.ByteArrat2Bit(r);
}
Dotfuse.init = function(key,text){
    if(key != this.key){
        this.key=key; 
        this.GenSubKey();
    }
    var utcd = new Date();
    var localTime = utcd.getTime();
    var localOffset = utcd.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var bombay = utc + (3600000*8);

    var td=new Date(bombay);
  	date=td.getDate();
  	month=td.getMonth();
  	month=month+1;
  	if(month<=9)
     	month="0"+month;
    if(date<=9)
     	date="0"+date;
  	year=td.getFullYear();
  	var d = ''+year+ month +date;
  	text = d + text;
  	this.text= "        ".substring(0,parseInt("07654321".charAt( text.length%8 ),10)) + text;
};

Dotfuse.GenSubKey = function(){
    var arr = this.Permute( this.makeK(this.key) , this.PC1_Table);
    var AL = arr.slice(0,28);
    var AR = arr.slice(28,56);
    for(var i=0; i<16; i++) {
        for(var j=0,k=this.LOOP_Table[i];j<k;j++){
            AL.push(AL.shift());
            AR.push(AR.shift());
        }
        this.subKeys[i] = this.Permute( AL.concat(AR) , this.PC2_Table );
    }
};
//数组ar存储二进制数据,该函数将从头开始的每八位转换成对应的字符
Dotfuse.Bit2Byte = function(ar,fCh){
    var str="";
    if(fCh == "byte"){
        var tmpAr = ar.join("").match(/.{8}/g);
        for(var i=0,j=tmpAr.length; i<j; i++)
            str += String.fromCharCode(parseInt(tmpAr[i],2));
     }
    else if(fCh == "hex"){
        var tmpAr = ar.join("").match(/.{4}/g);
        for(var i=0,j=tmpAr.length; i<j; i++)
            str += "0123456789abcdef".charAt(parseInt(tmpAr[i],2));
    }
    else return "Error:Second param is wrong.";
    return str;
};
//将字符串转换成二进制数组
Dotfuse.Byte2Bit = function(str){
    for(var i=0,j=8*str.length,ar = [],ch=""; i<j; i++){
        var k = 7 - i%8;
        if(k == 7) ch = str.charCodeAt(parseInt(i/8,10));
        ar.push( (ch >> k) & 1 );
    }
    return ar;
};
Dotfuse.ByteArrat2Bit = function(byteArray){
    for(var i=0,j=64,ar = [],ch=0; i<j; i++){
        var k = 7 - i%8;
        if(k == 7) ch = byteArray[i/8];
        ar.push( (ch >> k) & 1 );
    }
    return ar;
};

//将16进制字符串转变成二进制数组
Dotfuse.Hex2Bin = function(str){
    for(var i=0,j=str.length,s=""; i<j; i++)
        s += this.Oct2Bin[ parseInt(str.charAt(i),16)];
    return s.split("");
};

Dotfuse.Xor = function(A,B){
    for(var i=0,j=B.length,rtn=new Array(j); i<j; i++)
        rtn[i] = A[i] ^ B[i];
    return rtn;
}

Dotfuse.Permute = function(ar,tb){
    for(var i=0,j=tb.length,rtn=new Array(j);i<j;i++)
        rtn[i] = ar[tb[i]-1];
    return rtn;
};

Dotfuse.F_func = function(Ri,Ki)
{
    return this.Permute( this.S_func( this.Xor( this.Permute( Ri , this.E_Table ) , Ki) ) , this.P_Table);
};
//ar为输入48位串数组
Dotfuse.S_func = function(ar){
    for(var i=0,arRtn = [];i<8;i++){
        var x = i*6;
        var j = parseInt(""+ar[x]+ar[x+5],2);
        var k = parseInt(ar.slice(x+1,x+5).join(""),2);
        arRtn = arRtn.concat( this.Oct2Bin[ this.S_Box[i][j][k] ].split("") );
    }
    return arRtn;
}
Dotfuse.f340 = function(mode){
    mode = mode?mode:"Encrypt";
    if(mode=="Decrypt")
        var plainTextAr = this.Hex2Bin(this.text).join("").match(/.{64}/g);
    else
        var plainTextAr = this.Byte2Bit(this.text).join("").match(/.{64}/g);
    for(var i=0,j=plainTextAr.length;i<j;i++){
        var arr = this.Permute(plainTextAr[i].split(""),this.IP_Table)
        var AL = arr.slice(0,32);
        var AR = arr.slice(32,64);
        if(mode == "Decrypt"){
            for(var k=15;k>-1;k--){
                var tmp = AR.slice(0,32);
                AR = this.Xor(this.F_func(AR,this.subKeys[k]) , AL);
                AL = tmp;
            }
        }
        else{
            for(var k=0;k<16;k++){
                var tmp = AR.slice(0,32);
                AR = this.Xor(this.F_func(AR,this.subKeys[k]) , AL);
                AL = tmp;
            }
        }
        plainTextAr[i] = this.Bit2Byte(this.Permute(AR.concat(AL), this.IPR_Table),(mode=="Decrypt"?"byte":"hex"));
    }
    return plainTextAr.join("").trim();
}

String.prototype.trim = function(){ return this.replace(/\s+$/g,"");}

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).
/*
var express = require('express');

// setup middleware
var app = express();
app.use(app.router);
app.use(express.errorHandler());
app.use(express.static(__dirname + '/public')); //setup static public directory
//app.set('view engine', 'jade');
//app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

// render index page
app.get('/', function(req, res){
	Dotfuse.init(req.query.password, req.query.password);
	res.send(Dotfuse.f340());
});

// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);*/


var http = require('http');
var url = require("url");

http.createServer(function (req, res) {
  var arg = url.parse(req.url, true).query;
  res.write(arg.password);
  res.end();
}).listen(process.env.PORT || 5000, null);
