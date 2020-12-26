addLayer("T", {
    name: "Transistor", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(8), // Can be a function that takes requirement increases into account
    resource: "Transistors", // Name of prestige currency
    baseResource: "bits", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
            if(hasUpgrade(this.layer,11)){
            if(getBuyableAmount(this.layer,11).gte(1)){
                return new Decimal.add(1,Decimal.mul(0.5,Decimal.add(Decimal.mul(0.1,getBuyableAmount(this.layer, 11))-0.05,1)))
            }else{
                return new Decimal(1.5);
            }
        }else{
            if(getBuyableAmount(this.layer,11).gte(1)){
                return new Decimal.add(1,Decimal.mul(0.5,Decimal.add(Decimal.mul(0.1,getBuyableAmount(this.layer, 11)),1)))
            }else{
                return new Decimal(1.5);
            }
        }
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        if(hasUpgrade(this.layer,11)==true){
            var mult=new Decimal(3)
            return mult
        }else{
            var mult = new Decimal(1)
            return mult
        }
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Convert your bits into transistors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    buyables:{
        rows:1,
        cols:1,
        11:{
            title:"Micro Bots",
            display() { return "<p>Make the data conversion more efficient\n</p>"+"Cost: "+this.cost(); },
            canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount(this.layer, this.id))) },
            description:"Make the data conversion more efficient",
            cost(x) { 
                if(layers.T.exponent().lte(3)){
                    return new Decimal.round(Decimal.pow(new Decimal(1.5).mul(x || getBuyableAmount(this.layer, this.id)),2)) 
                }else{
                    return new Decimal.round(Decimal.pow(new Decimal(1.5).mul(x || getBuyableAmount(this.layer, this.id)),4))
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        }
    },
    upgrades:{
        rows:1,
        cols:4,
        11:{
            title:"Core Computing",
            display(){ return "<h3>Triple bit rate, but make data transfer worse\n</h3>"+"Cost: "+this.cost},
            cost:new Decimal(10)
        }
    }
})
