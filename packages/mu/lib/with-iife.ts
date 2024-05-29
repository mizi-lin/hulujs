function withIIFE(func) {
    func.iife = true;
    return func;
}

export default withIIFE;
