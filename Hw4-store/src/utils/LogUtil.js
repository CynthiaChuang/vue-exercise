const TAG = "Store";
export default {

  debug(vm, ...message) {
    if (process.env.NODE_ENV === "dev") {
      console.log(`[${TAG}][debug][${this.getComponentName(vm)}] >`, ...message);
    }
  },
  info(vm, ...message) {
    console.info(`[${TAG}][info][${this.getComponentName(vm)}] >`, ...message);

  },
  warn(vm, ...message) {
    console.warn(`[${TAG}][warn][${this.getComponentName(vm)}] >`, ...message);

  },
  error(vm, ...message) {
    console.error(`[${TAG}][error][${this.getComponentName(vm)}] >`, ...message);
  },
  getComponentName(vm) {
    return vm.$options ? vm.$options.name : "main"
  }
}
