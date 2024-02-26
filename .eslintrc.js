module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
        'prettier',
        'plugin:security/recommended',
        'plugin:import/typescript',
    ],
    overrides: [],
    parserOptions: {
        project: ['tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'security'],
    rules: {
        'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'no-debugger': 'off',
        'no-console' : 'off',
        "react/prop-types": "off",
        "prefer-nullish-coalescing": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off"
    },
}
