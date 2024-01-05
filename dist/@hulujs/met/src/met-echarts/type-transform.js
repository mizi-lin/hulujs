const transformType = (type) => {
    switch (type) {
        case 'line':
            return 'line';
        case 'bar':
            return 'bar';
        case 'pie':
            return 'pie';
        case 'radar':
            return 'radar';
        case 'map':
            return 'map';
        case 'scatter':
            return 'scatter';
        case 'boxplot':
    }
};
export {};
