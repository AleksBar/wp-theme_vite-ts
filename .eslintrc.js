module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:@wordpress/eslint-plugin/esnext',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [ 'react', '@typescript-eslint', 'react-hooks' ],
    rules: {
        'linebreak-style': 'off',
        'react/jsx-indent': [ 2, 4 ],
        'react/jsx-indent-props': [ 2, 4 ],
        'no-plusplus': 'off',
        indent: [ 2, 4 ],
        'react/jsx-filename-extension': [
            2,
            { extensions: [ '.js', '.jsx', '.tsx' ] },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off',
        'react/no-danger': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'max-len': [ 'error', { ignoreComments: true, code: 140 } ],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'off', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies,
        'no-param-reassign': 'off',
        'no-prototype-builtins': 'off',
        'no-unused-expressions': 'off',
        'arrow-body-style': 'off',
        camelcase: 'off',
    },
    globals: {
        __IS_DEV__: true,
        __API__: 'readonly',
        __HOST__: 'readonly',
        __PORT__: 'readonly',
        __PATH_TO_THEMES__: 'readonly',
        __PATH_TO_SPRITE__: 'readonly',
        __THEME_NAME__: 'readonly',
        __USER_LOGIN__: 'readonly',
        __USER_KEY__: 'readonly',
        site: 'readonly',
        __WebpackModuleApi: 'readonly',
        wp: 'readonly',
    },
    overrides: [
        {
            files: [ '**/src/**/*.{test,stories}.{ts,tsx}' ],
            rules: {
                'max-len': 'off',
            },
        },
    ],
};