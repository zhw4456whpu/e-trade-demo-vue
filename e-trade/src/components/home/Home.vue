<template>
    <div class="home">
        <!-- home 头部 -->
        <top></top>
        <!-- home 走马灯 -->
        <carousel></carousel>
        <!-- home 导航 -->
        <a-nav :showFullNav="true" :showMarqueen="true"></a-nav>
        <Row class="line"></Row>
        <!-- 商城主体 -->
        <main-content></main-content>
        <!-- footer -->
        <a-footer></a-footer>
    </div>
</template>
<script>
import top from '../common/Top'
import aNav from '../common/ShopNav'
import carousel from './Carousel'
import mainContent from './MainContent'
import aFooter from '../common/Footer'
export default{
    name:'home',
    components:{
        top:top,
        aNav:aNav,
        carousel:carousel,
        mainContent:mainContent,
        aFooter:aFooter
    },
    mounted(){
    }
}
</script>
