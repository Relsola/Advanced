// 消除 TS 找不到 API 报错;
import type { ref, computed, onMounted } from 'vue';

type GlobalRef = typeof ref;
type GlobalComputed = typeof computed;
type GlobalOnMounted = typeof onMounted;

declare global {
    const ref: GlobalRef;
    const computed: GlobalComputed;
    const onMounted: GlobalOnMounted;
}