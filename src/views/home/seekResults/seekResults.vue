<template>
  <div class="seekResults" :class="{'seekResultsTrue':isSeek}">
    <div class="seekTitle">
      <span class="songNameTitle">歌曲名</span>
      <span class="songArtistTitle">歌手</span>
    </div>
    <div class="songlist">
      <div class="list" 
      :title="item.artist+' - '+item.name" 
      v-for="(item,index) in seekData" 
      :key="index"
      >
        <span class="songindex" 
        @mousemove="isSongIndex=index" 
        @mouseout="isSongIndex = null" 
        @click="collect(item)">
          <i v-show="isSongIndex !== index" class="fa fa-heart-o" aria-hidden="true"></i>
          <i v-show="isSongIndex == index" class="fa fa-heart" aria-hidden="true"></i>
          </span>
        <span class="songname" @click="play(item)" >{{ item.name }}</span>
        <span class="songartist" @click="play(item)">{{ item.artist }}</span>
      </div>
      <div class="toImg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "seekResults",
  props: {
    seekData: {
      type: Array,
      default(){
        return []
      },
    },
  },
  data(){
    return{
      isSongIndex:null,
      isSeek:false,
    }
  },
  mounted() {
    // 组件渲染完绑定下拉到底触发事件
    document
      .getElementsByClassName("songlist")[0]
      .addEventListener("scroll", this.seekScroll);
    this.$bus.on('seekMousemove',()=>{
      this.isSeek = true;
    });
    this.$bus.on('seekMouseout',()=>{
      this.isSeek = false;
    })
  },
  methods: {
    // 向父组件发送搜索下拉
    seekScroll() {
      let songlistelement = document.getElementsByClassName("songlist")[0];
      if (
        songlistelement.scrollTop + songlistelement.offsetHeight >=
        songlistelement.scrollHeight
      ) {
        this.$emit("seekto");
      }
    },
    //搜索回到顶部
    scrollto() {
      let songlistelement = document.getElementsByClassName("songlist")[0];
      songlistelement.scrollTo(0, 0);
    },
    //点击歌曲播放
    play(rid){
      this.$emit('seekPlay',rid);
    },
    //点击收藏歌曲
    collect(item){
      this.$bus.emit('collect',item);
    },
  },
};
</script>

<style scoped>
/* 响应布局 最小不小于992px*/
@media (min-width: 769px) {
/* 搜索展示组件 */
.seekResults {
  position: absolute;
  right: 15px;
  margin-top: 45px;
  transition: height 0.3s;
  width: 245px;
  height: 0;
  border-radius: 10px;
  font-size: 14px;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgb(187, 187, 187);
  z-index: 9;
  color: rgb(102, 102, 102);
  background: #fff;
}
.seekResultsTrue{
  height: 350px;
}
.seekResults:hover{
  height: 350px;
}
/* 搜索结果展示 */
.songlist {
  width: 275px;
  height: 315px;
  margin-top: 25px;
  overflow: auto;
}



/* 搜索结果的每一行div */
.list{
  height: 26px;
  line-height: 26px;
}
.list:hover{
  background: var(--background);
  color:var(--color);
}
/* 搜索结果添加播放列表按钮 */
.songindex{
  display: inline-block;
  width: 30px;
  height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  padding: 0 3px 0 7px;
    cursor:pointer;
}
.songindex:hover{
  color: var(--hover);
}
/* 搜索结果歌曲名项 */
.songname {
  display: inline-block;
  width: 115px;
  height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 10px 0 0;
}
/* 歌曲搜索结果歌手项 */
.songartist {
  display: inline-block;
  width: 45px;
  height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 10px;
}
/* 歌曲搜索标题div */
.seekTitle {
  margin: 5px 10px;
  padding: 0 0 4px 0 ;
  border-bottom: 1px solid rgb(197, 197, 197);
  position: absolute;
  top: 0;
}
/* 搜索结果歌曲名标题 */
.songNameTitle {
  display: inline-block;
  width: 145px;
  height: 14px;
  margin-left: 20px;
}
/* 歌曲结果歌手标题 */
.songArtistTitle {
  display: inline-block;
  width: 60px;
  height: 14px;
}
.toImg{
  width: 245px;
  height: 9px;
  overflow: hidden;
  position: relative;

}
.toImgs{
  display: block;
  max-width: 74px;
  position: absolute;
  top: -18px;
  left: 88px;
  margin: 0 auto;
}


  
  /* .songlist::-webkit-scrollbar { */
  /*滚动条整体样式*/
  /* width : 10px; */
  /* height: 0px; */
  /* } */
  /* .songlist::-webkit-scrollbar-thumb { */
  /*滚动条里面小方块*/
  /* border-radius: 10px; */
  /* box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2); */
  /* background   : var(--background); */
  /* } */
  /* .songlist::-webkit-scrollbar-track { */
  /*滚动条里面轨道*/
  /* box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0); */
  /* } */
}



/* 响应布局 最大不大于991px*/
@media (max-width: 768px) {
/* 搜索展示组件 */
.seekResults {
  width: 80%;
  height: 0px;
  border-radius: 20px;
  font-size: 18px;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgb(187, 187, 187);
  z-index: 9;
  color: rgb(102, 102, 102);
  background: #fff;
  position: absolute;
  margin: 40px 10% 0 10%;
  transition: height 0.3s;
}
.seekResultsTrue{
  height: 70%;
}
.seekResults:hover{
  height: 70%;
}
/* 搜索结果展示 */
.songlist {
  width: 200%;
  margin: 0 5%;
  height: 90%;
  margin-top: calc(10% + 8px);
  overflow: auto;
}



/* 搜索结果的每一行div */
.list{
  height: 26px;
  line-height: 26px;
}
.list:hover{
  background: var(--background);
  color:var(--color);
}
/* 搜索结果添加播放列表按钮 */
.songindex{
  display: inline-block;
  width: 26px;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  cursor:pointer;
}
.songindex:hover{
  color: var(--hover);
}
/* 搜索结果歌曲名项 */
.songname {
  display: inline-block;
  width: calc(25% - 26px);
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 15px;
  padding: 0 10px 0 0;
}
/* 歌曲搜索结果歌手项 */
.songartist {
  display: inline-block;
  width: calc(23% - 26px);
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 15px;
}
/* 歌曲搜索标题div */
.seekTitle {
  width: 90%;
  margin: 10px 5%;
  padding: 0 0 4px 0 ;
  border-bottom: 1px solid rgb(197, 197, 197);
  position: absolute;
  top: 0;
}
/* 搜索结果歌曲名标题 */
.songNameTitle {
  display: inline-block;
  width: 50%;
  height: 10%;
  margin-left: 10%;
}
/* 歌曲结果歌手标题 */
.songArtistTitle {
  display: inline-block;
  width: 40%;
  height: 10%;
}
.toImg{
  width: 245px;
  height: 9px;
  overflow: hidden;
  position: relative;

}
.toImgs{
  display: block;
  max-width: 74px;
  position: absolute;
  top: -18px;
  left: 88px;
  margin: 0 auto;
}

}
</style>