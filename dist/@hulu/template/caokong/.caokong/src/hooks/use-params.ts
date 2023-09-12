import { map, tryNumber } from '@hulu/mu';
import { useParams as _useParams } from 'react-router-dom';

const useParams = (isTryNumber: boolean = true) => {
    const params = _useParams();
    return map(params, (value) => {
        return isTryNumber ? tryNumber(value) : value;
    });
};

export { useParams };
