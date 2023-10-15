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
                let spellAbility = getSpellAbility(description);
                let spells = (traitName=="Spellcasting")?getDescrSpells(element.text):{};

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
                    traitJSON.compendium.trait[traitName][spellLevel].push({
                        "ability": spellAbility,
                        "spellsave DC": getDC(description),
                        "hit":getHit(description),
                        "description":description,
                        ...spells,
                    });
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
      return false;
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

function getDescrSpells(textArr){
    //returns object of spells
    let spells = {};
    let strLower = '';
    let spellArr = [];

    for(let index = 1; index < textArr.length; index++){
        if (textArr[index]) {
            strLower = textArr[index].toLocaleLowerCase();
            spellArr = strLower.split(":");
            if (strLower.match(/cantrips/)) {
                spells["cantrips"] = spells["cantrips"]??[];
                
                spellArr[1].split(",").forEach((element)=>{
                    spells["cantrips"].push(element.trim())
                });
            } else if(findOrdinals(strLower)&&spellArr[1]){
                spells[findOrdinals(strLower)]=spells[findOrdinals(strLower)]??[];

                spellArr[1].split(",").forEach((element)=>{
                    spells[findOrdinals(strLower)].push(element.trim())
                });
            }
        }
    }

    return spells;

}

function getSpellAbility(inputString) {
    let description = inputString.toLocaleLowerCase();
    let hasInt = description.search(/intelligence/)!=-1;
    let hasCha = description.search(/charisma/)!=-1;
    let hasWis = description.search(/wisdom/)!=-1;

    if (hasInt) {
        return 'intelligence';
    } else if(hasCha) {
        return 'charisma';        
    } else if(hasWis) {
        return 'wisdom';        
    } else {
        return 'No Spellcasting ability found';
    }
}

function getDC(inputString){
    const regex = /DC\s(\d+)/;
    const matches = inputString.match(regex);
  
    if (matches) {
      return matches[1];
    } else {
      return 'No DC Found';
    }   
}

function getHit(inputString){
    const regex = /\+\d+/;
    const matches = inputString.match(regex);
  
    if (matches) {
      return matches[0];
    } else {
      return 'No Hit Found';
    }   
}

// console.log(spellJSON);

