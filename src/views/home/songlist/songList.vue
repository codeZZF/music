<template>
  <div class="songList">
    <div>
      <div class="listHedy">歌曲列表</div>
      <div class="playList">
        <div class="allPlay" @click="allPlay"><i class="fa fa-play" aria-hidden="true"></i> 播放</div>
        <div class="allDelete" @click="allDelete"><i class="fa fa-trash" aria-hidden="true"></i> 清空</div>
      </div>
    </div>
    <div class="list">
      <div class="songLists" 
      :class="{songListsTrue: item.rid == seek.rid }"
      @mousemove="isDelete=index" 
      @mouseout="isDelete=null" 
      v-for="(item,index) in songList" 
      :key="index" >
        <span class="songtitle" @click="play(item)" :title="item.artist+' - '+item.name">{{item.artist}} - {{item.name}}</span>
        <span class="duration" v-show="index !== isDelete" hidden:title="item.artist+' - '+item.name" @click="play(item)">{{item.songTimeMinutes}}</span>
        <div class="deleteSong" title="删除" @click="deletes(index)" v-show="index == isDelete"><i class="fa fa-trash-o" aria-hidden="true"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name:"songList",
  props:{
    songList:{
      type:Array,
      defaule:[],
    },
    seek:{
      type:Object,
      defaule:{},
    },
  },
  data(){
    return{
      isDelete:null,
    }
  },
  //发送播放歌曲请求
  methods:{
    play(rid){
      this.$emit('seekPlay',rid);
    },
    //发送播放全部请求
    allPlay(){
      this.$bus.emit('allPlay');
    },
    //发送清空全部歌曲请求
    allDelete(){
      this.$bus.emit('allDelete');
    },
    deletes(index){
      this.$emit('deletes',index);
    },
  }
}
</script>

<style scoped>

/* 响应布局 最小不小于992px*/
@media (min-width: 769px) {
.songList{
  /* position: relative; */
  position: absolute;
  left: -300px;
  width: 300px;
  height: 618px;
  background: rgba(0, 0, 0, 0.05);
  float: left;
  transition: left 0.3s;
  z-index: 11;
  overflow: hidden;
}
.listHedy{
  width: 120px;
  height: 50px;
  display: inline-block;
  padding: 20px 0 0 10px;
  font-size: 20px;
  font-weight: 700;
  color: var(--color);
}
.playList{
  display: inline-block;
}
.allPlay{
  display: inline-block;
  position: absolute;
  right: 70px;
  top: 20px;
  padding: 4px 8px;
  border-radius: 15px;
  color: var(--color);
  font-size: 12px;
  border: 1px solid var(--color);
    cursor:pointer;
}
.allPlay:hover{
  color:#fff;
  background: var(--color);
}
.allDelete{
  display: inline-block;
  position: absolute;
  right: 11px;
  top: 20px;
  padding: 4px 8px;
  border-radius: 15px;
  color: var(--color);
  font-size: 12px;
  border: 1px solid var(--color);
    cursor:pointer;
}
.allDelete:hover{
  color:#fff;
  background: var(--color);
}
.list{
  width: 330px;
  height: 568px;
  overflow: auto;
  color: rgb(102, 102, 102);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.songLists{
  width: 100%;
  height: 40px;
  position: relative;
  line-height: 40px;
  font-size: 14px;
}
.songLists:hover{
  background: var(--background);
  color: var(--color);
}
.songListsTrue{
  background: var(--background);
  color: var(--color);
}
.songtitle{
  width: 240px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  float: left;
}
.duration{
  width: 50px;
  float: left;
}
.deleteSong{
  display: inline-block;
  font-size: 16px;
  text-align: center;
  width: 50px;
  position: absolute;
  right: 30px;
    cursor:pointer;
}
.deleteSong:hover{
  color: var(--hover);
}



  /* .list::-webkit-scrollbar { */
  /*滚动条整体样式*/
  /* width : 10px; */
  /* height: 0px; */
  /* } */
  /* .list::-webkit-scrollbar-thumb { */
  /*滚动条里面小方块*/
  /* border-radius: 10px; */
  /* box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2); */
  /* background   : var(--background); */
  /* } */
  /* .list::-webkit-scrollbar-track { */
  /*滚动条里面轨道*/
  /* box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0); */
  /* } */
}




/* 响应布局 最大不大于991px*/
@media (max-width: 768px) {
.songList{
  width: 100%;
  height: calc(100% - 140px);
  position: absolute;
  top: 0;
  left: -100%;
  background: #fff;
  z-index: 15;
  overflow: hidden;
  transition: left .3s;
}
.listHedy{
  width: 120px;
  height: 50px;
  display: inline-block;
  padding: 20px 0 0 10px;
  font-size: 20px;
  font-weight: 700;
  color: var(--color);
}
.playList{
  display: inline-block;
}
.allPlay{
  display: inline-block;
  position: absolute;
  right: 70px;
  top: 20px;
  padding: 4px 8px;
  border-radius: 15px;
  color: var(--color);
  font-size: 12px;
  border: 1px solid var(--color);
    cursor:pointer;
}
.allPlay:hover{
  color:#fff;
  background: var(--color);
}
.allDelete{
  display: inline-block;
  position: absolute;
  right: 11px;
  top: 20px;
  padding: 4px 8px;
  border-radius: 15px;
  color: var(--color);
  font-size: 12px;
  border: 1px solid var(--color);
    cursor:pointer;
}
.allDelete:hover{
  color:#fff;
  background: var(--color);
}
.list{
  width: 100%;
  height: 100%;
  overflow: auto;
  color: rgb(102, 102, 102);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 50px;
}
.songLists{
  width: 100%;
  height: 40px;
  position: relative;
  line-height: 40px;
  font-size: 14px;
}
.songListsTrue{
  background: var(--background);
  color: var(--color);
}
.songtitle{
  width: 70%;
  padding-left: 5%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  float: left;
}
.duration{
  width: 50px;
  float: left;
}
.deleteSong{
  display: inline-block;
  font-size: 16px;
  text-align: center;
  width: 50px;
  position: absolute;
  right: 30px;
}

}
</style>