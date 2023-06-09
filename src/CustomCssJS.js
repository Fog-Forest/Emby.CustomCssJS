define([
  "events",
  "connectionManager",
], function (
  events,
  connectionManager,
  ) {
  "use strict";

  return function () {

    function loadCss(name, content, source) {
      try {
        let s = document.createElement("style");
        s.type = "text/css";
        s.innerHTML = content;
        document.head.appendChild(s);
        console.warn(`load CustomCss from ${source}: ${name}`);
      } catch (e) {
        console.error(`load CustomCss from ${source} ${name} error: ${e}`);
      }
    }

    function loadJS(name, content, source) {
      try {
        let s = document.createElement("script");
        s.type = "text/javascript";
        s.innerHTML = content;
        document.body.appendChild(s);
        console.warn(`load CustomJS from ${source}: ${name}`);
      } catch (e) {
        console.error(`load CustomJS from ${source} ${name} error: ${e}`);
      }
    }

    function loadCode(custom, type, source) {
      if (type === "css") {
        custom.forEach(item => loadCss(item.name, item.content, source));
      } else if (type === "js") {
        custom.forEach(item => loadJS(item.name, item.content, source));
      }
    }

    function getCustom(type, config) {
      // get Config for Server
      let serverId = ApiClient.serverId();
      let customServerConfig = localStorage.getItem(`custom${type}ServerConfig_${serverId}`);
      if (!customServerConfig) {
        customServerConfig = [];
        localStorage.setItem(`custom${type}ServerConfig_${serverId}`, JSON.stringify(customServerConfig));
      } else {
        customServerConfig = JSON.parse(customServerConfig);
      }
      // get custom in Server
      let customServer = config[`custom${type}`].filter(item => (item.state === "on" && customServerConfig.includes(item.name)) || item.state === "forced_on" );

      // get Config for Local
      let customLocalConfig = localStorage.getItem(`custom${type}LocalConfig`);
      if (!customLocalConfig) {
        customLocalConfig = [];
        localStorage.setItem(`custom${type}LocalConfig`, JSON.stringify(customLocalConfig));
      } else {
        customLocalConfig = JSON.parse(customLocalConfig);
      }
      // get custom in Local
      let customLocal = localStorage.getItem(`custom${type}Local`);
      if (!customLocal) {
        customLocal = [];
        localStorage.setItem(`custom${type}Local`, JSON.stringify(customLocal));
      } else {
        customLocal = JSON.parse(customLocal).filter(item => customLocalConfig.includes(item.name));
      }

      return [customServer, customLocal];
    }

    function loadConfiguration() {
      window.serverId = ApiClient.serverId();
      ApiClient.getPluginConfiguration(pluginUniqueId).then(function (config) {
        let [customjsServer, customjsLocal] = getCustom("js", config);
        let [customcssServer, customcssLocal] = getCustom("css", config);
        loadCode(customcssServer, "css", "Server");
        loadCode(customcssLocal, "css", "Local");
        loadCode(customjsServer, "js", "Server");
        loadCode(customjsLocal, "js", "Local");
      });
    }

    function loadCustomCssJS() {
      return function () {
        let serverId = ApiClient.serverId();
        switch (window.serverId) {
          case serverId:
            return;
          case undefined:
            loadConfiguration();
            break;
          default:
              if (typeof MainActivity === "undefined") {
                let href = window.location.href;
                if (href.match(/autostart=false/i)) {
                  window.location.href = `index.html?autostart=false`;
                } else if (href.match(/autostart=true/i)) {
                  window.location.href = `index.html?autostart=true`;
                } else {
                  window.location.reload();
                }
              } else {
                if (document.querySelector("#Carnival")) {
                  window.location.href = "index.html";
                } else {
                  MainActivity.exitApp();
                  setTimeout(function () {
                    window.open("emby://items", "_blank")
                  }, 150);
                }
              }
            break;
        }
      }
    }
    let pluginUniqueId = "98F76C3D-695F-4082-9220-AD5752E0859D";

    events.on(connectionManager, "localusersignedin", loadCustomCssJS());

  }
});