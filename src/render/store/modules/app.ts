import { defineStore } from "pinia";
import { useOsTheme } from "naive-ui";
import storage from "store";

type ThemeType = "light" | "dark";

interface AppState {
  theme: Nullable<ThemeType>;
  osTheme: Nullable<ThemeType>;
  collapsed: boolean;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    theme: null,
    osTheme: null,
    collapsed: false,
  }),
  getters: {
    /**
     * 本地主题色
     * @returns 默认可未设置
     */
    getLocalTheme(): Nullable<ThemeType> {
      return storage.get("APP_THEME", null);
    },
    getTheme(state): ThemeType {
      // 默认为 黑暗模式
      return state.theme ?? "dark";
    },
    getThemeText(): string {
      return this.getTheme === "dark" ? "深色" : "浅色";
    },
  },
  actions: {
    initTheme() {
      const osTheme = useOsTheme();
      this.osTheme = osTheme.value;
      this.theme = this.getLocalTheme ?? this.osTheme ?? "light";
    },
    setCollapsed(value: boolean) {
      this.collapsed = value;
    },
    setThemeLight() {
      this.theme = "light";
      storage.set("APP_THEME", this.theme);
    },
    setThemeDark() {
      this.theme = "dark";
      storage.set("APP_THEME", this.theme);
    },
    triggerTheme() {
      if (this.getTheme === "dark") {
        this.setThemeLight();
      } else {
        this.setThemeDark();
      }
    },
  },
});
