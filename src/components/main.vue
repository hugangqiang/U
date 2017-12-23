<template>
	<div class="wrap">
		<router-view></router-view>
        <!-- 
            <!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>图形验证码</title>
	</head>
	<body>
		<div id="v_container" style="width: 200px;height: 50px;"></div>
		<input type="text" id="code_input" value="" placeholder="请输入验证码"/><button id="my_button">验证</button>
	</body>
	<script src="js/gVerify.js"></script>
	<script>
		var verifyCode = new GVerify("v_container");

		document.getElementById("my_button").onclick = function(){
			var res = verifyCode.validate(document.getElementById("code_input").value);
			if(res){
				alert("验证正确");
			}else{
				alert("验证码错误");
			}
		}
	</script>
</html>

         -->
	</div>
</template>

<script>
export default{
    created(){
        let token = this.$getCookie('token');
        let _this = this;
        if(token){
            _this.$jwt.verify(token,"u",(err, decoded) => {
                if(err){
                    _this.$router.push({path:'/login'});
                }else{
                    _this.$store.commit('SAVE_USER', decoded);
                }
            })
        }
        // http request 拦截器
        this.$ajax.interceptors.request.use(
            config => {
                // 判断是否存在token，如果存在的话，则每个请求都加上token
                if (this.$store.state.userinfo.accessToken) {
                    if( typeof config.params === "undefined" ){
                        config.params = {}
                    }
                    config.params.access_token = this.$store.state.userinfo.accessToken;
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
        
        // http response 拦截器
        this.$ajax.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // 返回 401 清除token信息并跳转到登录页面
                            console.log("token已经过期");
                    }
                }
                return Promise.reject(error)   // 返回接口返回的错误信息
            }
        );
    }
}
</script>
<style lang="less">
	.wrap{
        background: #f5f5f5;
        position: relative;
    }
    .layout{
        margin-left: auto;
        margin-right: auto;
        width: 1200px;
    }
    @media (min-width: 1851px ) {
        .layout{
            width: 1600px;
        }
    }
    @media (min-width: 1651px ) and (max-width: 1850px ) {
        .layout{
            width: 1500px;
        }
    }
    @media (min-width: 1551px ) and (max-width: 1650px ) {
        .layout{
            width: 1400px;
        }
    }
</style>

