{
  "conditions": [
    ["OS=='win'", {
      "targets": [{
        "target_name": "windows-ucv",
        "dependencies": [
          "<!(node -p \"require('node-addon-api').targets\"):node_addon_api_except",
        ],
        "sources": [
          "addon.cpp",
        ],
        "libraries": [
          "credui.lib",
          "runtimeobject.lib"
        ],
        "msvs_settings": {
          "VCCLCompilerTool": {
            "ExceptionHandling": 1, # /EHsc,
            "RuntimeLibrary": "2", # /MD
          },
        },
      }],
    }, {
      "targets": [{
        "target_name": "noop",
        "type": "none",
      }],
    }],
  ],
}
