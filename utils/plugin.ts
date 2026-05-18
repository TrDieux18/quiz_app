 export const getPluginByName = (
    pluginsMap: Record<string, any>,
    pluginName: string,
    propertyName?: string,
  ) => {
    if (!pluginsMap) return null;
    if (propertyName) {
      return pluginsMap[`${pluginName}:${propertyName}`] || null;
    }
    const key = Object.keys(pluginsMap).find((k) =>
      k.startsWith(`${pluginName}:`),
    );
    return key ? pluginsMap[key] : null;
  };

  export const isPluginEnabled = (plugin: any) => {
    return plugin && plugin.value === "1";
  };

  export const getPluginValue = (
    pluginsMap: Record<string, any>,
    pluginName: string,
    propertyName: string,
  ) => {
    const plugin = pluginsMap[`${pluginName}:${propertyName}`];
    return plugin?.value || null;
  };
