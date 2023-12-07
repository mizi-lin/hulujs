export default function ifnvl(value, nullInstead, nilInstead) {
    return value === undefined || value === null ? nullInstead : nilInstead ?? value;
}
