const bestiary = require('./bestiary.json');
const magic = require('./magic.json');
var damageType = {
    acid:{
        count:0,
        monsters:[]
    }, 
    bludgeoning:{
        count:0,
        monsters:[]
    }, 
    cold:{
        count:0,
        monsters:[]
    }, 
    fire:{
        count:0,
        monsters:[]
    }, 
    force:{
        count:0,
        monsters:[]
    }, 
    lightning:{
        count:0,
        monsters:[]
    }, 
    necrotic:{
        count:0,
        monsters:[]
    }, 
    piercing:{
        count:0,
        monsters:[]
    }, 
    poison:{
        count:0,
        monsters:[]
    }, 
    psychic:{
        count:0,
        monsters:[]
    }, 
    radiant:{
        count:0,
        monsters:[]
    }, 
    slashing:{
        count:0,
        monsters:[]
    }, 
    thunder:{
        count:0,
        monsters:[]
    }
}
var traitList = [];
var attackList = [];
var legendaryList = [];


//displayDamageTypeData();
// console.log(Object.keys(magic.compendium).length);

bestiary.compendium.monster.forEach((monster)=>{
    
})

function displayDamageTypeData() {
    for (const [key, value] of Object.entries(damageType)) {
        console.log(`${key} damage: `+ value.count);
        // console.log("Monsters:");
        // value.monsters.forEach((element,index)=>{
        //     console.log("    "+(index+1)+". "+element);
        // });
    }
}

//add data to damageType object for each monster in the compendium
function loadDamageType(){
    bestiary.compendium.monster.forEach((monster) => {
        let found = {
            acid:false, 
            bludgeoning:false, 
            cold:false, 
            fire:false, 
            force:false, 
            lightning:false, 
            necrotic:false, 
            piercing:false, 
            poison:false,
            psychic:false, 
            radiant:false, 
            slashing:false, 
            thunder:false
        };
    
        //check monster traits
        // if(monster.trait){
        //     //read each available action
        //     monster.trait.forEach((action) => {
        //         for (const [key, value] of Object.entries(damageType)) {
        //             //returns true if action description contains damage type
        //             let hasDamage = (action.text[0].search(new RegExp(`${key}`))!=-1);
    
        //             //iterate damage counter and add monster name if it hasnt been added already
        //             if(hasDamage&&!found[key]){
        //                 damageType[key].count ++;
        //                 damageType[key].monsters.push(monster.name+` (CR ${monster.cr})`);
        //                 found[key]=true;
        //             }
        //         }
        //     });
        // }
    
        //check monster action list if available
        if(monster.action){
            //read each available action
            monster.action.forEach((action) => {
                for (const [key, value] of Object.entries(damageType)) {
                    //returns true if action description contains damage type
                    let hasDamage = (action.text[0].search(new RegExp(`${key} damage`))!=-1);
    
                    //iterate damage counter and add monster name if it hasnt been added already
                    if(hasDamage&&!found[key]){
                        damageType[key].count ++;
                        damageType[key].monsters.push(monster.name+` (CR ${monster.cr})`);
                        found[key]=true;
                    }
                }
            });
        }
    
        //check monster Legendary action list
        if(monster.legendary){
            //read each available action
            monster.legendary.forEach((action) => {
                for (const [key, value] of Object.entries(damageType)) {
                    //returns true if action description contains damage type
                    let hasDamage = (action.text[0].search(new RegExp(`${key} damage`))!=-1);
    
                    //iterate damage counter and add monster name if it hasnt been added already
                    if(hasDamage&&!found[key]){
                        damageType[key].count ++;
                        damageType[key].monsters.push(monster.name+` (CR ${monster.cr})`);
                        found[key]=true;
                    }
                }
            });
        }
    
        //check monster reaction list
        if(monster.reaction&&!monster.reaction!=[]){
            //read each available action
            monster.reaction.text.forEach((action) => {
                for (const [key, value] of Object.entries(damageType)) {
                    //returns true if action description contains damage type
                    let hasDamage = (action.search(new RegExp(`${key} damage`))!=-1);
    
                    //iterate damage counter and add monster name if it hasnt been added already
                    if(hasDamage&&!found[key]){
                        damageType[key].count ++;
                        damageType[key].monsters.push(monster.name+` (CR ${monster.cr})`);
                        found[key]=true;
                    }
                }
            });
        }
    
        //check monster spells
    });
}