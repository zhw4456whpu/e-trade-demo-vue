<template>
    <Row class="prd-recommand">
        <Col span="6" class="current-date">
            <img src="../../../static/i/home/2016.png" />
            <p>今日<br>推荐</p>
        </Col>
        
        <Col span="6" class="recommand-cat" v-for="item in recommandCategorys" :key="item.value"
            :value="item.value">
            <Row class="info">
                <h3>{{item.h3Text}}</h3>
                <h4>{{item.h4Text}}</h4>
            </Row>
            <Row class="recommend-main">
                <a :href="item.html">
                    <img v-lazy="item.src" />
                </a>
            </Row>
        </Col>
    </Row>
</template>
<script>
export default{
    name:'prdRecommand',
    data(){
        return {
            recommandCategorys:[
                {
                    label:'benefit',//福利
                    value:'1',
                    h3Text:'真的有鱼',
                    h4Text:'开年福利篇',
                    html:'introduction.html',
                    src:'../../../static/i/home/tj.png'
                },
                {
                    label:'storeGoods',//囤货
                    value:'2',
                    h3Text:'囤货过冬',
                    h4Text:'让爱早回家',
                    html:'introduction.html',
                    src:'../../../static/i/home/tj1.png'
                },
                {
                    label:'romantic',//浪漫情人节
                    value:'3',
                    h3Text:'浪漫情人节',
                    h4Text:'甜甜蜜蜜',
                    html:'introduction.html',
                    src:'../../../static/i/home/tj2.png'
                }
            ]
        }
    }
}   
</script>
<style lang="less" scoped>
@import url('../../assets/c/recommands.less');
</style>