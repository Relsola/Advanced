// .eslintrc.cjs
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        //  接入 prettier 的规则
        "prettier",
        "plugin:prettier/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        // 启用最新es语法
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue",
        // 加入 prettier 的 eslint 插件
        "prettier"
    ],
    "rules": {
        // 开启 prettier 自动修复的功能
        "prettier/prettier": "error",
        // 禁用对  any  类型的检查
        "@typescript-eslint/no-explicit-any": "off",
        // 禁用多词组件命名规则
        'vue/multi-word-component-names': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
        "storeToRefs": "readonly"
    }
}
