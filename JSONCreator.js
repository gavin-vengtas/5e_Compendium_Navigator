const fs = require('fs');
const data = require("./bestiary.json");

let traitJSON = {
    "compendium": {
        trait:{

        }
    }
};

data.compendium.monster.forEach((monster) => {
    console.log(monster.name);
    if(monster.trait){
            //read each available trait
            monster.trait.forEach((element) => {
                let description = "";
                let fullNamesArr = monster.name.split(" ");
                let totalNames = fullNamesArr.length-1;
                traitJSON.compendium.trait[element.name] = traitJSON.compendium.trait[element.name]?traitJSON.compendium.trait[element.name]:[];
                //combine lines and append to traitJSON
                element.text.forEach((sentence)=>{
                    if (sentence) {
                        description += sentence + "\n";                        
                    }
                });

                if(totalNames>0){
                    for(let index = 0; index < totalNames; index++){
                        description = description.replace(new RegExp(fullNamesArr[index]+" ","g"),"");
                        description = description.replace(new RegExp(fullNamesArr[index].toLocaleLowerCase()+" ","g"),"");
                    }
                }

                description = description.replace(new RegExp(fullNamesArr[totalNames],"g"),"creature");
                description = description.replace(new RegExp(fullNamesArr[totalNames].toLocaleLowerCase(),"g"),"creature");

                console.log(description);

                traitJSON.compendium.trait[element.name].push(description);
            });
        }
});     

fs.writeFile('traits2.json', JSON.stringify(traitJSON), 'utf8', ()=>{
    console.log('Written to file: traits.json');
});

// console.log(spellJSON);

