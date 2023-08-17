const arr = [7, 124, 2, 2, 6, 12, 2, 8, 4];

// 冒泡排序---------------------------------------------
{
    function bubbleSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let k = i + 1; k < arr.length; k++)
                if (arr[i] > arr[k]) {
                    arr[i] ^= arr[k];
                    arr[k] ^= arr[i];
                    arr[i] ^= arr[k];
                }
        }
        return arr;
    }
    console.log(bubbleSort([...arr]));
}

// 选择排序---------------------------------------------
{
    function selectionSort(arr) {
        let n = arr.length, min = 0
        for (let i = 0; i < n; i++) {
            // 预设最小数的索引为当前循环的索引
            min = i;
            // 在后面的数中寻找更小的数
            for (let j = i + 1; j < n; j++)
                // 如果找到更小的数，记录它的索引
                if (arr[j] < arr[min]) min = j;

            // 如果当前循环的索引不是最小数的索引，交换它们
            if (i !== min) [arr[i], arr[min]] = [arr[min], arr[i]];
        }
        // 返回排序后的数组
        return arr;
    }
    console.log(selectionSort([...arr]));
}

// 插入排序---------------------------------------------
{
    function insertSort(arr) {
        let pre, cur;

        for (let i = 1; i < arr.length; i++) {
            cur = arr[i];
            pre = i - 1;
            while (pre >= 0 && arr[pre] > cur) arr[pre + 1] = arr[pre--];
            arr[pre + 1] = cur;
        }
        return arr
    }
    console.log(insertSort([...arr]));
}

// 快速排序---------------------------------------------
{
    function quickSort(arr) {
        const sort = (left, right) => {
            if (left >= right) return
            // 取出基准数
            const base = arr[left];
            let l = left, r = right;

            while (l < r) {
                // 从右边开始搜索，直到找到比基准数小的数
                while (l < r && arr[r] >= base) r--;
                // 如果找到了，则将该数存放在左边
                if (l < r) arr[l] = arr[r];

                // 从左边开始搜索，直到找到比基准数大的数
                while (l < r && arr[l] <= base) l++;
                // 如果找到了，则将该数存放在右边
                if (l < r) arr[r] = arr[l]
            }
            arr[l] = base;
            sort(left, l - 1);
            sort(l + 1, right);
        }

        sort(0, arr.length - 1)
        return arr
    }

    function quickSort2(arr) {
        const quick = (arr) => {
            if (arr.length < 2) return arr;
            const index = arr.length >> 1;
            const left = [], right = [];
            const num = arr.splice(index, 1);
            for (const item of arr) {
                if (item < num) left.push(item);
                else right.push(item);
            }
            return quick(left).concat(num, quick(right));
        }
        return quick(arr);
    }

    console.log(quickSort([...arr]));
}

// 堆排序---------------------------------------------
{
    const heapSort = (arr) => {
        const n = arr.length;

        function swap(a, b) {
            arr[a] ^= arr[b]; arr[b] ^= arr[a]; arr[a] ^= arr[b];
        }

        function adjustHeap(dad, end) {
            let son = (dad << 1) + 1;
            if (son >= end) return;
            if (son + 1 < end && arr[son] < arr[son + 1]) son++;
            if (arr[dad] <= arr[son]) {
                swap(dad, son)
                adjustHeap(son, end);
            }
        }

        for (let i = (n >> 1) - 1; i >= 0; i--) adjustHeap(i, n);

        for (let k = n - 1; k > 0; k--) {
            swap(0, k)
            adjustHeap(0, k);
        }

        return arr
    }
    console.log(heapSort([...arr]));
}

// 归并排序---------------------------------------------
{
    const mergeSort = (arr) => {
        const merge = (left, right) => {
            const result = [], ln = left.length, rn = right.length;
            let l = 0, r = 0;

            while (l < ln && r < rn) {
                if (left[l] < right[r]) result.push(left[l++]);
                else result.push(right[r++]);
            }

            while (l < ln) result.push(left[l++]);

            while (r < rn) result.push(right[r++]);

            return result;
        };

        const mergeSort = arr => {
            const n = arr.length;
            if (n <= 1) return arr;
            const mid = n >> 1;
            const left = arr.slice(0, mid);
            const right = arr.slice(mid, n);
            return merge(mergeSort(left), mergeSort(right));
        };

        return mergeSort(arr);
    };

    console.log(mergeSort([...arr]));
}

