module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage", 
                "corejs": 3 
            }
        ],
        [
            "@babel/preset-typescript",
            {
                allExtensions: true, //支持所有文件扩展名，很关键
            },
        ],
    ]
}