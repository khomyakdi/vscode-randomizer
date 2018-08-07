import * as request from 'request';

export class RandomOrg {
    public static getRandomNumOnRange(min: number, max: number): any {

        return this.RandomIntegerFromAPIService(min, max, 1, 10);
    }
    
    public static getRandomRGB(): any {
        return this.RandomIntegerFromAPIService(0, 255, 3, 10);
    }
    public static getRandomHexColor(): any {
        return this.RandomIntegerFromAPIService(0, 255, 3, 16);
    }
    private static getRandomIntegerFromAPI(min: number, max: number, dataCount: number, base: number):any{
        let promiseFromService = this.RandomIntegerFromAPIService(min,max,dataCount,base);
        return promiseFromService;
    }
    private static RandomIntegerFromAPIService(min: number, max: number, dataCount: number, base: number) {
        let promise = new Promise(function(resolve,reject){

            let requestUrl =`https://www.random.org/integers/?num=${dataCount}&min=${min}&max=${max}&col=1&base=${base}&format=plain&rnd=new`;
            
            request.get(requestUrl,null,(error,response,body)=>{
                if(response.statusCode!=200){
                    reject();
                };
                let requiredData = (base != 10)?body.split('\n').map((line)=>{return line}):body.split('\n').map((line)=>{return parseInt(line)});
                requiredData.pop();
                resolve(requiredData);
            });
        });
        return promise;

    }

}