// 希尔排序 ---------------------------------------------
{
    const shellSort = (arr) => {
        // 定义增量, 每次分组, 增量为数组长度的一半
        let gap = arr.length >> 1
        while (gap > 0) {
            for (let i = gap; i < arr.length; i++) {
                // 获取当前元素
                let cur = arr[i];
                let j = i;
                // 将相邻元素比较, 满足条件就后移
                while (j >= gap && arr[j - gap] > cur) {
                    arr[j] = arr[j - gap]
                    j -= gap
                }
                // 将当前元素插入合适的位置
                arr[j] = cur;
            }
            // 每次递减增量, 直到为1
            gap = gap >> 1;
        }
        return arr
    }
    console.log(shellSort([...arr]));
}

// 计数排序 ---------------------------------------------
{
    const countingSort = arr => {
        let n = arr.length;
        // 计算数列最大值和最小值
        let max = arr[0], min = arr[0];
        for (const item of arr) {
            if (item > max) max = item;
            if (item < min) min = item;
        }

        // 统计数列中每个值出现的次数
        const count = Array(max - min + 1).fill(0);
        for (const item of arr) count[item - min]++;

        // 累加数组
        for (let i = 1, n = count.length; i < n; i++) {
            count[i] += count[i - 1]
        }

        // 从后向前遍历原始数组，按照统计数组中的位置放置元素
        const result = new Array(n);
        for (let i = n - 1; i >= 0; i--) {
            result[--count[arr[i] - min]] = arr[i];
        }
        return result
    }
    console.log(countingSort([...arr]));
}

// 桶排序 ---------------------------------------------
{
    const bucketSort = (arr, bucketSize = 5) => {
        if (arr.length === 0) return arr;

        // 找到数组中的最大值和最小值
        let max = arr[0], min = arr[0];
        for (const item of arr) {
            if (item > max) max = item;
            if (item < min) min = item;
        }

        // 计算桶的数量
        const bucketCount = ~~((max - min) / bucketSize) + 1
        const buckets = new Array(bucketCount).fill(0).map(_ => []);

        // 将数组中的元素分配到各个桶中
        for (const item of arr)
            buckets[~~((item - min) / bucketSize)].push(item);

        // 对每个桶中的元素进行排序
        arr.length = 0;
        for (const item of buckets)
            if (item.length > 0)
                for (const element of insertSort(item)) arr.push(element);
        return arr

        // 插入排序
        function insertSort(arr) {
            let pre, cur;

            for (let i = 1; i < arr.length; i++) {
                cur = arr[i];
                pre = i - 1;
                while (pre >= 0 && arr[pre] > cur) arr[pre + 1] = arr[pre--];
                arr[pre + 1] = cur;
            }
            return arr
        }
    }
    console.log(bucketSort([...arr]));
}

// 基数排序 ---------------------------------------------
{
    const radixSort = (arr) => {
        // 获取数字的位数
        function getDigitCount(num) {
            return num === 0 ?
                1 : ~~Math.log10(Math.abs(num)) + 1
        }

        // 获取数字的第i位数字
        function getDigit(num, i) {
            return (Math.abs(num) / Math.pow(10, i)) >> 0 % 10
        }

        // 获取最大位数
        function getMaxDigit(arr) {
            let max = 0;
            for (const item of arr)
                max = Math.max(getDigitCount(item), max)
            return max;
        }

        const maxDigit = getMaxDigit(arr); // 获取最大位数

        for (let i = 0; i < maxDigit; i++) {
            let buckets = []; // 创建桶
            for (const item of arr) {
                const digit = getDigit(item, i) // 获取数字的第i位数字
                // 将数字放入相应的桶中
                if (buckets[digit] === undefined) buckets[digit] = []
                buckets[digit].push(item)
            }
            // 将桶中的数字取出来，重新放入arr数组中
            arr = buckets.flat()
        }
        return arr;
    }
    console.log(radixSort([...arr]));
}

// 鸡尾酒排序
{
    const cocktailSort = arr => {
        let i
        let left = 0
        let right = arr.length - 1
        while (left < right) {
            for (i = left; i < right; ++i)
                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                }
            right--
            for (i = right; i > left; --i)
                if (arr[i - 1] > arr[i]) {
                    [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
                }
            left++
        }
        return arr
    }
}

// 睡眠排序（sleepSort）---------------------------------------------
{
    const sleepSort = (arr) => {
        arr.forEach(item => {
            arr.push(item)
            setTimeout(() => { }, item * 100)
        })
    }
}