const d= require('../Doctor');
const p= require('../PatientMessage');

var doc= new d();
var pat= new p("depression");
//doc.patientMessage= "depression";
doc.messageSummary= pat.getSummary()  //what does this return??

test('properly returns a resource', async () => {
    await expect().resolves.toMatch();
})
//test get intent, then get issue
//test getIssue returns a json object?
//x 2 maybe?