import yPopover from './y-popover';

const loading = {
    install(Vue) {
        Vue.component(yPopover.name, yPopover);
    }
}

export default loading;