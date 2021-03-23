<template>
  <div class="tabbar">

    <!-- 控制栏 -->
    <div class="control">
      <!-- 进度条 -->
      <proGresss :songControl="songControl" />

      <div class="control-btm">
        <!-- 歌曲信息栏 -->
        <div class="information-Bar">
          <!-- 头像 -->
          <img class="headPortrait" v-if="Object.keys(seek).length !== 0" :src="seek.pic120" alt="">
          <img class="headPortrait" v-else src="@/assets/img/touxiang.png" alt="">
          <!-- 歌手信息 -->
          <div class="song-information">
            <!-- 歌曲名 -->
            <p class="song-name">{{seek.name||'歌曲名'}}</p>
            <!-- 歌手名 -->
            <p class="singer">{{seek.artist||'歌手'}}</p>
          </div>
        </div>

        <!-- 歌曲总控件栏 -->
        <div class="total-control">
          <!-- 上一首 -->
          <div class="Previous" @click="Previous"><i class="fa fa-step-backward" aria-hidden="true"></i></div>
          <!-- 播放暂停 -->
          <div class="play" @click="playClick">
              <i v-if="isPlayClick" class="fa fa-pause-circle" aria-hidden="true"></i>
              <i v-if="!isPlayClick" class="fa fa-play-circle" aria-hidden="true"></i>
          </div>
          <!-- 下一首 -->
          <div class="Next" @click="Next"><i class="fa fa-step-forward" aria-hidden="true"></i></div>
        </div>

        <!-- 歌曲副控件栏 -->
        <div class="deputy-controls">
          <!-- 时间控件 -->
          <div class="duration">
            <span>{{Math.trunc(songControl.itme/6000)||''}}</span>
            <span>{{Math.trunc((songControl.itme/600)%10)||'0'}}</span>
            <span>{{Math.trunc((songControl.itme/60)%10)||'0'}}</span>
            <span>:</span>
            <span>{{Math.trunc((songControl.itme%60)/10)||'0'}}</span>
            <span>{{Math.trunc(songControl.itme%10)||'0'}}</span>
            <span>/</span>
            <span>{{seek.songTimeMinutes||'00:00'}}</span>
          </div>
          <!-- 音量组件 -->
          <volume/>
          <!-- 播放顺序控件 -->
            <sequence/>
          <!-- 播放列表控件 -->
          <div class="past-records" @click="records"><i class="fa fa-bars" aria-hidden="true"></i></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// 引入播放顺序组件
import sequence from "./sequence/sequence.vue";
// 引入进度条组件
import proGresss from "./progresss/progresss.vue";
//引入音量组件
import volume from "./volume/volume.vue"

export default {
  name: "TabBar",
  components: {
    sequence,
    proGresss,
    volume,
  },
  props: {
    //歌曲播放状态
    songControl:{
      type:Object,
      defaule:{},
    },
    //接收的歌曲信息
    seek:{
      type: Object,
      defaule: {},
    },
    isPlayClick:{
      type:Boolean,
      defaule:false,
    },
  },
  methods:{
    //向主组件发送播放/暂停事件
    playClick(){
        this.$emit('playClick')
    },
    mouseover(){
      this.$emit('volumeMouseover')
    },
    //向主组件发送bus上一首事件
    Previous(){
      this.$bus.emit('Previous');
    },
    //向主组件发送bus下一首事件
    Next(){
      this.$bus.emit('Next');
    },
    records(){
      this.$bus.emit('records');
    },
  }
};
</script>

