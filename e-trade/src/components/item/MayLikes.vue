<template>
    <Row class="may-likes">
        <ul>
            <li v-for="(item,index) in mayLikes.mayList" :key="item.value" :class="index==0?'first':''">
                <div class="p-img">
                    <a>
                        <img v-lazy="item.imgSrc" />
                    </a>
                </div>
                <div class="p-name">
                    <a>{{item.label}}</a>
                </div>
                <div class="p-price">
                    <strong>{{priceUnit}} {{item.price}}</strong>
                </div>
            </li>
        </ul>
        <Row class="clear" type="flex" justify="end">
            <Page :total="total" @on-change="change"></Page>
        </Row>
    </Row>
</template>
<script>
export default{
    name:'MayLikes',
    methods:{
        change(val){
            this.$emit("change",val);
        }
    },
    props:['priceUnit','mayLikes','total']
}
</script>
<style lang="less" scoped>
.may-likes{
    margin-top: 25px;
    border-radius: 4px;

    ul{
        li{
            text-align:left;
            float: left;
            padding: 8px 10px 0;
            font: "14px/1.5 tahoma,arial,Hiragino Sans GB,宋体,sans-serif";
            width: 25%;

            img{
                width:100%;
            }
        }
    }
}
</style>