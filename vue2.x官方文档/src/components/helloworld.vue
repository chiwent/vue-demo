<template>
    <div id="flexBox">
        <!-- vue模板只支持一个元素：https://blog.csdn.net/z1035075390/article/details/74451292 -->
        <div class="row">
            <div class="box">
                <!-- v-bind缩写 : -->
                <div id="app1" v-bind:title="message">
                    <p class="title">v-bind</p>
                    {{message}}
                </div>
            </div>
            <div class="box">
                <div id="app2">
                    <p class="title">v-if</p>
                    <!-- v-on缩写 @ -->
                    <button @click="showme">{{buttonVal}}</button>
                    <!-- v-if根据seen的真假来插入/移除元素，注意不是display:none -->
                    <p v-if="seen">Now you see me</p>
                </div>
            </div>
            <div class="box">
                <div id="app3">
                    <p class="title">v-for</p>
                    <ol>
                        <li v-for="item in items" :key="item.id" :class="item">
                            {{ item }}
                        </li>
                    </ol>
                    <button @click="reverseMsg">逆转内容</button>
                    <div></div>
                </div>
            </div>
            <div class="box">
                <div id="app4">
                    <p class="title">v-click</p>
                    <p>{{app4msg}}</p>
                    <button @click="reverseApp4">逆转内容</button>
                </div>
            </div>
            <div class="box">
                <div id="app5">
                    <p>{{waiting}}</p>
                    <p>{{app5msg}}</p>
                    <form action="#" @:submit.prevent="onSubmit">
                        <input type="text" v-model="app5msg">
                        <input type="submit" value="提交">
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="box">
                <p>原始HTML： {{rawHtml}}</p>
                <p>真正的HTML内容：<span v-html="rawHtml"></span></p>
                {{app4msg + ' ' + 'World'}}
                <br> {{ app5msg ? true : false}}
                <!-- 下面两个例子都是错误的 每个绑定都只能包含单个表达式，要用三元表达式表示流控制语句 -->
                <!-- {{var a = 1}}
                    {{if (app4msg) { return app4msg} }} -->    
            </div>

            <div class="box">
                <!-- https://cn.vuejs.org/v2/guide/computed.html -->
                <p class="title">计算属性</p>
                <!-- 可以在模板中定义类似 {{ message.split('').reverse().join('') }} 这样的方法，但是有更方便的方式，可以减轻模板冗余度 -->
                <p>原始字符串："{{ message }}"</p>
                <p>反转字符串："{{ reverseM }}"</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'helloworld',
        // components: {}
        // el: ['#app1','#app2','#app3'],   // option "el" can only be used during instance creation with the `new` keyword.
        data() { // https://segmentfault.com/q/1010000007910818
            return {
                message: 'Hello Vue',
                seen: false,
                buttonVal: '点我显示',
                items: [
                    'JavaScript',
                    'Python',
                    'Html5'
                ],
                app4msg: 'Hello',
                app5msg: 'Hello Vue',
                waiting: '等候你的输入',
                rawHtml: '<p style="color:red">Test</p>'
            }
        },
        // props: ['seen'],
        methods: {
            showme: function() {
                if (this.seen === false) {
                    this.seen = true;
                    this.buttonVal = '点我隐藏';
                } else {
                    this.seen = false;
                    this.buttonVal = '点我显示';
                }
            },
            reverseMsg: function() {
                var that = this;
                var arr = [];
                that.$nextTick(function() { // https://segmentfault.com/q/1010000012331476
                    that.items.forEach(function(item) {
                        arr.push(item.split('').reverse().join(''));
                    })
                    document.getElementById('app3').getElementsByTagName('div')[0].innerHTML = arr;
                })
            },
            reverseApp4: function() {
                this.app4msg = this.app4msg.split('').reverse().join('')
            },
            onSubmit: function() {
                var p = document.createElement('p');
                p.innerText = '你调用了event.preventDefault()';
                document.getElementById('app5').appendChild(p);
            }
        },
        computed: {
            reverseM: function() {
                return this.message.split('').reverse().join('')
            },
        },
        watch: {
            app5msg: function() {
                var that = this;
                that.waiting = 'OK';
                var before = new Date().getTime();
                var timer = setInterval(function(){
                    that.waiting = '等待你的输入';
                    console.log(that.app5msg);
                    if (new Date().getTime() - before > 1000) {
                        clearInterval(timer);
                    }
                },1500);
            }
        }
        // var app3 = new Vue({
        //     el: '#app-4',
        //     data: {
        //        items: [
        //             'JavaScript',
        //             'Python',
        //             'Html5'
        //         ]
        //     }
        // })
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    #flexBox {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 30px;
    }
    
    li {
        list-style: none;
    }
    
    .row {
        display: flex;
        justify-content: space-around;
        padding: 30px;
    }
    
    .box {
        position: relative;
    }
    
    .box:nth-of-type(1) {
        margin-top: 20px;
    }
    
    .box>div {
        padding: 20px;
    }
    
    .title {
        width: 100%;
        font-size: 14px;
        color: brown;
        display: block;
        text-align: center;
    }
    
    .box p {
        display: block;
    }
    
    #app1 {
        /* text-align: center; */
        display: block;
        position: relative;
        padding: 10px;
        width: 100px;
        border: 1px solid grey;
    }
    
    button {
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        height: 30px;
        line-height: 20px;
        border-radius: 6px;
        outline: none;
        filter: chroma(color=#000000);
        zoom: 1;
        color: #fff;
        background-color: rgba(46, 173, 182, 0.8);
    }
    
    button:focus {
        outline: none;
    }
    
    #app3:nth-last-child {
        width: 100%;
        height: 100%;
        border: 1px solid grey;
    }
</style>

