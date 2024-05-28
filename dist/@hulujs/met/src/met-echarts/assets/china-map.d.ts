export declare const chinaGeoJSON: (direction: 'vertical' | 'horizontal') => {
    type: string;
    features: ({
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][][];
        };
        properties: {
            adchar: string;
            adcode: string;
            name: string;
        };
    } | {
        type?: undefined;
        geometry?: undefined;
        properties?: undefined;
    } | {
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][];
        };
        properties: {
            acroutes: number[];
            adcode: number;
            center: number[];
            centroid: number[];
            childrenNum: number;
            level: string;
            name: string;
            parent: {
                adcode: number;
            };
            subFeatureIndex: number;
        };
    } | {
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][][];
        };
        properties: {
            acroutes: number[];
            adcode: number;
            center: number[];
            centroid: number[];
            childrenNum: number;
            level: string;
            name: string;
            parent: {
                adcode: number;
            };
            subFeatureIndex: number;
        };
    } | {
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][][];
        };
        properties: {
            acroutes: number[];
            adcode: number;
            center: number[];
            childrenNum: number;
            level: string;
            name: string;
            parent: {
                adcode: number;
            };
            subFeatureIndex: number;
            centroid?: undefined;
        };
    })[];
};
