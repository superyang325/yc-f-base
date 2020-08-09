import { yc_deepCopy } from 'utils';
export function yc_regionDataProcess(res){
	for(let i = 0, j = res.length; i < j; i++) {
        let obj = res[i];
        obj.label = obj.locationName;
        obj.value = obj.locationId;
        let parentObj = res.find(item => {
            return item.locationId == obj.locationParentId;
        });
        if(parentObj) {
            parentObj.children = parentObj.children || [];
            parentObj.children.push(obj)
        }
    }
    let result = yc_deepCopy(res[0].children);
    result.shift();
    //delete result[0].children[0].children;
    return result;
}