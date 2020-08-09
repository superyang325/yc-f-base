import moment from 'moment';

export function getAge(val){
  if(val){
    let now = moment().locale('zh-cn')
    let diff =  moment(now).diff(moment(val), 'years')
    return diff < 0 ? 0:diff;
  }else{
    return '--';

  }
}
