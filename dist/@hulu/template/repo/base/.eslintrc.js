module.exports = {
    extends: [
        'alloy',
        'alloy/react'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    env: {
        browser: true
    },
    globals: {
        HULU: false
    },
    rules: {
        // 如果一个变量不会被重新赋值，则使用const声明
        'prefer-const': 'error',
        'no-invalid-this': 'off',
        'no-unused-vars': 'off',
        'max-nested-callbacks': ['error', 5],
        'max-params': ['error', 5],
        '@typescript-eslint/no-unused-vars': 'off'
    }
};