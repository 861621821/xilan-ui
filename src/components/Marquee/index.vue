<template>
  <div class="xl-marquee" ref="marquee">
    <p class="xl-marquee-wrapper" ref="marquee-wrapper" v-html="marqueeHtml"></p>
  </div>
</template>
<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'left'
    },
    speed: {
      type: [Number, String],
      default: 3
    },
    interval: {
      type: Number,
      default: 150
    },
    content: {
      type: [String, Array],
      default: ''
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  computed: {
    marqueeHtml(){
      let marqueeHtml
      if (typeof this.content === 'string'){
        marqueeHtml = `<span class="marquee-item">${this.content}</span><span style="display: inline-block;width: ${this.interval}px"></span><span class="marquee-item">${this.content}</span>`
      } else {
        let htmlItem = ''
        this.content.map((e,i)=>{
          if (i < this.content.length - 1){
            htmlItem += `<span>${e}</span><span style="display: inline-block;width: ${this.interval}px"></span>`
          } else {
            htmlItem += `<span>${e}</span>`
          }
        })
        marqueeHtml = `<span class="marquee-item">${htmlItem}</span></span><span style="display: inline-block;width: ${this.interval}px"></span><span class="marquee-item">${htmlItem}</span>`
      }
      return marqueeHtml
    }
  },
  mounted () {
    this.animation()
  },
  methods: {
    animation(){
      const animations = require('create-keyframe-animation')
      const boxW = this.$refs.marquee.offsetWidth
      const textW = document.querySelector('.marquee-item').offsetWidth
      let speed
      if(this.speed < 1){
        speed = 1
      } else if(this.speed > 5){
        speed = 5
      } else speed = this.speed
      const duration = (textW + this.interval) / 1000 * (30000 / speed)
      if(textW > boxW){ // 需要滚动
        animations.registerAnimation({
          name: 'marquee',
          animation: {
            0: {
              left: 0
            },
            100: {
              left: `-${textW + this.interval}px`
            }
          },
          // optional presets for when actually running the animation
          presets: {
            duration: duration,
            easing: 'linear',
            delay: this.delay,
            iterations: 'infinite'
          }
        })
        animations.runAnimation(this.$refs['marquee-wrapper'], 'marquee')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .xl-marquee{
    overflow: hidden;
  }
  .xl-marquee-wrapper{
    white-space: nowrap;
    position: relative;
    float: left;
    left: 0;
  }
</style>
