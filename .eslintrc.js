module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': 'standard',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'globals': {
        'IS_DEVELOPMENT': 'readonly'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
