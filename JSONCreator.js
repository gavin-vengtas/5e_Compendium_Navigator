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
                let traitName = element.name;
                let description = buildDescription(element.text);
                let fullNamesArr = monster.name.split(" ");
                let totalNames = fullNamesArr.length-1;
                let spellLevel = findOrdinals(description);
                console.log(spellLevel);

                if (traitName=="Spellcasting") {
                    traitJSON.compendium.trait[traitName] = traitJSON.compendium.trait[traitName]?traitJSON.compendium.trait[traitName]:{};
                    traitJSON.compendium.trait[traitName][spellLevel] = traitJSON.compendium.trait[traitName][spellLevel] ?? [];

                } else {
                    traitJSON.compendium.trait[traitName] = traitJSON.compendium.trait[traitName]?traitJSON.compendium.trait[traitName]:[];
                }

                if(totalNames>0){
                    for(let index = 0; index < totalNames; index++){
                        description = description.replace(new RegExp(fullNamesArr[index]+" ","g"),"");
                        description = description.replace(new RegExp(fullNamesArr[index].toLocaleLowerCase()+" ","g"),"");
                    }
                }

                description = description.replace(new RegExp(fullNamesArr[totalNames],"g"),"creature");
                description = description.replace(new RegExp(fullNamesArr[totalNames].toLocaleLowerCase(),"g"),"creature");

                console.log(description);
                if (traitName!="Spellcasting") {                    
                    traitJSON.compendium.trait[traitName].push(description);
                } else {
                    traitJSON.compendium.trait[traitName][spellLevel].push(description);
                }
            });
        }
});

fs.writeFile('traits2.json', JSON.stringify(traitJSON), 'utf8', ()=>{
    console.log('Written to file: traits.json');
});

function findOrdinals(inputString) {
    // Use a regular expression to find all instances of ordinal numbers from '1st' to 'nth'
    const regex = /(\d+)(st|nd|rd|th)/g;
    const matches = inputString.match(regex);
  
    if (matches) {
      return matches[0]+"-level";
    } else {
      return 'No Spell Levels';
    }
  }

function buildDescription(textArr) {
    let description = "";

    textArr.forEach((sentence)=>{
        if (sentence) {
            description += sentence + "\n";                        
        }
    });

    return description;
}

// console.log(spellJSON);