<style scoped>
@media (min-width: 769px){
  /* 控件栏样式 */
  .tabbar {
    width: 100%;
    height: 72px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }



  /* 进度条样式 */
  /* .progresss {
    height: 10px;
    width: 100%;
    position: relative;
    top: -3px;
    cursor:pointer;
  } */

  /* 控制栏下方控制组件 */
  .control-btm{
    position: relative;
    padding: 2px;
  }
  /* 信息栏 */
  .information-Bar{
    display: flex;
    margin-left: 10px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  /* 头像栏 */
  .headPortrait{
    width: 50px;
    height: 50px;
    max-height: 50px;
    max-width: 50px;
    border-radius: 5px;
  }
  .song-information{
    margin: 5px 10px;
    color:var(--color);
  }
  /* 歌曲名 */
  .song-name{
    font-size: 16px;
    margin-bottom: 5px;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
  }
  /* 歌手名 */
  .singer{
    font-size: 12px;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* 主控件 */
  .total-control{
    width: 150px;
    height: 50px;
    margin: 0 auto;
    position: relative;

  }
  /* 上一首按钮 */
  .Previous{
    width: 30px;
    height: 30px;
    display:inline-block;
    position: absolute;
    left: 0;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    margin: 10px;
    color: var(--color);
    cursor:pointer;
  }
  .Previous:hover{
    color: var(--hover);
  }
  /* 播放按钮 */
  .play{
    width: 50px;
    height: 50px;
    background: #fff;
    display:inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    line-height: 47px;
    text-align: center;
    border-radius: 50%;
    font-size: 47px;
    color: var(--color);
    overflow: hidden;
    cursor:pointer;
  }
  .play:hover{
    color: var(--hover);
  }
  /* 下一首 */
  .Next{
    width: 30px;
    height: 30px;
    display:inline-block;
    position: absolute;
    right: 0;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    margin: 10px;
    color: var(--color);
    cursor:pointer;
  }
  .Next:hover{
    color: var(--hover);
  }

  /* 副控件栏 */
  .deputy-controls{
    width: 200px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    margin: 2px 10px 5px 0;
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
  }
  /* 时间控件样式 */
  .duration{
    font-size: 14px;
    color:var(--color);
    position: absolute;
    right: 130px;
  }
  /* 播放列表控件样式 */
  .past-records{
    position: relative;
    right: 10px;
    bottom:1px;
    width: 25px;
    height: 25px;
    color: var(--color) ;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    line-height: 50px;
    cursor:pointer;
  }
  .past-records:hover{
    color: var(--hover);
  }
  /* 播放顺序控件样式 */
  .sequence{
    width: 25px;
    height: 25px;
    line-height: 50px;
    position: relative;
    right: 60px;
    bottom: 1px;
    cursor:pointer;
    

  }
  /* 音量控件样式 */
  .volume{
    bottom:13px;
    right: 47px;
    cursor:pointer;
  }
}




/* 响应布局 最大不大于991px*/
@media (max-width: 768px) {
  /* 控件栏样式 */
  .tabbar {
    width: 100%;
    height: 140px;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    box-shadow: 1px 0 5px rgba(170, 170, 170, 0.397);
  }



  /* 进度条样式 */
  .progresss {
    height: 10px;
    width: 60%;
    margin: 0 20%;
    position: absolute;
    top: 10px;
    z-index: 23px;
  }

  /* 控制栏下方控制组件 */
  .control-btm{
    width: 100%;
    height: 110px;
    position: absolute;
    bottom: 0;
  }
  /* 信息栏 */
  .information-Bar{
    display: none;
    display: flex;
    margin-left: 10px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  /* 头像栏 */
  .headPortrait{
    display: none;
  }
  .song-information{
    display: none;
  }

  /* 主控件 */
  .total-control{
    width: 200px;
    height: 70px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

  }
  /* 上一首按钮 */
  .Previous{
    width: 40px;
    height: 40px;
    font-size: 23px;
    display:inline-block;
    position: absolute;
    left: 0;
    top: 6px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    margin: 10px;
    color: var(--color);
    z-index: 22;
  }
  .Previous:hover{
    color: var(--hover);
  }
  /* 播放按钮 */
  .play{
    width: 70px;
    height: 70px;
    background: #fff;
    display:inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    line-height: 70px;
    text-align: center;
    border-radius: 50%;
    font-size: 59px;
    color: var(--color);
    overflow: hidden;
    cursor:pointer;
    z-index: 23;
  }
  .play:hover{
    color: var(--hover);
  }
  /* 下一首 */
  .Next{
    width: 40px;
    height: 40px;
    font-size: 23px;
    display:inline-block;
    position: absolute;
    right: 0;
    top: 6px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    margin: 10px;
    color: var(--color);
    z-index: 23;
  }
  .Next:hover{
    color: var(--hover);
  }

  /* 副控件栏 */
  .deputy-controls{
    width: 100%;
    position: absolute;
  }
  /* 时间控件样式 */
  .duration{
    display: none;
  }
  /* 播放列表控件样式 */
  .past-records{
    position: absolute;
    width: 35px;
    height: 35px;
    color: var(--color) ;
    font-size: 25px;
    line-height: 33px;
    text-align: center;
    right: 10px;
    top: 39px;
  }
  .past-records:hover{
    color: var(--hover);
  }
  /* 播放顺序控件样式 */
  .sequence{
    width: 24px;
    height: 24px;
    color:var(--color);
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    position: absolute;
    left: 5%;
    bottom: 3px;

  }
  /* 音量控件样式 */
  .volume{
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    position: absolute;
    bottom: 2px;
    right: 5%;
  }
}
</style>