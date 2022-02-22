declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "indexeddb-export-import" {
  const IDBExportImport: {
    exportToJsonString: Fn;
    clearDatabase: Fn;
    importFromJsonString: Fn;
  };
  export default IDBExportImport;
}
