<template>
    <Row class="hot-activity">
        <Row class="shop-title">
            <h4>活动</h4>
            <h3>每期活动 优惠享不停 </h3>
            <span class="more">
                <a href="">
                    全部活动
                    <i class="arrow-right"></i>
                </a>
            </span>
        </Row>
        <Row class="activities">
            <Col span="6" class="activity" v-for="(item,index) in activityList" :key="item.value" :value="item.value">
                <div v-if="index==0" class="red-icon"></div>
                <div v-else-if="index==1" class="brown-icon"></div>
                <div v-else-if="index==2" class="green-icon"></div>
                <div v-else="index==1" class="blue-icon"></div>
                <h4>{{item.h4Text}}</h4>
                <div class="activity-main">
                    <img v-lazy="item.src" />
                </div>
                <Row class="info">
                    <h3>{{item.h3Text}}</h3>
                </Row>
            </Col>
            
        </Row>
    </Row>
</template>
<script>
export default {
    name:'hotActivity',
    data(){
        return {
            activityList:[
                {
                    value:'1',
                    h3Text:'春节送礼优选',
                    src:'../../../static/i/home/activity1.jpg',
                    h4Text:'秒杀'
                },
                {
                    value:'2',
                    h3Text:'春节送礼优选',
                    src:'../../../static/i/home/activity2.jpg',
                    h4Text:'特惠'
                },
                {
                    value:'3',
                    h3Text:'春节送礼优选',
                    src:'../../../static/i/home/activity3.jpg',
                    h4Text:'团购'
                },
                {
                    value:'4',
                    h3Text:'春节送礼优选',
                    src:'../../../static/i/home/activity.jpg',
                    h4Text:'超值'
                },
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../assets/c/activity.less');
</style>