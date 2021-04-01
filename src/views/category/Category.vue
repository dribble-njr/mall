<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li>1列表</li>
      <li>2列表</li>
      <li>3列表</li>
      <li>4列表</li>
      <li>5列表</li>
      <li>6列表</li>
      <li>7列表</li>
      <li>8列表</li>
      <li>9列表</li>
      <li>10列表</li>
      <li>11列表</li>
      <li>12列表</li>
      <li>13列表</li>
      <li>14列表</li>
      <li>15列表</li>
      <li>16列表</li>
      <li>17列表</li>
      <li>18列表</li>
      <li>19列表</li>
      <li>20列表</li>
      <li>21列表</li>
      <li>22列表</li>
      <li>23列表</li>
      <li>24列表</li>
      <li>25列表</li>
      <li>26列表</li>
      <li>27列表</li>
      <li>28列表</li>
      <li>29列表</li>
      <li>30列表</li>
      <li>31列表</li>
      <li>32列表</li>
      <li>33列表</li>
      <li>34列表</li>
      <li>35列表</li>
      <li>36列表</li>
      <li>37列表</li>
      <li>38列表</li>
      <li>39列表</li>
      <li>40列表</li>
      <li>41列表</li>
      <li>42列表</li>
      <li>43列表</li>
      <li>44列表</li>
      <li>45列表</li>
      <li>46列表</li>
      <li>47列表</li>
      <li>48列表</li>
      <li>49列表</li>
      <li>50列表</li>
      <li>51列表</li>
      <li>52列表</li>
      <li>53列表</li>
      <li>54列表</li>
      <li>55列表</li>
      <li>56列表</li>
      <li>57列表</li>
      <li>58列表</li>
      <li>59列表</li>
      <li>60列表</li>
      <li>61列表</li>
      <li>62列表</li>
      <li>63列表</li>
      <li>64列表</li>
      <li>65列表</li>
      <li>66列表</li>
      <li>67列表</li>
      <li>68列表</li>
      <li>69列表</li>
      <li>70列表</li>
      <li>71列表</li>
      <li>72列表</li>
      <li>73列表</li>
      <li>74列表</li>
      <li>75列表</li>
      <li>76列表</li>
      <li>77列表</li>
      <li>78列表</li>
      <li>79列表</li>
      <li>80列表</li>
      <li>81列表</li>
      <li>82列表</li>
      <li>83列表</li>
      <li>84列表</li>
      <li>85列表</li>
      <li>86列表</li>
      <li>87列表</li>
      <li>88列表</li>
      <li>89列表</li>
      <li>90列表</li>
      <li>91列表</li>
      <li>92列表</li>
      <li>93列表</li>
      <li>94列表</li>
      <li>95列表</li>
      <li>96列表</li>
      <li>97列表</li>
      <li>98列表</li>
      <li>99列表</li>
      <li>100列表</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        pullUpLoad: true,
      })

      // this.scroll.on('scroll', (position) => {
      //   // console.log(position);
      // })

      this.scroll.on('pullingUp', () => {
        console.log('上拉加载');
        this.scroll.finishPullUp();
      })
    })
  }
}
</script>

<style scoped> 
.wrapper {
  height: 200px;
  border: 1px solid #000;

  overflow: hidden;
}
</style>