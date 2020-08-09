<template>
    <div class="standard">
        <a-row>
            <a-col :span="24">开发规范</a-col>
        </a-row>
        <a-row>
            <a-col :span="22" :offset="2">1.文件夹,文件,样式名命名统一使用小写,多个单词组合之间以中横线字符连接.如: .nav-bar</a-col>
        </a-row>
        <a-row>
            <a-col :span="22" :offset="2">2.JS变量采用英文小写字母,多个单词采用驼峰式命名,如: navBar</a-col>
        </a-row>
        <a-row>
            <a-col :span="22" :offset="2">3.DOM中的样式如果只是用来辅助js交互而本身并不定义样式时,使用js-开头,例: js-nav-bar</a-col>
        </a-row>
        <a-row>
            <a-col :span="22" :offset="2">4.统一使用less或css进行样式编程,禁止使用sass,stylus</a-col>
        </a-row>
        <a-row>
            <a-col :span="22" :offset="2">5.使用tab进行缩进,tab大小为4个字符,禁止使用其他缩进方式,相应的编辑器请自行查询缩进配置</a-col>
        </a-row>
        <a-row>
            <a-col :span="22" :offset="2">6.框架本身采用vue2.5+vue-router3.0+vuex3.0的技术栈,请务必首先阅读并体会demo例子及相关规范</a-col>
        </a-row>
    </div>
</template>
<style lang="less">

</style>

