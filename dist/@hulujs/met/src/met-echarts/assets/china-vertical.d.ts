declare const chinaVerticalGeoJson: {
    type: string;
    features: ({
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
            adchar?: undefined;
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
            adchar?: undefined;
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
            adchar?: undefined;
        };
    } | {
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][][];
        };
        properties: {
            adchar: string;
            adcode: string;
            name: string;
            acroutes?: undefined;
            center?: undefined;
            centroid?: undefined;
            childrenNum?: undefined;
            level?: undefined;
            parent?: undefined;
            subFeatureIndex?: undefined;
        };
    })[];
};
export default chinaVerticalGeoJson;
