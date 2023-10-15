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
                traitJSON.compendium.trait[element.name] = traitJSON.compendium.trait[element.name]?traitJSON.compendium.trait[element.name]:[];
                //combine lines and append to traitJSON
                element.text.forEach((sentence)=>{
                    description += sentence + "\n";
                });

                traitJSON.compendium.trait[element.name].push(description.replace(new RegExp(monster.name,"g"),"creature"));
            });
        }
});

fs.writeFile('traits.json', JSON.stringify(traitJSON), 'utf8', ()=>{
    console.log('Written to file: traits.json');
});

// console.log(spellJSON);

