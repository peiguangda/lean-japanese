import {isEmpty, values} from 'lodash';

export const toArray = (object) => {
    if (typeof object == "object")
        return values(object);
}

export const convert = (object) => {
    if (isEmpty(object)) {
        return object;
    }
    else return toArray(object).map((value, index) => {
        if (!value) return value;
        let {list_answer, list_correct_answer} = value;
        if (list_answer) value.list_answer = toArray(list_answer);
        if (list_correct_answer) value.list_correct_answer = toArray(list_correct_answer).map(num => Number(num));
        return value;
    })
}
