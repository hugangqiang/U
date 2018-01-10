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


        this.$Notice.config({
            top: 100,
            duration: 1
        });
        // http request 拦截器
        this.$ajax.interceptors.request.use(
            config => {
                // 判断是否存在token，如果存在的话，则每个请求都加上token
                let reg = new RegExp(config.baseURL,"g");
                let url = config.url.replace(reg,"");
                
                if (this.$store.state.userinfo.accessToken) {
                    if(url != '/tags/hot' && url != '/materials/hot'){
                         if( typeof config.params === "undefined" ){
                            config.params = {}
                        }
                        config.params.access_token = this.$store.state.userinfo.accessToken;
                    }
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
                    let reg = new RegExp(error.response.config.baseURL,"g");
                    let url = error.response.config.url.replace(reg,"");
                    delete error.response.config.params.access_token;

                    switch (error.response.status) {
                        case 401:
                            this.$store.commit('SAVE_USER', {});
                            localStorage.removeItem('expenditure');
                            this.$delCookie("token")
                            if(url === '/materials/search'){
                                this.$ajax({
                                    url: "/materials/search",
                                    method: "GET",
                                    params: error.response.config.params
                                }).then((res) => {
                                    if(res.data.meta.code === 200){
                                        this.$store.commit('SAVE_File', res.data.data.rows)
                                    }
                                })
                                return;
                            }
                            this.async();
                    }
                }
                return Promise.reject(error)   // 返回接口返回的错误信息
            }
        );
    },
    methods: {
        async () {
            this.$Modal.error({
                title: '超时',
                content: '<h3>登录超时，请重新登录！</h3>',
                loading: true,
                onOk: () => {
                    this.$Modal.remove();
                    this.$router.push({path:'/login'});
                }
            });
        }
    }
}
</script>
<style lang="less">
	.wrap{
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

