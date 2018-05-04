<template>
    <div class="shop-main">
        <!-- 今日推荐 -->
        <prd-recommand></prd-recommand>
        <!-- 热门活动 -->
        <hot-activity></hot-activity>
        <!-- 商品列展 -->
        <prd-category></prd-category>
    </div>
</template>
<script>
import prdRecommand from './PrdRecommand'
import hotActivity from './HotActivity'
import prdCategory from './PrdCategory'
export default{
    name:'maContent',
    components:{
        prdRecommand:prdRecommand,
        hotActivity:hotActivity,
        prdCategory:prdCategory
    }
}
</script>
<style lang="less" scoped>
.shop-main{
    margin-top:25px;
}
</style>