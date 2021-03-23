<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script scoped>
import BScroll from 'better-scroll'

export default {
  name:"scroll",
  props:{
    probeType: {
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default : false
    }
  },
  data(){
    return {
      Scroll:null
    }
  },
  mounted(){
    //创建scroll模块对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      observeDOM:true,
      click:true,
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad,
    }),
    //回到顶部触发给home发送响应
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
    //scroll触发底部加载更多后给home发送上拉加载跟多响应
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },

  //点击回到顶部，实现功能
  methods:{
    scrollto(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    //重新计算scroll模块的高度
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  .wrapper{
    width: 100%;
    overflow: hidden;
  }
</style>