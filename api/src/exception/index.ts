import { any } from "sequelize/types/lib/operators"
import codes from "./codes"
function exception (code:number,data?:any):string{
    const res = {
        code: code,
        data: data,
        message:codes[code]
    }
    return JSON.stringify(res)
}

export default exception