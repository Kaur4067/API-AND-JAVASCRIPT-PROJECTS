
require("dotenv").config();
let topic = "This house believes that extreme gamification (turning life goals , fitness and work into point based games) does more harm than good"

let API_KEY =process.env.GEMINI_API_KEY
async function debatorA(argument){
    
  try{
    
    let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key`,{
        method : "POST",
        headers : {
             "x-goog-api-key": `${API_KEY}`,
            'Content-Type': 'application/json'
            
        },
        body:JSON.stringify({
             contents: [
               {
                role : "user",
                 parts: [
                {
                 text: `You are in a debate competition and will speak for the motion.This the argument placed by your competitor ${argument} .keep your points breif.`
           }
         ]
       }
    ]
        })
    });
    if(!response.ok){
        throw new Error(`status is ${response.status} and it says ${response.statusText}`)
    }
    let data = await response.json();
    let resultA = data.candidates[0].content.parts[0].text;
     return resultA
     

}catch(error){
    console.log("error in debatorA",error.message);
    
}
}



async function debatorB(respond){
   
  try{
    
    let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key`,{
        method : "POST",
        headers : {
             "x-goog-api-key": `${API_KEY}`,
             'Content-Type': 'application/json',
            
            
        },
        body:JSON.stringify({
             contents: [
               {
                role : "user",
                 parts: [
                {
                 text: `You are in a debate competition and will speak against the motion.This the argument placed by your competitor ${respond} .keep your points brief .`
           }
         ]
       }
    ]
  })
});
  
    if(!response.ok){
        throw new Error(`status is ${response.status} and it says ${response.statusText}`)
    }
    let data = await response.json();
    let resultB = data.candidates[0].content.parts[0].text;
     return resultB;

}catch(error){
    console.log("error by debatorB",error.message);
    
}
}

function wait (milliSec){
   return new Promise ((resolve) =>
     setTimeout(resolve,milliSec)
     );
}


async function caller(){
  console.log("starting the debate....\n");
  
    let response1 = await debatorA(topic);
   await wait(4000)
    let response2 = await debatorB(response1);
  await wait(4000)
    let response3 = await debatorA(response2);
  await wait(4000)
    let response4 = await debatorB(response3);
    await wait(4000)
    let response5 = await debatorA(response4);
   await wait(4000)
    let response6 =  await debatorB(response5);


}

caller()


