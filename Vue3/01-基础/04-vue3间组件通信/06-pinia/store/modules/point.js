import { defineStore } from "pinia"

export default defineStore("point", {
    state: () => ({
        mouseX: 0,
        mouseY: 0
    }),

    actions: {
        getXY(e) {
            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
        }
    }
})
