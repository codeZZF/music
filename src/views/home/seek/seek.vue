<template>
  <div class="seek" @mousemove="mousemove" @mouseout="mouseout">
      <input class="searchBox" type="text" name="key" autocomplete="off" value="周杰伦">
      <div class="seekbtn" @click="seekSubmit"><i class="fa fa-search"></i></div>
  </div>
</template>

<script>
export default {
name:"seek",

  methods:{
    //点击搜索后向父组件发送信号
    seekSubmit(){
      let seekContent = document.getElementsByClassName('searchBox')[0].value;
      if(seekContent!==''){
        this.$emit('seekResults',seekContent);
      }

    },
    mousemove(){
      this.isSeek = true;
      this.$bus.emit('seekMousemove');
    },
    mouseout(){
      this.isSeek = false;
      this.$bus.emit('seekMouseout');
    },
  },
}
</script>

<style scoped>
/* 响应布局 最小不小于992px*/
@media (min-width: 769px) {
  .seek{
    height: 30px;
    border-radius: 15px;
    position: absolute;
    top: 15px;
    right: 15px;
    overflow: hidden;
    padding-right: 26px;
    z-index: 10;
    background: var(--color);
  }
  /* 输入框样式 */
  .searchBox{
    overflow: hidden;
    height: 30px;
    border: 0;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: #fff;
    transition: width .3s ;
    width: 205px;
    margin: 0 5px 0 10px;
  }
  /* 搜索按钮样式 */
  .seekbtn{
    position: absolute;
    right: 0;
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: rgb(192, 192, 192);
    border-radius: 15px;
    cursor:pointer;
  }
  .seekbtn:hover{
    color: #fff;
  }
  /* 搜索按钮放大镜图标字体样式 */
  .fa{
    line-height: 23px;
    font-weight: 1;
  }
}



/* 响应布局 最大不大于991px*/
@media (max-width: 768px) {
  .seek{
    margin: 0 10%;
    width: 80%;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    overflow: hidden;
    z-index: 10;
    background: var(--color);
  }
  /* 输入框样式 */
  .searchBox{
    overflow: hidden;
    width: calc(100% - 50px);
    height: 100%;
    margin: 0 0 0 10px;
    border: 0;
    outline: none;
    background: transparent;
    font-size: 20px;
    color: #fff;
    transition: width .3s ;
  }
  /* 搜索按钮样式 */
  .seekbtn{
    position: absolute;
    right: 0;
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: rgb(192, 192, 192);
    border-radius: 20px;
    cursor:pointer;
  }
  .seekbtn:hover{
    color: #fff;
  }
  /* 搜索按钮放大镜图标字体样式 */
  .fa{
    line-height: 23px;
    font-weight: 1;
  }
}
</style>