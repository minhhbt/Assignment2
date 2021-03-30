//const p= require('../PatientMessage');
const { plugin } = require('mongoose');
const PatientMessage = require('../PatientMessage.js');
test('properly returns an summary',   async () => {
    var p=new PatientMessage("Hello!");

    //var pat= new p('who are you');
    //await pat.setMessage(new p('I\'m feeling depressed'));
    //await doc.setMessageAttributes();
    //console.log(doc.messageSummary); //this returns undefined
    //var pat= new p("your age");
//doc.patientMessage= "depression";
    // doc.messageSummary= pat.getSummary();//what does this return??
   expect(await p.getSummary().then(function(v){JSON.parse(v.toString()).intent})).toMatch('agent.acquaintance');


})

