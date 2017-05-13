const user = {
  state: {
    name: '',
    email: '',
    uid: undefined,

  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    }
  },

  actions: {
    // 邮箱登录
    LoginByEmail({
      commit
    }, userInfo) {
      const email = userInfo.email.trim();
      return new Promise((resolve, reject) => {
        LoginByEmail(email, userInfo.password).then(response => {
          const data = response.data
          commit('SET_EMAIL', email)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
