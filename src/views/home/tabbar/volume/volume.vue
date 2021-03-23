<template>
  <div class="volume"
  @mousemove="isVlumeHeight=true" 
  @mouseout="isVlumeHeight=false" 
  :class="{'volumeTrue':isVlumeHeight}"
  >
    <div class="isVolume">
      <div
        class="volumeDot"
        :style="{ bottom: volumeTallk * 100 + 'px' }"
      ></div>
      <div class="volumes" :style="{ height: volumeTallk * 100 + 'px' }"></div>
      <div class="volumess" @mousedown="VolumeSet"></div>
    </div>
    <i class="fa fa-volume-up" :class="{'fa-volume-up-true':isVlumeHeight}" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
  name: "volume",
  data() {
    return {
      volumeTallk: 1,
      isVlumeHeight:false,
    };
  },
  methods: {
    //给主组件app发送修改音量设置
    VolumeSet(event) {
      event = event||window.event;
      let volumess = document.getElementsByClassName("volumess")[0];

      this.MouseEvents(event);

      volumess.onmousemove = (event) => {

        this.MouseEvents(event);
        volumess.onmouseup = () => {
          volumess.onmousemove = null;
        };

        volumess.onmouseout = () => {
          volumess.onmousemove = null;
        };

      };
    },
    //向主组件发送音量设置
    MouseEvents(event) {
      let clickLocation = (100 - event.offsetY) / 100;
      if (clickLocation >= 0 && clickLocation <= 1) {
        this.$bus.emit("clickLocation", clickLocation);
        this.volumeTallk = clickLocation;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.volume {
  width: 24px;
  height: 24px;
  position: absolute;
  bottom: 0;
  background: #fff;
  border-radius: 13px;
  overflow: hidden;
  transition: height .3s , background .3s;
}
.volumeTrue {
  height: 150px;
  background: rgb(240, 240, 240);
}
.isVolume {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 34px;
}
.fa-volume-up {
  position: absolute;
  bottom: 0;
  left: 0;
  display: inline-block;
  font-size: 20px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 12px;
  background: #fff;
  color: var(--color);
  transition: color .3s , background .3s;
}
.fa-volume-up-true{
  background: var(--color);
  color: #fff;
}
.volumess {
  width: 100%;
  height: 100px;
  position: absolute;
  left: 0px;
  bottom: 0px;
}
.volumes {
  width: 34%;
  height: 100%;
  margin: 0 33%;
  background: var(--color);
  position: absolute;
  bottom: 0;
  border-radius: 10px;
}
.volumeDot {
  position: absolute;
  transform: translateY(50%);
  width: 14px;
  height: 14px;
  background: var(--color);
  position: absolute;
  border-radius: 10px;
  margin: 0 20%;
}
</style>