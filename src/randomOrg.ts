export class RangomOrg{
    public static getRandomNumOnRange(min:number,max:number):number{
        return 0;
    }
    public static getRandomRGB():string{
        return `rgb(${this.getRandomNumOnRange(0,255)}, ${this.getRandomNumOnRange(0,255)}, ${this.getRandomNumOnRange(0,255)})`;
    }
}