<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { articlesApi } from '@/api/home';
import { useRequest } from 'alova';
import { Toast } from '@/utils/uniapi/prompt';

const articleKeyword = ref('');
const articleList = ref([] as any);

const articleNavList = ref([
    {
        id: 1,
        name: '全部文章',
    },
    {
        id: 2,
        name: '最新文章',
    },
    {
        id: 3,
        name: '阅读最多',
    },
    {
        id: 4,
        name: '点赞最多',
    },
]);

const articleTabHandle = (val) => {
    articleList.value = [];
    articleDataHandle(1);
};

// 文章列表
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
onMounted(() => {
    articleDataHandle(pageNum.value);
});
</script>

<template>
    <view class="page-article">
        <view class="article-top">
            <view class="article-search">
                <u-search bgColor="#f5f5f5" :showAction="true" placeholder="请输入关键字" v-model="articleKeyword"></u-search>
            </view>
            <view class="article-nav">
                <u-tabs
                    :list="articleNavList"
                    :activeStyle="{
                        color: '#303133',
                        fontWeight: 'bold',
                        transform: 'scale(1.05)',
                    }"
                    :inactiveStyle="{
                        color: '#606266',
                        transform: 'scale(1)',
                    }"
                    itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
                    @click="articleTabHandle"
                ></u-tabs>
            </view>
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
</template>

<style lang="scss" scoped>
.page-article {
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
    .article-top {
        height: 100px;
        background-color: #fff;
        padding: 5px 10px;
        .article-search {
            margin-bottom: 20px;
        }
        .article-nav {
            // height: 60px;
        }
    }

    .articles-list {
        height: calc(100vh - 100px);
        padding: 10px;
        overflow: hidden;
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
</style>
