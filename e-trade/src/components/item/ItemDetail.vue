<template>
    <Row class="item-inform">
        <div class="clearfix-left">
            <Row class="box">
                <Row class="box-pic">
                    <a href="">
                        <!--<img v-lazy="itemDetail.defaultMid" />-->
                        <zoom-out :previewImg="itemDetail.previewImg" :zoomImg="itemDetail.zoomImg"></zoom-out>
                    </a>
                </Row>
                <ul class="box-thumb">
                    <li v-for="item in itemDetail.thumbList" :key="item.value" :value="item.value">
                        <a href="">
                            <img v-lazy="item.src" />
                        </a>
                    </li>
                </ul>
            </Row>
        </div>
        <div class="clearfix-right">
            <Row class="box-detail-hd">
                <h1>{{itemDetail.name}}</h1>
            </Row>
            <Row class="box-detail-list">
                <!-- 价格 -->
                <Row class="box-detail-price">
                    <Row class="price iteminfo_price">
                        <dt>{{itemDetail.discount.label}}</dt>
                        <dd>
                            <em>{{itemDetail.priceUnit.value}}</em>
                            <b class="sys_item_price">{{itemDetail.discount.value}}</b>
                        </dd>
                    </Row>

                    <Row class="price iteminfo_mktprice">
                        <dt>{{itemDetail.mktPrice.label}}</dt>
                        <dd>
                            <em>{{itemDetail.priceUnit.value}}</em>
                            <b class="sys_item_mktprice">{{itemDetail.mktPrice.value}}</b>
                        </dd>
                    </Row>
                </Row>
                <!-- 配送地址及邮费 -->
                <Row class="cus-address">
                    <dl class="iteminfo_parameter freight">
                        <dt>配送至</dt>
                        <Row class="iteminfo_freprice">
                            <Col span="18" class="am-form-content address">
                                <Select v-model="province" style="width:90px">
                                    <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Select v-model="city" style="width:90px">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Select v-model="area" style="width:90px">
                                    <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </Col>
                            <Col span="6" class="pay-logis">
                                快递
                                <b class="sys_item_freprice">{{itemDetail.freprice}}</b>
                                {{itemDetail.priceUnit.label}}
                            </Col>
                        </Row>
                    </dl>
                </Row>
                <!-- 销量和评论统计 -->
                <Row class="sell-count-comments">
                    <ul class="sell-count">
                        <li class="month-sell-count">
                            <Row class="count-info">
                                <span class="count-label">{{itemDetail.monthStatic.label}}</span>
                                <span class="count-value">{{itemDetail.monthStatic.value}}</span>
                            </Row>
                        </li>
                        <li class="total-sell-count">
                            <Row class="count-info">
                                <span class="count-label">{{itemDetail.totalSellCount.label}}</span>
                                <span class="count-value">{{itemDetail.totalSellCount.value}}</span>
                            </Row>
                        </li>
                        <li class="total-comments">
                            <Row class="count-info">
                                <span class="count-label">{{itemDetail.commentStatic.label}}</span>
                                <span class="count-value">{{itemDetail.commentStatic.value}}</span>
                            </Row>
                        </li>
                    </ul>
                </Row>
                <!-- 各种规格 -->
                <Row class="prd-params">
                    <dl>
                        <dt></dt>
                        <dd v-for="item in itemDetail.params" :key="item.value" :value="item.value">
                            <div v-if="item.value==1 || item.value == 2" class="theme-options">
                                <div class="cart-title">{{item.label}}</div>
                                <ul>
                                    <li v-for="(tItem,index) in item.catList" :key="tItem.value" 
                                    :value="tItem.value" @click="selected(item.label,index)">
                                        {{tItem.label}}
                                        <i v-show="index == checked && paramType == item.label"></i>
                                    </li>
                                </ul>
                            </div>
                            <div v-else class="theme-options">
                                <div class="cart-title">{{item.label}}</div>
                                <input id="min" class="am-btn am-btn-default" name="" type="button" value="-" @click="subPrd(curPrdNum)">
                                <input id="text_box" name="" type="text" value="curPrdNum" style="width:30px;" v-model="curPrdNum">
                                <input id="add" class="am-btn am-btn-default" name="" type="button" value="+" @click="addPrd(curPrdNum)">
                                <span id="Stock" class="tb-hidden">库存<span class="stock">{{item.maxNum - curPrdNum}}</span>件</span>
                            </div>
                        </dd>
                    </dl>
                </Row>
                <!-- 支付 -->
                <Row class="pay">
                    <Button type="warning">立即购买</Button>
                    <Button type="error">加入购物车</Button>
                </Row>
                <!-- 降价、打折、优惠券活动 -->
                <Row class="shop-promotion">
                    <Row class="hot">
                        <dt>{{itemDetail.activity.label}}</dt>
                        <div class="promotion-list">
                            <p>
                            {{itemDetail.activity.value}}
                                <span @click="showCoupon=!showCoupon">
                                    {{itemDetail.coupon.label}}
                                    <i></i>
                                </span>
                            </p>
                        </div>
                    </Row>

                    <Row class="coupon" v-show="showCoupon">
                        <dt>{{itemDetail.coupon.label}}</dt>
                        <div class="coupon-list">
                            <ul>
                                <li v-for="item in itemDetail.coupon.value" :key="item.value" :value="item.value">
                                    {{item.label}}
                                </li>
                            </ul>
                        </div>
                    </Row>
                </Row>
            </Row>
        </div>
        <!-- 优惠套装 -->
        <Row class="prd-group">
            <Row class="group-title">优惠套装</Row>
            <Row class="group-comment">
                <ul class="like_list">
                    <li>
                        <Row class="g-box">
                            <a class="g-img">
                                <img v-lazy="groupDetail[0].imgSrc">
                            </a>
                        </Row>
                        <a class="txt">{{groupDetail[0].label}}</a>
                        <Row class="info-box">
                            <span class="info-box-price">{{itemDetail.priceUnit.value}} {{groupDetail[0].discountPrice}}</span>
                            <span class="info-original-price">{{itemDetail.priceUnit.value}} {{groupDetail[0].mktPrice}}</span>
                        </Row>
                    </li>
                    <li class="plus_icon">+</li>
                    <li>
                        <Row class="g-box">
                            <a class="g-img">
                                <img v-lazy="groupDetail[1].imgSrc">
                            </a>
                        </Row>
                        <a class="txt">{{groupDetail[1].label}}</a>
                        <Row class="info-box">
                            <span class="info-box-price">{{itemDetail.priceUnit.value}} {{groupDetail[1].discountPrice}}</span>
                            <span class="info-original-price">{{itemDetail.priceUnit.value}} {{groupDetail[1].mktPrice}}</span>
                        </Row>
                    </li>
                    <li class="plus_icon">=</li>
                    <li class="total_price">
                        <p class="combo_price">
                            <span class="c-title">套餐价:</span>
                            <span>{{itemDetail.priceUnit.value}} {{groupDetail[0].discountPrice + groupDetail[1].discountPrice}}</span>
                        </p>
                        <p class="save_all">
                            共省:
                            <span>{{itemDetail.priceUnit.value}} {{groupDetail[0].mktPrice + groupDetail[1].mktPrice - groupDetail[0].discountPrice - groupDetail[1].discountPrice}}</span>
                        </p>
                        <a href="#" class="buy_now">立即购买</a>
                    </li>
                </ul>
            </Row>
        </Row>

        <!-- 商品介绍 -->
        <Row class="introduce">
            <div class="browse">
                <ul>
                    <div class="it"><h2>看了又看</h2></div>
                    <li v-for="(item,index) in browseList" :key="item.value" :class="index==0?'first':''">
                        <div class="p-img">
                            <a>
                                <img v-lazy="item.imgSrc" />
                            </a>
                        </div>
                        <div class="p-name">
                            <a>{{item.label}}</a>
                        </div>
                        <div class="p-price">
                            <strong>{{itemDetail.priceUnit.value}} {{item.price}}</strong>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="introduce-main">
                <Tabs value="name1" ref="ivuTabs" @on-click="clickTab" :style="{height:tabsHgt}">
                    <TabPane label="宝贝详情" name="name1">
                        <brand-introduce :brandInfo="brandInfo"></brand-introduce>
                    </TabPane>
                    <TabPane label="全部评价" name="name2"></TabPane>
                    <TabPane label="猜你喜欢" name="name3">
                        <may-likes :mayLikes="mayLikes" :priceUnit="priceUnit" :total="total" @change="change"></may-likes>
                    </TabPane>
                </Tabs>
            </div>
        </Row>
    </Row>
