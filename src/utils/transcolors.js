export default function(data){
  data.forEach(function(n,i){
      n.oldVal = n.tagIconTone // 80ffff ec808c facd91 ffff80 c280ff 80d3f8 7f7f7f 8080ff
      switch(n.tagIconTone){
          case '#80ffff':
              n.tagIconTone = '1'
              break;
          case '#ec808c':
              n.tagIconTone = '2'
              break;
          case '#facd91':
              n.tagIconTone = '3'
              break;
          case '#ffff80':
              n.tagIconTone = '4'
              break;
          case '#c280ff':
              n.tagIconTone = '5'
              break;
          case '#80d3f8':
              n.tagIconTone = '6'
              break;
          case '#7f7f7f':
              n.tagIconTone = '7'
              break;
          case '#8080ff':
              n.tagIconTone = '8'
              break;
          default:
              n.tagIconTone = '1'
              console.log("tagIconTone返回值有误!")
              break;
      }
  })
  return data
}