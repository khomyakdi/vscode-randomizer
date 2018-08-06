export class LocalRandom{
    public static getRandomNumOnRange(min:number,max:number):number{
        return  Math.round(Math.random()*(max-min)+min);
    }
    public static getRandomRGB():string{
        return `rgb(${this.getRandomNumOnRange(0,255)}, ${this.getRandomNumOnRange(0,255)}, ${this.getRandomNumOnRange(0,255)})`;
    }
    public static getRandomHexColor():string{
        let r = this.getRandomNumOnRange(0,255).toString(16);
        let g = this.getRandomNumOnRange(0,255).toString(16);
        let b = this.getRandomNumOnRange(0,255).toString(16);

        return `#${r+""+g+""+b+""}`;
    }
}