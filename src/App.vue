<template>
  <div class="back">
    <div id="app">
      <!-- <router-view /> -->

      <!-- 播放器audio -->
      <audio
        class="audio"
        ref="audio"
        @ended="ended"
        @canplay="canplay"
        @timeupdate="timeupdate"
        autoplay="autoplay"
        :src="song.url"
      ></audio>

      <!-- 播放器主要内容 -->
      <div class="player">
        <!-- 搜索组件 -->
        <seek @seekResults="seekResults" />
        <!-- 搜索结果展示页 -->
        <seekResults
          ref="scroll"
          :seekData="seekData"
          @seekto="seekto"
          @seekPlay="seekPlay"
        />
        <!-- 歌词页面 -->
        <lyricTable 
        :seek="seek"
        :class="{ lyricTableTrue: isSongList }"
        :songLyric="songLyric" 
        :itme="songControl.itme" />
        <!-- 歌曲列表 -->
        <songList
          :class="{ songListTrue: isSongList }"
          :songList="songList"
          @seekPlay="seekPlay"
          @deletes="deletes"
          :seek="seek"
        />
        <div
          class="songListIs"
          :class="{ songListIsTrue: isSongList }"
          @click="isSongList = !isSongList"
        >
          <i
            v-show="!isSongList"
            class="fa fa-angle-right"
            aria-hidden="true"
          ></i>
          <i
            v-show="isSongList"
            class="fa fa-angle-left"
            aria-hidden="true"
          ></i>
        </div>
        <!-- 播放顺序组件 -->
        <pastRecords
          ref="pastRecords"
          :class="{ pastRecordstrue: isPastRecords }"
          :songOrder="songOrder"
          @seekPlay="seekPlay"
          :seek="seek" />
      </div>
      <!-- 下方控制栏 -->
      <tab-bar
        ref="tabbar"
        @playClick="playClick"
        :isPlayClick="isPlayClick"
        :seek="seek"
        :songControl="songControl"
      />
    </div>
  </div>
