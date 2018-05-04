<template>
        <Carousel 
        v-model="value3"
        :autoplay="autoplay"
        :autoplay-speed="autoplaySpeed"
        :dots="dots"
        :radius-dot="radiusDot"
        :trigger="trigger"
        :arrow="arrow"
        @on-change="changeItem">
            <CarouselItem class="bg-green">
                <div class="demo-carousel">
                    <img src="../../../static/i/home/ad1.jpg" />
                </div>
            </CarouselItem>
            <CarouselItem class="bg-red">
                <div class="demo-carousel">
                    <img src="../../../static/i/home/ad2.jpg" />
                </div>
            </CarouselItem>
            <CarouselItem class="bg-black">
                <div class="demo-carousel">
                    <img src="../../../static/i/home/ad3.jpg" />
                </div>
            </CarouselItem>
            <CarouselItem class="bg-orange">
                <div class="demo-carousel">
                    <img src="../../../static/i/home/ad4.jpg" />
                </div>
            </CarouselItem>
        </Carousel>
</template>
<script>
    export default {
        data () {
            return {
                value3:0,
                autoplay: false,
                autoplaySpeed: 2000,
                dots: 'inside',
                radiusDot: true,
                trigger: 'click',
                arrow: 'hover'
            }
        },
        methods:{
            changeItem(oldVal,val){
                this.curIndex = val;
            }
        }
    }
</script>
<style lang="less" scoped>
.ivu-carousel{
    height:440px;
    margin-top:45px;
    .ivu-carousel-list{
        .bg-green{
            background-color:#55be59;
        }
        .bg-red{
            background-color:#f44661;
        }
        .bg-black{
            background-color:#0f1024;
        }
        .bg-orange{
            background-color:#ff9801;
        }
    }
    .ivu-carousel-item{
        .demo-carousel{
            width:1200px;
            margin:0px auto;
            padding-left:150px;

            img{
                height:440px;
            }
        }
        
    }
}
</style>
