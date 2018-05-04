<template>
    <div class="login-form">
        <Row class="login-account">
            <Input v-model="curAccount" :autofocus="afocus" icon="android-person" placeholder="邮箱/手机/用户名"></Input>
        </Row>
        <Row class="login-pwd">
            <Input v-model="curPwd" icon="android-lock" type="password" placeholder="请输入密码"></Input>
        </Row>
        <Row class="login-links">
            <Col span="12" class="remmber-pwd">
                <Checkbox v-model="remember">记住密码</Checkbox>
            </Col>
            <Col span="12" class="forget-pwd">
                <a v-model="forget">忘记密码</a>
            </Col>
        </Row>
        <Row class="login-btn">
            <Button type="primary" @click="login">登陆</Button>
        </Row>
        <Row class="register">
            <a>注册</a>
        </Row>
    </div>
</template>
<script>
import crypto from 'crypto'  
import loginApi from '../../service/loginApi'
export default{
    name:'loginBox',
    data(){
        return {
            curAccount:'',
            curPwd:'',
            remember:'',
            forget:'',
            afocus:true
        }
    },
    methods:{
        //登陆后跳转
        gotoPage(args){
            let userName = args.userName;
            let userRole = args.userRole;
            this.$router.push(
                {
                    name:'Home',
                }
            )
        },
        //登陆
        login(){
            //业务逻辑：加密、跳转、权限
            let userName = this.curAccount;
            let userPwd = this.curPwd;
            var md5 = crypto.createHash('md5');
            userName = md5.update(userName).digest('hex');
            var md = crypto.createHash('md5');
            userPwd = md.update(userPwd).digest('hex');
            if(userName == '21232f297a57a5a743894a0e4a801fc3' && userPwd == 'e10adc3949ba59abbe56e057f20f883e' 
                || userName == '63a9f0ea7bb98050796b649e85481845' && userPwd == 'f379eaf3c831b04de153469d1bec345e'
                || userName == '232059cb5361a9336ccf1b8c2ba7657a' && userPwd =='bada256fc800d8de50e51da5c1db2a3f'){
                let config = {};
                loginApi.login(config).then(res =>{
                    if(res.status =='200' || res.status == '304'){
                        localStorage.removeItem("userInfo");
                        localStorage.setItem('userInfo',JSON.stringify(res.data));
                        this.gotoPage(res);
                    }
                });
            }
            else
            {
                this.$Message.error("用户名或密码错误")
            }
        }
    },
    comments:{
        crypto:crypto,
    }
}    
</script>