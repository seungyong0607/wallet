import { observable } from "./observer.js";


export class Store {
  #state; #mutations; #actions; // private으로 지정하여 외부에서는 접근이 안 되도록 한다.
  state = {};

  constructor({ state, mutations, actions }) {
    this.#state = observable(state);
    this.#mutations = mutations;
    this.#actions = actions;

    // state를 직접적으로 수정하지 못하도록 다음과 같이 정의한다.
    Object.keys(state).forEach(key => {
      Object.defindProperty(
        this.state,
        key,
        { get: () => this.#state[key] },
      );
    });
  };

  commit(action, payload) {
    // state는 오직 commit을 통해서 수정 할 수 있다.
    this.#mutations[action](this.#state, payload);
  }

  dispatch(action, payload) {
    /**
     *  예제에서dispatch는 사용되고 있진 않지만 아마 vuex를 써본 사람이라면 익숙할 것. 
     */

    return this.#actions[action]({
      state: this.#state,
      commit: this.commit.bind(this),
      dispatch: this.dispatch.bind(this),
    }, payload);
  }
}