export function hasChildMenu() {
    //是否包含子菜单,
    //1.没有children或长度为0返回false
    //2.有children进行遍历,如果至少有一个对象的menuType的值为C,则返回true,否则返回false(菜单类型（M目录 C菜单 F按钮))
}

export function findOneLevelMenuInStore(context, opt) {
    let path = opt.path;
    let oneLevelMenu = getObj(context.state.taskTabs, path);
    if(oneLevelMenu) {
        return oneLevelMenu;
    }else {
        oneLevelMenu = getObj(context.state.allHistoryTabs, path);
        if(oneLevelMenu) {
            //说明是从历史中找到的,还需要将其重新添加回taskTabs中
            context.dispatch('pageShowInTask', oneLevelMenu);
        }
        return oneLevelMenu;
    }
}

function getObj(list, path) {
    let oneLevelMenu = null;
    for(let i = 0, j = list.length; i < j; i++) {
        let item = list[i];
        if(item.url && item.url.trim() != '' && item.url.trim() == path) {
            oneLevelMenu = item;
            break;
        }else {
            if(item.children && item.children.length) {
                let index = item.children.findIndex(citem => {
                    return citem.url.trim() == path;
                });
                if(index != -1) {
                    oneLevelMenu = item;
                    break;
                }
            }
        }
        
    }
    return oneLevelMenu;
}