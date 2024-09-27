module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser', // Установлен парсер TypeScript
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'airbnb',
    // 'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended', // Добавлен плагин TypeScript
    'prettier/@typescript-eslint', // Отключает правила ESLint, которые конфликтуют с Prettier
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'index.js'], // Убраны относительные пути
  plugins: ['react', 'import', 'jsx-a11y', '@typescript-eslint'], // Добавлен плагин TypeScript
  rules: {
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/jsx-no-target-blank': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/button-has-type': 0,
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'unix'],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Отключаем требование явного определения типов для функций
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Игнорировать неиспользуемые аргументы, начинающиеся с "_"
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
