<template>
  <div class="progresss" @mousemove="isTheProgressDot=true" @mouseout="isTheProgressDot=false">
    <div class="progresBG"></div>
    <div class="TheCache" :style="{width: isCache + '%'}" ></div>
    <div class="theProgressOf" :style="{ width: is + '%' }"></div>
    <div class="theProgressDot" v-show="isTheProgressDot" :style="{ left: is + '%'}" ></div>
    <div class="istheProgress"  @mousedown="VolumeSet"></div>
  </div>
</template>

<script>
export default {
  name: "progresss",
  props: {
    songControl: {
      type: Object,
      defaule: {},
    },
  },
  data(){
    return{
      isTheProgressDot:false,
    }
  },
  methods: {
    //向主组件app发送设置的歌曲进度
    VolumeSet(event){
      event = event||window.event;
      let istheProgress = document.getElementsByClassName('istheProgress')[0];
      this.songProgress(event,istheProgress);
    },
    //发送设置进度请求
    songProgress(event,istheProgress){
      let width = istheProgress.style.width || 
      istheProgress.clientWidth || 
      istheProgress.offsetWidth || 
      istheProgress.scrollWid;
      let setUpThe = Math.ceil(this.songControl.songtime * (event.offsetX / width));
      this.$bus.emit('VolumeSet',setUpThe);
      
    },
  },
  computed: {
    //计算歌曲播放进度
    is: function () {
      return (this.songControl.itme / this.songControl.songtime) * 100;
    },
    //计算缓存进度条
    isCache:function(){
      return (this.songControl.TheCache / this.songControl.songtime) * 100;
    },
  },
};
</script>

<style scoped>
/* 响应布局 最小不小于992px*/
@media (min-width: 769px) {
.progresss {
  /* width: 100%;
  height: 10px;
  position: relative; */
    height: 10px;
    width: 100%;
    position: relative;
    top: -3px;
    cursor:pointer;
}
.progresBG{
  width: 100%;
  height: 4px;
  background:rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  position: absolute;
  top: 3px;
}
.TheCache{
  height: 4px;
  background:rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  position: absolute;
  top: 3px;
}
.theProgressOf {
  height: 4px;
  background: var(--color);
  position: absolute;
  top: 3px;
}
.theProgressDot {
  width: 10px;
  height: 10px;
  background: var(--color);
  position: absolute;
  margin-left: -5px;
  border-radius: 10px;
}
.istheProgress {
  width: 100%;
  height: 10px;
  position: absolute;
}
}



/* 响应布局 最大不大于991px*/
@media (max-width: 768px) {
.progresss {
  height: 10px;
  margin: 0 15%;
  position: relative;
  
}
.progresBG{
  width: 100%;
  height: 4px;
  background:rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  position: absolute;
  top: 3px;
}
.TheCache{
  height: 4px;
  background:rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  position: absolute;
  top: 3px;
}
.theProgressOf {
  height: 4px;
  background: var(--color);
  position: absolute;
  top: 3px;
}
.theProgressDot {
  width: 10px;
  height: 10px;
  background: var(--color);
  position: absolute;
  margin-left: -5px;
  border-radius: 10px;
}
.istheProgress {
  width: 100%;
  height: 10px;
  position: absolute;
}
}
</style>