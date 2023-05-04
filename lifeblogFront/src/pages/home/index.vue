<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from '@/hooks/router';
import { articlesApi, homeApi } from '@/api/home';
import { useRequest } from 'alova';
import { Toast } from '@/utils/uniapi/prompt';

const router = useRouter();

const toArticle = () => {
    router.push('/pages/article/index');
};

const sysInfo = uni.getSystemInfoSync();
const fieldList = ref([]);
const hotArticles = ref([]);

// 文章列表
const articleList = ref([] as any);
let pageNum = ref(1);
const finished = ref(false);
const { send: articleData } = useRequest(articlesApi, { immediate: false });
const articleDataHandle = async (pageNum) => {
    const res = await articleData({ pageNum });
    articleList.value = [...articleList.value, ...res?.data?.list];
    if (articleList.value.length === res?.data?.total) {
        finished.value = true;
        return Toast('已加载全部');
    }
};

const scrolltolower = () => {
    if (finished.value) return;
    pageNum.value += 1;
    articleDataHandle(pageNum.value);
};

const { send: initData } = useRequest(homeApi, { immediate: false });
const initHandle = async () => {
    const res = await initData();
    hotArticles.value = res.data.hotArticles;
    fieldList.value = res.data.fieldList;
};
onMounted(() => {
    initHandle();
    articleDataHandle(pageNum.value);
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
            <swiper-item v-for="(item, index) in hotArticles" :key="index">
                <image mode="scaleToFill" :src="item.image"></image>
            </swiper-item>
        </swiper>
        <view class="field-box">
            <view class="title">
                <view class="title-tag"></view>
                我的领域
            </view>
            <u-scroll-list :indicator="false">
                <view class="scroll-list" style="flex-direction: row; overflow-x: scroll">
                    <view class="scroll-list__goods-item" v-for="(item, index) in fieldList" :key="index">
                        <!-- <image class="scroll-list__goods-item__image" :src="item.img"></image> -->
                        <u--image class="scroll-list__goods-item__image" mode="scaleToFill" radius="5" width="100px" height="60px" :src="item.img"></u--image>

                        <text class="scroll-list__goods-item__text">{{ item.name }}</text>
                    </view>
                    <view class="scroll-list__show-more">
                        <text class="scroll-list__show-more__text">查看更多</text>
                        <u-icon name="arrow-leftward" color="#3c9cff" size="12"></u-icon>
                    </view>
                </view>
            </u-scroll-list>
        </view>
        <view class="articles-box">
            <view class="title">
                <view class="title-tag"></view>
                热门文章
            </view>

            <view class="articles-list">
                <u-list @scrolltolower="scrolltolower">
                    <u-list-item v-for="(item, index) in articleList" :key="index">
                        <view class="article-item">
                            <view class="article-item-img">
                                <u--image mode="scaleToFill" radius="5" width="60px" height="60px" :src="item.img"></u--image>
                            </view>
                            <view class="article-item-databox">
                                <view class="article-item-title">{{ item.title }}</view>
                                <view class="article-item-content">{{ item.content }}</view>
                                <view class="article-item-tag">
                                    <view>2023-05-02</view>
                                    <view>浏览6565次</view>
                                </view>
                            </view>
                        </view>
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
        .scroll-list {
            // @include flex(column);
            display: flex;
            flex-direction: column;

            &__goods-item {
                margin-right: 20px;
                background-color: #fff;
                border-radius: 5px;

                &__image {
                    width: 60px;
                    height: 60px;
                    border-radius: 4px;
                }

                &__text {
                    color: #3c9cff;
                    text-align: center;
                    font-size: 12px;
                    margin-top: 5px;
                }
            }

            &__show-more {
                background-color: #c5e2ff;
                border-radius: 3px;
                padding: 3px 6px;
                @include flex(column);
                align-items: center;

                &__text {
                    font-size: 12px;
                    width: 12px;
                    color: #3c9cff;
                    line-height: 16px;
                }
            }
        }

        .my-field {
            display: flex;
            .my-field-item {
                width: 120px;
                height: 80px;
                background-color: #fff;
                text-align: center;
                margin-right: 10px;
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
    .articles-box {
        padding: 0 10px;
        overflow: hidden;
        height: calc(100vh - 430px);

        .articles-list {
            .article-item {
                display: flex;
                width: 100%;
                height: 100px;
                background-color: #fff;
                padding: 15px 10px;
                margin-bottom: 10px;
                .article-item-img {
                }
                .article-item-databox {
                    margin-left: 10px;
                    font-size: 12px;
                    .article-item-tag {
                        display: flex;
                    }
                }
            }
        }
    }
}
</style>
