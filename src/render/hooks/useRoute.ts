import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useImpRoute = () => {
  // ref
  const routing = ref(false);
  // use
  const route = useRoute();
  const router = useRouter();
  // current
  const crtName = computed(() => {
    return route.name as string;
  });
  const crtPath = computed(() => {
    return route.path as string;
  });
  const crtFullpath = computed(() => {
    return route.fullPath as string;
  });
  const crtMeta = computed(() => {
    return route.meta;
  });
  const crtMatched = computed(() => {
    return route.matched;
  });
  // simple
  const goBack = async () => {
    routing.value = true;
    await router.go(-1);
    routing.value = false;
  };
  // push
  const pushName = async (name: string) => {
    routing.value = true;
    await router.push({
      name
    });
    routing.value = false;
  };
  const pushPath = async (path: string) => {
    routing.value = true;
    await router.push({
      path
    });
    routing.value = false;
  };
  // replace
  const replacePath = async (path: string) => {
    routing.value = true;
    await router.replace({
      path
    });
    routing.value = false;
  };
  const replaceFullpath = async (fullPath: string) => {
    routing.value = true;
    await router.replace(fullPath);
    routing.value = false;
  };
  return {
    // ref
    routing,
    // use
    route,
    router,
    // current
    crtName,
    crtMeta,
    crtPath,
    crtFullpath,
    crtMatched,
    // simple
    goBack,
    // push
    pushName,
    pushPath,
    // replace
    replacePath,
    replaceFullpath
  };
};
