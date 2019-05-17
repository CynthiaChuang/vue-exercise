const TAG = "Store";
export default {

  debug(vm, ...message) {
    if (process.env.NODE_ENV === "dev") {
      console.debug(`[${TAG}][debug][${this.getComponentName(vm)}] >`, message.join(' '));
    }
  },
  info(vm, ...message) {
    console.info(`[${TAG}][info][${this.getComponentName(vm)}] >`, message.join(' '));

  },
  warn(vm, ...message) {
    console.warn(`[${TAG}][warn][${this.getComponentName(vm)}] >`, message.join(' '));

  },
  error(vm, ...message) {
    console.error(`[${TAG}][error][${this.getComponentName(vm)}] >`, message.join(' '));
  },
  getComponentName(vm){
    return vm.$options.name
  }
}
