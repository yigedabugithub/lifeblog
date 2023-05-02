import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import 'uno.css';
import uviewPlus from 'uview-plus';

export function createApp() {
    const app = createSSRApp(App);
    // Configure store
    setupStore(app);
    app.use(uviewPlus);

    return {
        app,
    };
}
