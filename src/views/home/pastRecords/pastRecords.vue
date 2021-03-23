<template>
  <div class="pastRecords">
    <div>
      <div class="pastRecordsTitle">{{pastRecordsTitle}}</div>
      <div class="deleteList" @click="deleteList"><i class="fa fa-trash" aria-hidden="true"></i> 清空</div>
    </div>
    <div>
      <div class="pastList">
        <div class="songLists" 
        :class="{pastListTrue: itme.rid == seek.rid }" 
        @mousemove="isDelete=index" 
        @mouseout="isDelete=null" 
        v-for="(itme,index) in songOrder" 
        :key="index">
          <span class="name" @click="play(itme)">{{ itme.name }}</span>
          <span class="artist" v-show="index !== isDelete" @click="play(itme)">{{ itme.artist }}</span>
          <div class="deleteSong" @click="deletes(index)" v-show="index == isDelete"><i class="fa fa-trash-o" aria-hidden="true"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pastRecords",
  props: {
    songOrder: {
      type: Array,
      defaule: [],
    },
    seek:{
      type:Object,
      defaule:{},
    },
  },
  data(){
    return{
      isDelete:null,
      pastRecordsTitle:'顺序播放'
    }
  },
  methods: {
    //发送bus请求清空播放列表
    deleteList() {
      this.$bus.emit("deleteList");
    },
    //发送bus请求播放歌曲
    play(itme) {
      this.$emit("seekPlay", itme);
    },
    deletes(index){
      this.$bus.emit('deletes',index)
    },
  },
};
</script>

<style scoped>
/* 响应布局 最小不小于992px*/
@media (min-width: 769px) {
.pastRecords{
  /* position: relative; */
  width: 200px;
  height: 0px;
  position: absolute;
  right: 0;
  bottom: 72px;
  border-radius: 10px 10px 0 0;
  transition: height 0.3s;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgb(187, 187, 187);
  background: #fff;
  
}
.pastRecordsTitle {
  width: 100px;
  height: 30px;
  font-size: 15px;
  font-weight: 700;
  position: relative;
  display: inline-block;
  color: var(--color);
  line-height: 30px;
  left: 10px;
}
.deleteList {
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 5px;
  border-radius: 15px;
  text-align: center;
  padding: 4px 8px;
  color: var(--color);
  font-size: 12px;
  border: 1px solid var(--color);
    cursor:pointer;
}
.deleteList:hover{
  color:#fff;
  background: var(--color);
}
.pastList {
  display: inline-block;
  width: 230px;
  height: 320px;
  color: rgb(102, 102, 102);
  overflow: auto;
  font-size: 13px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.songLists{
  position: relative;
  height: 30px;
}
.songLists:hover{
  background: var(--background);
  color: var(--color);
}
.pastListTrue{
  background: var(--background);
  color: var(--color);
}
.pastListTitle {
  width: 100%;
  height: 20px;
}
.name {
  display: inline-block;
  width: 120px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30px;
  padding: 0 5px 0 11px;
}
.artist {
  display: inline-block;
  width: 60px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30px;
}
.deleteSong{
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  display: inline-block;
  right: 30;
    cursor:pointer;
}
.deleteSong:hover{
  color: var(--hover);
}


  /* .pastList::-webkit-scrollbar { */
  /*滚动条整体样式*/
  /* width : 10px; */
  /* height: 0px; */
  /* } */
  /* .pastList::-webkit-scrollbar-thumb { */
  /*滚动条里面小方块*/
  /* border-radius: 10px; */
  /* box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2); */
  /* background   : var(--background); */
  /* } */
  /* .pastList::-webkit-scrollbar-track { */
  /*滚动条里面轨道*/
  /* box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0); */
  /* } */
}




/* 响应布局 最大不大于991px*/
@media (max-width: 768px) {
.pastRecords{
  /* position: absolute; */
  /* bottom: 140px; */
  /* right: 0; */
  /* overflow: hidden; */
  width: 200px;
  height: 0px;
  position: absolute;
  bottom: 140px;
  right: 0;
  background: #fff;
  box-shadow: 0px 0px 5px rgb(187, 187, 187);
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  transition: height 0.3s;
  
}
.pastRecordsTitle {
  width: 100px;
  height: 30px;
  font-size: 15px;
  font-weight: 700;
  position: relative;
  display: inline-block;
  color: var(--color);
  line-height: 30px;
  left: 10px;
}
.deleteList {
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 5px;
  border-radius: 15px;
  text-align: center;
  padding: 4px 8px;
  color: var(--color);
  font-size: 12px;
  border: 1px solid var(--color);
    cursor:pointer;
}
.deleteList:hover{
  color:#fff;
  background: var(--color);
}
.pastList {
  display: inline-block;
  width: 230px;
  height: 320px;
  color: rgb(102, 102, 102);
  overflow: auto;
  font-size: 13px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.songLists{
  position: relative;
  height: 30px;
}
.songLists:hover{
  background: var(--background);
  color: var(--color);
}
.pastListTrue{
  background: var(--background);
  color: var(--color);
}
.pastListTitle {
  width: 100%;
  height: 20px;
}
.name {
  display: inline-block;
  width: 120px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30px;
  padding: 0 5px 0 11px;
}
.artist {
  display: inline-block;
  width: 60px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30px;
}
.deleteSong{
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  display: inline-block;
  right: 30;
    cursor:pointer;
}
.deleteSong:hover{
  color: var(--hover);
}

}
</style>