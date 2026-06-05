"use strict"

require("dotenv").config();


let resultNews = [];

async function fetchNews() {

    let apiKey = process.env.NEWS_API_KEY;

    try{
        let response = await fetch("https://newsapi.org/v2/top-headlines?language=en&category=technology" ,{
           method : "GET",
           headers : {
            "Authorization":apiKey
           }
        });

        if(!response.ok){
            throw new Error(`the status is ${response.status} and the text is ${response.statusText}`)
        }
        let data =  await response.json();

       /* 
       
         to get all articles content 
         
         data.articles is the array of objects  and it has all the content in this one array
        for(let news of data.articles){
        console.log(news.content);  get content form each object of the array
        }


        */

      
        //get just 5 articles content
        for(let i =0 ;i<5;i++){
        
            resultNews.push(data.articles[i].content);
     }

    }catch(error){
        console.log(error.message);
        
    }

    
}





async function report(resultnews){
    let geminiKey = process.env.GEMINI_API_KEY;
    try{
        let response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent",{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "x-goog-api-key" : geminiKey
            },
            body : JSON.stringify({

                contents : [
                    {
                        parts : [
                            {text: `create a  very short ,amazing , structured,summarized, easy language  and bulletin report on the given data in array . And for confirmation if you successfully got the data o my given array ,write it at top. Here the data : ${JSON.stringify(resultNews)}`}
                        ]
                    }
                ]
            })
           
      
        })

        if(!response.ok){
            throw new Error( ` the status is ${response.status} and the text is ${response.statusText}`);
            
        }

        let data =  await response.json();
        console.log("****************************");
        console.log("the report of the news ");
        console.log("*****************************");
        console.log(data.candidates[0].content.parts[0].text);
        
}catch(error){
    console.log(error.message);
    
}
}

async function callFunctions(){
    await fetchNews ();
    report(resultNews);
}

callFunctions();