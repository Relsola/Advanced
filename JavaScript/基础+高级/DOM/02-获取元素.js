// id选择器
document.getElementById('1')

// 标签名选择器  得到一个伪数组 可以通过索引获取我们想要的元素
document.getElementsByTagName('div')

// 通过类名获取元素
document.getElementsByClassName('item')

// 通过选择器来选择元素  
document.querySelector('#box1') // 只能找到第一个元素
document.querySelectorAll('ul li') // 获取所有符合条件的元素 是一个伪数组
