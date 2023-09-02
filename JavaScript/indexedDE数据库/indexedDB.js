// 前端存储方式

/*
  1. cookie
    一般由服务器生成，可以设置过期时间；前端采用和js-cookie等组件也可以生成
    数据存储大小4K
    每次都会携带在请求的header 中，对于请求性能有影响；同时由于请求中都带有，所以也容易出现安全问题
    字符串键值对在本地存储数据

  2. localStorage
    除非被清理，否则一直存在；浏览器关闭还会保存在本地，但是不支持跨浏览器
    数据存储大小5M
    不参与服务端通信
    字符串键值对在本地存储数据

  3. sessionStorage
    页面关闭就清理刷新依然存在，不支持跨页面交互
    数据存储大小5M
    不参与服务端通信
    字符串键值对在本地存储数据

  4. indexedDB
    除非被清理，否则一直存在
    不限制大小
    不参与服务端通信
    IndexedDB 是一个非关系型数据库（不支持通过 SQL 语句操作）。可以存储大量数据，提供接口来查询，还可以建立索引，这些都是其他存储方案无法提供的能力。
*/


/*
  IndexedDB介绍   IndexedDB 属于非关系型数据库。（不支持SQL查询）
    特点:
      1. 键值对储存 所有类型的数据都可以直接存入，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。

      2. 异步 IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作

      3. 支持事务(transaction)，这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。

      4. 同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。

      5. 支持二进制储存 IndexedDB 不仅可以储存字符串，还可以储存二进制数(ArrayBuffer 对象和 Blob 对象)。

      6. 储存空间大，一般来说不少于 250MB，甚至没有上限。储存位置为 C:\Users\当前用 户\AppData\Local\Google\Chrome\User Data\Default\IndexedDB


    核心概念：
      1. 数据库：IDBDatabase 对象，数据库有版本概念，同一时刻只能有一个版本，每个域名可以建多个数据库

      2. 对象仓库：IDBObjectStore 对象，类似于关系型数据库的表格

      3. 索引： IDBIndex 对象，可以在对象仓库中，为不同的属性建立索引，主键建立默认索引

      4. 事务： IDBTransaction 对象，增删改查都需要通过事务来完成，事务对象提供了error,abort,complete三个回调方法，监听操作结果

      5. 操作请求：IDBRequest 对象

      6. 指针： IDBCursor 对象

      7. 主键集合：IDBKeyRange 对象，主键是默认建立索引的属性，可以取当前层级的某个属性，也可以指定下一层对象的属性，还可以是一个递增的整数
*/


// 基础操作 --------------------------------------------------
{
    // 1. 创建数据库 & 新建表和索引

    // 数据仓库的名字 数据仓库的版本 打开数据库，若没有则会创建
    const request = window.indexedDB.open('group', 1);

    // 数据仓库打开失败
    request.onerror = err => { console.log('IndexedDB 打开失败', err) };

    // 数据仓库打开成功
    request.onsuccess = res => {
        console.log('IndexedDB 打开成功', res);
        db = res.target.result;
    };

    // 数据仓库升级事件(第一次新建库是也会触发，因为数据仓库从无到有算是升级了一次)
    request.onupgradeneeded = res => {
        console.log('IndexedDB 升级成功', res);
        db = res.target.result;
        // 创建存储库
        db_table = db.createObjectStore('group', {
            keyPath: 'id', // 这是主键
            autoIncrement: true // 实现自增
        });
        // 创建索引，在后面查询数据的时候可以根据索引查
        db_table.createIndex('indexName', 'name', { unique: false });
    };

    // 关闭数据库
    db.close();

    // 删除数据库
    const deleteRequest = window.indexedDB.deleteDatabase(dbName);
    deleteRequest.onerror = err => { console.log("删除失败", err) };
    deleteRequest.onsuccess = res => { console.log("删除成功", res) };
}




{
    // 2. 新增数据 (在打开回调中执行)

    // 数据仓库的数组 写入模式
    const store = db.transaction(['group'], 'readwrite').objectStore('group');

    // add方法添加数据
    const request = store.add({
        id: 1,
        name: '张三',
        age: 17,
        email: 'XXXX@xxx.com',
    });

    // 添加成功
    request.onsuccess = res => { console.log('数据添加成功', res) };

    // 添加失败
    request.onerror = err => { console.log('数据添加失败', err) };
}


{
    // 3. 读取数据 (在打开回调中执行)

    // 数据仓库的数组 
    const store = db.transaction(['group']).objectStore('group');

    // 方法获取数据  数据的主键
    const request = store.get(1);

    // 获取成功
    request.onsuccess = res => {
        if (res.target.result !== undefined)
            console.log('数据获取成功', res.target.result);
        else
            console.log('未获取到数据');
    };

    // 获取失败
    request.onerror = err => { console.log('数据获取失败', err) };
}

