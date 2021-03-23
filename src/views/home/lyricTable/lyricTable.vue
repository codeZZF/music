<template>
  <div class="lyricTable">
    <div class="name">{{ seek.name }}</div>
    <div class="artist">{{ seek.artist }}</div>
    <div class="lyricBG">
      <div class="lyric" :style="{ bottom: lyricTop + 'px' }">
        <div
          class="lyricList"
          :class="{ lyricListTrue: index == atLyric }"
          v-for="(itme, index) in songItme[1]"
          :key="index"
        >
          {{ itme }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lyricTable",
  props: {
    songLyric: {
      type: Array,
      defaule: [],
    },
    itme: {
      type: Number,
      defaule: 0,
    },
    seek: {
      type: Object,
      defaule: {},
    },
  },
  data() {
    return {
      songLists: [],
      songItme: [[], []],
      atLyric: 0,
      lyricTop: 0,
    };
  },
  watch: {
    //歌词解构
    songLyric: function () {
      for (let i = 0; i < this.songLyric.length; i++) {
        this.songLists[i] = this.songLyric[i].split("]");
      }
      for (let i = 0; i < this.songLists.length; i++) {
        this.songItme[0][i] = this.songLists[i][0].split(":");
        this.songItme[0][i] =
          this.songItme[0][i][0] * 60 + this.songItme[0][i][1] * 1;
        this.songItme[1][i] = this.songLists[i][1];

        if (
          this.songItme[1][i] == "\n" ||
          this.songItme[1][i] == undefined ||
          this.songItme[1][i] == "//\n"
        ) {
          this.songItme[1].splice(i, 1);
          this.songItme[0].splice(i, 1);
        }
      }
      this.songItme[0].push(9999);
    },
    //动态歌词
    itme: function () {
      for (let i = 0; i < this.songItme[0].length; i++) {
        if (this.songItme[0][i] >= this.itme) {
          this.atLyric = i - 1;
          break;
        }
      }
      this.lyricTop = this.atLyric * 31;
    },
  },
};
</script>

<style scoped>
/* 响应布局 最小不小于992px*/
@media (min-width: 769px) {
.lyricTable {
  width: 100%;
  height: 618px;
  float: right;
  margin: 0;
  padding: 0;
  transition: width .3s ;
  position: relative;
  overflow: hidden;
}
.lyricBG {
  width: 100%;
  height: 70%;
  margin: 150px 0 0 0;
  overflow: hidden;
}
.lyric {
  width: 100%;
  margin: 200px 0 0 0;
  text-align: center;
  color: var(--colors);
  position: relative;
  transition: font-size 0.3s, color 0.3s, bottom 0.3s;
}
.name {
  width: 100%;
  height: 30px;
  position: absolute;
  text-align: center;
  top: 70px;
  color: var(--color);
  line-height: 30px;
  font-size: 23px;
}
.artist {
  width: 100%;
  height: 20px;
  position: absolute;
  text-align: center;
  top: 100px;
  color: var(--color);
  line-height: 20px;
  font-size: 15px;
}
.lyricList {
  margin: 15px 0;
  width: 100%;
  font-size: 17px;
}
.lyricListTrue {
  color: var(--color);
  font-size: 25px;
}
}



/* 响应布局 最大不大于991px*/
@media (max-width: 768px) {
.lyricTable {
  position: relative;
  overflow: hidden;
}
.lyricBG {
  width: 100%;
  height: 70%;
  margin: 150px 0 0 0;
  overflow: hidden;
}
.lyric {
  width: 100%;
  margin: 50% 0 0 0;
  text-align: center;
  color: var(--colors);
  position: relative;
  transition: font-size 0.3s, color 0.3s, bottom 0.3s;
}
.name {
  width: 100%;
  height: 30px;
  position: absolute;
  text-align: center;
  top: 70px;
  color: var(--color);
  line-height: 30px;
  font-size: 23px;
}
.artist {
  width: 100%;
  height: 20px;
  position: absolute;
  text-align: center;
  top: 100px;
  color: var(--color);
  line-height: 20px;
  font-size: 15px;
}
.lyricList {
  margin: 15px 0;
  width: 200%;
  transform: translateX(-25%);
  font-size: 15px;
}
.lyricListTrue {
  color: var(--color);
  font-size: 20px;
}

}
</style>