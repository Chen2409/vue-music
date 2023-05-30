<template>
  <div id="playController" class="playController">
    <!-- 全局播放组件 -->
    <div class="left">
      <img :src="playlist[playCurrentIndex].al.picUrl" class="logo" @click="show=!show">
      <div id="audioContainer">
        <div id="audioTitle" class="title">{{ playlist[playCurrentIndex].name }}</div>
        <div id="audioTips" class="tips">横滑可以切换上下首</div>
      </div>
    </div>
    <div class="right">
      <svg v-if="abc" class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-iconstop"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao1"></use>
      </svg>
    </div>
	<!-- 歌曲详情页面 -->
	<play-music :abc="abc" :play="play" :playDetail="playlist[playCurrentIndex]"  v-show="show" @back="show=!show"></play-music>
    <!-- 如何获取播放歌曲的mps地址 -->
    <!-- controls audio标签属性，一般不显示 -->
    <!-- audio paly（）播放音乐 pause（）暂停音乐 -->
    <audio ref="audio" v-if="playlist[playCurrentIndex]" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PlayMusic from "@/components/PlayMusic.vue"
export default {
  name: "PlayController",
  components:{
	  PlayMusic
  },
  computed: {
    ...mapState(["playlist", "playCurrentIndex"]),
    //获取正在播放音乐列表，以及正在播放歌曲下标
  },
  data() {
    return {
      abc: true, //当前是否处于暂停状态
	  show:false
    };
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.abc = false;
      } else {
        this.$refs.audio.pause();
        this.abc = true;
      }
    },
  },
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
