export class LocalRandom{
    public static getRandomNumOnRange(min:number,max:number):number{
        return  Math.round(Math.random()*(max-min)+min);
    }
    public static getRandomRGB():string{
        return `rgb(${this.getRandomNumOnRange(0,255)}, ${this.getRandomNumOnRange(0,255)}, ${this.getRandomNumOnRange(0,255)})`;
    }
    public static getRandomHexColor():string{
        return "#"+this.getRandomNumOnRange(0,255).toString(16)+
                    this.getRandomNumOnRange(0,55).toString(16)+
                    this.getRandomNumOnRange(0,255).toString(16);
    }
}