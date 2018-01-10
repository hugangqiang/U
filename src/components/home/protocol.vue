<template>
    <div class="u-file">
        <div class="u-header">
            <div class="header-top">
                <div class="layout">
                    <div>
                        <router-link to="/"><div class="logo"></div></router-link>
                        <div class="menu">
                            <nav>
                                <router-link to="/" class="menu-box">首页</router-link>
                                <router-link to="/sass" class="menu-box">行政工具</router-link>
                                <router-link to="/file" class="menu-box">资料下载</router-link>
                            </nav>
                        </div>
                    </div>
                    <div class="btns" v-if="typeof $store.state.userinfo.phone === 'undefined'">
                        <router-link to="/auth/register">
                            <span class="reg-btn">注册</span>
                        </router-link>
                        <span class="sep"></span>
                        <router-link to="/auth/login">
                            <span class="login-btn">登录</span>
                        </router-link>
                    </div>
                    <div class="btns" v-else>
                        <span class="reg-btn" v-if="$store.state.userinfo.nickname === ''">{{$store.state.userinfo.phone}}</span>
                        <span class="reg-btn" v-else>{{$store.state.userinfo.nickname}}</span>
                        <span class="sep"></span>
                        <span class="login-btn" @click="logout">退出</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="u-content">
            <div class="protocol layout" style="padding: 50px 30px;">
                
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0; font-size: 30px;">
                    <span>用户协议</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">1.1&nbsp;&nbsp;<span style="text-decoration:underline;">U</span></span><span style="text-decoration:underline;"><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">行政及关联企业</span></span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">（以下合称”U行政”）同意按照本协议的规定及其不时发布的操作规则提供基于互联网以及移动网</span><span style="text-decoration:underline;"><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: red">有关信息服务、应用服务、社交服务等服务</span></span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: red">（以下称“服务“）</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">，为获得服务，服务使用人（以下简称“用户”或“您”）应当基于了解本协议全部内容，在独立思考的基础上认可、同意本协议的全部条款并按照页面上的提示完成全部的注册程序。您在进行注册程序过程中点击”同意” 按钮即表示您完全接受《U行政用户使用协议》（以下简称“本协议”）及U行政公示的各项规则、规范。</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: red">您确认，您是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织（以下简称“法律主体”）</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">，如您代表一家公司或其他法律主体进行注册或以其他允许的方式实际使用本服务，</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: red">视为您已经获得该公司或该法律主体授权同意受本协议条款的约束。如果您不具备前述法律主体资格，请立即终止注册程序及在U行政上的任何操作，且U行政有权注销您的账号。U行政因此受到损失的，将向您和/或您的监护人索赔。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">1.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您注册成功后，U行政将为您基于服务使用的客观需要而在申请、注册服务时，按照注册要求提供的帐号开通服务，您有权在U行政为其开通、并同意向其提供服务的基础上使用服务。您的帐号和密码由您负责保管，应当使用由字母、数字、特殊字符组成的密码（最好８位以上长度），并应定期更改密码；您使用服务过程中，须对其账号下使用服务的行为、对任何由您账号通过服务发布、公开的信息，及对由此产生的任何后果承担全部责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: red">1.3&nbsp;</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">在注册帐号或使用本服务的过程中，您需要提供一些必要的信息，例如：为向您提供帐号注册服务或进行您身份识别，需要您填写：</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">① 企业名称及所处行业；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">② 注册地址及人员规模；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">③ 联系人姓名、手机、邮箱及其身份信息；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">④ 组织架构代码等（非盈利性组织提供）。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">若国家法律法规或政策有特殊规定的，您需要提供真实的身份信息。若您提供的信息不完整或存在虚假等问题，则可能影响您无法使用本服务或在使用本服务过程中受到限制。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">1.4&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">为提高您的服务体验和满意度，U行政将基于您的操作行为对您的行为数据进行调查研究和分析，从而进一步优化产品及服务。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">1.5&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您在使用结束后，如需暂时或永久离开本服务，数据将会自动归档处理，待归档期限结束后会自动删除。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;font-weight:normal">2.</span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;font-weight: normal">服务内容</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">2.1&nbsp; U</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">行政服务的具体内容由平台根据实际情况提供，包括但不限于授权您通过其帐号，使用企业注册、API接入与开放等功能，U行政有权对其提供的服务或产品形态进行升级或其他调整，并将及时告知您。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">2.2&nbsp; U</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">行政仅提供与服务相关的技术支持，除此之外与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由您自行负担。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">3.</span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">服务变更、中断或终止</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">3.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">鉴于网络服务的特殊性（包括但不限于服务器的稳定性问题、恶意的网络攻击等行为的存在及其他U行政无法控制的情形），您同意U行政有权随时中断或终止部分或全部的服务，若发生该等中断或中止服务的情形，U行政将尽可能及时通过网页公告、系统通知、私信、短信、微博或其他合理方式通知受到影响的您。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">3.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您理解，U行政需要定期或不定期地对提供服务的平台（如互联网网站、移动网络等）或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，U行政无需为此承担任何责任，但应尽可能事先进行通告。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">3.3&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">如发生下列任何一种情形，U行政有权随时中断或终止向您提供本协议项下的服务而无需对您或任何第三方承担任何责任：</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.3.1 </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您提供的资料信息不真实；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.3.2 </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您违反法律法规国家政策或本协议中规定的使用规则；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.3.3 </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您在使用收费服务时未按规定付费。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">3.4&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">如您申请开通服务后在任何连续365日内未实际使用，则U行政有权选择采取以下任何一种方式进行处理，由此产生的一切法律责任将由您自行承担：</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.4.1 </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">回收昵称；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.4.2 </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">停止提供服务。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">3.5&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您选择将帐号与京东、QQ、微信、微博等第三方帐号进行绑定的，除您自行解除绑定关系外，如发生下列任何一种情形，您已绑定的第三方帐号也有可能被解除绑定而U行政无需对您或任何第三方承担任何责任：</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.5.1 </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">违反法律法规国家政策、本协议的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.5.2 </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">违反第三方帐户协议或其相关规定的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.5.3 </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">其他需要解除绑定的。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">4. </span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">使用规则</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您注册U行政账号，制作、发布、传播信息内容的，应当使用真实身份信息，不得以虚假、冒用的居民身份信息、企业注册信息、组织机构代码信息进行注册。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">如您违反前述1条之约定，依据相关法律、法规及国家政策要求，U行政有权随时中止或终止您对服务的使用且不承担责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.3&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您在使用服务时，U行政有权基于安全运营、社会公共安全的需要或国家政策的要求，要求您提供准确的个人资料，如您提供的资料信息有任何变动，导致您的实际情况与您提交给U行政的信息不一致的，您应及时更新。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.4&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您不应将其帐号、密码转让或出借予他人使用。如您发现帐号或服务遭他人非法使用，应立即通知U行政协调处理。因无法对非法或未经授权使用您账号及密码的行为作出甄别，U行政将不承担任何责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.5&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您同意U行政在提供服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息，并且，您同意接受U行政通过电子邮件或其他方式向您发送商品促销或其他相关商业信息。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.6&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">对于您通过服务公开发布的任何内容，您同意U行政在全世界范围内具有免费的、永久性的、不可撤销的、非独家的和完全再许可的权利和许可，以使用、复制、修改、改编、出版、翻译、据以创作衍生作品、传播、表演和展示此等内容（整体或部分），和/或将此等内容编入当前已知的或以后开发的其他任何形式的作品、媒体或技术中。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.7&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您在使用服务过程中，不得在网站上制作、复制、上传、发布、传播含有下列内容之一的信息：</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">违反宪法确定的基本原则的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.3&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">损害国家荣誉和利益的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.4&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">煽动民族仇恨、民族歧视，破坏民族团结的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.5&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">破坏国家宗教政策，宣扬邪教和封建迷信的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.6&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">散布谣言，扰乱社会秩序，破坏社会稳定的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.7&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.8&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">侮辱或者诽谤他人，侵害他人合法权益的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.9&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.10&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">以非法民间组织名义活动的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.11&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">不符合《即时通信工具公众信息服务发展管理暂行规定》及遵守法律法规、社会主义制度、国家利益、公民合法利益、公共秩序、社会道德风尚和信息真实性等“七条底线”要求的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.12&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.13&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">涉及他人隐私、个人信息或资料的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.14&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">发表、传送、传播骚扰、广告信息、过度营销信息及垃圾信息或含有任何性或性暗示的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.15&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">干扰U行政正常运营和侵犯其他您或第三方合法权益内容的信息。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.7.16&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">含有中国法律、法规以及任何具有法律效力之规范所限制或禁止的其它内容的。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.8&nbsp; U</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">行政针对某些特定的服务的使用通过各种方式（包括但不限于网页公告、系统通知、私信、短信提醒等）作出的任何声明、通知、警示等内容视为本协议的一部分，您如使用该等服务，视为您同意该等声明、通知、警示的内容。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.9&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您承诺自己在使用本网站服务的所有行为均遵守国家法律、法规和本网站的相关规定以及各种社会公共利益或公共道德。对于任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任，U行政不承担任何责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.10&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您在使用服务时如发现服务系统或其他相关系统的信息安全漏洞需及时通知U行政，禁止对U行政服务系统进行漏洞扫描、渗透测试等可能造成平台损失的行为。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.11&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">除非法律允许或U行政书面许可，你使用本产品或服务过程中不得从事下列行为：</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.11.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">删除本产品及其副本上关于著作权的信息；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.11.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">对本产品进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现本产品的源代码；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.11.3&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">对U行政拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.11.4&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">对本产品或者本产品运行过程中释放到任何终端内存中的数据、产品运行过程中客户端与服务器端的交互数据，以及本产品运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经U行政授权的第三方工具/服务接入本产品和相关系统；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.11.5&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">通过修改或伪造产品运行中的指令、数据，增加、删减、变动产品的功能或运行效果，或者将用于上述用途的产品、方法进行运营或向公众传播，无论这些行为是否为商业目的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.11.6&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">自行或者授权他人、第三方产品对本产品及其组件、模块、数据进行干扰；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.11.7&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">其他未经U行政明示授权的行为。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">4.12&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">除非法律允许或U行政书面许可，使用本产品或服务过程中不得从事下列行为：</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.12.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">提交、发布虚假信息，或冒充、利用他人名义的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.12.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">诱导其他您点击链接页面或分享信息的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.12.3&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">虚构事实、隐瞒真相以误导、欺骗他人的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.12.4&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.12.5&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">其他违反法律法规规定、侵犯其他您合法权益、干扰产品正常运营或U行政未明示授权的行为。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">5. </span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">知识产权</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">5.1&nbsp; U</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">行政提供的网络服务中包含的任何文本、图片、图形、音频和/或视频资料均受著作权、商标和/或其它财产所有权法律的保护，未经相关权利人同意，上述资料均不得在任何媒体直接或间接发布、播放、出于播放或发布目的而改写或再发行，或者被用于其他任何商业目的。所有这些资料或资料的任何部分仅可作为私人和非商业用途而保存在某台计算机内。U行政不就由上述资料产生或在传送或递交全部或部分上述资料过程中产生的延误、不准确、错误和遗漏或从中产生或由此产生的任何损害赔偿，以任何形式，向您或任何第三方负责。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">5.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">服务中涉及的“U行政”“企客”等文字或图形及其组成，均是U行政的商标。未经U行政事先书面同意，您不得有擅自使用或展示这些商标，一经发现，U行政将追究法律责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">5.3&nbsp; U</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">行政为提供服务而使用的，或者第三方针对服务开发的在平台上运行、供您使用的任何软件（包括但不限于软件中所含的任何图象、照片、动 画、录像、录音、音乐、文字和附加程序、随附的帮助材料）的一切权利均属于该软件的著作权人，未经该软件的著作权人许可，您不得对该软件进行反向工程 （reverse engineer）、反向编译（decompile）或反汇编（disassemble）。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">6. </span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">免责声明</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您在使用服务的过程中应遵守国家法律法规及政策规定，因其使用服务而产生的行为后果由您自行承担。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">通过服务发布的任何信息，及通过服务传递的任何观点不代表U行政的立场，U行政亦不对其完整性、真实性、准确性或可靠性负责。您对于可能会接触到的非法的、非道德的、错误的或存在其他失宜之处的信息，及被错误归类或是带有欺骗性的发布内容，应自行做出判断。在任何情况下，对于任何信息，包括但不仅限于其发生的任何错误或遗漏；或是由于使用通过服务发布、私信、传达、其他方式所释出的或在别处传播的信息，而造成的任何损失或伤害，应由相关行为主体承担全部责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.3&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">鉴于外部链接指向的网页内容非U行政实际控制的，因此U行政无法保证为向您提供便利而设置的外部链接的准确性和完整性。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.4&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您完全理解并同意，本服务涉及到互联网等相关服务，可能会受到不可抗力（包括但不限于战争、台风、水灾、火灾、地震、罢工、暴动等）、计算机病毒或黑客攻击、互联网络等造成的服务中断或不能满足您要求的风险，使用本服务的您须承担以上风险，U行政不承担任何责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.5&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">对网站系统发生故障影响到本服务的正常运行，U行政承诺将及时处理、修复。但您因此而产生的经济和精神损失，U行政不承担任何责任。此外，U行政保留不经事先通知进行维护、升级或其他目的暂停本服务的权利，由此产生的损失U行政不承担任何责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.6&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您在使用过程中遭受的来自任何他人的威胁、诽谤或其他非法行为，您对此必须自己承担责任，U行政对本服务不做任何类型的保证；对因此导致任何您产生直接或间接地损失，U行政不承担任何责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.7&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您在注册账号后，如果出现违反法律或本协议的情形，有权回收该账号，由此给您带来的任何问题均由您自行承担。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.8&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">如发生下列任何一种情形，U行政有权随时中断或终止向您提供服务而无需通知该您：</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.8.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">提供的个人资料不真实或存在侵犯第三方知识产权或其他权利的情形；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.8.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">违反本服务条款的规定；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.8.3&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">按照政府部门和/或司法机关的要求；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.8.4&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">注册后长期（持续365日或以上）闲置不用的账号；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.8.5&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">恶意抢注企业名称，U行政收到第三方投诉且该第三方出具相应证据的；</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.8.6&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">其他U行政认为是符合整体服务需求的特殊情形。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.9&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您知悉并同意，U行政可能会与第三方合作向您提供产品，并由第三方向您提供该产品的升级、维护、客服等后续工作，由第三方对该产品的质量问题或其本身的原因导致的一切纠纷或您损失承担责任，您在此同意将向该第三方主张与此有关的一切权利和损失。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">6.10&nbsp; U</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">行政上提供的产品或服务，如未标明使用期限、或者其标明的使用期限为“永久”、“无限期”或“无限制”的，则其使用期限为自您获得该产品或服务之日起至该产品或服务在平台下线之日为止。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">7. </span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">赔偿</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">7.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">如因U行政违反有关法律、法规或本协议项下的任何条款而给您造成损失，U行政同意承担由此造成的损害赔偿责任，赔偿金额限于您为购买相应服务已支付的费用。在相关法律所允许的最大范围内，U行政不就您因使用或不能使用服务所发生的间接损害（包括但不限于营业中断、利润损失、商业信息的丢失、费用增加等）承担赔偿责任；U行政不对由于移动通信服务商、互联网接入服务商等第三方原因导致服务无法使用或出现故障所发生的损失承担责任。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">7.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您同意保障和维护U行政及其他相关利益，如因您违反有关法律、法规或本协议项下的任何条款而给U行政或任何其他第三人造成损失，您同意承担由此造成的损害赔偿责任并保证U行政免遭损失。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">8. </span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">协议修改</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">8.1&nbsp; U</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">行政保留不时修改本协议任何条款的权利，一旦本协议的内容发生变动，U行政将会在网站上公布修改之后的协议内容，</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: red">修改后的条款一经公布立即生效，庚唐公司无需单独通知您</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">。若您不同意上述修改，则可以选择停止使用服务。U行政也可选择通过其他适当方式（比如系统通知）向您通知修改内容。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">8.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">如果不同意U行政对本协议相关条款所做的修改，您有权停止使用服务。如果您继续使用服务，则视为您接受U行政对本协议相关条款所做的修改。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">9. </span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">通知送达</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">9.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">本协议项下U行政对于您所有的通知均可通过网页公告、电子邮件、系统通知主动联系、私信、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">9.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">您对于U行政的通知应当通过U行政对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">10. </span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">法律适用</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">10.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">本协议及其修订本的有效性、履行和解释均适用于中华人民共和国之法律，任何争议也仅适用中华人民共和国法律。如协议服务条款之任何一部分与中华人民共和国法律相抵触，则该部分条款应按法律规定重新解释，部分条款之无效或重新解释不影响其它条款之法律效力 。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">10.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">因本协议所引起的您与U行政的任何纠纷或争议，首先应本着友好协商原则进行解决，如果协商不成的，您在此完全同意将纠纷或争议提交至U行政所在地即</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: red">上海市浦东新区</span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">有管辖权的人民法院通过诉讼解决。</span>
                </p>
                <h3 style="margin-top:15px;margin-right:0;margin-bottom:15px;margin-left:0">
                    <span style="font-family: &#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">11. </span><span style="font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;;color:#333333;font-weight:normal">其他规定</span>
                </h3>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">11.1&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">11.2&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</span>
                </p>
                <p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:28px;background:white">
                    <span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">11.3&nbsp; </span><span style="font-size: 18px;font-family: 微软雅黑, sans-serif;color: rgb(51, 51, 51)">本协议中的标题仅为方便而设，在解释本协议时应被忽略。</span>
                </p>
                <p>
                    &nbsp;
                </p>
                <p>
                    <br/>
                </p>
            </div>
        </div>
        <div class="u-footer">
            <div class="layout">
                <Row>
                    <Col span="12">
                        <div class="left">
                            <div class="logo">
                                <img src="../images/logo.png" alt="">
                            </div>
                            <div class="contact">
                                <div class="title">联系我们</div>
                                <p>服务电话：17602192829</p>
                                <p>客服QQ：1031514657</p>
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="copyright">
                            <p>沪ICP备17015887号</p>
                            <p>Copyright ©  U行政 www.uxingzheng.com  All rights reserved</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>
