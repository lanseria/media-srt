import { RouterLink, RouterView } from 'vue-router';
import ImpPageContainer from '/@/components/global/ImpPageContainer.vue';
import ImpImage from '/@/components/global/ImpImage.vue';
import ImpModal from '/@/components/global/ImpModal.vue';
declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof RouterLink;
    RouterView: typeof RouterView;
    ImpPageContainer: typeof ImpPageContainer;
    ImpImage: typeof ImpImage;
    ImpModal: typeof ImpModal;
  }
}

export {};
