import {values} from 'lodash';

export const toArray = (object) => {
    if (typeof object == "object")
        return values(object);
}