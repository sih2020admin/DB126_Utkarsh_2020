import fs from 'fs-extra'

export class IPFile{
    create(server:boolean,path:string){
        var ip_object:string =''
        if(server === true){
            for (var i in process.env) {
                if (i.includes('PORT')) {
                    ip_object = ip_object + `var IP${i.split('T')[1]}='http://${process.env.ADDRESS}:${process.env[i]}'\n`
                }
            }
        }
        else{
           for (var i in process.env) {
                if (i.includes('PORT')) {
                    ip_object = ip_object + `var IP${i.split('T')[1]}='http://localhost:${process.env[i]}'\n`
                }
            }
        }
        fs.writeFileSync("public/javascript/IP.js", ip_object)

    }
}