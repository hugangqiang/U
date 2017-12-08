<template>
	<div class="wrap">
		<router-view></router-view>
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