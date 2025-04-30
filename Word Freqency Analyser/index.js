import Chartscii from "chartscii";
const options = {
    title:"word frequency",
    width:50,
    theme:"pastel",
    color:"pink",
    ColorLables: true,
    barsize:2,
    orientation : "vertical"
};
function textAnalyser(para){
    const regex = /[^\\w\\s]+/g;
    let commonWords=["and","of","the","The","for","to","as"];
     //Remove common words and panctuations
    
    
    for(let word of commonWords){
        para=para.replaceAll(word,"");
    }
    para.replace(regex,"")

    para=para.split(" ");
    let count,wordFrequecy={};
    //Counts the occurance of each word in the paragraph and appends in the wordFrequecy object
    for(let i=0,word; i<para.length;i++){
        count=0;
        word=para[i];
        for(let k=0;k<para.length;k++){
            if(word.toLowerCase()===para[k].toLowerCase()){
                count++;
            }
        }
        if(word!=="" && word!=="a" && word!=="A"){
            wordFrequecy[word.toLowerCase()]=count;
        }
    }
    return wordFrequecy;
}
function output (obj){
    let colors = [ "green",
        "blue",
        "orange",
        "cyan",
        "pink",
        "purple",
        "marine",
        "white",
        "yellow",
        "red",

    ]
    //The data array which contains a list of objects for visualization
    let data=[],counter=0;
    for(let anobj in obj){
        let newData = {label:anobj,value:obj[anobj],color:colors[counter]}
        data.push(newData);
        counter+=1;
        if(counter===11){
            counter=0;
        }
    }
    //The objectValeues array which contains list of the object values sorted using bubble sort
    let objValeues=Object.values(obj);
    for(let i=0;i<=objValeues.length;i++){
        for(let k=0;k<=objValeues.length;k++){
            let y=k+1;
            if(parseInt(objValeues[k])<parseInt(objValeues[y])){
                let b=objValeues[k];
                objValeues[k]=objValeues[y];
                objValeues[y]=b;
            }
        }
    }
    
    //const chart = new Chartscii(objValeues,options);
    //console.log(chart.create());
    const chart = new Chartscii(data,{colorLabels:true,valueLabels:true});
    console.log(chart.create());
    let one,two,three,four,five,once=[];
    for (let anobj in obj){
        console.log(`- ${anobj} : ${obj[anobj]}`);
        //Words with top 5 frequecies
        if(obj[anobj]===objValeues[0] && !one){
            one={[anobj]:obj[anobj]}
        }
        else if(obj[anobj]===objValeues[1] && !two){
            two={[anobj]:obj[anobj]}
        }
        else if(obj[anobj]===objValeues[2] && !three){
            three={[anobj]:obj[anobj]}
        }
        else if(obj[anobj]===objValeues[3] && !four){
            four={[anobj]:obj[anobj]}
        }
        else if(obj[anobj]===objValeues[4] && !five){
            five={[anobj]:obj[anobj]}
        }
        if(obj[anobj]===1){
            once.push(anobj)
        }
    }
    let topFive={...one,...two,...three,...four,...five}
    let count=1;
    console.log("Top 5 most common words:");
    for(let anobj in topFive){
        console.log(`${count}. ${anobj} (${topFive[anobj]})`);
        count++;      
    }
    once=once.join(",");
    console.log(`Words that appear exactly once: ${once}`);
}

output(textAnalyser("The quick brown fox jumps over the lazy dog. The dog barks, but the fox keeps  jumping. Dogs and foxes have been natural enemies for centuries."
));
output(textAnalyser("And then there’s the importance of education as a path to success. Coach Carter doesn’t just want his players to be good athletes; he wants them to be scholars too! He believes that education opens doors—like the one to your future career, or at least the one that leads to a job that pays for your coffee addiction. It’s a reminder that while shooting hoops is fun, hitting the books is essential."))