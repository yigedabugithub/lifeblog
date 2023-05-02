<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useAuthStore } from '@/store/modules/auth';
import { removeInterceptor, setupInterceptors } from '@/utils/interceptors';
import { useRouterStore } from '@/store/modules/router';
onLaunch(() => {
    removeInterceptor();
    setupInterceptors();
    const appStore = useRouterStore();
    appStore.initialize();
});
onShow(() => {
    const authStore = useAuthStore();
    authStore.initToken();
});
onHide(() => {});
</script>
<style lang="scss">
@import '@/static/css/main.scss';
</style>
