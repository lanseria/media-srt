export {};

declare module "vue-router" {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // title
    title?: string;
    isAuth?: boolean;
  }
}