</template>
<script>
import ZoomOut from '../common/ZoomOut'
import BrandIntroduce from '../item/BrandIntroduce'
import MayLikes from '../item/MayLikes'
import searchApi from '../../service/search'
export default{
    name:'ItemDetail',
    data(){
        return {
            province:'',
            provinceList:[],
            city:'',
            cityList:[],
            area:'',
            areaList:[],
            paramType:'0',
            checked:'0',
            curPrdNum:0,//当前购买的商品数量
            showCoupon:false,
            brandInfo:{
                baseInfo:{
                    label:'产品参数：',
                    value:'1',
                    params:[
                        {
                            label:'产品类型:',
                            value:'烘炒类'
                        },
                        {
                            label:'原料产地:',
                            value:'巴基斯坦'
                        },
                        {
                            label:'产地: ',
                            value:'湖北省武汉市'
                        },
                        {
                            label:'配料表: ',
                            value:'进口松子、食用盐'
                        },
                        {
                            label:'产品规格: ',
                            value:'210g'
                        },
                        {
                            label:'保质期: ',
                            value:'180天'
                        },
                        {
                            label:'产品标准号: ',
                            value:'GB/T 22165'
                        },
                        {
                            label:'生产许可证编号： ',
                            value:'QS4201 1801 0226'
                        },
                        {
                            label:'储存方法：',
                            value:'请放置于常温、阴凉、通风、干燥处保存'
                        },
                        {
                            label:'食用方法：',
                            value:'开袋去壳即食'
                        }
                    ]
                },
                details:{
                    label:'商品细节',
                    value:'1',
                    imgList:[
                        {
                            imgSrc:'../../../static/i/item/tw1.jpg',
                            value:'1'
                        },
                        {
                            imgSrc:'../../../static/i/item/tw2.jpg',
                            value:'2'
                        },
                        {
                            imgSrc:'../../../static/i/item/tw3.jpg',
                            value:'3'
                        },
                        {
                            imgSrc:'../../../static/i/item/tw4.jpg',
                            value:'4'
                        },
                        {
                            imgSrc:'../../../static/i/item/tw5.jpg',
                            value:'5'
                        },
                        {
                            imgSrc:'../../../static/i/item/tw6.jpg',
                            value:'6'
                        },
                        {
                            imgSrc:'../../../static/i/item/tw7.jpg',
                            value:'7'
                        }
                    ]
                }
            },
            priceUnit:'¥',
            total:0,
            mayLikes:{
                label:'',
                value:'1',
                total:0,
                mayList:[
                ]
            },
            tabsHgt:'100%'
        }
    },
    props:['itemDetail','groupDetail','browseList'],
    components:{
        ZoomOut:ZoomOut,
        BrandIntroduce:BrandIntroduce,
        MayLikes:MayLikes
    },
    methods:{
        //点击tab
        clickTab(name){
            if(name == 'name3'){
                this.tabsHgt = '960px';
            }
            else if(name == 'name1'){
                this.tabsHgt = '100%';
            }
            else if(name == 'name2'){
                this.tabsHgt = '960px'
            }
        },
        //切换分页码
        change(val){
            this.getMayLikes('10',val);
        },
        //搜索可能喜欢的商品
        getMayLikes(pageSize,pageNo){
            console.log(localStorage);
            let config = {
                path:{
                    userName:JSON.parse(localStorage.getItem('userInfo')).userName,
                    pageSize:pageSize?pageSize:'10',
                    pageNo:pageNo?pageNo:'1'
                }
            }
            searchApi.getMayLikes(config).then(res =>{
                if(res.status == 200){
                    this.mayLikes.mayList = res.data;
                    this.total = res.total;
                }
            },err =>{
                this.$Message.error(err);
            })
        },
        //增加购买的数量
        addPrd(curNum){
            this.curPrdNum = curNum+1;
        },
        //减少购买的数量
        subPrd(curNum){
            if(curNum > 0 ){
                this.curPrdNum = curNum-1;
            }
        },
        //选中商品参数
        selected(type,index){
            this.paramType = type;
            this.checked = index;
        },
        //获取省份
        getProvince(){
            searchApi.getProvice().then(res =>{
                if(res.status == 200){
                    this.provinceList = res.data;
                }
            },err =>{
                this.$Message.error(err);
            })
        }
    },
    mounted(){
        this.getProvince();
        this.getMayLikes();
    }
}
</script>
<style lang="less" scoped>
.item-inform{
    max-width:1200px;
    margin:0px auto;
    font-size:14px;
    .clearfix-left{
        float:left;
        .box{
            .box-pic{
                a{
                    width:400px;
                    height:400px;

                    img{
                        width:400px;
                        height:400px;
                    }
                }
            }
            .box-thumb{
                margin:10px 0px;
                overflow:hidden;

                li{
                    background: none repeat scroll 0 0 transparent;
                    float: left;
                    height: 62px;
                    margin: 0 6px 0 0;
                    overflow: hidden;
                    padding: 1px;
                }

            }
        }
    }

    .clearfix-right{
        margin-left:425px;
        text-align:left;
        .box-detail-hd{
            text-align: left;
            height:42px;
            h1{
                font-size: 18px;
                padding-bottom: 0.4em;
                line-height: 1;
                font-weight: 700;
                color: #000;
                padding:8px 0px;
            }
        }
        .box-detail-list{
            font-size:14px;
            .box-detail-price{
                background: #F7F7F7;
                overflow: hidden;
                height: 100px;
                padding-top: 40px;

                .price{
                    margin:0px 10px;
                    height:25px;
                    dt{
                        width:70px;
                        float: left;
                        text-align: left;
                        display: inline;
                        white-space: nowrap;
                        color: #888;
                        margin-top: 5px;
                        
                    }

                    dd{
                        display:inline-block;
                        margin: 0px;
                        padding: 0px;
                        line-height:25px;
                        .sys_item_price{
                            font-size: 24px;
                            font-weight: bold;
                        }
                    }
                }
                .iteminfo_price{
                    color:#c00;
                }

                .iteminfo_mktprice{
                    padding-top:10px;
                    
                    .sys_item_mktprice{
                        text-decoration: line-through;
                        padding-top: 7px;
                        padding-bottom: 0px;

                    }
                }
            }
            .cus-address,.sell-count-comments{
                height:52px;
            }
            .prd-params{
                height:156px;
            }
            .iteminfo_parameter.freight{
                display: block;
                margin-top: 10px;
                margin-bottom: 10px;
                width: 430px;
                float: left;
                padding-left: 50px;

                dt{
                    padding-top: 6px;
                    padding-bottom: 0px;
                    margin-left: -70px;
                    float: left;
                    margin-right: 10px;
                    display: inline;
                    width: 60px;
                    white-space: nowrap;
                    text-align: right;
                    color: #888;

                }
                .pay-logis{
                    padding-top: 6px;
                    padding-bottom: 0px;
                    text-align: right;
                    padding-right: 10px;
                }
            }
            .sell-count{
                border: dotted #C9C9C9;
                border-width: 1px 0px;
                margin: -1px 0px 0px 0px;
                padding: 10px 0px;
                position: relative;
                overflow: hidden;
                display: flex;

                li{
                    float: left;
                    width: 33%;
                    text-align: center;
                    position: relative;
                    left: -1px;
                    border-left: 1px solid #E5DFDA;
                    flex: 1 1 0%;
                    line-height: 16px;
                    cursor: pointer;

                    .count-value{
                        display: inline-block;
                        line-height: 16px;
                        height: 16px;
                        color: #C40000;
                        font-weight: 700;
                    }
                }
            }
            .prd-params{
                dl{
                    padding-left:50px;
                }
                dd{
                    max-width: 500px;
                    padding-top: 15px;
                    height:52px;
                    .cart-title{
                        margin-left: -46px;
                        margin-top: 10px;
                        font-size: 12px;
                        font-weight: 100;
                        color: #888;
                        float: left;
                    }

                    ul{
                        li{
                            width:0px;
                            margin: 5px;
                            cursor: pointer;
                            padding: 3px;
                            background: none;
                            border-radius: 0;
                            padding: 3px;
                            border: 2px solid #F5F5F5;
                            color: #000;
                            position:relative;
                            width:auto;
                            float:left;

                            i{
                                position: absolute;
                                width: 10px;
                                height: 10px;
                                font-size: 0;
                                line-height: 0;
                                right: 0px;
                                bottom: 0px;
                                background: url(../../../static/i/item/sys_item_selected.gif) no-repeat right bottom;
                                z-index: 98;
                            }
                        }
                        .selected{
                            background: none;
                            color: #000;
                            border: 2px solid #BE0106;
                        }
                    }

                    #min, #add {
                        width: 20px;
                        vertical-align: middle;
                        cursor: pointer;
                        background-color: #e6e6e6;
                        border-color: #e6e6e6;
                        font-size: 12px;
                        color: #444;
                        display: inline-block;
                        margin-bottom: 0;
                        padding: 0.5em 1em;
                        font-weight: normal;
                        line-height: 1.2;
                        text-align: center;
                        white-space: nowrap;
                        background-image: none;
                        border: 1px solid transparent;
                        border-radius: 0;
                        outline: none;
                    }
                }
                
            }
            .pay{
                padding:20px 0px 0px 50px;
            }
            /* 领券 */
            .shop-promotion{
                position: absolute;
                top: 0px;
                padding-left: 10px;
                background: #F7F7F7;
                overflow: hidden;
                width: 100%;
                font-size:14px;
                .hot{
                    line-height:29px;
                    dt{
                        float: left;
                        margin-top: 10px;
                        width: auto;
                        display: inline;
                        white-space: nowrap;
                        text-align: right;
                        color: #888;

                    }
                    .promotion-list{
                        margin-left: 60px;
                        overflow: hidden;

                        p{
                            margin-top: 8px;
                            color: #E4393C;
                            font-weight: bold;
                            padding-left: 8px;

                            span{
                                position: absolute;
                                right: 10px;
                                display: inline-block;
                                cursor: pointer;
                                padding: 0px 10px;

                                i::before{
                                    font-size:14px;
                                    content: "\f0dd";
                                    display: inline-block;
                                    font: normal normal normal 1.6rem/1 "FontAwesome", sans-serif;
                                    text-rendering: auto;
                                    -webkit-font-smoothing: antialiased;
                                    -moz-osx-font-smoothing: grayscale;
                                    -webkit-transform: translate(0, 0);
                                    -ms-transform: translate(0, 0);
                                    transform: translate(0, 0);
                                    box-sizing: border-box;
                                }
                            }
                        }
                    }
                }
                .coupon{
                    padding: 10px 0px;
                    dt{
                        margin-top: 16px;
                        float: left;
                        width: auto;
                        white-space: nowrap;
                        text-align: right;
                        color: #888;
                    }
                    .coupon-list{
                        margin-left: 60px;
                        overflow: hidden;

                        ul{
                            li{
                                border-radius: 0;
                                background: url(../../../static/i/item/couponli.png) no-repeat;
                                padding: 10px 10px;
                                float: left;
                                color: #fff;
                                margin: 5px 5px;
                            }
                        }
                    }
                }
            }
        }
    }
    /** 商品优惠套装 */
    .prd-group{
        max-width: 1200px;
        margin: 0px auto;
        padding-top: 20px;

        .group-title{
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            margin: 0px 10px;
            border-bottom: 1px solid #E6E6E6;
            color: #E4393C;
            font-weight: 700;
            text-align:left;
        }
        /** 优惠套装 */
        .group-comment{
            border-bottom: 1px solid #E6E6E6;

            ul{
                li{
                    float: left;
                    margin-left: 5px;
                    margin-right: 5px;
                    padding-bottom: 15px;
                    text-align: center;

                    .g-box{
                        width: 150px;
                        overflow: hidden;
                        display: block;

                        .g-img img{
                            width: 100%;
                        }
                    }
                    .info-box-price{
                        color: #E4393C;
                        font-size: 16px;
                        font-family: arial;
                        font-weight: 600;
                    }
                    .info-original-price{
                        display: inline;
                        text-decoration: line-through;
                        font-size: 12px;
                        color: #999;
                        margin-left: 5px;
                        font-family: arial;
                        font-weight: 400;
                    }
                }
                .plus_icon{
                    height: 150px;
                    line-height: 150px;
                    width: 10px;
                    text-align: center;
                    font-size: 20px;
                    color: #C3C3C3;
                    margin: 0px 0px;
                }
                .total_price{
                    margin-top: 35px;

                    p{
                        font-size: 12px;
                        padding-bottom: 8px;
                    }
                    .combo_price{
                        span{
                            font-size: 16px;
                            color: #E4393C;
                            font-weight: 600;
                            display: inline;
                        }
                    }
                    .buy_now{
                        width: 102px;
                        line-height: 32px;
                        font-size: 14px;
                        background-color: #F03726;
                        color: #FFF;
                        margin: 0px auto;
                        text-align: center;
                        margin-top: 4px;
                        display:block;
                    }
                }
            }
        }
    }
    /**商品介绍 */
    .introduce{
        padding-top: 20px;
        width: 100%;
        margin: 0px auto;
        text-align: center;
        padding-bottom: 110px;
        max-width: 1200px;

        .browse{
            display: block;
            float: left;
            width: 20%;

            .it{
                background-color: #f7f7f7;
            }

            ul{
                border: 1px solid #D4D4D4;
                width: 90%;
                li{
                    margin: 0px 10px;
                    padding: 12px 0px;
                    border-top: 1px dotted #DEDEDE;

                    img{
                        width: 100%;
                    }
                    strong{
                        color: #E4393C;
                        font-weight: 600;
                    }
                }
                .first{
                    border-top:none;
                }
            }
        }

        .introduce-main{
            .ivu-tabs{
                height:100%;
            }
            .ivu-tabs-tabpane{
                height:100%;
            }
        }
    }
}
</style>