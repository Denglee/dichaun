import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //声明全局维护的状态
  state: {
    stateName:"开始状态=statename",  //默认值
  },

  //实时监听state值的变化(最新状态)
  getters: {
    gettersName(state){
        return  state.stateName;
    }

    // gettersName = state => state.stateName
  },

  // 提交 mutations是更改Vuex状态的唯一合法方法
  mutations: {
    // 点击更换
    mutationsName(state,name){
      state.stateName=name;
    },

    mutationsName2(state,name){
      state.stateName=name;
    },

    // mutationsName=(state, name) => {
    //   state.stateName = name
    // },
  },
  // 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
  actions: {
    actionsName({commit},name){
      return commit ('mutationsName',name);
    },

    actionsName2({commit},name){
      return commit ('mutationsName2',name);
    }

    // ES6精简写法
    //actionsName = ({commit},name) => commit('mutationsName', name)

  }
})

/*
如果我们不喜欢这种在页面上使用
“this.$stroe.state.count”
和“this.$store.dispatch('funName')”这种很长的写法，
那么我们可以使用mapState、mapGetters、mapActions就不会这么麻烦了；
*/
