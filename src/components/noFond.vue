
<template>
  <div>
    404
    <p>页面找不到</p>
  </div>
  
</template>
<style scoped lang='scss'>
  @function px2rem($px){
    $rem: 37.5px;
    @return ($px / $rem) + rem;
  }
  div{
    font-size:px2rem(50px);
    text-align: center;
    position: absolute;
    top: 40%;
    left:50%;
    transform: translate(-50%,-80%);
    p{
      width:px2rem(300px);
    }
  }
</style>