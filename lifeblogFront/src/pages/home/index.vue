<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from '@/hooks/router';
const router = useRouter();

const toArticle = () => {
    router.push('/pages/article/index');
};

const sysInfo = uni.getSystemInfoSync();

const list2 = [
    {
        image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        title: '昨夜星辰昨夜风，画楼西畔桂堂东',
    },
    {
        image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        title: '身无彩凤双飞翼，心有灵犀一点通',
    },

    {
        image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        title: '身无彩凤双飞翼，心有灵犀一点通',
    },
    {
        image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
    },
];
const fieldList = [
    {
        name: '前端',
        img: '',
    },
    {
        name: '做菜',
        img: '',
    },
    {
        name: '养宠',
        img: '',
    },
    {
        name: '前端',
        img: '',
    },
    {
        name: '做菜',
        img: '',
    },
    {
        name: '养宠',
        img: '',
    },
];

const urls = [
    'https://cdn.uviewui.com/uview/album/1.jpg',
    'https://cdn.uviewui.com/uview/album/2.jpg',
    'https://cdn.uviewui.com/uview/album/3.jpg',
    'https://cdn.uviewui.com/uview/album/4.jpg',
    'https://cdn.uviewui.com/uview/album/5.jpg',
    'https://cdn.uviewui.com/uview/album/6.jpg',
    'https://cdn.uviewui.com/uview/album/7.jpg',
    'https://cdn.uviewui.com/uview/album/8.jpg',
    'https://cdn.uviewui.com/uview/album/9.jpg',
    'https://cdn.uviewui.com/uview/album/10.jpg',
];

const indexList = ref([] as any);
const scrolltolower = () => {
    loadmore();
};

const loadmore = () => {
    for (let i = 0; i < 30; i++) {
        indexList.value.push({
            url: urls[1],
        });
    }
};

onMounted(() => {
    loadmore();
});
</script>

<template>
    <view class="page-home">
        <view :style="{ height: sysInfo.statusBarHeight + 'px', background: '#fff' }"></view>

        <view class="home-search">
            <view style="width: 250px">
                <u-search bgColor="#f5f5f5" :showAction="false" :disabled="true" placeholder="搜索文章" @click="toArticle"></u-search>
            </view>
        </view>
        <swiper class="swiper-box" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
            <swiper-item v-for="(item, index) in list2" :key="index">
                <image mode="scaleToFill" :src="item.image"></image>
            </swiper-item>
        </swiper>
        <view class="field-box">
            <view class="title">
                <view class="title-tag"></view>
                我的领域
            </view>
            <scroll-view class="my-field" scroll-x="true">
                <view v-for="(item, index) in fieldList" :key="index" class="my-field-item">
                    <!-- <image :src="item.img"></image> -->
                    <view style="display: inline-block">{{ item.name }}</view>
                </view>
            </scroll-view>
        </view>
        <view class="newarticles-box">
            <view class="title">
                <view class="title-tag"></view>
                热门文章
            </view>

            <view class="newarticles-list">
                <u-list @scrolltolower="scrolltolower">
                    <u-list-item v-for="(item, index) in indexList" :key="index">
                        <u-cell :title="`列表长度-${index + 1}`">
                            <template #icon>
                                <u-avatar shape="square" size="35" :src="item.url" customStyle="margin: -3px 5px -3px 0"></u-avatar>
                            </template>
                        </u-cell>
                    </u-list-item>
                </u-list>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.page-home {
    .home-search {
        // position: fixed;
        background-color: #fff;
        padding: 8px 10px 0;
    }
    .swiper-box {
        height: 220px;
        padding: 10px;
        background-color: #fff;
    }
    .title {
        height: 20px;
        line-height: 20px;
        padding: 20px 0;
        display: flex;
        align-items: center;
        .title-tag {
            width: 5px;
            height: 20px;
            border-radius: 12px;
            background-color: #2196f3;
            margin-right: 10px;
        }
    }
    .field-box {
        padding: 0 10px;

        .my-field {
            display: flex;
            .my-field-item {
                margin-right: 10px;

                width: 120px;
                height: 80px;
                background-color: #fff;
                text-align: center;
            }
        }
        .my-field {
            white-space: nowrap;
            width: 100%;
        }

        .my-field-item {
            display: inline-block;
            width: 150px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            background-color: #fff;
            margin-right: 10px;
        }
    }
    .newarticles-box {
        padding: 0 10px;
        overflow: hidden;
        height: calc(100vh - 430px);

        .newarticles-list {
        }
    }
}
</style>
