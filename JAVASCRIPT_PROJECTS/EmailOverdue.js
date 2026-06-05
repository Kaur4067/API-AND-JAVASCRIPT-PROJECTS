"use strict"
require("dotenv").config();
const invoices = [
  {
    clientName: "Arjun Mehta",
    email: "arjun.mehta@mehtasolutions.com",
    invoiceNumber: "INV-001",
    amount: 1500.00,
    currency: "USD",
    dueDate: "2025-04-10",
    daysPastDue: 45,
    status: "overdue"
  },
  {
    clientName: "Sara Lindqvist",
    email: "sara@lindqvistdesign.se",
    invoiceNumber: "INV-002",
    amount: 3200.50,
    currency: "EUR",
    dueDate: "2025-03-28",
    daysPastDue: 58,
    status: "overdue"
  },
  {
    clientName: "Carlos Rivera",
    email: "c.rivera@riveratechlabs.com",
    invoiceNumber: "INV-003",
    amount: 800.00,
    currency: "USD",
    dueDate: "2025-04-01",
    daysPastDue: 54,
    status: "overdue"
  },
  {
    clientName: "Priya Nair",
    email: "priya.nair@nairconsulting.in",
    invoiceNumber: "INV-004",
    amount: 2100.75,
    currency: "INR",
    dueDate: "2025-03-15",
    daysPastDue: 0,
    status: "paid"
  },
  {
    clientName: "James Whitfield",
    email: "james@whitfieldassoc.co.uk",
    invoiceNumber: "INV-005",
    amount: 4750.00,
    currency: "GBP",
    dueDate: "2025-04-05",
    daysPastDue: 0,
    status: "paid"
  }
];

//filter out the overdue ones
let overdueClients = invoices.filter(invoice => invoice.status === "overdue");


//email to each 
for(let client of overdueClients){
    sendEmail(client.clientName,client.amount,client.daysPastDue,)
}


//sendemail

async function sendEmail(username,amount,daysPastDue) {

    let API_KEY = process.env.GEMINI_API_KEY;

    
try{
    let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "x-goog-api-key": `${API_KEY}`
        },
        body : JSON.stringify({
            contents : [
                {parts:[
                    {text : `write a payment request email for ${username}.they owe ${amount}usd .they are ${daysPastDue} days late.`}
                ]}
            ]
        })
    });
    if(!response.ok){

        throw new Error(`status is ${response.status} and response text is ${response.statusText}`)
    }

    let emailArray = await response.json();
    let generateEmailText = emailArray.candidates[0].content.parts[0].text;

    console.log("====================================");
    console.log("generated email");
    console.log("====================================");
    console.log(generateEmailText);
    console.log("\n");

}catch(error){
    console.log(error.message);
    
}
}