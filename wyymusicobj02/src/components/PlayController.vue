<template>
  <div id="playController" class="playController">
    <!-- 全局播放组件 -->
    <div class="left">
      <img :src="playlist[playCurrentIndex].al.picUrl" class="logo">
      <div id="audioContainer">
        <div id="audioTitle" class="title">{{playlist[playCurrentIndex].name}}</div>
        <div id="audioTips" class="tips">横滑可以切换上下首</div>
      </div>
    </div>
    <div class="right">
      <svg id="playButton" class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
	  <svg id="playButton" class="icon" aria-hidden="true" @click="stop">
	    <use xlink:href="#icon-iconstop"></use>
	  </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao1"></use>
      </svg>
    </div>
	<audio  :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "PlayController",
  computed:{
	  ...mapState(["playlist","playCurrentIndex"]) //获取正在播放音乐列表，以及正在播放歌曲下标
  },
  methods:{
	  play(){
		  this.$refs.audio.play();
	  },
	  stop(){
		  this.$refs.audio.pause();
	  }
  }
};
</script>

<style scoped>
.playController {
  background: #fff;
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;

  .left {
    display: flex;
    padding: 0 0.2rem;

    .logo {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }

    #audioContainer {
      padding: 0 0.2rem;

      .tips {
        font-size: 0.2rem;
        color: #999;
      }
    }
  }

  .right {
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 0.2rem;
    }
  }
}
</style>