<script>
    export default {
        data () {
            return {
               
            }
        },
        created(){

        },
        mounted(){

        },
        methods: {
           logout(){
				/** 
				 * 退出登录
				 **/
                this.$store.commit('SAVE_USER', {});
                localStorage.removeItem('expenditure');
                this.$delCookie("token");
                this.$router.push({path:'/'});
        	}
        }
    }
</script>
<style lang="less">
    .u-file{
        .u-header{
            position: relative;
            width: 100%;
            .header-top{
                height: 60px;
                background: #202023;
                .layout{
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    .logo{
                        display: inline-block;
                        width: 120px;
                        height: 30px;
                        background: url("../images/logo.png");
                        background-size: contain;
                        background-repeat: no-repeat;
                        margin-top: 15px;
                    }
                    .menu{
                        display: inline-block;
                        position: relative;
                        top: -8px;
                        left: 25px;
                        .menu-box{
                            font-size: 16px;
                            color: #f0f0f0;
                            margin: 0 25px;
                        }
                    }
                    .btns{
                        line-height: 60px;
                        .login-btn,
                        .reg-btn{
                            color: #f0f0f0;
                            font-size: 16px;
                            cursor: pointer;
                            margin: 0 15px;
                        }
                        .sep{
                            width: 2px;
                            height: 16px;
                            background: #fff;
                            display: inline-block;
                            position: relative;
                            top: 2px;
                        }
                    }
                }
            }
        }

        .u-footer{
            width: 100%;
            padding: 55px 0;
            background: #202023;
            color: #999;
            font-size: 14px;
            .left{
                display: flex;
                flex-flow: row nowrap;
                .contact{
                    margin-left: 40px;
                    padding-left: 40px;
                    border-left: 1px solid #4d4d4d;
                    .title{
                        font-size: 18px;
                        margin-bottom: 15px;
                    }
                }
            }
            .copyright{
                text-align: right;
                padding-top: 40px;
            }
        }
        .ivu-back-top-inner {
            background-color: #0e9939;
        }
    }
    
</style>