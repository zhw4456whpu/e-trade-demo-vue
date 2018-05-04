<template>
    <Row class="brand-introduce">
        <Row class="base-info">
            <Row class="bi-title">
                <h4>{{brandInfo.baseInfo.label}}</h4>
            </Row>
            <Row class="base-params">
                <ul>
                    <li v-for="item in brandInfo.baseInfo.params" :key="item.value">
                        {{item.label}} {{item.value}}
                    </li>
                </ul>
            </Row>
        </Row>
        <Row class="details">
            <Row class="details-title bi-title">
                <h4>{{brandInfo.details.label}}</h4>
            </Row>
            <Row class="details-imgs">
                <img v-for="item in brandInfo.details.imgList" :key="item.value" :src="item.imgSrc" />
            </Row>
        </Row>
    </Row>
</template>
<script>
export default{
    name:'BrandIntroduce',
    props:['brandInfo']
}
</script>
<style lang="less" scoped>
.brand-introduce{
    padding: 10px 10px 15px;
    .bi-title{
        h4{
            position: relative;
            float: left;
            height: 35px;
            margin-bottom: -1px;
            padding-right: 10px;
            border-bottom: 1px solid #F70;
            font-size: 14px;
        }
    }
    .base-info{
        
        .base-params{
            ul{
                padding: 0px 20px 18px;
                text-indent: 0px;
                overflow: hidden;
                text-align: left;

                li{
                    display: inline;
                    float: left;
                    width: 33.33%;
                    height: 18px;
                    overflow: hidden;
                    margin: 10px 0px 0px 0px;
                    line-height: 18px;
                    vertical-align: top;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #666;
                    font-size: 14px;
                }
            }

        }
    }
    .details{
        .details-imgs{
            padding-top:20px;

            img{
                width: 100%;
            }
        }
    }
}
</style>