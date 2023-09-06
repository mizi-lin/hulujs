import { isEmpty } from 'lodash-es';

const isNotEmpty = (value: string) => {
    return isEmpty(value);
};

export default isNotEmpty;
