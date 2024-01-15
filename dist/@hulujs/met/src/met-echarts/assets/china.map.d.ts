declare const chinaGeoJson: {
    type: string;
    features: {
        type: string;
        properties: {
            adcode: number;
            name: string;
            center: number[];
            centroid: number[];
            childrenNum: number;
            level: string;
            parent: {
                adcode: null;
            };
        };
        geometry: {
            type: string;
            coordinates: number[][][][];
        };
    }[];
};
export default chinaGeoJson;
