var http = require('http');
var fs = require('fs');

const PORT=9000; 
calandar();
// fs.readFile('./index.html', function (err, html) {

//     if (err) throw err;    

//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(PORT);
// });





var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let links = [];
let events1 = [];
let isLink = function (ele) {
  if (ele.tagName == "A") {
    if (ele.href.length > 0) links.push(ele.href)
  }else {
    for (let i of ele.children) {
      isLink(i)
    }
  }
}
function calandar() {
var request = require('request');
request('https://calendars.uark.edu/EventList.aspx?fromdate=11/18/2017&todate=11/18/2017&view=DateTime&display=Day&type=public', function (err, res ,body) { 
const dom = new JSDOM(body);
fs.writeFile('/var/www/html/calendarEvents.json',"")
//console.log(dom.window.document.body.innerHTML);
isLink(dom.window.document.getElementById("tblEvents"))
for (let link of links) {
  request("https://calendars.uark.edu/"+link, function( err, res, body ) {
    const dom = new JSDOM(body);
    let event = {link:link};
    let Bs = []
    let isB = function (ele) {
      if (ele.tagName == "B" || ele.style.fontWeight == "bold") {
        Bs.push(ele)
      }else {
        for (let i of ele.children) {
          isB(i)
        }
      }
    }
    isB(dom.window.document.getElementById("pnlEventDetails").children[0].children[0])
    for (let i of Bs) {
      if (i.innerHTML == "Event Description:") {
        event.desc = i.parentElement.childNodes[3].wholeText;
      }else if (i.parentElement.className == "listheadtext") {
        event.name = i.innerHTML
      }else if (i.innerHTML == "Location Information:"){
        let brCount = 0
        for (j of i.parentElement.childNodes) {
          if (brCount == 2) {
            event.loc = j.wholeText;
            break
          }
          if (j.tagName == "BR") brCount++
        }
      }
    }
    events1.push(event);
    //var json = JSON.stringify(event);
  //   fs.appendFile("/var/www/html/calendarEvents.json", json , function (err) {
  //     if (err) throw err;
  //     console.log('The "data to append" was appended to file!');
  //  });
    
  })
  
}
fs.writeFile("new.json",JSON.stringify(events1));


});
//fs.appendFile('/var/www/html/calendarEvents.json',"]")
}
