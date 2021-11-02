import { ModelBase } from "../../../bases/model.base";

import { CoreDocument } from "../../../types/model.type";



export interface LocalAuthDocument extends CoreDocument {
    uid: number;
    account: string;
    password: {
        salt: string;
        hash: string;
    }
}

// export class LocalAuthModel extends ModelBase implements LocalAuthDocument {

// }