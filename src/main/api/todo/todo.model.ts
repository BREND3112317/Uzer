import { CoreDocument } from "../../../types/model.type";

const TodoSchema = {
    content: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        require: true
    }
}

export interface TodoDocument extends CoreDocument {
    content: string;
    completed: boolean;
}