</template>
<script>
//引入TabBar底部导航栏
import TabBar from "@/views/home/tabbar/TabBar.vue";
// 引入播放列表
import songList from "@/views/home/songlist/songList.vue";
// 引入歌词页面
import lyricTable from "@/views/home/lyricTable/lyricTable.vue";
// 引入搜索组件
import seek from "@/views/home/seek/seek.vue";
//引入搜索结果展示页
import seekResults from "@/views/home/seekResults/seekResults.vue";
// 引入播放顺序组件
import pastRecords from "@/views/home/pastRecords/pastRecords.vue";
export default {
  name: "app",
  components: {
    TabBar,
    songList,
    lyricTable,
    seek,
    seekResults,
    pastRecords,
  },
  data() {
    return {
      seekName: "",
      // 搜索结果存储
      seekData: [],
      // 搜索列表页数
      seekPagination: 1,
      //播放的歌曲url
      song: {},
      //播放的歌曲信息:歌曲名字/歌手/头像
      seek: {},
      //播放控制，true代表播放false代表暂停
      isPlayClick: false,

      //播放的歌曲信息
      songControl: {
        //歌曲时长
        songtime: 0,
        //缓存进度
        TheCache: 0,
        //播放时间
        itme: 0,
        //播放/暂停
        isPlay: true,
      },
      //歌词存储
      songLyric:[],
      //歌手写真存储
      // describe: [],

      //播放顺序  按顺序播放 = 0  单曲循环 = 1  随机播放 = 2
      order: 0,
      //歌曲列表
      songList: [],
      //播放列表
      songOrder: [],
      //播放列表缓存器
      listCache: [],
      //播放历史缓存器
      pastRecords: [],
      //历史列表显示隐藏控件
      isPastRecords: false,
      //歌曲列表显示隐藏控件
      isSongList: false,
    };
  },
  methods: {
    //发送搜索报文
    seekResults(Result) {
      this.seekName = Result;
      this.seekPagination = 1;
      let xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "http://iecoxe.top:5000/v1/kuwo/search?key=" +
          this.seekName +
          "&offset=" +
          this.seekPagination,
        true
      );
      xhr.timeout = 3000;
      xhr.ontimeout = () => {
        xhr.abort();
      };
      xhr.onerror = () => {
        xhr.abort();
      };
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
          this.seekData = JSON.parse(xhr.response).data.list;
        } else if (xhr.readyState == 4 && xhr.status < 200 || xhr.status >= 300) {
          this.seekResults(Result);
        }
      };
      this.$refs.scroll.scrollto();
    },
    //搜索下拉发送页数报文
    seekto() {
      this.seekPagination += 1;
      let xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "http://iecoxe.top:5000/v1/kuwo/search?key=" +
          this.seekName +
          "&offset=" +
          this.seekPagination,
        true
      );
      xhr.timeout = 3000;
      xhr.ontimeout = () => {
        this.seekPagination -= 1;
        xhr.abort();
      };
      xhr.onerror = () => {
        this.seekPagination -= 1;
        xhr.abort();
      };
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
          let newSeek = JSON.parse(xhr.response).data.list;
          for (let i of newSeek) {
            this.seekData.push(i);
          }
        } else if (xhr.readyState == 4 && xhr.status < 200 || xhr.status >= 300) {
        xhr.abort();
        }
      };
    },
    // 下载对应rid的歌曲
    seekPlay(rid) {
      this.songLyric = [];
      this.assignment();
      this.$refs.audio.pause();
      let judge = true;
      for (let i of this.songOrder) {
        if (rid.rid == i.rid) {
          judge = false;
          break;
        }
      }
      if (judge) {
        this.songOrder.push(rid);
        this.assignment();
      }

      let Records = true;
      for (let i of this.pastRecords) {
        if (rid.rid == i.rid) {
          Records = false;
        }
      }
      if (Records) {
        this.pastRecords.push(rid);
      }

      this.downloadSeek(rid);
    },
    //播放歌曲
    downloadSeek(rid) {
      this.songLyric = [];
      let xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "http://iecoxe.top:5000/v1/kuwo/song?rid=" + rid.rid,
        true
      );
      xhr.timeout = 3000;
      xhr.ontimeout = () => {
        xhr.abort();
      };
      xhr.onerror = () => {
        xhr.abort();
      };
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
          this.song = JSON.parse(xhr.response);
          this.seek = rid;
          this.lyric(rid);
        } else if (xhr.readyState == 4 && xhr.status < 200 || xhr.status >= 300) {
          this.downloadSeek(rid);
        }
      };
    },

    //获取歌词
    lyric(rid) {
      this.songLyric = [];
      let xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "http://iecoxe.top:5000/v1/kuwo/lyric?rid="+rid.rid,
        true
      );
      xhr.timeout = 3000;
      xhr.ontimeout = () => {
        xhr.abort();
      };
      xhr.onerror = () => {
        xhr.abort();
      };
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
          this.songLyric = JSON.parse(xhr.response).lyric_str.split('[');
          // to = true;
        }else if (xhr.readyState == 4 && xhr.status < 200 || xhr.status >= 300) {
          this.lyric(rid);
        }
      };
    },

    canplay() {
      // 获取当前歌曲时长
      this.songControl.songtime = Math.trunc(this.$refs.audio.duration);
      this.isPlayClick = true;
    },
    timeupdate(time) {
      // 获取当前播放时间
      this.songControl.itme = time.target.currentTime;
      this.TheCaches();
    },
    //接收tabbar子组件发来的播放/暂停按钮事件
    playClick() {
      if (this.songControl.songtime > 0) {
        this.isPlayClick = this.$refs.audio.paused;
        if (this.isPlayClick) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      }
    },
    //音频结束后的操作
    ended() {
      this.songLyric = [];
      switch (this.order) {
        //按顺序播放入口函数
        case 0:
          this.sequence();
          break;
        case 1:
          // console.log("111");
          break;
        //随机播放入口函数
        case 2:
          this.random();
          break;
      }
      this.isPlayClick = false;
    },
    //按顺序播放函数
    sequence() {
      for (let i in this.songOrder) {
        if (this.seek.rid == this.songOrder[i].rid) {
          if (i == this.songOrder.length - 1) {
            this.seekPlay(this.songOrder[0]);
          } else {
            this.seekPlay(this.songOrder[i * 1 + 1]);
          }
          break;
        }
      }
    },
    //随机播放函数
    random() {
      if (this.pastRecords.length - 1 > 0) {
        for (let i in this.pastRecords) {
          if (this.seek.rid == this.pastRecords[i].rid) {
            this.pastRecords.splice(i, 1);

            let stochastics = this.stochastic(0, this.pastRecords.length - 1);

            let songs = this.pastRecords[stochastics];

            this.seekPlay(songs);

            break;
          }
        }
      } else if (this.pastRecords.length - 1 < 1) {
        this.assignment();
        for (let i of this.songOrder) {
          this.pastRecords.push(i);
        }
        let stochastics = this.stochastic(0, this.listCache.length - 1);

        let songs = this.listCache[stochastics];

        this.seekPlay(songs);
      }
    },
    //将播放列表赋值给缓存器
    assignment() {
      this.listCache = [];
      for (let i of this.songOrder) {
        this.listCache.push(i);
      }
    },

    //取随机数函数
    stochastic(min, max) {
      let Range = max - min;

      let Rand = Math.random();

      let num = min + Math.round(Rand * Range);

      return num;
    },

    //获取缓存进度
    TheCaches() {
      let TheCachess = this.$refs.audio.buffered;
      if (TheCachess.length !== 0) {
        this.songControl.TheCache = TheCachess.end(TheCachess.length - 1);
      }
    },
    //响应歌曲列表删除事件
    deletes(index) {
      this.songList.splice(index, 1);
    },
  },
  mounted() {
    //初始化音量
    this.$refs.audio.volume = 1;

    //从子组件vilume收到设置的音量大小并设置给audio
    this.$bus.on("clickLocation", (clickLocation) => {
      this.$refs.audio.volume = clickLocation;
    });

    //从子组件progresss接收到设置歌曲进度设置给audio
    this.$bus.on("VolumeSet", (setUpThe) => {
      this.$refs.audio.currentTime = setUpThe;
      this.$refs.audio.play();
    });

    //从子组件seekResults收到收藏的请求
    this.$bus.on("collect", (item) => {
      let judge = false;
      for (let i of this.songList) {
        if (item.rid == i.rid) {
          judge = true;
          break;
        }
      }
      if (judge == false) {
        this.songList.push(item);
      }
    });
    //接收播放模式的切换
    this.$bus.on("Handover", (Handover) => {
      switch (Handover) {
        case 0:
          this.$refs.audio.loop = false;
          this.order = Handover;
          this.$refs.pastRecords.pastRecordsTitle = "顺序播放";
          break;
        case 1:
          this.$refs.audio.loop = true;
          this.order = Handover;
          this.$refs.pastRecords.pastRecordsTitle = "单曲循环";
          break;
        case 2:
          this.$refs.audio.loop = false;
          this.order = Handover;
          this.$refs.pastRecords.pastRecordsTitle = "随机播放";
          break;
      }
    });
    //接收播放全部请求
    this.$bus.on("allPlay", () => {
      if (this.songList.length > 0) {
        this.songOrder = [];
        this.listCache = [];

        for (let i of this.songList) {
          this.songOrder.push(i);
          this.listCache.push(i);
        }
        if (this.listCache.length !== 0) {
          this.seekPlay(this.listCache[0]);
        }
      }
    });
    //接收清空所有歌曲请求
    this.$bus.on("allDelete", () => {
      this.songList = [];
    });
    //接收清空播放列表请求
    this.$bus.on("deleteList", () => {
      this.songOrder = [];
      this.listCache = [];
    });
    //接收请求删除播放顺序项
    this.$bus.on("deletes", (index) => {
      for (let i of this.listCache) {
        if (this.listCache[index].rid == i.rid) {
          this.listCache.splice(index, 1);
          break;
        }
      }
      for (let i of this.pastRecords) {
        if (this.pastRecords[index].rid == i.rid) {
          this.pastRecords.splice(index, 1);
          break;
        }
      }
      this.songOrder.splice(index, 1);
    });
    //接收上一首事件请求
    this.$bus.on("Previous", () => {
      for (let i in this.pastRecords) {
        if (this.seek == this.pastRecords[i]) {
          if (i > 0) {
            this.seekPlay(this.pastRecords[i - 1]);
          }
        }
      }
    });
    //接收下一首事件
    this.$bus.on("Next", () => {
      if (this.songOrder.length > 0) {
        if (this.seek.rid !== this.songOrder[this.songOrder.length - 1].rid) {
          for (let i = 0; i < this.songOrder.length; i++) {
            if (this.seek.rid == this.songOrder[i].rid) {
              this.seekPlay(this.songOrder[i + 1]);
              break;
            }
          }
        }
      }
    });
    this.$bus.on("records", () => {
      this.isPastRecords = !this.isPastRecords;
    });
  },
  computed: {},
};
</script>


