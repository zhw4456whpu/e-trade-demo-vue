<template>
    <div class="login">
        <e-header></e-header>
        <Row class="login-banner">
            <Col class="login-main">
                <Col span="14" class="login-banner-bg">
                    <img src="../../assets/i/login/big.jpg"></img>
                </Col>
                <Col span="10" class="login-box">
                    <Tabs>
                        <TabPane label="账号登陆" icon="social-apple">
                            <login-box></login-box>
                        </TabPane>
                        <TabPane label="扫码登陆" icon="qr-scanner">
                            <Row id="qrcode"></Row>  
                        </TabPane>
                    </Tabs>
                    
                </Col>
            </Col>
        </Row>
    </div>
</template>
<script>
import eHeader from '../common/Header'
import loginBox from '../common/LoginBox'
import qRCode from 'qrcodejs2'  

export default {
    name:'login',
    components:{
        eHeader:eHeader,
        loginBox:loginBox,
        qRCode:qRCode
    },
    methods:{
        qrcode () {
            let userId = Math.random()*10;
            let qrcode = new qRCode('qrcode', {  
            width: 200,  
            height: 200, // 高度  
            text: 'http://localhost:8080/#/login?userId='+userId // 二维码内容  
            // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
            // background: '#f0f'  
            // foreground: '#ff0'  
            //可能存在的业务逻辑：二维码过期，二维码限制app种类访问
            })  
            console.log(qrcode)  
        }  
    },
    mounted(){
        this.qrcode();
    }
}
</script>
<style lang="less">
@import url('../../assets/c/login.less');
</style>