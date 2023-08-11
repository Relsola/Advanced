const arr = [7, 1, 2, 6, 9, 8, 4, 5, 3];

// 冒泡排序---------------------------------------------
{
    function bubbleSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let k = i + 1; k < arr.length; k++) {
                if (arr[i] > arr[k]) {
                    arr[i] ^= arr[k]; arr[k] ^= arr[i]; arr[i] ^= arr[k];
                }
            }
        }
        return arr;
    }
    console.log(bubbleSort([...arr]));
}

// 选择排序---------------------------------------------
{
    function selectionSort(arr) {
        let min;
        for (let i = 0, length = arr.length; i < length - 1; i++) {
            min = i
            for (let k = i + 1; k < length; k++) {
                if (arr[k] <= arr[min]) min = k;
            }
            arr[i] ^= arr[min]; arr[min] ^= arr[i]; arr[i] ^= arr[min];
        }
        return arr
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

        function maxHeapify(dad, end) {
            let son = dad * 2 + 1;
            if (son >= end) return;
            if (son + 1 < end && arr[son] < arr[son + 1]) son++;
            if (arr[dad] <= arr[son]) {
                swap(dad, son)
                maxHeapify(son, end);
            }
        }

        for (let i = (n >> 1) - 1; i >= 0; i--) maxHeapify(i, n);

        for (let k = n - 1; k > 0; k--) {
            swap(0, k)
            maxHeapify(0, k);
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