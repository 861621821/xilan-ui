# marquee跑马灯
基于[create-keyframe-animation](https://www.npmjs.com/package/create-keyframe-animation)
>文本跑马灯，支持单条文本循环、多条文本循环
#### 用法
``` html
<xl-marquee speed="" :text="text"></xl-marquee>

<script>
  export default {
    data(){
      return {
        // text: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。'
        text: [
          '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。',
          '用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。',
          '使用带斑马纹的表格，可以更容易区分出不同行的数据。',
          '可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。'
        ]
      }
    }
  }
</script>
```
#### 属性  
| 参数  | 说明    | 类型 |  默认值 |
| ---- |  ----  | ----  | ----  |
| text  | 展示的文本  | String\|Array  | - |
| speed  | 滚动速度  | String[ fast \| slow \| 无]  | - |
| iterations | 循环次数  | Number  | 无限循环播放 |
| delay  | 延时播放  | Array  | 0 |
| interval  | 两条文本之间的间距  | Array  | 150 |