<style scoped>
/* 引入初始化css文件 */
@import "assets/css/tongyi.css";
/* 引入全局css变量 */
@import "assets/css/componentscss.css";
/* 响应布局 最小不小于992px*/
@media (min-width: 769px) {
  .back {
    width: 100%;
    height: 100vh;
  }
  /* 播放器主页 */
  #app {
    width: 992px;
    height: 690px;
    max-width: 992px;
    max-height: 690px;
    position: relative;
    background: #fff;
    margin: auto;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 5px rgb(155, 155, 155);
  }
  .songListTrue {
    left: 0;
  }
  .songListIs {
    width: 15px;
    height: 50px;
    font-size: 25px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background: rgba(200, 200, 200, 0.5);
    position: absolute;
    left: 1px;
    bottom: 50%;
    border-radius: 0 10px 10px 0;
    transition: left 0.3s;
    cursor:pointer;
  }
  .songListIsTrue {
    left: 301px;
  }
  .songListIs:hover {
    background: rgba(200, 200, 200, 0.6);
  }
  .lyricTableTrue{
    width: 692px;
  }
  .pastRecordstrue {
    height: 350px;
  }
}



/* 响应布局 最大不大于991px*/
@media (max-width: 768px) {
  #app {
    width: 100%;
    height: 100vh;
    border-radius: 20px;
    overflow: hidden;
  }
  .songListTrue {
    left: 0%;
  }
  .songListIs {
    width: 35px;
    height: 35px;
    font-size: 35px;
    text-align: center;
    line-height: 30px;
    color: var(--color);
    position: absolute;
    left: 10px;
    bottom: 20px;
    transform: translateY(-50%);
    z-index: 22;
  }
  .pastRecordstrue {
    height: 350px;
  }
}
</style>
