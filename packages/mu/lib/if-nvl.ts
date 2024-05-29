export default function ifnvl(value: any, nullInstead: any, nilInstead?: any) {
    return value === undefined || value === null ? nullInstead : nilInstead ?? value;
}