{
    // 4. 更新数据 (在打开回调中执行)

    // 数据仓库的数组  写入模式
    const store = db.transaction(['group'], 'readwrite').objectStore('group');

    // put方法根据主键更新数据  主键不存在就是新增
    const request = store.put({
        id: 1,
        name: '张' + ~~(Math.random() * 10),
        age: 24,
        email: 'zhangsan@example.com',
    });

    // 更新成功
    request.onsuccess = res => { console.log('数据更新成功', res) };

    // 更新失败
    request.onerror = err => { console.log('数据更新失败', err) };
}

{
    // 5. 删除数据 (在打开回调中执行)

    // 数据仓库的数组
    const store = db.transaction(['group'], 'readwrite').objectStore('group');

    // delete方法根据主键删除数据
    const request = store.delete(1);

    // 删除成功
    request.onsuccess = res => { console.log('数据删除成功', res) };

    // 删除失败
    request.onerror = err => { console.log('数据删除失败', err) };
}

{
    // 6. 使用索引 (在打开回调中执行)

    // 数据仓库的数组
    const store = db.transaction(['group']).objectStore('group');

    // index方法获取索引对象  get方法获取数据  数据的索引
    const request = store.index('indexName').get('张四');

    // 获取成功
    request.onsuccess = event => {
        console.log('通过索引获取数据成功', event.target.result)
    };

    // 获取失败
    request.onerror = err => { console.log('通过索引获取数据失败', err) };
}

{
    // 7. 获取整张表所有的data (在打开回调中执行)

    const store = db.transaction(['group']).objectStore('group');
    const request = store.getAll();

    // 更新成功
    request.onsuccess = event => {
        console.log('indexedDB getAll:', event.target.result);
    };

    // 更新失败
    request.onerror = err => { console.log('indexedDB getAll:', err) };
}


{
    // 8. 根据指定条件获取data
    /*
      IDBKeyRange 对象
        - lowerBound  指定范围的下限
        - upperBound  指定范围的上限
        - boundBound  指定范围的上下限
        - onlyBound  指定范围中只有一个值
    */

    const r1 = IDBKeyRange.upperBound(x); // All keys <= x
    const r2 = IDBKeyRange.upperBound(x, true); // All keys < x
    const r3 = IDBKeyRange.lowerBound(y); // All keys >= x
    const r4 = IDBKeyRange.lowerBound(y, true); // All keys > x
    const r5 = IDBKeyRange.bound(x, y); // All keys >= x && <= y
    const r6 = IDBKeyRange.bound(x, y, true, true); // All keys > x && < y


    const store = db.transaction(['group']).objectStore('group');
    // 获取id名称小于当前时间的所有data
    const request = store.getAll(IDBKeyRange.upperBound(+new Date()));

    // 更新成功
    request.onsuccess = function (event) {
        console.log('indexedDB getAll:', event.target.result);
    };

    // 更新失败
    request.onerror = err => { console.log('indexedDB getAll:', err) };
}



// 业务中优雅使用 --------------------------------------------
{
    //  1. 创建数据的时候就以时间戳+失效时间来约定id规则 定期删除失效数据

    // 例如十分钟失效
    new Date.getTime() + 10 * 60 * 1000;

    const store = db.transaction(['group'], 'readwrite').objectStore('group');
    const request = store.getAll(IDBKeyRange.upperBound(+new Date()));

    // 更新成功
    request.onsuccess = res => {
        const data = res.target.result;
        data.forEach(item => {
            const deleteRequest = store.delete(item.id);
            // 删除成功
            deleteRequest.onsuccess = res => { console.log('数据删除成功', res) };

            // 删除失败
            deleteRequest.onerror = err => { console.log('数据删除失败', err) };
        });
    };

    // 更新失败
    request.onerror = err => { console.log(err) };
}

{
    // 2. 批量添加数据

    const TestData = []

    /**
    * 添加数据
    * @param {array} docs 要添加数据
    * @param {string} objName 仓库名称
    */
    function addData(docs, objName) {
        if (!(docs instanceof Array && docs.length !== 0))
            throw new Error('docs must be a array!')

        return openIndexedDB().then(db => {
            const tx = db.transaction([objName], 'readwrite')
            tx.oncomplete = e => {
                console.log('tx:addData onsuccess', e)
                return Promise.resolve(docs)
            }
            tx.onerror = e => {
                e.stopPropagation()
                console.error('tx:addData onerror', e.target.error)
                return Promise.reject(e.target.error)
            }
            tx.onabort = e => {
                console.warn('tx:addData abort', e.target)
                return Promise.reject(e.target.error)
            }
            const obj = tx.objectStore(objName)
            docs.forEach(doc => {
                const req = obj.add(doc)
                // req.onsuccess = e => console.log('obj:addData onsuccess', e.target)
                req.onerror = e => {
                    console.error('obj:addData onerror', e.target.error)
                }
            })
        })
    }

    addData(TestData, OB_NAMES.UseKeyGenerator)
        .then(() => addData(TestData, OB_NAMES.UseKeyPath))
}

// 其他 ................................................
{
    // 第三方库 localForage 推荐....   Dexie.js。 基于 IndexedDB 封装的库

    // 用户使用日志收集

    //  request层封装，对不长更新接口缓存

    // 大文件上传，分片，避免网络失败，刷新页面等导致中断问题
}