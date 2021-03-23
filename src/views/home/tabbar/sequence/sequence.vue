<template>
  <div class="sequence" @click="Handover">
    <div v-show="order == 0" title="顺序播放">
      <i class="fa fa-exchange" aria-hidden="true"></i>
    </div>
    <div v-show="order == 1" title="单曲循环">
      <i class="fa fa-retweet" aria-hidden="true"></i>
    </div>
    <div v-show="order == 2" title="随机播放">
      <i class="fa fa-random" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "sequence",
  data() {
    return {
      //播放顺序：按顺序播放：0 单曲循环：1 随机播放：2
      order: 0,
    };
  },
  methods: {
    Handover() {
      switch (this.order) {
        case 0:
          this.order = 1;
          this.$bus.emit("Handover", this.order);
          break;
        case 1:
          this.order = 2;
          this.$bus.emit("Handover", this.order);
          break;
        case 2:
          this.order = 0;
          this.$bus.emit("Handover", this.order);
          break;
      }
    },
  },
};
</script>

<style>
.sequence{
    font-size: 20px;
    line-height: 25px;
    color: var(--color);
    text-align: center;
}
.sequence:hover{
  color: var(--hover);
}
</style>