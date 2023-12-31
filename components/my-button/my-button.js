// components/leo-button/leo-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotkeyList: Object,
    isTitle: Boolean
  },

  externalClasses: ['my-border','my-hover'],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindHotkey: function(event) {
      this.triggerEvent("key", {
        dataset: event.currentTarget.dataset
      }, {});
    }
  }
})