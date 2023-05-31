<template>
  <div class="playMusic">
    <div class="bg" :style="{backgroundImage: `url(${playDetail.al.picUrl})`}"></div>
    <div class="playTop">
      <div class="back" @click="$emit('back')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sdf"></use>
        </svg>
      </div>
      <div class="center">
        <div class="title">{{ playDetail.name }}</div>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun20"></use>
        </svg>
      </div>
    </div>
    <div v-if="isLyric" class="playContent" @click="isLyric = !isLyric">
      <img class="needle" :class="{ active: !abc }" src="../assets/img/needle-ip6.png" alt="">
      <img class="disc" src="../assets/img/disc-ip6.png" alt="">
      <img class="playImg" :src="playDetail.al.picUrl" alt="">
    </div>
    <div v-else class="playLyric" @click="isLyric = !isLyric">
      <div v-for="(line, index) in parsedLyrics" :key="index" class="lyric-line">
        {{ line.text }}
      </div>
    </div>
    <div class="playFooter">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="tabMusic(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon" v-if="abc" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang_huaban"></use>
      </svg>
      <svg class="icon" v-else aria-hidden="true" @click="play">
        <use xlink:href="#icon-iconstop"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="tabMusic(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao1"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: "playmusic",
  props: ["abc", "play", "playDetail"],
  data() {
    return {
      isLyric: false,
      parsedLyrics: [], // 用于存储解析后的歌词的数组
    };
  },
  computed: {
    ...mapState(["playCurrentIndex", "playlist", "lyric"]),
  },
  methods: {
    tabMusic(num) {
      var index = this.playCurrentIndex + num; // 切换后的下标
      if (index < 0) {
        index = this.playlist.length - 1;
      } else if (index === this.playlist.length) {
        index = 0;
      }
      this.setPlayIndex(index);
    },
    ...mapMutations(["setPlayIndex"]),
    parseLyrics(rawLyric) {
      if (!rawLyric) return;

      const lines = rawLyric.split("\n");
      const parsedLyrics = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const timestampMatch = line.match(/\[(\d+:\d+\.\d+)\]/);
        const text = line.replace(/\[(\d+:\d+\.\d+)\]/, "").trim();

        if (timestampMatch && timestampMatch.length === 2) {
          const timestamp = timestampMatch[1];
          parsedLyrics.push({ timestamp, text });
        }
      }

      this.parsedLyrics = parsedLyrics;
    },
  },
  watch: {
    lyric(newLyric) {
      this.parseLyrics(newLyric);
    },
  },
  mounted() {
    this.parseLyrics(this.lyric);
  },
};
</script>

<style lang="less" scoped>
	/* 样式省略，根据需要自行添加 */
	
	.lyric-line {
	  text-align: center;
	  line-height: 30px;
	  color: #999;
	}
	
	.lyric-line.active {
	  color: #3c66ff;
	}
	.playMusic {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 3;
		background-color: #fff;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			height: 100vh;
			background-size: auto 100%;
			background-position: center;
			filter: blur(60px);

		}

		.playTop {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 7.5rem;
			height: 1.2rem;
			position: absolute;
			left: 0;
			top: 0;
			color: #fff;
			padding: 0 0.4rem;

			.icon {
				fill: #fff;
				width: 0.4rem;
				height: 0.4rem;
			}

			marquee {
				width: 5rem;
				flex: 1;
			}
		}

		.playContent {
			position: absolute;
			width: 7.5rem;
			height: 7.5rem;
			left: 0;
			top: 1.5rem;

			.needle {
				width: 2.5rem;
				height: auto;
				position: absolute;
				left: 3.5rem;
				transform-origin: 0.3rem 0;
				transform: rotate(-10deg);
				transition: all 1s;
				z-index: 10;
			}

			.needle.active {
				width: 2.5rem;
				height: auto;
				position: absolute;
				left: 3.5rem;
				transform-origin: 0.3rem 0;
				transform: rotate(15deg);
				transition: all 1s;
				z-index: 10;
			}

			.disc {
				width: 5.5rem;
				height: auto;
				position: absolute;
				left: calc(50% - 2.75rem);
				top: 2.5rem;

			}

			.playImg {
				width: 3.4rem;
				height: 3.4rem;
				border-radius: 1.7rem;
				position: absolute;
				left: calc(50% - 1.7rem);
				top: 3.55rem;
			}
		}

		.playFooter {
			width: 7.5rem;
			height: 1.5rem;
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.4rem;

			.icon {
				fill: #fff;
				width: 0.5rem;
				height: 0.5rem;
			}

			.play.icon {
				width: 1rem;
				height: 1rem;
			}
		}

		.playLyric {
			position: absolute;
			width: 7.5rem;
			height: 8rem;
			left: 0;
			top: calc(50% - 4rem);
			overflow: scroll;
			text-align: center;
			color: #fff;
			padding: 0.2rem 0;

			.active {
				color: red;
			}
		}
	}
</style>
